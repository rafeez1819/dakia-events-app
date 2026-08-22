import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ensureSchema, getSql } from "./_lib/db.js"

const VALID_CATEGORIES = [
  "Music",
  "Tech",
  "Food & Drink",
  "Arts",
  "Sports",
  "Community",
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureSchema()
    const sql = getSql()

    if (req.method === "GET") {
      const events = await sql`
        SELECT id, title, description, category, location,
               starts_at, price::float8 AS price, capacity, attendees, image_url
        FROM events
        ORDER BY starts_at ASC
      `
      return res.status(200).json({ events })
    }

    if (req.method === "POST") {
      const body = (req.body ?? {}) as Record<string, unknown>
      const title = String(body.title ?? "").trim()
      const description = String(body.description ?? "").trim()
      const category = String(body.category ?? "Community")
      const location = String(body.location ?? "").trim()
      const startsAt = String(body.starts_at ?? "")
      const price = Number(body.price ?? 0)
      const capacity = Number(body.capacity ?? 0)

      if (!title) return res.status(400).json({ error: "Title is required." })
      if (!location)
        return res.status(400).json({ error: "Location is required." })
      if (!startsAt || Number.isNaN(Date.parse(startsAt)))
        return res.status(400).json({ error: "A valid date is required." })
      if (!VALID_CATEGORIES.includes(category))
        return res.status(400).json({ error: "Invalid category." })
      if (!Number.isFinite(price) || price < 0)
        return res.status(400).json({ error: "Price must be zero or more." })
      if (!Number.isInteger(capacity) || capacity < 1)
        return res.status(400).json({ error: "Capacity must be at least 1." })

      const [event] = await sql`
        INSERT INTO events
          (title, description, category, location, starts_at, price, capacity, attendees)
        VALUES
          (${title}, ${description}, ${category}, ${location},
           ${startsAt}, ${price}, ${capacity}, 0)
        RETURNING id, title, description, category, location,
                  starts_at, price::float8 AS price, capacity, attendees, image_url
      `
      return res.status(201).json({ event })
    }

    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed." })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error."
    return res.status(500).json({ error: message })
  }
}
