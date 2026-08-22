const CLIENT_KEY = "dakia_cid";
const SESSION_KEY = "dakia_sid";
const SESSION_MS = 30 * 60 * 1000;

function rid(prefix: string): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${prefix}.${hex}`;
}

export function getClientId(): string {
  try {
    const existing = localStorage.getItem(CLIENT_KEY);
    if (existing) return existing;
    const id = rid("cid");
    localStorage.setItem(CLIENT_KEY, id);
    return id;
  } catch {
    return rid("cid");
  }
}

export function getSessionId(): string {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; at: number };
      if (Date.now() - parsed.at < SESSION_MS) {
        parsed.at = Date.now();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
        return parsed.id;
      }
    }
    const next = { id: rid("sid"), at: Date.now() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    return next.id;
  } catch {
    return rid("sid");
  }
}

export function isFirstVisit(): boolean {
  try {
    if (localStorage.getItem("dakia_fv")) return false;
    localStorage.setItem("dakia_fv", "1");
    return true;
  } catch {
    return false;
  }
}

export function captureUtm(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 100);
  }
  if (Object.keys(out).length === 0) {
    try {
      const cached = sessionStorage.getItem("dakia_utm");
      if (cached) return JSON.parse(cached) as Record<string, string>;
    } catch {
      /* ignore */
    }
    return out;
  }
  try {
    sessionStorage.setItem("dakia_utm", JSON.stringify(out));
  } catch {
    /* ignore */
  }
  return out;
}

export function inferChannel(utm: Record<string, string>, referrer: string): string {
  const source = (utm.utm_source || "").toLowerCase();
  const medium = (utm.utm_medium || "").toLowerCase();
  if (medium === "cpc" || medium === "paid" || source.includes("googleads")) return "paid";
  if (source === "linkedin" || (medium === "social" && source.includes("linkedin"))) return "linkedin";
  if (source === "instagram" || source === "facebook") return "instagram";
  if (source === "whatsapp" || medium === "whatsapp") return "whatsapp";
  if (medium === "email") return "email";
  if (source || medium) return "referral";
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).hostname;
    if (host.includes("google") || host.includes("bing")) return "organic";
    if (host.includes("linkedin")) return "linkedin";
    if (host.includes("instagram") || host.includes("facebook")) return "instagram";
    if (typeof window !== "undefined" && host !== window.location.hostname) return "referral";
  } catch {
    /* ignore */
  }
  return "direct";
}

export function deviceCategory(): "mobile" | "desktop" | "tablet" {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android/i.test(ua)) return "mobile";
  return "desktop";
}
