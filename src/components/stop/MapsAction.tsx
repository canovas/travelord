import { ExternalLinkButton } from '../ui/ExternalLinkButton'

type MapsActionProps = {
  mapsUrl?: string
}

export function MapsAction({ mapsUrl }: MapsActionProps) {
  if (!mapsUrl) return null

  return (
    <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
      <ExternalLinkButton href={mapsUrl} icon="📍">
        Abrir en Google Maps
      </ExternalLinkButton>
    </div>
  )
}
