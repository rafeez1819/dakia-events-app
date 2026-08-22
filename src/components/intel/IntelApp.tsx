import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  Brain,
  Funnel,
  Globe2,
  Radio,
  Shield,
  Sparkles,
  Table2,
  Workflow,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { generateDailyIntelligence } from "@/lib/analytics/ai";
import { summarizeForAi } from "@/lib/analytics/engine";
import { getIntelSnapshot } from "@/lib/analytics/queries";
import { loadConsent } from "@/lib/analytics/consent";
import type { IntelSnapshot } from "@/lib/analytics/types";

type View =
  | "overview"
  | "acquisition"
  | "funnel"
  | "leads"
  | "realtime"
  | "debugger"
  | "ai"
  | "architecture"
  | "privacy";

const NAV: { id: View; label: string; icon: typeof Activity }[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "acquisition", label: "Acquisition", icon: Globe2 },
  { id: "funnel", label: "Funnels", icon: Funnel },
  { id: "leads", label: "Leads", icon: Table2 },
  { id: "realtime", label: "Realtime", icon: Radio },
  { id: "debugger", label: "Debugger", icon: Workflow },
  { id: "ai", label: "AI Analyst", icon: Brain },
  { id: "architecture", label: "Blueprint", icon: Sparkles },
  { id: "privacy", label: "Privacy", icon: Shield },
];

const GOLD = "#c9a84c";
const MUTE = "#888480";

function n(v: number) {
  return new Intl.NumberFormat("en-AE").format(Math.round(v));
}
function pct(v: number) {
  return `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`;
}
function aed(v: number) {
  return `AED ${n(v)}`;
}

export function IntelApp() {
  const [view, setView] = useState<View>("overview");
  const [range, setRange] = useState(30);
  const [snap, setSnap] = useState<IntelSnapshot | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const data = await getIntelSnapshot({ data: { rangeDays: range } });
        if (alive) {
          setSnap(data);
          setError("");
        }
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : "Failed to load intelligence");
      }
    };
    void load();
    const t = window.setInterval(load, 12000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, [range]);

  if (!snap) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-mute">
        <p className="font-cond text-sm tracking-[0.2em] uppercase">{error || "Loading warehouse…"}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ink text-paper">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-line bg-elev md:flex">
        <div className="border-b border-line px-5 py-5">
          <p className="font-cond text-[10px] tracking-[0.32em] text-gold uppercase">Dakia</p>
          <p className="font-display text-2xl tracking-wide">INTELLIGENCE</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex min-h-11 items-center gap-3 px-3 text-left font-cond text-[13px] tracking-[0.12em] uppercase ${
                  active ? "bg-raised text-gold" : "text-mute hover:bg-raised hover:text-paper"
                }`}
              >
                <Icon className="size-4" strokeWidth={1.6} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <Link to="/" className="flex min-h-11 items-center gap-2 border-t border-line px-5 py-4 text-mute hover:text-gold">
          <ArrowLeft className="size-4" />
          <span className="font-cond text-[12px] tracking-[0.16em] uppercase">Site</span>
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-8">
          <div>
            <p className="font-cond text-[10px] tracking-[0.28em] text-gold uppercase">Website Intelligence</p>
            <h1 className="font-display text-3xl tracking-wide md:text-4xl">{NAV.find((x) => x.id === view)?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setRange(d)}
                className={`min-h-11 px-3 font-cond text-xs tracking-[0.16em] uppercase ${
                  range === d ? "bg-gold text-ink" : "border border-line text-mute hover:text-paper"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 md:hidden">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`min-h-11 shrink-0 px-3 font-cond text-[11px] tracking-[0.14em] uppercase ${
                view === item.id ? "bg-gold text-ink" : "text-mute"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="border-b border-line px-4 py-2 text-xs text-faint md:px-8">
          {n(snap.seededEvents)} seeded rows · {n(snap.liveEventsCount)} live consented events · KPIs derived from event
          records, not hardcoded shares
        </p>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          {view === "overview" && <Overview snap={snap} />}
          {view === "acquisition" && <Acquisition snap={snap} />}
          {view === "funnel" && <FunnelView snap={snap} />}
          {view === "leads" && <LeadsView snap={snap} />}
          {view === "realtime" && <RealtimeView snap={snap} />}
          {view === "debugger" && <DebuggerView snap={snap} />}
          {view === "ai" && <AiView snap={snap} />}
          {view === "architecture" && <Architecture />}
          {view === "privacy" && <PrivacyView />}
        </main>
      </div>
    </div>
  );
}

