import type { GeoLocation } from './GeoLocation'
import type { Image } from './Image'

/** A shop or commercial establishment. */
export interface ShoppingLocation {
  id: string
  name: string
  location?: GeoLocation
  category: string
  address?: string
  description?: string
  website?: string
  mapsUrl?: string
  images?: Image[]
}
