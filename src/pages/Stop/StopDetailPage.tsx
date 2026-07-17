import { useEffect, useState } from 'react'
import { EmptyDay } from '../../components/common/EmptyDay'
import { StopHeader } from '../../components/common/StopHeader'
import { StopInfo } from '../../components/common/StopInfo'
import { tripRepository, type StopDetail } from '../../services/TripRepository'

type StopDetailPageProps = {
  dayId: string
  stopId: string
}

type StopDetailState =
  | { status: 'loading' }
  | { status: 'notFound' }
  | { status: 'destinationMissing' }
  | { status: 'ready'; detail: StopDetail }

export function StopDetailPage({ dayId, stopId }: StopDetailPageProps) {
  const [state, setState] = useState<StopDetailState>({ status: 'loading' })

  useEffect(() => {
    const detail = tripRepository.getStopDetail(dayId, stopId)
    if (!detail) {
      setState({ status: 'notFound' })
      return
    }
    if (!detail.destination) {
      setState({ status: 'destinationMissing' })
      return
    }
    setState({ status: 'ready', detail })
  }, [dayId, stopId])

  if (state.status === 'loading') return <EmptyDay title="Cargando la parada…" />
  if (state.status === 'notFound') return <EmptyDay title="No hemos encontrado esta parada." />
  if (state.status === 'destinationMissing') return <EmptyDay title="El destino de esta parada no está disponible." />

  const { detail } = state
  return (
    <div className="mx-auto max-w-2xl">
      <StopHeader stop={detail.stop} destinationName={detail.destination.name} />
      <StopInfo description={detail.stop.notes} destination={detail.destination} nextStopTitle={detail.nextStop?.title} />
    </div>
  )
}
