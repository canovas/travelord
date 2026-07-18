import { contentRepository } from '../../services/ContentRepository'
import { StatCard } from './StatCard'

export function TripDashboard() {
  const data = contentRepository.getData()
  const { trip, stops, entities } = data

  const totalStops = stops.length
  const poiCount = entities.pointsOfInterest.size
  const foodCount = entities.foodVenues.size
  const stayCount = entities.accommodations.size

  // Countdown / Status logic
  const now = new Date()
  const [startDay, startMonth, startYear] = trip.startDate.split('/').map(Number)
  const [endDay, endMonth, endYear] = trip.endDate.split('/').map(Number)

  const startDate = new Date(startYear, startMonth - 1, startDay)
  const endDate = new Date(endYear, endMonth - 1, endDay, 23, 59, 59)

  let statusText = ''
  let statusIcon = '✈️'

  if (now < startDate) {
    const diffTime = startDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    statusText = `Faltan ${diffDays} días para la aventura`
    statusIcon = '⏳'
  } else if (now > endDate) {
    statusText = '¡Viaje completado!'
    statusIcon = '🏆'
  } else {
    statusText = '¡Estamos de viaje!'
    statusIcon = '🇮🇪'
  }

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-white dark:bg-white dark:text-slate-950">
        <span className="text-2xl">{statusIcon}</span>
        <span className="text-lg font-semibold">{statusText}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Paradas" value={totalStops} icon="📍" />
        <StatCard label="Lugares" value={poiCount} icon="🏰" />
        <StatCard label="Restaurantes" value={foodCount} icon="🍽️" />
        <StatCard label="Alojamiento" value={stayCount} icon="🏠" />
      </div>
    </section>
  )
}
