import { useMemo, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import type { EventCategory, EventItem, NewEventInput } from "./types"
import { createEvent, fetchEvents, rsvpEvent } from "./lib/api"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { FilterBar } from "./components/FilterBar"
import { EventCard } from "./components/EventCard"
import { EventDetail } from "./components/EventDetail"
import { CreateEventDialog } from "./components/CreateEventDialog"

export default function App() {
  const { data: events, error, isLoading } = useSWR("events", fetchEvents)
  const { mutate } = useSWRConfig()

  const [category, setCategory] = useState<EventCategory | "All">("All")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    if (!events) return []
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      const matchesCategory = category === "All" || e.category === category
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [events, category, query])

  async function handleRsvp(id: string) {
    const updated = await rsvpEvent(id)
    setSelected(updated)
    await mutate("events")
  }

  async function handleCreate(input: NewEventInput) {
    await createEvent(input)
    await mutate("events")
  }

  return (
    <div className="min-h-screen">
      <Header onCreate={() => setCreating(true)} />
      <Hero count={events?.length ?? 0} />

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="sticky top-[65px] z-30 -mx-4 bg-background/80 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0">
          <FilterBar
            active={category}
            onChange={setCategory}
            query={query}
            onQueryChange={setQuery}
          />
        </div>

        {error ? (
          <div className="mt-8 rounded-[--radius] border border-border bg-surface p-8 text-center">
            <p className="font-display text-lg font-semibold">
              Couldn&apos;t load events
            </p>
            <p className="mt-1 text-sm text-muted">{error.message}</p>
          </div>
        ) : isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-[--radius] border border-border bg-surface"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-[--radius] border border-border bg-surface p-12 text-center">
            <p className="font-display text-lg font-semibold">No events found</p>
            <p className="mt-1 text-sm text-muted">
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Dakia Events</p>
          <p>Discover · Reserve · Host</p>
        </div>
      </footer>

      {selected ? (
        <EventDetail
          event={selected}
          onClose={() => setSelected(null)}
          onRsvp={handleRsvp}
        />
      ) : null}

      {creating ? (
        <CreateEventDialog
          onClose={() => setCreating(false)}
          onCreate={handleCreate}
        />
      ) : null}
    </div>
  )
}
