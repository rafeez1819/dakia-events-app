/** GA4 Implementation Specification v2.0 — Dakia Events */

export const GA4_MEASUREMENT_ID = "G-PK86GP1MGY";
export const COLLECT_ENDPOINT = "/api/collect";
export const CONTACT_ENDPOINT = "/api/contact";

export const KEY_EVENTS = [
  "quotation_submit",
  "contact_form_submit",
  "lead_generated",
  "whatsapp_click",
  "phone_click",
  "email_click",
  "led_quote_request",
] as const;

/** Assigned business values in AED — static lead values, not revenue. */
export const EVENT_VALUE_AED: Record<string, number> = {
  quotation_submit: 450,
  contact_form_submit: 450,
  lead_generated: 450,
  led_quote_request: 450,
  rental_quote_submit: 400,
  whatsapp_click: 80,
  phone_click: 120,
  email_click: 60,
  brochure_download: 40,
  specification_download: 35,
};

export const KNOWN_EVENTS = [
  "page_view",
  "session_start",
  "first_visit",
  "user_engagement",
  "scroll",
  "product_view",
  "led_product_view",
  "project_view",
  "fiba_project_view",
  "concert_project_view",
  "exhibition_project_view",
  "event_project_view",
  "sports_project_view",
  "form_start",
  "form_submit",
  "form_validation_error",
  "form_submit_error",
  "quotation_start",
  "quotation_submit",
  "contact_form_start",
  "contact_form_submit",
  "lead_generated",
  "led_quote_request",
  "phone_click",
  "whatsapp_click",
  "email_click",
  "quote_cta_click",
  "event_carousel_navigation",
  "social_placeholder_click",
  "consent_update",
] as const;

export const KNOWN_EVENT_SET = new Set<string>(KNOWN_EVENTS);

export const PII_KEYS = [
  "email",
  "phone",
  "phone_number",
  "fullName",
  "full_name",
  "name",
  "first_name",
  "last_name",
  "address",
  "company",
  "details",
  "message",
  "password",
  "user_id",
] as const;

export const CHANNELS = [
  "organic",
  "paid",
  "linkedin",
  "instagram",
  "direct",
  "referral",
  "whatsapp",
  "email",
] as const;

export const CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Al Ain",
  "Ras Al Khaimah",
  "Riyadh",
  "Doha",
] as const;

export const PRODUCT_TYPES = [
  "LED_VIDEO_WALL",
  "SOUND_SYSTEM",
  "LIGHTING",
  "STAGE_RIGGING",
  "EVENT_PRODUCTION",
  "AV_RENTAL",
] as const;

export const FUNNEL_STEPS = [
  { id: "visitor", label: "Visitors", events: ["session_start", "page_view"] },
  { id: "product", label: "Product views", events: ["product_view"] },
  { id: "spec", label: "LED / spec views", events: ["led_product_view"] },
  { id: "quote_start", label: "Quote started", events: ["quotation_start", "form_start"] },
  { id: "quote_submit", label: "Quote submitted", events: ["quotation_submit"] },
  { id: "lead", label: "Leads generated", events: ["lead_generated"] },
] as const;
