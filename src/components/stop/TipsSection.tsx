type TipsSectionProps = {
  tips?: string[]
}

export function TipsSection({ tips }: TipsSectionProps) {
  if (!tips || tips.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Consejos</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-3 text-base text-slate-600 dark:text-slate-300">
            <span className="text-moss dark:text-moss">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
