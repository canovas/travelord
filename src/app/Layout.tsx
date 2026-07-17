import type { PropsWithChildren } from 'react'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main>
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  )
}
