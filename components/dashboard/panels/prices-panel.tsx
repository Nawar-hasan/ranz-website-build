'use client'

import { useState } from 'react'
import { Minus, Plus, Save, Tags, Check } from 'lucide-react'
import { stations, fuelTypes } from '@/lib/stations-data'
import { cn } from '@/lib/utils'

type PriceMap = Record<string, Record<string, number>>

function initPrices(): PriceMap {
  const map: PriceMap = {}
  for (const s of stations) {
    map[s.id] = {}
    for (const f of fuelTypes) {
      map[s.id][f.key] = f.price
    }
  }
  return map
}

export function PricesPanel() {
  const [prices, setPrices] = useState<PriceMap>(initPrices)
  const [saved, setSaved] = useState(false)

  function adjust(stationId: string, fuel: string, delta: number) {
    setSaved(false)
    setPrices((prev) => ({
      ...prev,
      [stationId]: {
        ...prev[stationId],
        [fuel]: Math.max(0, +(prev[stationId][fuel] + delta).toFixed(2)),
      },
    }))
  }

  function applyAll(fuel: string, value: number) {
    setSaved(false)
    setPrices((prev) => {
      const next = { ...prev }
      for (const s of stations) {
        next[s.id] = { ...next[s.id], [fuel]: value }
      }
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Tags className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              لوحة أسعار الوقود
            </h3>
            <p className="text-xs text-muted-foreground">
              تحكم بأسعار المحطات الخمس (ر.س / لتر)
            </p>
          </div>
        </div>
        <button
          onClick={() => setSaved(true)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors',
            saved
              ? 'bg-[var(--success)]/15 text-[var(--success)]'
              : 'bg-primary text-primary-foreground hover:opacity-90',
          )}
        >
          {saved ? (
            <>
              <Check className="size-4" /> تم الحفظ
            </>
          ) : (
            <>
              <Save className="size-4" /> حفظ التغييرات
            </>
          )}
        </button>
      </div>

      {/* Quick apply to all */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {fuelTypes.map((f) => (
          <div
            key={f.key}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: f.color }}
              />
              <span className="text-sm font-medium text-foreground">
                {f.label} — توحيد السعر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => applyAll(f.key, +(f.price - 0.01).toFixed(2))}
                className="flex size-7 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-border"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-12 text-center font-mono text-sm font-bold text-foreground">
                {f.price.toFixed(2)}
              </span>
              <button
                onClick={() => applyAll(f.key, +(f.price + 0.01).toFixed(2))}
                className="flex size-7 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-border"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Per-station table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-2 border-b border-border bg-secondary/40 px-5 py-3 text-xs font-bold text-muted-foreground">
          <span>المحطة</span>
          {fuelTypes.map((f) => (
            <span key={f.key} className="text-center">
              {f.label}
            </span>
          ))}
        </div>
        {stations.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-center gap-2 border-b border-border px-5 py-4 last:border-0"
          >
            <span className="truncate text-sm font-medium text-foreground">
              {s.name}
            </span>
            {fuelTypes.map((f) => (
              <div
                key={f.key}
                className="flex items-center justify-center gap-1.5"
              >
                <button
                  onClick={() => adjust(s.id, f.key, -0.01)}
                  className="flex size-6 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-border"
                  aria-label="إنقاص"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-12 rounded-md bg-secondary/60 py-1 text-center font-mono text-sm font-bold text-foreground">
                  {prices[s.id][f.key].toFixed(2)}
                </span>
                <button
                  onClick={() => adjust(s.id, f.key, 0.01)}
                  className="flex size-6 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-border"
                  aria-label="زيادة"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