function Card({ label, value, hint, delta }: { label: string; value: string; hint?: string; delta?: number }) {
  return (
    <div className="border border-line bg-elev p-4 md:p-5">
      <p className="font-cond text-[10px] tracking-[0.22em] text-mute uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl tracking-wide text-paper tabular-nums md:text-4xl">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {typeof delta === "number" && (
          <span className={`tabular-nums ${delta >= 0 ? "text-ok" : "text-bad"}`}>{pct(delta)}</span>
        )}
        {hint ? <span className="text-faint">{hint}</span> : null}
      </div>
    </div>
  );
}

function Overview({ snap }: { snap: IntelSnapshot }) {
  const series = snap.daily.map((d) => ({
    date: d.date.slice(5),
    users: d.users,
    leads: d.leads,
    value: d.conversionValue,
  }));
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card label="Users" value={n(snap.users)} delta={snap.usersDelta} hint="vs prior period" />
        <Card label="Sessions" value={n(snap.sessions)} hint={`${(snap.engagementRate * 100).toFixed(1)}% engaged`} />
        <Card label="Leads" value={n(snap.leads)} delta={snap.leadsDelta} hint={`${n(snap.qualifiedLeads)} qualified`} />
        <Card
          label="Lead value"
          value={aed(snap.conversionValue)}
          hint={`${(snap.conversionRate * 100).toFixed(2)}% conv.`}
        />
      </div>
      <div className="border border-line bg-elev p-4 md:p-6">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Users and leads</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <CartesianGrid stroke="#1c1c1c" vertical={false} />
              <XAxis dataKey="date" stroke={MUTE} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={MUTE} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #2a2618", color: "#f0ede8" }} />
              <Area type="monotone" dataKey="users" stroke={GOLD} fill="rgba(201,168,76,0.16)" strokeWidth={1.6} />
              <Area type="monotone" dataKey="leads" stroke="#e8c96a" fill="rgba(232,201,106,0.08)" strokeWidth={1.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="border border-line bg-elev p-4 md:p-6">
          <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Top pages</p>
          <ul className="space-y-3">
            {snap.topPages.map((p) => (
              <li key={p.path} className="flex items-center justify-between gap-4 text-sm">
                <span className="font-cond tracking-wide text-paper">{p.path}</span>
                <span className="tabular-nums text-mute">
                  {n(p.views)} · {p.conversions} conv
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-elev p-4 md:p-6">
          <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Anomalies</p>
          {snap.anomalies.length === 0 ? (
            <p className="text-sm text-mute">No z-score flags above 2.4 in this window.</p>
          ) : (
            <ul className="space-y-3">
              {snap.anomalies.slice(0, 6).map((a) => (
                <li key={`${a.date}-${a.metric}`} className="flex items-center justify-between text-sm">
                  <span>
                    {a.date} · {a.metric}
                  </span>
                  <span className={a.direction === "up" ? "text-ok tabular-nums" : "text-bad tabular-nums"}>
                    {a.direction} z={a.z}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Acquisition({ snap }: { snap: IntelSnapshot }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="border border-line bg-elev p-4 md:p-6">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Channels</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={snap.channelMix} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="#1c1c1c" horizontal={false} />
              <XAxis type="number" stroke={MUTE} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke={MUTE} fontSize={11} tickLine={false} axisLine={false} width={78} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #2a2618", color: "#f0ede8" }} />
              <Bar dataKey="users" fill={GOLD} radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border border-line bg-elev p-4 md:p-6">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Device conversion</p>
        <ul className="space-y-4">
          {snap.deviceMix.map((d) => {
            const rate = d.users ? d.leads / d.users : 0;
            return (
              <li key={d.name}>
                <div className="mb-1 flex justify-between font-cond text-sm uppercase tracking-wider">
                  <span>{d.name}</span>
                  <span className="tabular-nums text-mute">
                    {n(d.users)} · {(rate * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="h-1 bg-raised">
                  <div className="h-full bg-gold" style={{ width: `${Math.min(100, rate * 800)}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-mute">
          Lead rates are counted from sessions that fired quotation_submit or lead_generated, grouped by the device on
          those same sessions — not allocated from a global percentage.
        </p>
      </div>
      <div className="border border-line bg-elev p-4 md:p-6 lg:col-span-2">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Geography</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {snap.geoMix.map((g) => (
            <div key={g.name} className="border border-line bg-ink p-4">
              <p className="font-cond text-xs tracking-[0.16em] text-mute uppercase">{g.name}</p>
              <p className="mt-1 font-display text-2xl tabular-nums">{n(g.users)}</p>
              <p className="text-xs text-gold tabular-nums">{g.leads} leads</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FunnelView({ snap }: { snap: IntelSnapshot }) {
  const max = snap.funnel[0]?.count || 1;
  const forecast = snap.forecast.filter((f) => f.kind === "forecast");
  const forecastLeads = forecast.reduce((n0, f) => n0 + f.leads, 0);
  return (
    <div className="space-y-6">
      <div className="border border-line bg-elev p-4 md:p-6">
        <p className="mb-6 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Lead funnel</p>
        <ul className="space-y-3">
          {snap.funnel.map((step, i) => {
            const prev = snap.funnel[i - 1]?.count ?? step.count;
            const drop = prev ? step.count / prev : 1;
            return (
              <li key={step.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-cond tracking-wide uppercase">{step.label}</span>
                  <span className="tabular-nums text-mute">
                    {n(step.count)}
                    {i > 0 ? ` · ${(drop * 100).toFixed(0)}%` : ""}
                  </span>
                </div>
                <div className="h-2 bg-raised">
                  <div className="h-full bg-gold" style={{ width: `${(step.count / max) * 100}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border border-line bg-elev p-4 md:p-6">
        <p className="mb-2 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">30-day lead forecast</p>
        <p className="mb-4 text-sm text-mute">Baseline linear model on the last 30 actual days. Not a guaranteed MAPE.</p>
        <p className="mb-4 font-display text-3xl tabular-nums">{n(forecastLeads)} projected leads</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={snap.forecast.slice(-60)}>
              <CartesianGrid stroke="#1c1c1c" vertical={false} />
              <XAxis dataKey="date" hide />
              <YAxis stroke={MUTE} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #2a2618", color: "#f0ede8" }} />
              <Area type="monotone" dataKey="leads" stroke={GOLD} fill="rgba(201,168,76,0.14)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function LeadsView({ snap }: { snap: IntelSnapshot }) {
  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-sm leading-relaxed text-mute">
        Scores are feature-based (pages, product, source, device) on a 0–100 scale from that session’s event set. They
        are not CRM outcomes. Qualification is score ≥ 61. PII never enters this table.
      </p>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-elev font-cond text-[11px] tracking-[0.16em] text-mute uppercase">
            <tr>
              {["When", "Event", "Product", "Source", "City", "Device", "Score", "Band"].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snap.leadsList.slice(0, 40).map((l) => (
              <tr key={l.id} className="border-t border-line">
                <td className="px-3 py-3 tabular-nums text-mute">{new Date(l.ts).toISOString().slice(0, 10)}</td>
                <td className="px-3 py-3">{l.eventType}</td>
                <td className="px-3 py-3 text-mute">{l.productType}</td>
                <td className="px-3 py-3">{l.source}</td>
                <td className="px-3 py-3">{l.city}</td>
                <td className="px-3 py-3">{l.device}</td>
                <td className="px-3 py-3 tabular-nums text-gold">{l.score}</td>
                <td className="px-3 py-3 uppercase tracking-wide">{l.band.replace("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RealtimeView({ snap }: { snap: IntelSnapshot }) {
  const byCity = snap.realtime.reduce<Record<string, number>>((acc, v) => {
    acc[v.city] = (acc[v.city] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="border border-line bg-elev p-5">
        <p className="font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Active now</p>
        <p className="mt-2 font-display text-6xl tabular-nums">{snap.realtime.length}</p>
        <p className="mt-2 text-sm text-mute">Sessions with events in the last 30 minutes.</p>
      </div>
      <div className="border border-line bg-elev p-5 lg:col-span-2">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">By city</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {Object.entries(byCity).map(([city, count]) => (
            <div key={city} className="flex justify-between border border-line px-3 py-2 text-sm">
              <span>{city}</span>
              <span className="tabular-nums text-gold">{count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-line bg-elev p-5 lg:col-span-3">
        <p className="mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Active pages</p>
        <ul className="divide-y divide-line">
          {snap.realtime.slice(0, 12).map((v) => (
            <li key={v.id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-paper">{v.page}</span>
              <span className="text-mute">
                {v.city} · {v.device}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DebuggerView({ snap }: { snap: IntelSnapshot }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-mute">
        Last {snap.liveEvents.length} warehouse events (seed + live). Parameters are PII-stripped. Unknown event names
        are rejected at the collector.
      </p>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-elev font-cond text-[11px] tracking-[0.16em] text-mute uppercase">
            <tr>
              {["Time", "Event", "Origin", "Group", "Source", "Client"].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snap.liveEvents.slice(0, 50).map((e, i) => (
              <tr key={`${e.timestamp}-${i}`} className="border-t border-line">
                <td className="px-3 py-2 tabular-nums text-mute">{new Date(e.timestamp).toISOString().slice(11, 19)}</td>
                <td className="px-3 py-2 text-gold">{e.event}</td>
                <td className="px-3 py-2 uppercase">{e.origin ?? "—"}</td>
                <td className="px-3 py-2">{String(e.params.content_group ?? "—")}</td>
                <td className="px-3 py-2">{String(e.params.lead_source ?? "—")}</td>
                <td className="px-3 py-2 font-mono text-[11px] text-faint">{e.client_id.slice(0, 18)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AiView({ snap }: { snap: IntelSnapshot }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const run = async () => {
    setBusy(true);
    setNote("");
    try {
      const result = await generateDailyIntelligence({ data: { summary: summarizeForAi(snap) } });
      setText(result.text);
      setNote(result.ok ? "Generated from aggregated metrics only." : result.error);
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <p className="text-sm leading-relaxed text-mute">
        The analyst receives curated totals — never emails, phones, names or raw clickstreams. Generation is
        user-initiated and capped.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => void run()}
        className="min-h-11 bg-gold px-5 font-cond text-xs tracking-[0.2em] text-ink uppercase disabled:opacity-60"
      >
        {busy ? "Generating…" : "Generate daily intelligence"}
      </button>
      {note ? <p className="text-xs text-faint">{note}</p> : null}
      {text ? (
        <pre className="whitespace-pre-wrap border border-line bg-elev p-5 font-sans text-sm leading-relaxed text-paper">
          {text}
        </pre>
      ) : (
        <p className="border border-dashed border-line p-8 text-sm text-mute">No briefing yet.</p>
      )}
    </div>
  );
}

function Architecture() {
  const layers = [
    ["Collection", "Data layer → client tags → Consent Mode v2 (default denied) → first-party /api/collect"],
    ["Server collector", "Known-event allowlist, PII strip, payload limits, rate limit, consent required — ssGTM analogue"],
    ["GA4", "Measurement ID G-PK86GP1MGY, send_page_view off, IP anonymized, no PII, no user_id"],
    ["Warehouse", "Postgres event rows (seed + live). Every KPI is grouped from those rows, not hardcoded shares"],
    ["Intelligence", "Session funnel, feature lead scoring, z-score anomalies, 30-day linear forecast"],
    ["Activation", "This desk, consent banner, assigned AED lead values — not claimed revenue"],
  ] as const;
  const events = [
    "page_view, session_start, first_visit, user_engagement, scroll",
    "product_view, led_product_view, project_view, fiba_project_view, concert_project_view, exhibition_project_view",
    "form_start, quotation_start, quotation_submit, contact_form_submit, lead_generated",
    "phone_click, whatsapp_click, email_click, consent_update",
  ];
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <p className="text-sm leading-relaxed text-mute">
        Implementation of GA4 Analytics Architecture v2.0 against the existing Dakia marketing site. Site copy, services,
        testimonials and contact details are unchanged. Measurement is layered on.
      </p>
      <ol className="space-y-4">
        {layers.map(([t, d], i) => (
          <li key={t} className="border border-line bg-elev p-5">
            <p className="font-cond text-[11px] tracking-[0.22em] text-gold uppercase">
              {String(i + 1).padStart(2, "0")} · {t}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{d}</p>
          </li>
        ))}
      </ol>
      <div>
        <p className="mb-3 font-cond text-[11px] tracking-[0.22em] text-gold uppercase">Event taxonomy</p>
        <ul className="space-y-2 text-sm text-mute">
          {events.map((e) => (
            <li key={e} className="border-l border-gold pl-3">
              {e}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-line p-5 text-sm leading-relaxed text-mute">
        Corrections applied from the spec: no user_id, no PII, no manual traffic_source overwrite, no fake
        engagement_time on every hit, consent default denied and first-party gated, conversion values treated as assigned
        lead values rather than revenue, forecast without a promised error bound, and reconciliation instead of “zero
        data loss”. Google’s hosted server-side GTM is not running here; /api/collect is the first-party equivalent.
      </div>
    </div>
  );
}

function PrivacyView() {
  const c = typeof window !== "undefined" ? loadConsent() : null;
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-mute">
      <p>
        Consent Mode v2 starts denied. Advertising storage stays denied even when analytics is granted — this desk is
        lead intelligence, not ads personalization. First-party collection is off until you accept.
      </p>
      <div className="border border-line bg-elev p-5">
        <p className="font-cond text-[11px] tracking-[0.2em] text-gold uppercase">Current state</p>
        <p className="mt-2 text-paper">
          Analytics: {c?.analytics_storage ?? "denied"} · Decided: {c?.decided ? "yes" : "no"}
        </p>
      </div>
      <p>
        Forbidden in GA4 payloads: email, phone, name, address, free-text enquiry bodies. The contact API accepts those
        fields to fulfil the enquiry and does not forward them to measurement.
      </p>
      <Link to="/privacy" className="inline-flex min-h-11 items-center text-gold">
        Full privacy policy
      </Link>
    </div>
  );
}
