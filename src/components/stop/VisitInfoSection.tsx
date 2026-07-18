import { InfoRow } from '../common/InfoRow'
import { formatDuration } from '../../utils/formatDuration'

type VisitInfoSectionProps = {
  openingHours?: string
  estimatedVisitMinutes?: number
}

export function VisitInfoSection({ openingHours, estimatedVisitMinutes }: VisitInfoSectionProps) {
  if (!openingHours && !estimatedVisitMinutes) return null

  const formattedDuration = formatDuration(estimatedVisitMinutes)

  return (
    <div className="mt-4">
      <dl>
        {openingHours ? <InfoRow label="Horario" value={openingHours} /> : null}
        {formattedDuration ? <InfoRow label="Visita recomendada" value={formattedDuration} /> : null}
      </dl>
    </div>
  )
}
