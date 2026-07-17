import type { ResolvedStop } from '../../services/TripRepository'
import { StopCard } from './StopCard'

type StopListProps = {
  stops: ResolvedStop[]
}

export function StopList({ stops }: StopListProps) {
  if (stops.length === 0) {
    return <p className="pb-8 text-base text-slate-500 dark:text-slate-400">No hay paradas previstas para este día.</p>
  }

  return (
    <ol aria-label="Plan del día" className="space-y-3 pb-8">
      {stops.map(({ stop, title }) => <StopCard key={stop.id} stop={stop} title={title} />)}
    </ol>
  )
}
