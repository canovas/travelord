import type { Stop } from '../models'

const labels: Record<Stop['target']['type'], string> = {
  accommodation: 'Alojamiento',
  foodVenue: 'Comida y bebida',
  pointOfInterest: 'Lugar',
  transport: 'Transporte',
  shopping: 'Tienda / Compras',
  info: 'Evento',
}

export function formatStopTargetType(type: Stop['target']['type']): string {
  return labels[type]
}
