import { createFileRoute } from "@tanstack/react-router";
import { insertLiveEvent, normalizeIncoming } from "@/lib/analytics/store";

const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 80;
const MAX_BODY = 8_192;

function limited(ip: string): boolean {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  row.n += 1;
  return row.n > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export const Route = createFileRoute("/api/collect")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (limited(clientIp(request))) {
          return Response.json({ ok: false, message: "Rate limited" }, { status: 429 });
        }
        const len = Number(request.headers.get("content-length") || "0");
        if (len > MAX_BODY) {
          return Response.json({ ok: false, message: "Payload too large" }, { status: 413 });
        }
        let body: Record<string, unknown> = {};
        try {
          const text = await request.text();
          if (text.length > MAX_BODY) {
            return Response.json({ ok: false, message: "Payload too large" }, { status: 413 });
          }
          body = JSON.parse(text) as Record<string, unknown>;
        } catch {
          return Response.json({ ok: false, message: "Invalid payload" }, { status: 400 });
        }
        if (body.consent !== "granted") {
          return Response.json({ ok: true, skipped: true });
        }
        const event = normalizeIncoming(body);
        if (!event) {
          return Response.json({ ok: false, message: "Rejected event" }, { status: 400 });
        }
        try {
          await insertLiveEvent(event);
        } catch {
          return Response.json({ ok: false, message: "Store unavailable" }, { status: 503 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
