import type { Day } from '../models'
import { trip } from './trip'

export const days: Day[] = [
  { id: 'day-1', tripId: trip.id, date: '15 agosto', title: 'Llegada', stopIds: ['stop-1', 'stop-2', 'stop-3'] },
  { id: 'day-2', tripId: trip.id, date: '16 agosto', title: 'Galway', stopIds: [] },
  { id: 'day-3', tripId: trip.id, date: '17 agosto', title: 'Día 3', stopIds: [] },
  { id: 'day-4', tripId: trip.id, date: '18 agosto', title: 'Día 4', stopIds: [] },
  { id: 'day-5', tripId: trip.id, date: '19 agosto', title: 'Día 5', stopIds: [] },
  { id: 'day-6', tripId: trip.id, date: '20 agosto', title: 'Día 6', stopIds: [] },
  { id: 'day-7', tripId: trip.id, date: '21 agosto', title: 'Día 7', stopIds: [] },
  { id: 'day-8', tripId: trip.id, date: '22 agosto', title: 'Día 8', stopIds: [] },
]
