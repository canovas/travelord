import type { GeoLocation } from './GeoLocation'
import type { Image } from './Image'

export type AccommodationCategory = 'house' | 'hotel' | 'campsite' | 'apartment' | 'other'

/** A place where travellers stay overnight. */
export interface Accommodation {
  id: string
  name: string
  category: AccommodationCategory
  location?: GeoLocation
  description?: string
  images?: Image[]
}
