import type { Stop } from '../../models'
import { formatDuration } from '../../utils/formatDuration'
import { DestinationBadge } from './DestinationBadge'

type StopHeaderProps = {
  stop: Stop
  destinationName: string
}

export function StopHeader({ stop, destinationName }: StopHeaderProps) {
  const duration = formatDuration(stop.estimatedDurationMinutes)

  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <DestinationBadge type={stop.target.type} />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{destinationName}</h1>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-base text-slate-600 dark:text-slate-300">
        {stop.scheduledTime ? <time>{stop.scheduledTime}</time> : null}
        {duration ? <span>{duration}</span> : null}
      </div>
    </header>
  )
}
