type StatCardProps = {
  label: string
  value: number | string
  icon: string
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
      <span aria-hidden="true" className="mb-2 text-2xl">
        {icon}
      </span>
      <span className="text-lg font-bold text-slate-950 dark:text-white">{value}</span>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}
