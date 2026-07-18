import type {
  Accommodation,
  Day,
  FoodVenue,
  PointOfInterest,
  Stop,
  StopTargetType,
  Transport,
  Trip,
} from '../models'
import type { ShoppingLocation } from '../models/ShoppingLocation'
import type { DayDTO, TripDTO } from '../models/dto/TravelContentDTOs'
import { travelContentMapper } from './mappers/TravelContentMapper'

export type EntityMaps = {
  accommodations: Map<string, Accommodation>
  foodVenues: Map<string, FoodVenue>
  pointsOfInterest: Map<string, PointOfInterest>
  transport: Map<string, Transport>
  shopping: Map<string, ShoppingLocation>
}

export const ENTITY_MAP_KEYS: Record<StopTargetType, keyof EntityMaps | null> = {
  accommodation: 'accommodations',
  foodVenue: 'foodVenues',
  pointOfInterest: 'pointsOfInterest',
  transport: 'transport',
  shopping: 'shopping',
  info: null,
}

export type ContentData = {
  trip: Trip
  days: Day[]
  stops: Stop[]
  entities: EntityMaps
}

export interface IContentRepository {
  load(): Promise<ContentData>
  getData(): ContentData
}

type Config = {
  activeTripId: string
}

class JsonContentRepository implements IContentRepository {
  private data: ContentData | null = null
  private loadingPromise: Promise<ContentData> | null = null

  async load(): Promise<ContentData> {
    if (this.data) return this.data
    if (this.loadingPromise) return this.loadingPromise

    this.loadingPromise = this.loadInternal()

    try {
      this.data = await this.loadingPromise
      return this.data
    } finally {
      this.loadingPromise = null
    }
  }

  private async loadInternal(): Promise<ContentData> {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`

    try {
      const config = await this.fetchJson<Config>(`${baseUrl}content/config.json`)
      const tripId = config.activeTripId
      if (!tripId) throw new Error('activeTripId not found in config.json')

      const basePath = `${baseUrl}content/${tripId}`

      // Load main trip and entity files
      const [tripDto, accommodationsArr, foodVenuesArr, pointsOfInterestArr, transportArr, shoppingArr] =
        await Promise.all([
          this.fetchJson<TripDTO>(`${basePath}/trip.json`).catch(() => ({} as TripDTO)),
          this.fetchJson<Accommodation[]>(`${basePath}/entities/accommodations.json`).catch(() => []),
          this.fetchJson<FoodVenue[]>(`${basePath}/entities/restaurants.json`).catch(() => []),
          this.fetchJson<PointOfInterest[]>(`${basePath}/entities/points-of-interest.json`).catch(() => []),
          this.fetchJson<Transport[]>(`${basePath}/entities/transport.json`).catch(() => []),
          this.fetchJson<ShoppingLocation[]>(`${basePath}/entities/shopping.json`).catch(() => []),
        ])

      // Build Maps for O(1) access
      const entities: EntityMaps = {
        accommodations: new Map(accommodationsArr.map((e) => [e.id, e])),
        foodVenues: new Map(foodVenuesArr.map((e) => [e.id, e])),
        pointsOfInterest: new Map(pointsOfInterestArr.map((e) => [e.id, e])),
        transport: new Map(transportArr.map((e) => [e.id, e])),
        shopping: new Map(shoppingArr.map((e) => [e.id, e])),
      }

      // Load day files defined in trip.json or default to the 9 days of Ireland 2026
      const dayIds = tripDto.dayIds || ['day01', 'day02', 'day03', 'day04', 'day05', 'day06', 'day07', 'day08', 'day09']

      const dayDtos = await Promise.all(
        dayIds.map((id) => this.fetchJson<DayDTO>(`${basePath}/days/${id}.json`))
      )

      // Map DayDTOs to Domain Days and Stops
      const allStops: Stop[] = []
      const days = dayDtos.map((dto) => {
        const { day, stops } = travelContentMapper.mapDay(dto, tripId)

        // Correct the target type by looking up the entity maps
        stops.forEach(stop => {
          const entityId = stop.target.id
          if (entities.accommodations.has(entityId)) stop.target.type = 'accommodation'
          else if (entities.foodVenues.has(entityId)) stop.target.type = 'foodVenue'
          else if (entities.pointsOfInterest.has(entityId)) stop.target.type = 'pointOfInterest'
          else if (entities.transport.has(entityId)) stop.target.type = 'transport'
          else if (entities.shopping.has(entityId)) stop.target.type = 'shopping'
        })

        allStops.push(...stops)
        return day
      })

      // Synthesize Trip from days
      const trip = travelContentMapper.mapTrip({}, days)

      const loadedData: ContentData = {
        trip,
        days,
        stops: allStops,
        entities,
      }

      this.validate(loadedData)

      return loadedData
    } catch (error) {
      console.error('Error loading travel content:', error)
      throw error
    }
  }

  private async fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`)
    }
    const text = await response.text()
    if (!text || text.trim() === '') {
      // Return empty object for trip.json if it exists but is empty
      if (path.endsWith('trip.json')) return {} as T
      throw new Error(`File ${path} is empty`)
    }
    return JSON.parse(text)
  }

  private validate(data: ContentData) {
    const stopIds = new Set<string>()
    const globalEntityIds = new Set<string>()

    // 1. Validate Entities Duplicates
    const validateCollection = (name: string, map: Map<string, any>) => {
      map.forEach((entity, id) => {
        if (!id || id.trim() === '') throw new Error(`Empty ID found in ${name}`)
        if (globalEntityIds.has(id)) {
          throw new Error(`Global duplicate ID detected: ${id} (found in ${name})`)
        }
        globalEntityIds.add(id)
      })
    }

    validateCollection('accommodations', data.entities.accommodations)
    validateCollection('foodVenues', data.entities.foodVenues)
    validateCollection('pointsOfInterest', data.entities.pointsOfInterest)
    validateCollection('transport', data.entities.transport)
    validateCollection('shopping', data.entities.shopping)

    // 2. Validate Stops and References
    data.stops.forEach((stop) => {
      if (!stop.id) throw new Error('Found a stop without an ID')
      if (stopIds.has(stop.id)) throw new Error(`Duplicate Stop ID detected: ${stop.id}`)
      stopIds.add(stop.id)

      const { type, id } = stop.target
      const entityMapKey = ENTITY_MAP_KEYS[type]

      // If entityMapKey is null, it's a valid virtual type (like 'info') that doesn't need an entity check
      if (entityMapKey === null) return

      const collection = entityMapKey ? data.entities[entityMapKey] : null

      if (!collection) throw new Error(`Stop ${stop.id} has an invalid target type: ${type}`)
      if (!collection.has(id)) {
        throw new Error(`Stop ${stop.id} references missing ${type}: ${id} (entity might not exist in any file)`)
      }
    })

    console.log('Travel content validated successfully')
  }

  getData(): ContentData {
    if (!this.data) {
      throw new Error('ContentData has not been loaded yet. Call load() first.')
    }
    return this.data
  }
}

export const contentRepository: IContentRepository = new JsonContentRepository()
