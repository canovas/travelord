/** Entity types that can be scheduled as a stop. */
export type StopTargetType = 'pointOfInterest' | 'foodVenue' | 'accommodation' | 'transport'

/** A reference to a destination entity, without copying any of its details. */
export interface StopTarget {
  type: StopTargetType
  id: string
}

/** Itinerary-specific context for a visit during a day. */
export interface Stop {
  id: string
  dayId: string
  target: StopTarget
  scheduledTime?: string
  estimatedDurationMinutes?: number
  notes?: string
}
