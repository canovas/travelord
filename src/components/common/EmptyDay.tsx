type EmptyDayProps = {
  title: string
}

export function EmptyDay({ title }: EmptyDayProps) {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center sm:py-24">
      <p className="text-lg text-slate-500 dark:text-slate-400">{title}</p>
    </div>
  )
}
