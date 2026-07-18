import { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { DayPage } from '../pages/Day/DayPage'
import { HomePage } from '../pages/Home/HomePage'
import { PlacePage } from '../pages/Place/PlacePage'
import { SettingsPage } from '../pages/Settings/SettingsPage'
import { StopDetailPage } from '../pages/Stop/StopDetailPage'
import { contentRepository } from '../services/ContentRepository'
import { EmptyDay } from '../components/common/EmptyDay'

function getPage(pathname: string, search: string) {
  // Respect Vite's base path for routing
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  // SPA Redirect Check: if we have ?p=... use that as the path
  const params = new URLSearchParams(search)
  const redirectedPath = params.get('p')

  let path = redirectedPath || (pathname.startsWith(base) ? pathname.replace(base, '') : pathname)

  if (path.startsWith('/stop/')) {
    const [, , dayId, stopId] = path.split('/')
    return <StopDetailPage dayId={dayId} stopId={stopId} />
  }
  if (path.startsWith('/day/')) return <DayPage dayId={path.replace('/day/', '')} />
  if (path.startsWith('/place/')) return <PlacePage />
  if (path === '/settings') return <SettingsPage />

  return <HomePage />
}

export function App() {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    contentRepository
      .load()
      .then(() => setIsReady(true))
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  if (error) {
    return (
      <Layout>
        <EmptyDay title="Error al cargar el contenido del viaje" />
        <div className="px-6 py-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </Layout>
    )
  }

  if (!isReady) {
    return (
      <Layout>
        <EmptyDay title="Cargando viaje..." />
      </Layout>
    )
  }

  return <Layout>{getPage(window.location.pathname, window.location.search)}</Layout>
}
