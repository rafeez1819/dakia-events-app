import type { ConsentState } from "./types";

const KEY = "dakia_consent_v2";

const DENIED: ConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  decided: false,
  updatedAt: null,
};

export function loadConsent(): ConsentState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DENIED };
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.analytics_storage !== "granted" && parsed.analytics_storage !== "denied") {
      return { ...DENIED };
    }
    return parsed;
  } catch {
    return { ...DENIED };
  }
}

export function saveConsent(next: ConsentState): void {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function applyGtagConsent(state: ConsentState): void {
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", {
    analytics_storage: state.analytics_storage,
    ad_storage: state.ad_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization,
  });
}

export function hasAnalyticsConsent(): boolean {
  return loadConsent().analytics_storage === "granted";
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
