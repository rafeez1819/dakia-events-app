import { createServerFn } from "@tanstack/react-start";
import { buildSnapshotFromEvents } from "./engine";
import { countByOrigin, loadEventsSince, loadRecentEvents } from "./store";
import type { IntelSnapshot } from "./types";

export const getIntelSnapshot = createServerFn({ method: "GET" })
  .validator((input: { rangeDays?: number }) => ({
    rangeDays: [7, 30, 90].includes(Number(input?.rangeDays)) ? Number(input.rangeDays) : 30,
  }))
  .handler(async ({ data }): Promise<IntelSnapshot> => {
    const rangeDays = data.rangeDays;
    const now = Date.now();
    const since = now - rangeDays * 86400000;
    const prevSince = now - rangeDays * 2 * 86400000;
    const [events, prevWindow, recent, realtimeEvents, origin] = await Promise.all([
      loadEventsSince(since),
      loadEventsSince(prevSince),
      loadRecentEvents(80),
      loadEventsSince(now - 30 * 60 * 1000),
      countByOrigin(),
    ]);
    const prevEvents = prevWindow.filter((e) => e.timestamp < since);
    return buildSnapshotFromEvents({
      events,
      prevEvents,
      recent,
      realtimeEvents,
      rangeDays,
      seededEvents: origin.seed,
      liveEventsCount: origin.live,
    });
  });
