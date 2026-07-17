import type { Day } from '../../models'
import { DayCard } from './DayCard'

type DayListProps = {
  days: Day[]
}

export function DayList({ days }: DayListProps) {
  return (
    <ol aria-label="Días del viaje" className="space-y-3 pb-8">
      {days.map((day, index) => <DayCard key={day.id} day={day} dayNumber={index + 1} />)}
    </ol>
  )
}
