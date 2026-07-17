import { Layout } from './Layout'
import { DayPage } from '../pages/Day/DayPage'
import { HomePage } from '../pages/Home/HomePage'
import { PlacePage } from '../pages/Place/PlacePage'
import { SettingsPage } from '../pages/Settings/SettingsPage'
import { StopDetailPage } from '../pages/Stop/StopDetailPage'

function getPage(pathname: string) {
  if (pathname.startsWith('/stop/')) {
    const [, , dayId, stopId] = pathname.split('/')
    return <StopDetailPage dayId={dayId} stopId={stopId} />
  }
  if (pathname.startsWith('/day/')) return <DayPage dayId={pathname.replace('/day/', '')} />
  if (pathname.startsWith('/place/')) return <PlacePage />
  if (pathname === '/settings') return <SettingsPage />

  return <HomePage />
}

export function App() {
  return <Layout>{getPage(window.location.pathname)}</Layout>
}
