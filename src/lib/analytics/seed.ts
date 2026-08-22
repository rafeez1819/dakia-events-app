import { CITIES, CHANNELS, EVENT_VALUE_AED, PRODUCT_TYPES } from "./config";
import type { AnalyticsEvent } from "./types";

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PAGES = ["/", "/#services", "/#events", "/#projects", "/#contact", "/#capabilities", "/#about"];
const CHANNEL_SHARE = [0.31, 0.14, 0.18, 0.09, 0.16, 0.06, 0.04, 0.02];
const GEO_SHARE = [0.38, 0.22, 0.12, 0.09, 0.05, 0.04, 0.06, 0.04];
const PRODUCTS = PRODUCT_TYPES;

function pick<T>(rand: () => number, items: readonly T[], weights?: number[]): T {
  if (!weights) return items[Math.floor(rand() * items.length)]!;
  let r = rand();
  let acc = 0;
  for (let i = 0; i < items.length; i++) {
    acc += weights[i] ?? 0;
    if (r <= acc) return items[i]!;
  }
  return items[items.length - 1]!;
}

function hexId(rand: () => number, prefix: string) {
  return `${prefix}.${Math.floor(rand() * 1e12)
    .toString(16)
    .padStart(10, "0")}`;
}

function eventOf(
  ts: number,
  event: string,
  client: string,
  session: string,
  params: Record<string, string | number | boolean | null>,
): AnalyticsEvent {
  return { event, timestamp: ts, client_id: client, session_id: session, origin: "seed", params };
}

