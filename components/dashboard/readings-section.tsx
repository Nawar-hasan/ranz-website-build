'use client'

import {
  ArrowUpLeft,
  Droplets,
  Fuel,
  Building2,
  AlertTriangle,
  Gauge,
} from 'lucide-react'
import {
  stations,
  statusMeta,
  type Station,
} from '@/lib/stations-data'

function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  alert,
}: {
  label: string
  value: string
  unit?: string
  icon: typeof Fuel
  alert?: boolean
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className={`flex size-9 items-center justify-center rounded-lg ${
            alert
              ? 'bg-[var(--warning)]/15 text-[var(--warning)]'
              : 'bg-primary/15 text-primary'
          }`}
        >
          <Icon className="size-4.5" />
        </div>
      </div>
      <div className="mt-4 flex items-end gap-1.5">
        <span
          className={`font-mono text-3xl font-extrabold ${
            alert && value !== '0' ? 'text-[var(--warning)]' : 'text-foreground'
          }`}
        >
          {value}
        </span>
        {unit && (
          <span className="mb-1 text-xs text-muted-foreground">{unit}</span>
        )}
      </div>
    </div>
  )
}

function StationCard({ station }: { station: Station }) {
  const meta = statusMeta[station.status]
  const isExternal = /^https?:\/\//.test(station.link)
  return (
    <a
      href={station.link}
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className="pointer-events-none absolute -left-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Fuel className="size-7" strokeWidth={2.2} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-lg font-bold text-foreground">
            {station.name}
          </h3>
          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.bg} ${meta.text}`}
          >
            <span className={`size-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Building2 className="size-3" />
          {station.city}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-primary">
          فتح قراءات المحطة
          <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  )
}

export function ReadingsSection() {
  const totalRefill = stations.reduce((s, st) => s + st.pumpsNeedRefill, 0)
  const totalLiters = stations.reduce((s, st) => s + st.todayLiters, 0)
  const online = stations.filter((s) => s.status === 'online').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="مضخات تتطلب تعبئة"
          value={`${totalRefill}`}
          unit="مضخة"
          icon={AlertTriangle}
          alert
        />
        <StatCard
          label="إجمالي الكمية"
          value={`${totalLiters}`}
          unit="لتر"
          icon={Droplets}
        />
        <StatCard
          label="المحطات المتصلة"
          value={`${online}`}
          unit={`من ${stations.length}`}
          icon={Building2}
        />
        <StatCard
          label="المضخات النشطة"
          value={`${stations.reduce((s, st) => s + st.activePumps, 0)}`}
          unit="مضخة"
          icon={Gauge}
        />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            المحطات ({stations.length})
          </h2>
          <p className="text-xs text-muted-foreground">
            اضغط على أي محطة للانتقال إلى صفحة قراءاتها
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </div>
  )
}
