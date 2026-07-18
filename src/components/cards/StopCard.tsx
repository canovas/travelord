import type { Image, Stop } from '../../models'
import { formatDuration } from '../../utils/formatDuration'
import { formatStopTargetType } from '../../utils/formatStopTargetType'

type StopCardProps = {
  stop: Stop
  title: string
  image?: Image
}

export function StopCard({ stop, title, image }: StopCardProps) {
  const duration = formatDuration(stop.estimatedDurationMinutes)
  const isInteractive = stop.target.type !== 'info'

  const content = (
    <>
      {image && (
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
          <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
        </div>
      )}
      <time className="w-12 shrink-0 text-base font-semibold text-slate-900 dark:text-white">
        {stop.scheduledTime ?? '—'}
      </time>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {formatStopTargetType(stop.target.type)}
          {duration ? ` · ${duration}` : ''}
        </p>
      </div>
      {isInteractive && (
        <span aria-hidden="true" className="text-2xl font-light text-slate-400 dark:text-slate-500">
          ›
        </span>
      )}
    </>
  )

  const className =
    'flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-colors dark:border-slate-800 dark:bg-slate-900'

  if (isInteractive) {
    return (
      <li>
        <a
          href={`/stop/${stop.dayId}/${stop.id}`}
          className={`${className} hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:hover:border-slate-700 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950`}
        >
          {content}
        </a>
      </li>
    )
  }

  return (
    <li>
      <div className={className}>{content}</div>
    </li>
  )
}
