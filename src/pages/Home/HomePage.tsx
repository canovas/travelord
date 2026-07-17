import { DayList } from '../../components/cards/DayList'
import { TripHeader } from '../../components/common/TripHeader'
import { ContentSection } from '../../components/layout/ContentSection'
import { tripRepository } from '../../services/TripRepository'

export function HomePage() {
  const trip = tripRepository.getTrip()
  const days = tripRepository.getDays()

  return <>
    <div className="mx-auto max-w-2xl">
      <TripHeader trip={trip} dayCount={days.length} />
      <ContentSection title="Itinerario">
        <DayList days={days} />
      </ContentSection>
    </div>
  </>
}
