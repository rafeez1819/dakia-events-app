-- First-party analytics warehouse (no PII, no user_id)
create table if not exists analytics_events (
  id          serial primary key,
  ts          timestamptz not null,
  event       text not null,
  client_id   text not null,
  session_id  text not null,
  origin      text not null default 'live',
  params      jsonb not null default '{}'::jsonb
);

create index if not exists analytics_events_ts_idx on analytics_events (ts);
create index if not exists analytics_events_event_idx on analytics_events (event);
create index if not exists analytics_events_session_idx on analytics_events (session_id);
create index if not exists analytics_events_origin_idx on analytics_events (origin);
