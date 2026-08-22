import { useState } from "react"
import type { EventItem } from "../types"
import { formatDate, formatPrice, formatTime } from "../lib/format"
import { Modal } from "./Modal"

interface Props {
  event: EventItem
  onClose: () => void
  onRsvp: (id: string) => Promise<void>
}

export function EventDetail({ event, onClose, onRsvp }: Props) {
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const soldOut = event.attendees >= event.capacity

  async function handleRsvp() {
    setPending(true)
    setError(null)
    try {
      await onRsvp(event.id)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Modal onClose={onClose} label={event.title}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
        {event.image_url ? (
          <img
            src={event.image_url || "/placeholder.svg"}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
        <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
          {event.category}
        </span>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div>
          <p className="text-sm font-medium text-primary">
            {formatDate(event.starts_at)} · {formatTime(event.starts_at)}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-balance">
            {event.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{event.location}</p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/90">
          {event.description}
        </p>

        <div className="flex items-center justify-between rounded-[--radius] border border-border bg-surface-2 p-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Price</p>
            <p className="font-display text-lg font-semibold">
              {formatPrice(event.price)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted">Going</p>
            <p className="font-display text-lg font-semibold">
              {event.attendees} / {event.capacity}
            </p>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-primary" role="alert">
            {error}
          </p>
        ) : null}

        <button
          onClick={handleRsvp}
          disabled={pending || done || soldOut}
          className="w-full rounded-full bg-primary py-3 font-display font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {soldOut
            ? "Sold out"
            : done
              ? "You're going!"
              : pending
                ? "Reserving…"
                : "RSVP now"}
        </button>
      </div>
    </Modal>
  )
}
