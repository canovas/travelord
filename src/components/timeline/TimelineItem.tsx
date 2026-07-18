import type { Image, Stop } from '../../models'
import { formatDuration } from '../../utils/formatDuration'
import { formatStopTargetType } from '../../utils/formatStopTargetType'

type TimelineItemProps = {
  stop: Stop
  title: string
  image?: Image
  isLast?: boolean
}

export function TimelineItem({ stop, title, image, isLast }: TimelineItemProps) {
  const duration = formatDuration(stop.estimatedDurationMinutes)
  const isInteractive = stop.target.type !== 'info'

  const content = (
    <div className="flex gap-4 pb-10 group relative">
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-[1.125rem] top-8 h-full w-px bg-slate-200 dark:bg-slate-800" />
      )}

      {/* Timeline point */}
      <div className="relative z-10 mt-1.5 h-9 w-9 flex-none rounded-full bg-slate-50 ring-4 ring-white dark:bg-slate-900 dark:ring-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
         <div className={`h-2.5 w-2.5 rounded-full ${isInteractive ? 'bg-moss' : 'bg-slate-300 dark:bg-slate-600'}`} />
      </div>

      {/* Details Card */}
      <div className="flex-auto min-w-0">
         <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <time className="text-sm font-bold text-moss dark:text-moss-400 tabular-nums">
              {stop.scheduledTime ?? '—'}
            </time>
         </div>

         <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900 ${isInteractive ? 'hover:border-slate-300 dark:hover:border-slate-700 shadow-sm' : ''}`}>
            {isInteractive ? (
              <a href={`/stop/${stop.dayId}/${stop.id}`} className="block p-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-slate-950">
                 {cardContent(title, stop, duration, image, isInteractive)}
              </a>
            ) : (
              <div className="p-4 opacity-80">
                 {cardContent(title, stop, duration, image, isInteractive)}
              </div>
            )}
         </div>
      </div>
    </div>
  )

  return <li>{content}</li>
}

function cardContent(title: string, stop: Stop, duration: string | undefined, image?: Image, isInteractive?: boolean) {
  return (
    <div className="flex items-center gap-4">
      {image && (
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
          <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-bold text-slate-950 dark:text-white leading-tight">
          {title}
        </h3>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {formatStopTargetType(stop.target.type)}
          {duration ? ` · ${duration}` : ''}
        </p>
      </div>
      {isInteractive && (
        <span aria-hidden="true" className="text-xl font-light text-slate-400 dark:text-slate-500">
          ›
        </span>
      )}
    </div>
  )
}
