import { KNOWN_EVENT_SET, PII_KEYS } from "./config";

const PII_SET = new Set(PII_KEYS.map((key) => key.toLowerCase()));
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/g;
const MAX_PARAMS = 30;
const MAX_STRING = 200;

export function stripPiiValue(value: unknown): string | number | boolean | null {
  if (value == null) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = String(value).slice(0, MAX_STRING);
  return text.replace(EMAIL_RE, "[redacted]").replace(PHONE_RE, "[redacted]");
}

export function sanitizeParams(
  params: Record<string, unknown> | undefined,
): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {};
  if (!params) return out;
  let count = 0;
  for (const [key, value] of Object.entries(params)) {
    if (count >= MAX_PARAMS) break;
    const normalized = key.toLowerCase().slice(0, 40);
    if (!normalized) continue;
    if (PII_SET.has(normalized)) continue;
    if (/email|phone|name|address|password|user_id/.test(normalized) && normalized !== "item_name") {
      continue;
    }
    out[normalized] = stripPiiValue(value);
    count += 1;
  }
  return out;
}

export function sanitizeEventName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 40);
}

export function isKnownEvent(name: string): boolean {
  return KNOWN_EVENT_SET.has(name);
}
