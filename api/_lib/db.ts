import postgres from "postgres"

let sqlClient: ReturnType<typeof postgres> | null = null
let initPromise: Promise<void> | null = null

export function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to the project's environment variables.",
    )
  }
  if (!sqlClient) {
    sqlClient = postgres(url, {
      ssl: "require",
      // pgbouncer / transaction-pooled connections don't support prepared statements
      prepare: false,
      max: 1,
    })
  }
  return sqlClient
}

const SEED = [
  {
    title: "Midnight Synthwave Live",
    description:
      "An immersive night of retro-futuristic sound with analog synths, laser visuals, and a rooftop view of the skyline.",
    category: "Music",
    location: "The Foundry, Brooklyn",
    days: 6,
    price: 35,
    capacity: 300,
    attendees: 182,
    image_url: "/events/synthwave.png",
  },
  {
    title: "Build Night: AI Agents",
    description:
      "A hands-on workshop where engineers ship a working AI agent in one evening. Bring a laptop, leave with a demo.",
    category: "Tech",
    location: "Dakia HQ, San Francisco",
    days: 3,
    price: 0,
    capacity: 120,
    attendees: 97,
    image_url: "/events/build-night.png",
  },
  {
    title: "Sunset Supper Club",
    description:
      "A seven-course tasting menu from rotating guest chefs, paired with natural wines on a garden terrace.",
    category: "Food & Drink",
    location: "Terra Garden, Austin",
    days: 10,
    price: 85,
    capacity: 60,
    attendees: 41,
    image_url: "/events/supper-club.png",
  },
  {
    title: "Analog Photography Walk",
    description:
      "Explore the old quarter on foot with a film camera. All levels welcome — we develop a favorite roll together after.",
    category: "Arts",
    location: "Old Town, Lisbon",
    days: 14,
    price: 20,
    capacity: 25,
    attendees: 19,
    image_url: "/events/photo-walk.png",
  },
  {
    title: "Neighborhood 5K & Coffee",
    description:
      "A friendly morning run along the river followed by locally roasted coffee and pastries. Chip timing optional.",
    category: "Sports",
    location: "Riverside Park, Portland",
    days: 5,
    price: 12,
    capacity: 400,
    attendees: 260,
    image_url: "/events/5k-run.png",
  },
  {
    title: "Founders & Makers Mixer",
    description:
      "An informal evening connecting local builders, designers, and founders. No pitches — just good conversation.",
    category: "Community",
    location: "The Loft, Chicago",
    days: 8,
    price: 0,
    capacity: 150,
    attendees: 88,
    image_url: "/events/mixer.png",
  },
]

export async function ensureSchema(): Promise<void> {
  if (initPromise) return initPromise
  initPromise = (async () => {
    const sql = getSql()
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text NOT NULL DEFAULT '',
        category text NOT NULL DEFAULT 'Community',
        location text NOT NULL DEFAULT '',
        starts_at timestamptz NOT NULL DEFAULT now(),
        price numeric(10,2) NOT NULL DEFAULT 0,
        capacity integer NOT NULL DEFAULT 100,
        attendees integer NOT NULL DEFAULT 0,
        image_url text,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `
    const [{ count }] = await sql<{ count: string }[]>`
      SELECT count(*)::text AS count FROM events
    `
    if (Number(count) === 0) {
      for (const e of SEED) {
        await sql`
          INSERT INTO events
            (title, description, category, location, starts_at, price, capacity, attendees, image_url)
          VALUES
            (${e.title}, ${e.description}, ${e.category}, ${e.location},
             now() + (${e.days} || ' days')::interval,
             ${e.price}, ${e.capacity}, ${e.attendees}, ${e.image_url})
        `
      }
    }
  })().catch((err) => {
    // reset so a later request can retry initialization
    initPromise = null
    throw err
  })
  return initPromise
}
