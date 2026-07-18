import { InfoRow } from '../common/InfoRow'

type ContactSectionProps = {
  website?: string
  phone?: string
}

export function ContactSection({ website, phone }: ContactSectionProps) {
  if (!website && !phone) return null

  return (
    <div className="mt-4">
      <dl>
        {website ? <InfoRow label="Web" value={website} /> : null}
        {phone ? <InfoRow label="Teléfono" value={phone} /> : null}
      </dl>
    </div>
  )
}
