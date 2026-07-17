import type { GeoLocation } from './GeoLocation'
import type { Image } from './Image'

export enum FoodVenueCategory {
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  Pub = 'pub',
  Bakery = 'bakery',
  PastryShop = 'pastryShop',
  Butcher = 'butcher',
  Fishmonger = 'fishmonger',
  Supermarket = 'supermarket',
  GourmetShop = 'gourmetShop',
  Market = 'market',
  IceCreamShop = 'iceCreamShop',
  Distillery = 'distillery',
  Brewery = 'brewery',
}

/** Any destination whose primary purpose is food or drink. */
export interface FoodVenue {
  id: string
  name: string
  category: FoodVenueCategory
  location?: GeoLocation
  description?: string
  images?: Image[]
}
