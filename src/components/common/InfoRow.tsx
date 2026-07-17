type InfoRowProps = {
  label: string
  value: string
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-slate-200 py-4 first:border-t-0 dark:border-slate-800">
      <dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="text-right text-base font-medium text-slate-900 dark:text-white">{value}</dd>
    </div>
  )
}
