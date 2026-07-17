import type { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren) {
  return <section className="rounded-lg border border-slate-200 p-4">{children}</section>
}
