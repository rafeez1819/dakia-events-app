interface Props {
  onCreate: () => void
}

export function Header({ onCreate }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold text-primary-foreground">
            D
          </span>
          <span className="font-display text-lg font-semibold">Dakia</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#technical-services"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            Technical Services
          </a>
          <button
            onClick={onCreate}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Host an event
          </button>
        </div>
      </div>
    </header>
  )
}
