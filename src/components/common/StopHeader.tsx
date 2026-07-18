import type { Image, Stop } from '../../models'
import { formatDuration } from '../../utils/formatDuration'
import { BackButton } from '../ui/BackButton'
import { DestinationBadge } from './DestinationBadge'

type StopHeaderProps = {
  stop: Stop
  destinationName: string
  images?: Image[]
}

export function StopHeader({ stop, destinationName, images }: StopHeaderProps) {
  const duration = formatDuration(stop.estimatedDurationMinutes)
  const heroImage = images?.[0]

  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <BackButton href={`/day/${stop.dayId}`} label="Itinerario" />
      {heroImage && (
        <div className="mb-8 overflow-hidden rounded-3xl shadow-float transition-transform duration-500 hover:scale-[1.02]">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
          />
        </div>
      )}
      <DestinationBadge type={stop.target.type} />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {destinationName}
      </h1>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-base text-slate-600 dark:text-slate-300">
        {stop.scheduledTime ? <time>{stop.scheduledTime}</time> : null}
        {duration ? <span>{duration}</span> : null}
      </div>
    </header>
  )
}
