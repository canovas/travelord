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

  // 1. Handle GitHub Pages redirection (from 404.html)
  const params = new URLSearchParams(search)
  const redirectedPath = params.get('p')

  // 2. Resolve final relative path
  let path = redirectedPath || (pathname.startsWith(base) ? pathname.replace(base, '') : pathname)
  if (!path.startsWith('/')) path = '/' + path

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
  const [location, setLocation] = useState({
    pathname: window.location.pathname,
    search: window.location.search,
  })

  // Load content
  useEffect(() => {
    contentRepository
      .load()
      .then(() => setIsReady(true))
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  // SPA Routing Listeners
  useEffect(() => {
    const handlePopState = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
      })
    }

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (
        anchor &&
        anchor instanceof HTMLAnchorElement &&
        anchor.host === window.location.host &&
        !anchor.hasAttribute('download') &&
        anchor.target !== '_blank'
      ) {
        e.preventDefault()
        window.history.pushState(null, '', anchor.href)
        handlePopState()
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Cleanup redirected URL if present
  useEffect(() => {
    if (isReady && new URLSearchParams(window.location.search).has('p')) {
      const params = new URLSearchParams(window.location.search)
      const cleanPath = params.get('p') || '/'
      params.delete('p')
      const newSearch = params.toString()
      const newUrl = cleanPath + (newSearch ? `?${newSearch}` : '') + window.location.hash
      window.history.replaceState(null, '', newUrl)
    }
  }, [isReady])

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

  return <Layout>{getPage(location.pathname, location.search)}</Layout>
}
