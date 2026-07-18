import type { GeoLocation } from '../../models/GeoLocation'

type MapPreviewProps = {
  location: GeoLocation
  distance?: number
}

export function MapPreview({ location, distance }: MapPreviewProps) {
  const { latitude, longitude, locality } = location

  // URL for a simple Google Maps embed (no API key needed for basic display)
  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      <div className="relative aspect-video w-full">
        <iframe
          title="Ubicación"
          src={embedUrl}
          className="h-full w-full grayscale-[0.2] dark:invert dark:hue-rotate-180 dark:brightness-95"
          style={{ border: 0 }}
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-3xl" />
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ubicación
          </p>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            {locality || 'Ver en el mapa'}
          </p>
        </div>

        {distance !== undefined && (
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-moss dark:text-moss-400">
              Distancia
            </p>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              {distance} km <span className="text-slate-400 font-normal">desde la casa</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
