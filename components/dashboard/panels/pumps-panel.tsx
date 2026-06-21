'use client'

import { useState } from 'react'
import { Fuel, Power, AlertTriangle } from 'lucide-react'
import { stations } from '@/lib/stations-data'
import { cn } from '@/lib/utils'

type PumpState = 'active' | 'idle' | 'maintenance'

interface Pump {
  id: string
  state: PumpState
  fuel: string
}

function buildPumps(stationId: string, count: number, active: number): Pump[] {
  const fuels = ['بنزين 91', 'بنزين 95', 'ديزل']
  return Array.from({ length: count }, (_, i) => ({
    id: `${stationId}-p${i + 1}`,
    state: i < active ? 'active' : i === active ? 'maintenance' : 'idle',
    fuel: fuels[i % fuels.length],
  }))
}

export function PumpsPanel() {
  const [selected, setSelected] = useState(stations[0].id)
  const station = stations.find((s) => s.id === selected)!
  const [pumps, setPumps] = useState<Pump[]>(
    buildPumps(station.id, station.pumps, station.activePumps),
  )

  function selectStation(id: string) {
    const st = stations.find((s) => s.id === id)!
    setSelected(id)
    setPumps(buildPumps(st.id, st.pumps, st.activePumps))
  }

  function toggle(id: string) {
    setPumps((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              state:
                p.state === 'maintenance'
                  ? p.state
                  : p.state === 'active'
                    ? 'idle'
                    : 'active',
            }
          : p,
      ),
    )
  }

  const activeCount = pumps.filter((p) => p.state === 'active').length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {stations.map((s) => (
          <button
            key={s.id}
            onClick={() => selectStation(s.id)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
              selected === s.id
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {station.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {activeCount} مضخة نشطة من أصل {pumps.length}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setPumps((p) =>
                  p.map((x) =>
                    x.state === 'maintenance' ? x : { ...x, state: 'active' },
                  ),
                )
              }
              className="rounded-lg bg-[var(--success)]/15 px-3 py-2 text-xs font-bold text-[var(--success)] transition-colors hover:bg-[var(--success)]/25"
            >
              تشغيل الكل
            </button>
            <button
              onClick={() =>
                setPumps((p) =>
                  p.map((x) =>
                    x.state === 'maintenance' ? x : { ...x, state: 'idle' },
                  ),
                )
              }
              className="rounded-lg bg-destructive/15 px-3 py-2 text-xs font-bold text-destructive transition-colors hover:bg-destructive/25"
            >
              إيقاف الكل
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {pumps.map((pump, i) => {
            const isMaint = pump.state === 'maintenance'
            const isActive = pump.state === 'active'
            return (
              <div
                key={pump.id}
                className={cn(
                  'rounded-xl border p-4 transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/5'
                    : isMaint
                      ? 'border-[var(--warning)]/40 bg-[var(--warning)]/5'
                      : 'border-border bg-secondary/40',
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-lg',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : isMaint
                          ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                          : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    <Fuel className="size-5" />
                  </div>
                  <button
                    onClick={() => toggle(pump.id)}
                    disabled={isMaint}
                    className={cn(
                      'flex size-9 items-center justify-center rounded-lg transition-colors',
                      isMaint
                        ? 'cursor-not-allowed bg-secondary text-muted-foreground'
                        : isActive
                          ? 'bg-[var(--success)]/15 text-[var(--success)] hover:bg-[var(--success)]/25'
                          : 'bg-secondary text-muted-foreground hover:bg-border',
                    )}
                    aria-label="تبديل المضخة"
                  >
                    <Power className="size-4.5" />
                  </button>
                </div>
                <p className="mt-3 text-sm font-bold text-foreground">
                  مضخة {i + 1}
                </p>
                <p className="text-[11px] text-muted-foreground">{pump.fuel}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium">
                  {isMaint ? (
                    <span className="flex items-center gap-1 text-[var(--warning)]">
                      <AlertTriangle className="size-3" />
                      صيانة
                    </span>
                  ) : isActive ? (
                    <span className="text-[var(--success)]">● نشطة</span>
                  ) : (
                    <span className="text-muted-foreground">○ متوقفة</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
