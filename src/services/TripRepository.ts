import { contentRepository, ENTITY_MAP_KEYS } from './ContentRepository'
import { calculateDistance } from '../utils/calculateDistance'
import type {
  Accommodation,
  Day,
  FoodVenue,
  Image,
  PointOfInterest,
  Stop,
  StopTarget,
  Transport,
  Trip,
} from '../models'
import type { ShoppingLocation } from '../models/ShoppingLocation'

export type StopDestination = Accommodation | FoodVenue | PointOfInterest | Transport | ShoppingLocation

export type ResolvedStop = {
  stop: Stop
  title: string
  image?: Image
  distanceFromBase?: number
}

export type StopDetail = {
  day: Day
  stop: Stop
  destination?: StopDestination
  nextStop?: ResolvedStop
  distanceFromBase?: number
}

function getDestination(target: StopTarget): StopDestination | undefined {
  const { entities } = contentRepository.getData()

  const entityMapKey = ENTITY_MAP_KEYS[target.type]
  if (!entityMapKey) return undefined

  const collection = entities[entityMapKey]
  return collection?.get(target.id)
}

function getBaseLocation() {
  const { entities } = contentRepository.getData()
  return entities.accommodations.get('acc-cahernagarry-house')?.location
}

export const tripRepository = {
  getTrip: (): Trip => contentRepository.getData().trip,
  getDays: (): Day[] => contentRepository.getData().days,
  getDay: (id: string): Day | undefined => contentRepository.getData().days.find((day) => day.id === id),
  getStop: (dayId: string, stopId: string): Stop | undefined =>
    contentRepository.getData().stops.find((stop) => stop.id === stopId && stop.dayId === dayId),
  getStopsForDay: (dayId: string): ResolvedStop[] => {
    const { days, stops } = contentRepository.getData()
    const day = days.find((item) => item.id === dayId)
    if (!day) return []

    const baseLoc = getBaseLocation()

    return day.stopIds
      .map((stopId) => stops.find((stop) => stop.id === stopId))
      .filter((stop): stop is Stop => stop !== undefined)
      .map((stop) => {
        const destination = getDestination(stop.target)
        let distanceFromBase: number | undefined

        if (baseLoc && destination?.location) {
          distanceFromBase = calculateDistance(
            baseLoc.latitude,
            baseLoc.longitude,
            destination.location.latitude,
            destination.location.longitude
          )
        }

        return {
          stop,
          title: stop.title ?? destination?.name ?? 'Parada sin título',
          image: destination && 'images' in destination ? destination.images?.[0] : undefined,
          distanceFromBase,
        }
      })
  },
  getStopDetail: (dayId: string, stopId: string): StopDetail | undefined => {
    const { days, stops } = contentRepository.getData()
    const day = days.find((item) => item.id === dayId)
    const stop = stops.find((item) => item.id === stopId && item.dayId === dayId)
    if (!day || !stop) return undefined

    const currentIndex = day.stopIds.indexOf(stop.id)
    const nextStopId = day.stopIds[currentIndex + 1]
    const nextStop = nextStopId ? stops.find((item) => item.id === nextStopId) : undefined

    const destination = getDestination(stop.target)
    const baseLoc = getBaseLocation()
    let distanceFromBase: number | undefined

    if (baseLoc && destination?.location) {
      distanceFromBase = calculateDistance(
        baseLoc.latitude,
        baseLoc.longitude,
        destination.location.latitude,
        destination.location.longitude
      )
    }

    return {
      day,
      stop,
      destination,
      distanceFromBase,
      nextStop: nextStop
        ? { stop: nextStop, title: getDestination(nextStop.target)?.name ?? 'Parada sin título' }
        : undefined,
    }
  },
}
