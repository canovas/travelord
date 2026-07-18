import type { StopDestination } from '../../services/TripRepository'
import { ContactSection } from '../stop/ContactSection'
import { LocationSection } from '../stop/LocationSection'
import { MapPreview } from '../stop/MapPreview'
import { MapsAction } from '../stop/MapsAction'
import { TipsSection } from '../stop/TipsSection'
import { VisitInfoSection } from '../stop/VisitInfoSection'
import { InfoRow } from './InfoRow'

type StopInfoProps = {
  description?: string
  destination?: StopDestination
  nextStopTitle?: string
  distanceFromBase?: number
}

export function StopInfo({ description, destination, nextStopTitle, distanceFromBase }: StopInfoProps) {
  const hasDetails =
    description ||
    destination?.description ||
    destination?.location?.locality ||
    destination?.address ||
    (destination && 'website' in destination && destination.website) ||
    (destination && 'phone' in destination && destination.phone) ||
    (destination && 'tips' in destination && destination.tips) ||
    (destination && 'openingHours' in destination && destination.openingHours) ||
    (destination && 'estimatedVisitMinutes' in destination && destination.estimatedVisitMinutes) ||
    nextStopTitle

  if (!hasDetails) return null

  return (
    <section aria-label="Información de la parada" className="pb-16">
      {description ? (
        <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
      {destination?.description ? (
        <p className="mb-8 text-lg font-medium leading-relaxed text-slate-900 dark:text-white">
          {destination.description}
        </p>
      ) : null}

      <div className="space-y-6">
        {destination?.location && (
          <MapPreview location={destination.location} distance={distanceFromBase} />
        )}

        <LocationSection
          locality={destination?.location?.locality}
          address={destination?.address}
        />

        <VisitInfoSection
          openingHours={destination && 'openingHours' in destination ? destination.openingHours : undefined}
          estimatedVisitMinutes={
            destination && 'estimatedVisitMinutes' in destination ? destination.estimatedVisitMinutes : undefined
          }
        />

        <ContactSection
          website={destination && 'website' in destination ? destination.website : undefined}
          phone={destination && 'phone' in destination ? destination.phone : undefined}
        />

        <TipsSection tips={destination && 'tips' in destination ? destination.tips : undefined} />

        {nextStopTitle ? (
          <div className="mt-4">
            <dl>
              <InfoRow label="Siguiente" value={nextStopTitle} />
            </dl>
          </div>
        ) : null}

        <MapsAction mapsUrl={destination?.mapsUrl} />
      </div>
    </section>
  )
}
