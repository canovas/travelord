import type { Image } from '../Image'

export interface TimelineItemDTO {
  time: string
  title: string
}

export interface StopReferenceDTO {
  entityId: string
}

export interface DayDTO {
  id: string
  title: string
  date: string
  summary?: string
  timeline?: TimelineItemDTO[]
  stops?: StopReferenceDTO[]
  tips?: string[]
}

export interface EntityDTO {
  id: string
  name: string
  category: string
  description?: string
  address?: string
  website?: string
  phone?: string
  mapsUrl?: string
  location?: {
    latitude: number
    longitude: number
    locality?: string
  }
}

export interface TripDTO {
  id?: string
  name?: string
  subtitle?: string
  startDate?: string
  endDate?: string
  dayIds?: string[]
  coverImage?: Image
}
