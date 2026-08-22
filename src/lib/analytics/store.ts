import { getSql } from "@/lib/db";
import { EVENT_VALUE_AED } from "./config";
import { buildSeedEvents } from "./seed";
import { isKnownEvent, sanitizeEventName, sanitizeParams } from "./sanitize";
import type { AnalyticsEvent, ParamValue } from "./types";

type EventRow = {
  id: number;
  ts: string;
  event: string;
  client_id: string;
  session_id: string;
  origin: string;
  params: Record<string, ParamValue> | string;
};

const globalRef = globalThis as typeof globalThis & {
  __dakiaSeeded__?: Promise<void>;
};

function parseParams(raw: EventRow["params"]): Record<string, ParamValue> {
  if (raw && typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, ParamValue>;
    } catch {
      return {};
    }
  }
  return {};
}

function toIso(ts: string | number | Date): number {
  return new Date(ts).getTime();
}

export function rowToEvent(row: EventRow): AnalyticsEvent {
  return {
    event: row.event,
    timestamp: toIso(row.ts),
    client_id: row.client_id,
    session_id: row.session_id,
    origin: row.origin === "seed" ? "seed" : "live",
    params: parseParams(row.params),
  };
}

export async function ensureSeeded(): Promise<void> {
  globalRef.__dakiaSeeded__ ??= (async () => {
    const sql = await getSql();
    const countRows = await sql<{ n: number }>`select count(*)::int as n from analytics_events`;
    if ((countRows[0]?.n ?? 0) > 0) return;
    const events = buildSeedEvents(90);
    const batch = 120;
    for (let i = 0; i < events.length; i += batch) {
      const slice = events.slice(i, i + batch);
      const values: unknown[] = [];
      const placeholders = slice.map((e, idx) => {
        const o = idx * 6;
        values.push(
          new Date(e.timestamp).toISOString(),
          e.event,
          e.client_id,
          e.session_id,
          e.origin ?? "seed",
          JSON.stringify(e.params),
        );
        return `($${o + 1}, $${o + 2}, $${o + 3}, $${o + 4}, $${o + 5}, $${o + 6}::jsonb)`;
      });
      await sql.query(
        `insert into analytics_events (ts, event, client_id, session_id, origin, params) values ${placeholders.join(",")}`,
        values,
      );
    }
  })().catch((err) => {
    globalRef.__dakiaSeeded__ = undefined;
    throw err;
  });
  return globalRef.__dakiaSeeded__;
}

export function normalizeIncoming(body: Record<string, unknown>): AnalyticsEvent | null {
  const event = sanitizeEventName(String(body.event || ""));
  if (!event || !isKnownEvent(event)) return null;
  const client_id = String(body.client_id || "").slice(0, 64);
  const session_id = String(body.session_id || "").slice(0, 64);
  if (!client_id || !session_id) return null;
  if (!/^cid\.[a-f0-9]+$/i.test(client_id) && !client_id.startsWith("cid.")) return null;
  if (!/^sid\.[a-f0-9]+$/i.test(session_id) && !session_id.startsWith("sid.")) return null;
  const tsRaw = Number(body.timestamp);
  const timestamp = Number.isFinite(tsRaw) && tsRaw > 0 ? tsRaw : Date.now();
  const skew = Math.abs(Date.now() - timestamp);
  const ts = skew > 7 * 24 * 60 * 60 * 1000 ? Date.now() : timestamp;
  const params = sanitizeParams(
    body.params && typeof body.params === "object" ? (body.params as Record<string, unknown>) : {},
  );
  if (params.value == null && EVENT_VALUE_AED[event] != null) {
    params.value = EVENT_VALUE_AED[event]!;
    params.currency = "AED";
  }
  return { event, timestamp: ts, client_id, session_id, origin: "live", params };
}

export async function insertLiveEvent(event: AnalyticsEvent): Promise<void> {
  const sql = await getSql();
  await sql.query(
    `insert into analytics_events (ts, event, client_id, session_id, origin, params)
     values ($1, $2, $3, $4, $5, $6::jsonb)`,
    [
      new Date(event.timestamp).toISOString(),
      event.event,
      event.client_id,
      event.session_id,
      "live",
      JSON.stringify(event.params),
    ],
  );
}

export async function loadEventsSince(sinceMs: number): Promise<AnalyticsEvent[]> {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<EventRow>`
    select id, ts, event, client_id, session_id, origin, params
    from analytics_events
    where ts >= ${new Date(sinceMs).toISOString()}
    order by ts asc
  `;
  return rows.map(rowToEvent);
}

export async function loadRecentEvents(limit = 80): Promise<AnalyticsEvent[]> {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<EventRow>`
    select id, ts, event, client_id, session_id, origin, params
    from analytics_events
    order by ts desc
    limit ${limit}
  `;
  return rows.map(rowToEvent);
}

export async function countByOrigin(): Promise<{ seed: number; live: number }> {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<{ origin: string; n: number }>`
    select origin, count(*)::int as n from analytics_events group by origin
  `;
  const out = { seed: 0, live: 0 };
  for (const row of rows) {
    if (row.origin === "seed") out.seed = row.n;
    if (row.origin === "live") out.live = row.n;
  }
  return out;
}
