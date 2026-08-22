import { useState } from "react"
import { CATEGORIES, type EventCategory, type NewEventInput } from "../types"
import { Modal } from "./Modal"

interface Props {
  onClose: () => void
  onCreate: (input: NewEventInput) => Promise<void>
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"

export function CreateEventDialog({ onClose, onCreate }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Music" as EventCategory,
    location: "",
    starts_at: "",
    price: "0",
    capacity: "100",
  })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      await onCreate({
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        starts_at: new Date(form.starts_at).toISOString(),
        price: Number(form.price),
        capacity: Number(form.capacity),
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create event.")
      setPending(false)
    }
  }

  return (
    <Modal onClose={onClose} label="Create a new event">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <h2 className="font-display text-xl font-bold">Host an event</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Give your event a name"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What should attendees expect?"
            className={inputClass + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="starts_at" className="text-sm font-medium">
              Date & time
            </label>
            <input
              id="starts_at"
              type="datetime-local"
              required
              value={form.starts_at}
              onChange={(e) => update("starts_at", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Venue, city"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-medium">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="capacity" className="text-sm font-medium">
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              step="1"
              value={form.capacity}
              onChange={(e) => update("capacity", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-primary" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full rounded-full bg-primary py-3 font-display font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Publishing…" : "Publish event"}
        </button>
      </form>
    </Modal>
  )
}
