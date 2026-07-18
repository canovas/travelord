type BackButtonProps = {
  href: string
  label?: string
}

export function BackButton({ href, label = 'Volver' }: BackButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-slate-950 mb-6"
    >
      <span aria-hidden="true">←</span>
      {label}
    </a>
  )
}
