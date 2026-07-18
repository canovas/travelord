import type { GeoLocation } from './GeoLocation'
import type { Image } from './Image'

export type PointOfInterestCategory =
  | 'castle'
  | 'beach'
  | 'viewpoint'
  | 'museum'
  | 'nature'
  | 'landmark'
  | 'other'

/** A place to visit that is not primarily a food venue, accommodation, or transport facility. */
export interface PointOfInterest {
  id: string
  name: string
  category: PointOfInterestCategory
  location?: GeoLocation
  description?: string
  address?: string
  mapsUrl?: string
  estimatedVisitMinutes?: number
  tips?: string[]
  website?: string
  images?: Image[]
}
