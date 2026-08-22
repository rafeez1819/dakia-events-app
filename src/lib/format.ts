export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })
}

export function formatPrice(price: number): string {
  return price === 0 ? "Free" : `$${price.toFixed(price % 1 === 0 ? 0 : 2)}`
}
