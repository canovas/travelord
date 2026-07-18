import type { GeoLocation } from './GeoLocation'
import type { Image } from './Image'

export type TransportCategory =
  | 'airport'
  | 'parking'
  | 'port'
  | 'station'
  | 'fuelStation'
  | 'chargingPoint'
  | 'other'

/** A transport-related destination or facility. */
export interface Transport {
  id: string
  name: string
  category: TransportCategory
  location?: GeoLocation
  description?: string
  address?: string
  mapsUrl?: string
  images?: Image[]
}
