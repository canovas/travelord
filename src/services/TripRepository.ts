import { days } from '../content/days'
import { accommodations, pointsOfInterest, stops, transportLocations } from '../content/stops'
import { trip } from '../content/trip'
import type { Accommodation, Day, FoodVenue, PointOfInterest, Stop, StopTarget, Transport, Trip } from '../models'

export type StopDestination = Accommodation | FoodVenue | PointOfInterest | Transport

export type ResolvedStop = {
  stop: Stop
  title: string
}

export type StopDetail = {
  day: Day
  stop: Stop
  destination?: StopDestination
  nextStop?: ResolvedStop
}

function getDestination(target: StopTarget): StopDestination | undefined {
  const collections: Record<StopTarget['type'], StopDestination[]> = {
    accommodation: accommodations,
    foodVenue: [],
    pointOfInterest: pointsOfInterest,
    transport: transportLocations,
  }

  return collections[target.type].find((item) => item.id === target.id)
}

export const tripRepository = {
  getTrip: (): Trip => trip,
  getDays: (): Day[] => days,
  getDay: (id: string): Day | undefined => days.find((day) => day.id === id),
  getStop: (dayId: string, stopId: string): Stop | undefined => stops.find((stop) => stop.id === stopId && stop.dayId === dayId),
  getStopsForDay: (dayId: string): ResolvedStop[] => {
    const day = days.find((item) => item.id === dayId)
    if (!day) return []

    return day.stopIds
      .map((stopId) => stops.find((stop) => stop.id === stopId))
      .filter((stop): stop is Stop => stop !== undefined)
      .map((stop) => ({ stop, title: getDestination(stop.target)?.name ?? 'Parada sin título' }))
  },
  getStopDetail: (dayId: string, stopId: string): StopDetail | undefined => {
    const day = days.find((item) => item.id === dayId)
    const stop = stops.find((item) => item.id === stopId && item.dayId === dayId)
    if (!day || !stop) return undefined

    const currentIndex = day.stopIds.indexOf(stop.id)
    const nextStopId = day.stopIds[currentIndex + 1]
    const nextStop = nextStopId ? stops.find((item) => item.id === nextStopId) : undefined

    return {
      day,
      stop,
      destination: getDestination(stop.target),
      nextStop: nextStop ? { stop: nextStop, title: getDestination(nextStop.target)?.name ?? 'Parada sin título' } : undefined,
    }
  },
}
