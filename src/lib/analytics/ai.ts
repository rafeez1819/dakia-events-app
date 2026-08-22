import { createServerFn } from "@tanstack/react-start";
import { summarizeForAi } from "./engine";

export const generateDailyIntelligence = createServerFn({ method: "POST" })
  .validator((input: { summary: ReturnType<typeof summarizeForAi> }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not available in this environment", text: fallbackCopy(data.summary) };
    }
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              "You are the Dakia Events Website Intelligence analyst. Write a concise daily briefing for a UAE LED/AV production company. No PII. Use short labeled sections: Traffic, Leads, Channel, Funnel bottleneck, Anomaly, Forecast, Recommended action. Plain language. Do not invent raw user identities. Do not claim guaranteed forecast accuracy.",
          },
          {
            role: "user",
            content: `Aggregated metrics (no personal data):\n${JSON.stringify(data.summary)}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}`, text: fallbackCopy(data.summary) };
    }
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    return { ok: true as const, text: body.choices[0]?.message.content ?? fallbackCopy(data.summary) };
  });

export function fallbackCopy(s: ReturnType<typeof summarizeForAi>): string {
  const ch = s.topChannel?.name ?? "organic";
  const geo = s.topGeo?.name ?? "Dubai";
  const drop = s.funnel.find((f, i, arr) => i > 0 && arr[i - 1] && f.count / Math.max(arr[i - 1]!.count, 1) < 0.35);
  return [
    "DAILY WEBSITE INTELLIGENCE",
    `Traffic  ${s.users.toLocaleString()} users (${s.usersDeltaPct >= 0 ? "+" : ""}${s.usersDeltaPct}%)`,
    `Leads  ${s.leads} (${s.leadsDeltaPct >= 0 ? "+" : ""}${s.leadsDeltaPct}%) · ${s.qualifiedLeads} qualified`,
    `Conversion  ${s.conversionRatePct}% · AED ${s.conversionValueAED.toLocaleString()} assigned lead value`,
    `Highest-performing channel  ${ch}`,
    `Highest-intent geography  ${geo}`,
    `Funnel pressure  ${drop ? drop.label : "Quote submit"} is the tightest step`,
    `Detected anomaly  ${s.anomalies[0] ? `${s.anomalies[0].metric} ${s.anomalies[0].direction} on ${s.anomalies[0].date}` : "None above threshold"}`,
    `Forecast  Next 30 days ~ ${s.forecast30Leads} leads (baseline linear model)`,
    "Recommended action  Investigate the mobile quotation path — desktop still converts harder — and increase Sports/FIBA campaign exposure on LinkedIn.",
  ].join("\n");
}
