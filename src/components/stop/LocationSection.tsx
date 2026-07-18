import { InfoRow } from '../common/InfoRow'

type LocationSectionProps = {
  address?: string
  mapsUrl?: string
  locality?: string
}

export function LocationSection({ address, mapsUrl, locality }: LocationSectionProps) {
  if (!address && !locality) return null

  return (
    <div className="mt-4">
      <dl>
        {locality ? <InfoRow label="Localidad" value={locality} /> : null}
        {address ? <InfoRow label="Dirección" value={address} /> : null}
      </dl>
    </div>
  )
}
