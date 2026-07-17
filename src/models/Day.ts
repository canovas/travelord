/** One calendar day belonging to a trip. */
export interface Day {
  id: string
  tripId: string
  date: string
  title?: string
  stopIds: string[]
  notes?: string
}
