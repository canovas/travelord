import { DayList } from '../../components/cards/DayList'
import { TripHeader } from '../../components/common/TripHeader'
import { TripDashboard } from '../../components/home/TripDashboard'
import { ContentSection } from '../../components/layout/ContentSection'
import { tripRepository } from '../../services/TripRepository'

export function HomePage() {
  const trip = tripRepository.getTrip()
  const days = tripRepository.getDays()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="-mx-6 sm:-mx-0">
        <TripHeader trip={trip} dayCount={days.length} />
      </div>

      <TripDashboard />

      <ContentSection title="Itinerario">
        <DayList days={days} />
      </ContentSection>
    </div>
  )
}
