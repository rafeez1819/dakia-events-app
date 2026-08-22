interface Props {
  count: number
}

export function Hero({ count }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-12 sm:px-6 sm:pt-16">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {count > 0 ? `${count} events happening soon` : "New events added weekly"}
      </p>
      <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-balance sm:text-6xl">
        Discover what&apos;s happening around you.
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-base text-muted sm:text-lg">
        From late-night sets to hands-on workshops — find your next experience,
        reserve a spot, or host your own on Dakia.
      </p>
    </section>
  )
}
