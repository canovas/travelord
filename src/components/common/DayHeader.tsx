import type { Day } from '../../models'

type DayHeaderProps = {
  day: Day
  dayNumber: number
}

export function DayHeader({ day, dayNumber }: DayHeaderProps) {
  return (
    <header className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Día {dayNumber}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {day.title ?? 'Sin título'}
      </h1>
      <p className="mt-5 text-base text-slate-600 dark:text-slate-300">{day.date}</p>
    </header>
  )
}
