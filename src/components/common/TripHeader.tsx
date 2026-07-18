import type { Trip } from '../../models'

type TripHeaderProps = {
  trip: Trip
  dayCount: number
}

export function TripHeader({ trip, dayCount }: TripHeaderProps) {
  const imageUrl = trip.coverImage?.url || 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=1200'

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-white shadow-float sm:px-12 sm:py-20 mb-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={trip.coverImage?.alt || 'Irlanda'}
          className="h-full w-full object-cover opacity-60 transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-300 opacity-90">{trip.subtitle}</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight sm:text-7xl">
          {trip.name}
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium opacity-90">
          <span className="rounded-full bg-white/10 px-4 py-1 backdrop-blur-md border border-white/10 text-white">
            {trip.startDate} — {trip.endDate}
          </span>
          <span className="rounded-full bg-slate-800/40 px-4 py-1 backdrop-blur-md border border-white/10 text-white">
            {dayCount} {dayCount === 1 ? 'día' : 'días'}
          </span>
        </div>
      </div>
    </section>
  )
}
