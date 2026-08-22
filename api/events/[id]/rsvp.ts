import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ensureSchema, getSql } from "../../_lib/db.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed." })
  }

  const id = String(req.query.id ?? "")
  if (!id) return res.status(400).json({ error: "Event id is required." })

  try {
    await ensureSchema()
    const sql = getSql()

    const [event] = await sql`
      UPDATE events
      SET attendees = LEAST(attendees + 1, capacity)
      WHERE id = ${id}
      RETURNING id, title, description, category, location,
                starts_at, price::float8 AS price, capacity, attendees, image_url
    `

    if (!event) return res.status(404).json({ error: "Event not found." })
    return res.status(200).json({ event })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error."
    return res.status(500).json({ error: message })
  }
}
