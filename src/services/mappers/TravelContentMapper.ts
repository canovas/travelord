import type { Day, Stop, Trip, StopTargetType } from '../../models'
import type { DayDTO, EntityDTO, TripDTO } from '../../models/dto/TravelContentDTOs'

export const travelContentMapper = {
  mapDay(dto: DayDTO, tripId: string): { day: Day; stops: Stop[] } {
    const stopIds: string[] = []
    const mappedStops: Stop[] = []

    // 1. Map Timeline items as informational stops
    dto.timeline?.forEach((item, index) => {
      const stopId = `${dto.id}-t-${index}`
      stopIds.push(stopId)
      mappedStops.push({
        id: stopId,
        dayId: dto.id,
        target: {
          type: 'info',
          id: `info-${stopId}`,
        },
        title: item.title,
        scheduledTime: item.time,
      })
    })

    // 2. Map 'stops' array which has entity references
    dto.stops?.forEach((stopRef, index) => {
      const stopId = `${dto.id}-s-${index}`
      stopIds.push(stopId)
      mappedStops.push({
        id: stopId,
        dayId: dto.id,
        target: {
          // Temporarily generic, Repo will refine this based on entity maps
          type: 'pointOfInterest',
          id: stopRef.entityId,
        },
      })
    })

    return {
      day: {
        id: dto.id,
        tripId,
        date: dto.date,
        title: dto.title,
        stopIds,
        notes: dto.summary,
      },
      stops: mappedStops,
    }
  },

  mapTrip(dto: TripDTO, days: Day[]): Trip {
    const firstDay = days[0]
    const lastDay = days[days.length - 1]

    return {
      id: dto.id || 'ireland-2026',
      name: dto.name || 'Irlanda 2026',
      subtitle: dto.subtitle || `${firstDay?.date} — ${lastDay?.date}`,
      startDate: dto.startDate || firstDay?.date || '',
      endDate: dto.endDate || lastDay?.date || '',
      dayIds: dto.dayIds || days.map((d) => d.id),
      coverImage: dto.coverImage,
    }
  },
}
