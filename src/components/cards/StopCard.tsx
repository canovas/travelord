import type { Stop } from '../../models'
import { formatDuration } from '../../utils/formatDuration'
import { formatStopTargetType } from '../../utils/formatStopTargetType'

type StopCardProps = {
  stop: Stop
  title: string
}

export function StopCard({ stop, title }: StopCardProps) {
  const duration = formatDuration(stop.estimatedDurationMinutes)

  return (
    <li>
      <a
        href={`/stop/${stop.dayId}/${stop.id}`}
        className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-colors hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
      >
        <time className="w-12 shrink-0 text-base font-semibold text-slate-900 dark:text-white">{stop.scheduledTime ?? '—'}</time>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {formatStopTargetType(stop.target.type)}{duration ? ` · ${duration}` : ''}
          </p>
        </div>
        <span aria-hidden="true" className="text-2xl font-light text-slate-400 dark:text-slate-500">›</span>
      </a>
    </li>
  )
}
