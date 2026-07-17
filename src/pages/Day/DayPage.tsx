import { useEffect, useState } from 'react'
import { DayHeader } from '../../components/common/DayHeader'
import { EmptyDay } from '../../components/common/EmptyDay'
import { StopList } from '../../components/cards/StopList'
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

  return (
    <div className="mx-auto max-w-2xl">
      <DayHeader day={state.day} dayNumber={state.dayNumber} />
      <StopList stops={state.stops} />
    </div>
  )
}
