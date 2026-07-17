/** Coordinates and optional human-readable location details for any travel entity. */
export interface GeoLocation {
  latitude: number
  longitude: number
  address?: string
  locality?: string
  countryCode?: string
}
