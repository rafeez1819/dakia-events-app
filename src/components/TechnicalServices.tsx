interface Service {
  slug: string
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    slug: "event-production",
    title: "Event Production",
    description:
      "End-to-end planning, technical direction, and on-site crew to run your show from load-in to strike.",
  },
  {
    slug: "led-video-walls",
    title: "LED Video Walls",
    description:
      "High-brightness modular LED panels with seamless content playback for stages, backdrops, and displays.",
  },
  {
    slug: "lighting-systems",
    title: "Lighting Systems",
    description:
      "Intelligent moving heads, wash, and effects lighting programmed to match the energy of every moment.",
  },
  {
    slug: "sound-systems",
    title: "Sound Systems",
    description:
      "Line-array PA, monitoring, and mixing for crystal-clear coverage at any venue size.",
  },
  {
    slug: "stage-rigging",
    title: "Stage Rigging",
    description:
      "Certified truss, motors, and staging engineered and installed to the highest safety standards.",
  },
]

function ServiceIcon({ slug }: { slug: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  switch (slug) {
    case "event-production":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="m17 2-5 5-5-5" />
        </svg>
      )
    case "led-video-walls":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      )
    case "lighting-systems":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z" />
        </svg>
      )
    case "sound-systems":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
        </svg>
      )
    case "stage-rigging":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 4h18M6 4v3M18 4v3M4 7h16l-2 4H6L4 7ZM8 11v9M16 11v9M8 20h8" />
        </svg>
      )
    default:
      return null
  }
}

export function TechnicalServices() {
  return (
    <section
      id="technical-services"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 pt-8 sm:px-6"
    >
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Technical Services
        </p>
        <h2 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
          Everything you need to stage a flawless event.
        </h2>
        <p className="mt-3 text-pretty text-base text-muted">
          Our in-house technical team delivers production, video, lighting,
          sound, and rigging — fully integrated and event-ready.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <article className="group flex h-full flex-col rounded-[--radius] border border-border bg-surface p-6 transition-colors hover:border-primary/60">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-primary">
                <ServiceIcon slug={service.slug} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
