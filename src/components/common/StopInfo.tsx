import type { StopDestination } from '../../services/TripRepository'
import { InfoRow } from './InfoRow'

type StopInfoProps = {
  description?: string
  destination?: StopDestination
  nextStopTitle?: string
}

export function StopInfo({ description, destination, nextStopTitle }: StopInfoProps) {
  const location = [destination?.location?.locality, destination?.location?.countryCode].filter(Boolean).join(', ')
  const hasInfo = description || destination?.description || location || nextStopTitle
  if (!hasInfo) return null

  return (
    <section aria-label="Información de la parada" className="pb-8">
      {description ? <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">{description}</p> : null}
      {destination?.description ? <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">{destination.description}</p> : null}
      <dl>{location ? <InfoRow label="Ubicación" value={location} /> : null}{nextStopTitle ? <InfoRow label="Siguiente" value={nextStopTitle} /> : null}</dl>
    </section>
  )
}
