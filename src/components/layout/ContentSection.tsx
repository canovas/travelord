import type { PropsWithChildren } from 'react'

type ContentSectionProps = PropsWithChildren<{
  title?: string
}>

/** A neutral, vertically-spaced section for composing future Home content. */
export function ContentSection({ children, title }: ContentSectionProps) {
  return (
    <section className="pb-10 sm:pb-12">
      {title ? <h2 className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</h2> : null}
      {children}
    </section>
  )
}
