import type { Trip } from '../../models'

type TripHeaderProps = {
  trip: Trip
  dayCount: number
}

export function TripHeader({ trip, dayCount }: TripHeaderProps) {
  return (
    <section className="pb-10 pt-8 sm:pb-14 sm:pt-12">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{trip.subtitle}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {trip.name}
      </h1>
      <p className="mt-5 text-base text-slate-600 dark:text-slate-300">
        {trip.startDate} — {trip.endDate}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
        {dayCount} {dayCount === 1 ? 'día' : 'días'}
      </p>
    </section>
  )
}
