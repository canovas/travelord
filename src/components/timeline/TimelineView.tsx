import type { ResolvedStop } from '../../services/TripRepository'
import { TimelineItem } from './TimelineItem'

type TimelineViewProps = {
  stops: ResolvedStop[]
}

export function TimelineView({ stops }: TimelineViewProps) {
  if (stops.length === 0) {
    return (
      <p className="pb-16 text-base text-slate-500 dark:text-slate-400 italic">
        No hay paradas previstas para este día.
      </p>
    )
  }

  return (
    <nav aria-label="Línea de tiempo del día" className="pb-16 pt-2">
      <ol>
        {stops.map((resolved, index) => (
          <TimelineItem
            key={resolved.stop.id}
            stop={resolved.stop}
            title={resolved.title}
            image={resolved.image}
            isLast={index === stops.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}
