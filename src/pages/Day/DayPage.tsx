import { useEffect, useState } from 'react'
import { DayHeader } from '../../components/common/DayHeader'
import { EmptyDay } from '../../components/common/EmptyDay'
import { TimelineView } from '../../components/timeline/TimelineView'
import type { Day } from '../../models'
import { tripRepository, type ResolvedStop } from '../../services/TripRepository'

type DayPageProps = {
  dayId: string
}

type DayPageState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'ready'; day: Day; dayNumber: number; stops: ResolvedStop[] }

export function DayPage({ dayId }: DayPageProps) {
  const [state, setState] = useState<DayPageState>({ status: 'loading' })

  useEffect(() => {
    const day = tripRepository.getDay(dayId)
    if (!day) {
      setState({ status: 'notFound' })
      return
    }

    const dayNumber = tripRepository.getDays().findIndex((item) => item.id === day.id) + 1
    setState({ status: 'ready', day, dayNumber, stops: tripRepository.getStopsForDay(day.id) })
  }, [dayId])

  if (state.status === 'loading') return <EmptyDay title="Cargando el día…" />
  if (state.status === 'notFound') return <EmptyDay title="No hemos encontrado este día." />

  const { day, dayNumber, stops } = state
  const timelineStops = stops.filter((s) => s.stop.scheduledTime)
  const guideStops = stops.filter((s) => !s.stop.scheduledTime)

  return (
    <div className="mx-auto max-w-2xl">
      <DayHeader day={day} dayNumber={dayNumber} />

      {timelineStops.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
            Cronograma del día
          </h2>
          <TimelineView stops={timelineStops} />
        </section>
      )}

      {guideStops.length > 0 && (
        <section className="pb-20">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
            Información Útil y Guía
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {guideStops.map((resolved) => (
              <a
                key={resolved.stop.id}
                href={`/stop/${resolved.stop.dayId}/${resolved.stop.id}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                {resolved.image && (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                    <img
                      src={resolved.image.url}
                      alt={resolved.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-slate-950 dark:text-white">
                    {resolved.title}
                  </h3>
                  {resolved.distanceFromBase !== undefined && (
                    <p className="text-xs font-medium text-moss dark:text-moss-400">
                      {resolved.distanceFromBase} km desde la casa
                    </p>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className="text-xl font-light text-slate-400 dark:text-slate-500"
                >
                  ›
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
