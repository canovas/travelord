import type { PropsWithChildren } from 'react'

export function SectionTitle({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-semibold">{children}</h1>
}
