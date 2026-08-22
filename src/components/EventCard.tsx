import type { EventItem } from "../types"
import { formatDate, formatPrice, formatTime } from "../lib/format"

interface Props {
  event: EventItem
  onSelect: (event: EventItem) => void
}

export function EventCard({ event, onSelect }: Props) {
  const soldOut = event.attendees >= event.capacity
  const pct = Math.min(100, Math.round((event.attendees / event.capacity) * 100))

  return (
    <button
      onClick={() => onSelect(event)}
      className="group flex flex-col overflow-hidden rounded-[--radius] border border-border bg-surface text-left transition-colors hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {event.image_url ? (
          <img
            src={event.image_url || "/placeholder.svg"}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-4xl text-muted">
            {event.title.charAt(0)}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {event.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {formatPrice(event.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="font-medium text-primary">
            {formatDate(event.starts_at)}
          </span>
          <span aria-hidden>·</span>
          <span>{formatTime(event.starts_at)}</span>
        </div>

        <h3 className="font-display text-lg font-semibold leading-tight text-balance">
          {event.title}
        </h3>

        <p className="text-sm text-muted">{event.location}</p>

        <div className="mt-auto pt-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {soldOut
              ? "Sold out"
              : `${event.attendees} going · ${event.capacity - event.attendees} spots left`}
          </p>
        </div>
      </div>
    </button>
  )
}
