# Arquitectura de Contenido (Data-Driven)

Esta aplicación utiliza una arquitectura desacoplada donde el contenido del viaje se define íntegramente mediante archivos JSON externos. Esto permite actualizar el itinerario, añadir nuevos destinos o incluso cambiar de viaje completo sin modificar el código fuente.

## Objetivos de la Arquitectura
- **Desacoplamiento total**: El código no conoce los detalles del viaje.
- **Escalabilidad**: Soporte para múltiples viajes en la misma infraestructura.
- **Integridad**: Validación automática de referencias y datos al arranque.
- **Rendimiento**: Carga asíncrona única con resolución de referencias en $O(1)$.

## Estructura de Carpetas

El contenido reside en la carpeta `public/content/`:

```text
public/content/
├── config.json                 # Configuración global (viaje activo)
└── [trip-id]/                  # Carpeta del viaje (ej: ireland-2026)
    ├── trip.json               # Información general y estructura de días
    ├── stops.json              # Lista maestra de todas las paradas
    ├── days/                   # Detalle de cada día
    │   ├── day-1.json
    │   └── ...
    └── entities/               # Catálogo de destinos por tipo
        ├── points-of-interest.json
        ├── restaurants.json
        ├── accommodations.json
        ├── transport.json
        └── shopping.json
```

## Formato de los JSON

### `config.json`
Define qué viaje debe cargar la aplicación al arrancar.
```json
{ "activeTripId": "ireland-2026" }
```

### `trip.json`
```json
{
  "id": "ireland-2026",
  "name": "Nombre del Viaje",
  "subtitle": "Subtítulo (fechas)",
  "startDate": "Fecha inicio",
  "endDate": "Fecha fin",
  "dayIds": ["day-1", "day-2"]
}
```

### `entities/*.json` (Ejemplo: `points-of-interest.json`)
Lista de objetos con campos opcionales enriquecidos.
```json
[
  {
    "id": "entity-id",
    "name": "Nombre del lugar",
    "category": "castle",
    "description": "...",
    "tips": ["Consejo 1"],
    "mapsUrl": "URL de Google Maps"
  }
]
```

## Flujo de Carga y Ciclo de Vida

1. **Arranque**: `App.tsx` llama a `contentRepository.load()` en un `useEffect`.
2. **Configuración**: Se lee `config.json` para obtener el ID del viaje.
3. **Carga Paralela**: Se lanzan peticiones `fetch` para todos los recursos del viaje.
4. **Validación**: Se comprueban IDs duplicados y referencias rotas.
5. **Indexación**: Las entidades se transforman en `Map` internos para acceso rápido.
6. **Caché**: El estado `isReady` de la App pasa a `true` y los datos quedan residentes en memoria.

## Resolución de Referencias

Las paradas en `stops.json` referencian entidades mediante un `target`:
```json
{
  "target": { "type": "pointOfInterest", "id": "trinity-college" }
}
```
El `TripRepository` resuelve esto instantáneamente usando los índices en memoria:
`entities.pointsOfInterest.get("trinity-college")`.

## Guía de Extensión

### Añadir un nuevo viaje
1. Crea una nueva carpeta en `public/content/` (ej: `japan-2027`).
2. Sigue la estructura de archivos de `ireland-2026`.
3. Actualiza `config.json` con `"activeTripId": "japan-2027"`.

### Añadir un nuevo día
1. Crea el archivo `public/content/[trip-id]/days/day-X.json`.
2. Añade el ID `day-X` al array `dayIds` en `trip.json`.

### Añadir una nueva entidad
1. Abre el archivo correspondiente en `entities/` (ej: `restaurants.json`).
2. Añade el objeto con un ID único.
3. Referencia ese ID en una parada dentro de `stops.json`.

## Sistema de Validación
El `JsonContentRepository` abortará la carga e informará si:
- Un archivo JSON es ilegible o está vacío.
- Existen IDs duplicados en cualquier archivo.
- Una parada referencia a una entidad que no existe.
- Un día declarado en `trip.json` no tiene su archivo correspondiente.
