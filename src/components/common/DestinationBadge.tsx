import type { Stop } from '../../models'
import { formatStopTargetType } from '../../utils/formatStopTargetType'

type DestinationBadgeProps = {
  type: Stop['target']['type']
}

export function DestinationBadge({ type }: DestinationBadgeProps) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{formatStopTargetType(type)}</span>
}
