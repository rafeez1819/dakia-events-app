import type { EventItem, NewEventInput } from "../types"

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error || `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

export async function fetchEvents(): Promise<EventItem[]> {
  const res = await fetch("/api/events")
  const data = await handle<{ events: EventItem[] }>(res)
  return data.events
}

export async function createEvent(input: NewEventInput): Promise<EventItem> {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const data = await handle<{ event: EventItem }>(res)
  return data.event
}

export async function rsvpEvent(id: string): Promise<EventItem> {
  const res = await fetch(`/api/events/${id}/rsvp`, { method: "POST" })
  const data = await handle<{ event: EventItem }>(res)
  return data.event
}
