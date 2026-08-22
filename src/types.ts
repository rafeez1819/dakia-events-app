export type EventCategory =
  | "Music"
  | "Tech"
  | "Food & Drink"
  | "Arts"
  | "Sports"
  | "Community"

export interface EventItem {
  id: string
  title: string
  description: string
  category: EventCategory
  location: string
  starts_at: string
  price: number
  capacity: number
  attendees: number
  image_url: string | null
}

export interface NewEventInput {
  title: string
  description: string
  category: EventCategory
  location: string
  starts_at: string
  price: number
  capacity: number
}

export const CATEGORIES: EventCategory[] = [
  "Music",
  "Tech",
  "Food & Drink",
  "Arts",
  "Sports",
  "Community",
]
