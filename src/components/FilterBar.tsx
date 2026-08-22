import { CATEGORIES, type EventCategory } from "../types"

interface Props {
  active: EventCategory | "All"
  onChange: (category: EventCategory | "All") => void
  query: string
  onQueryChange: (query: string) => void
}

const OPTIONS: (EventCategory | "All")[] = ["All", ...CATEGORIES]

export function FilterBar({ active, onChange, query, onQueryChange }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {OPTIONS.map((option) => {
          const selected = option === active
          return (
            <button
              key={option}
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(option)}
              className={
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors " +
                (selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted hover:border-primary/50 hover:text-foreground")
              }
            >
              {option}
            </button>
          )
        })}
      </div>

      <div className="relative w-full lg:w-72">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search events or cities"
          aria-label="Search events"
          className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  )
}
