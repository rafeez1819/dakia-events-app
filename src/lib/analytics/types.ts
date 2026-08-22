import type { PRODUCT_TYPES } from "./config";

export type ConsentState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  decided: boolean;
  updatedAt: string | null;
};

export type ParamValue = string | number | boolean | null;

export type AnalyticsEvent = {
  event: string;
  timestamp: number;
  client_id: string;
  session_id: string;
  origin?: "seed" | "live";
  params: Record<string, ParamValue>;
};

export type DailyRollup = {
  date: string;
  users: number;
  newUsers: number;
  sessions: number;
  engagedSessions: number;
  pageViews: number;
  avgEngagementSec: number;
  channels: Record<string, number>;
  devices: { mobile: number; desktop: number; tablet: number };
  geos: Record<string, number>;
  events: Record<string, number>;
  conversions: number;
  conversionValue: number;
  leads: number;
  qualifiedLeads: number;
};

export type LeadRecord = {
  id: string;
  ts: number;
  eventType: string;
  productType: (typeof PRODUCT_TYPES)[number] | "UNKNOWN";
  source: string;
  city: string;
  device: "mobile" | "desktop" | "tablet";
  score: number;
  band: "low" | "medium" | "high" | "very_high";
  qualified: boolean;
};

export type RealtimeVisitor = {
  id: string;
  city: string;
  page: string;
  device: "mobile" | "desktop" | "tablet";
  since: number;
};

export type FunnelStep = {
  id: string;
  label: string;
  count: number;
};

export type Anomaly = {
  date: string;
  metric: string;
  value: number;
  expected: number;
  z: number;
  direction: "up" | "down";
};

export type ForecastPoint = {
  date: string;
  leads: number;
  value: number;
  kind: "actual" | "forecast";
};

export type IntelSnapshot = {
  rangeDays: number;
  seededEvents: number;
  liveEventsCount: number;
  users: number;
  sessions: number;
  engagedSessions: number;
  pageViews: number;
  engagementRate: number;
  avgEngagementSec: number;
  leads: number;
  qualifiedLeads: number;
  conversions: number;
  conversionRate: number;
  conversionValue: number;
  usersDelta: number;
  leadsDelta: number;
  channelMix: { name: string; users: number; leads: number }[];
  deviceMix: { name: string; users: number; leads: number }[];
  geoMix: { name: string; users: number; leads: number }[];
  topPages: { path: string; views: number; engagement: number; conversions: number }[];
  daily: DailyRollup[];
  funnel: FunnelStep[];
  leadsList: LeadRecord[];
  anomalies: Anomaly[];
  forecast: ForecastPoint[];
  realtime: RealtimeVisitor[];
  liveEvents: AnalyticsEvent[];
};
