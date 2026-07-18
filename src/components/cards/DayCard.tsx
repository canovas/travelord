import type { Day } from '../../models'
import { tripRepository } from '../../services/TripRepository'

type DayCardProps = {
  day: Day
  dayNumber: number
}

export function DayCard({ day, dayNumber }: DayCardProps) {
  const stops = tripRepository.getStopsForDay(day.id)
  const stopCount = stops.length
  const firstDestination = stops[0]?.title

  return (
    <li>
      <a
        href={`/day/${day.id}`}
        className="flex min-h-24 items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-colors hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
      >
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Día {dayNumber}</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{day.title ?? 'Sin título'}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
            <span>{day.date}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>
              {stopCount} {stopCount === 1 ? 'parada' : 'paradas'}
            </span>
            {firstDestination && (
              <>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="truncate max-w-[150px] sm:max-w-[200px]">{firstDestination}</span>
              </>
            )}
          </div>
        </div>
        <span aria-hidden="true" className="ml-4 text-2xl font-light text-slate-400 dark:text-slate-500">
          ›
        </span>
      </a>
    </li>
  )
}
