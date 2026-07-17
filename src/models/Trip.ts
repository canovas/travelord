import type { Image } from './Image'

/** A planned journey containing an ordered set of days. */
export interface Trip {
  id: string
  name: string
  subtitle?: string
  startDate: string
  endDate: string
  dayIds: string[]
  coverImage?: Image
}
