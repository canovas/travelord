import type { ReactNode } from 'react'

type ExternalLinkButtonProps = {
  href: string
  children: ReactNode
  icon?: string
}

export function ExternalLinkButton({ href, children, icon }: ExternalLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-white dark:focus:ring-offset-slate-950"
    >
      {icon ? <span aria-hidden="true" className="text-xl">{icon}</span> : null}
      {children}
    </a>
  )
}
