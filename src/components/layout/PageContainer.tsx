import type { PropsWithChildren } from 'react'

export function PageContainer({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
}
