import { COLLECT_ENDPOINT, EVENT_VALUE_AED, GA4_MEASUREMENT_ID, KEY_EVENTS } from "./config";
import { captureUtm, deviceCategory, getClientId, getSessionId, inferChannel, isFirstVisit } from "./ids";
import { hasAnalyticsConsent, loadConsent } from "./consent";
import { isKnownEvent, sanitizeEventName, sanitizeParams } from "./sanitize";
import type { AnalyticsEvent } from "./types";

let booted = false;
let tracking = false;
let pageEngaged = false;
const listeners: Array<() => void> = [];

function pageContext(): Record<string, string> {
  const hash = window.location.hash.replace("#", "");
  const utm = captureUtm(window.location.search);
  return {
    page_location: window.location.href.split("#")[0] ?? window.location.href,
    page_title: document.title,
    page_referrer: document.referrer || "",
    content_group: hash || "home",
    content_type: hash ? "section" : "landing",
    language: navigator.language,
    ...utm,
  };
}

function pushDataLayer(event: string, params: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

function sendGtag(event: string, params: Record<string, unknown>) {
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

function postCollect(payload: AnalyticsEvent) {
  const body = JSON.stringify({ ...payload, consent: "granted" });
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(COLLECT_ENDPOINT, blob);
    return;
  }
  void fetch(COLLECT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body,
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => {
    /* first-party collect is best-effort */
  });
}

export function track(name: string, rawParams: Record<string, unknown> = {}): void {
  if (!hasAnalyticsConsent()) return;
  const event = sanitizeEventName(name);
  if (!event || !isKnownEvent(event)) return;
  const params = sanitizeParams({
    ...pageContext(),
    lead_source: inferChannel(captureUtm(window.location.search), document.referrer),
    device_category: deviceCategory(),
    ...rawParams,
  });
  if (KEY_EVENTS.includes(event as (typeof KEY_EVENTS)[number]) && params.value == null) {
    params.value = EVENT_VALUE_AED[event] ?? 0;
    params.currency = "AED";
  }
  const payload: AnalyticsEvent = {
    event,
    timestamp: Date.now(),
    client_id: getClientId(),
    session_id: getSessionId(),
    origin: "live",
    params,
  };
  pushDataLayer(event, params);
  sendGtag(event, params);
  postCollect(payload);
}

function startSessionTracking() {
  if (tracking) return;
  tracking = true;

  const first = isFirstVisit();
  getSessionId();
  if (first) track("first_visit");
  track("session_start", {
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    device_category: deviceCategory(),
    language: navigator.language,
  });
  track("page_view", { page_type: "homepage", site_section: "dakia_events" });

  const onScroll = () => {
    const depth = Math.round(
      ((window.scrollY + window.innerHeight) / Math.max(document.body.scrollHeight, 1)) * 100,
    );
    if (!pageEngaged && depth >= 25) {
      pageEngaged = true;
      track("user_engagement", { engagement_threshold: 25 });
    }
    if (depth >= 90) {
      window.removeEventListener("scroll", onScroll);
      track("scroll", { percent_scrolled: 90 });
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  listeners.push(() => window.removeEventListener("scroll", onScroll));

  const onVis = () => {
    if (document.visibilityState === "hidden") {
      track("user_engagement", { visibility: "hidden" });
    }
  };
  document.addEventListener("visibilitychange", onVis);
  listeners.push(() => document.removeEventListener("visibilitychange", onVis));
}

export function onConsentGranted(): void {
  if (loadConsent().analytics_storage !== "granted") return;
  startSessionTracking();
}

export function bootAnalytics(): () => void {
  if (booted) return () => {};
  booted = true;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
  if (hasAnalyticsConsent()) startSessionTracking();

  return () => {
    listeners.splice(0).forEach((fn) => fn());
    booted = false;
    tracking = false;
    pageEngaged = false;
  };
}

export function injectGtag(): void {
  if (document.getElementById("ga4-gtag")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    send_page_view: false,
  });
  const s = document.createElement("script");
  s.id = "ga4-gtag";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}