/** Deterministic 90-day session-level event log. Every KPI is derived from these rows. */
export function buildSeedEvents(days = 90, seed = 20260821): AnalyticsEvent[] {
  const rand = mulberry(seed);
  const events: AnalyticsEvent[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const dow = day.getDay();
    const weekend = dow === 5 || dow === 6;
    const wave = 1 + 0.18 * Math.sin((i / days) * Math.PI * 2);
    const campaignBoost = i % 17 === 0 ? 1.35 : 1;
    const sessions = Math.round((weekend ? 6 : 11) * wave * campaignBoost * (0.85 + rand() * 0.3));

    for (let s = 0; s < sessions; s++) {
      const hour = 8 + Math.floor(rand() * 13);
      const minute = Math.floor(rand() * 60);
      const ts0 = new Date(day);
      ts0.setHours(hour, minute, Math.floor(rand() * 50), 0);
      let ts = ts0.getTime();
      const client = hexId(rand, "cid");
      const session = hexId(rand, "sid");
      const channel = pick(rand, CHANNELS, CHANNEL_SHARE);
      const city = pick(rand, CITIES, GEO_SHARE);
      const device = rand() < 0.68 ? "mobile" : rand() < 0.84 ? "desktop" : "tablet";
      const product = pick(rand, PRODUCTS);
      const page = pick(rand, PAGES);
      const utm: Record<string, string> =
        channel === "direct"
          ? {}
          : {
              utm_source: channel,
              utm_medium: channel === "paid" ? "cpc" : channel === "email" ? "email" : "social",
              utm_campaign: i % 17 === 0 ? "fiba_2026" : "always_on",
            };
      const base: Record<string, string | number | boolean | null> = {
        lead_source: channel,
        city,
        device_category: device,
        language: "en-AE",
        content_group: page.replace("/#", "") || "home",
        page_location: `https://dakia-events.com${page === "/" ? "/" : page}`,
        page_title: "Dakia Events | LED Video Walls, AV & Event Production UAE",
        ...utm,
      };

      events.push(eventOf(ts, "session_start", client, session, { ...base, screen_resolution: "1440x900" }));
      ts += 400 + Math.floor(rand() * 800);
      events.push(eventOf(ts, "page_view", client, session, { ...base, page_type: "homepage" }));

      if (rand() < 0.62) {
        ts += 4000 + Math.floor(rand() * 8000);
        events.push(eventOf(ts, "user_engagement", client, session, { ...base, engagement_threshold: 25 }));
      }
      if (rand() < 0.38) {
        ts += 3000;
        events.push(eventOf(ts, "scroll", client, session, { ...base, percent_scrolled: 90 }));
      }
      if (rand() < 0.42) {
        ts += 2000;
        events.push(
          eventOf(ts, "product_view", client, session, {
            ...base,
            product_type: product,
            item_name: product.replaceAll("_", " "),
            rental_or_sale: "RENTAL",
          }),
        );
        if (product === "LED_VIDEO_WALL" && rand() < 0.7) {
          ts += 1500;
          events.push(eventOf(ts, "led_product_view", client, session, { ...base, product_type: product }));
        }
      }
      if (rand() < 0.22) {
        ts += 1800;
        const projectType = pick(rand, ["SPORTS", "CONCERT", "EXHIBITION", "CORPORATE"] as const);
        events.push(eventOf(ts, "project_view", client, session, { ...base, project_type: projectType }));
        if (projectType === "SPORTS") events.push(eventOf(ts + 200, "fiba_project_view", client, session, { ...base }));
        if (projectType === "CONCERT") events.push(eventOf(ts + 200, "concert_project_view", client, session, { ...base }));
        if (projectType === "EXHIBITION")
          events.push(eventOf(ts + 200, "exhibition_project_view", client, session, { ...base }));
      }

      const intent = device === "desktop" ? 0.2 : 0.1;
      if (rand() < intent + (channel === "linkedin" ? 0.04 : 0)) {
        ts += 5000;
        events.push(eventOf(ts, "form_start", client, session, base));
        events.push(eventOf(ts + 80, "quotation_start", client, session, base));
        if (rand() < (device === "desktop" ? 0.55 : 0.36)) {
          ts += 25000;
          const eventType = pick(rand, ["corporate", "sports", "exhibition", "concert", "private"]);
          const leadParams = {
            ...base,
            event_type: eventType,
            rental_or_sale: "RENTAL",
            product_type: product,
            value: EVENT_VALUE_AED.quotation_submit,
            currency: "AED",
          };
          events.push(eventOf(ts, "quotation_submit", client, session, leadParams));
          events.push(eventOf(ts + 40, "contact_form_submit", client, session, leadParams));
          events.push(eventOf(ts + 80, "lead_generated", client, session, leadParams));
          if (eventType === "sports") {
            events.push(eventOf(ts + 120, "led_quote_request", client, session, leadParams));
          }
        }
      } else if (rand() < 0.08) {
        ts += 6000;
        const click = pick(rand, ["whatsapp_click", "phone_click", "email_click"] as const);
        events.push(
          eventOf(ts, click, client, session, {
            ...base,
            value: EVENT_VALUE_AED[click] ?? 0,
            currency: "AED",
          }),
        );
      }
    }
  }

  // Recent occupancy so Realtime is derived from rows, not Math.random()
  const now = Date.now();
  for (let i = 0; i < 11; i++) {
    const ts = now - Math.floor(rand() * 18 * 60_000);
    const client = hexId(rand, "cid");
    const session = hexId(rand, "sid");
    const city = pick(rand, CITIES, GEO_SHARE);
    const device = rand() < 0.6 ? "mobile" : "desktop";
    const page = pick(rand, PAGES);
    const channel = pick(rand, CHANNELS, CHANNEL_SHARE);
    const base = {
      lead_source: channel,
      city,
      device_category: device,
      content_group: page.replace("/#", "") || "home",
      page_location: `https://dakia-events.com${page === "/" ? "/" : page}`,
      page_title: "Dakia Events",
    };
    events.push(eventOf(ts, "session_start", client, session, base));
    events.push(eventOf(ts + 300, "page_view", client, session, base));
    if (rand() < 0.5) events.push(eventOf(ts + 4000, "user_engagement", client, session, base));
  }

  return events;
}
