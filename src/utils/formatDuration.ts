export function formatDuration(minutes?: number): string | undefined {
  if (!minutes) return undefined
  if (minutes < 60) return `${minutes} min`

  return `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60} min` : ''}`
}
