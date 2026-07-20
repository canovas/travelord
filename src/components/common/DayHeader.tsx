import type { Day } from '../../models'
import { tripRepository } from '../../services/TripRepository'
import { BackButton } from '../ui/BackButton'

type DayHeaderProps = {
  day: Day
  dayNumber: number
}

export function DayHeader({ day, dayNumber }: DayHeaderProps) {
  const estimatedKm = tripRepository.getDistanceForDay(day.id)

  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <BackButton href="/" label="Irlanda 2026" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Día {dayNumber}
        {estimatedKm > 0 && (
          <span className="ml-2 text-moss dark:text-moss-400">• ~{estimatedKm} km totales</span>
        )}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {day.title ?? 'Sin título'}
      </h1>
      <p className="mt-5 text-base text-slate-600 dark:text-slate-300">{day.date}</p>
      {day.notes && (
        <p className="mt-4 text-base italic text-slate-500 dark:text-slate-400">
          {day.notes}
        </p>
      )}
    </header>
  )
}
