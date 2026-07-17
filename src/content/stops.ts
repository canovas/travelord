import type { Accommodation, PointOfInterest, Stop, Transport } from '../models'

export const stops: Stop[] = [
  { id: 'stop-1', dayId: 'day-1', target: { type: 'transport', id: 'arrival-terminal' }, scheduledTime: '10:00', estimatedDurationMinutes: 45 },
  { id: 'stop-2', dayId: 'day-1', target: { type: 'pointOfInterest', id: 'first-stop' }, scheduledTime: '12:00', estimatedDurationMinutes: 60 },
  { id: 'stop-3', dayId: 'day-1', target: { type: 'accommodation', id: 'stay' }, scheduledTime: '15:00' },
]

export const accommodations: Accommodation[] = [
  { id: 'stay', name: 'Alojamiento', category: 'house' },
]

export const pointsOfInterest: PointOfInterest[] = [
  { id: 'first-stop', name: 'Primera parada', category: 'landmark' },
]

export const transportLocations: Transport[] = [
  { id: 'arrival-terminal', name: 'Llegada', category: 'airport' },
]
