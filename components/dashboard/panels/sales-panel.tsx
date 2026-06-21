'use client'

import { Calendar, TrendingUp } from 'lucide-react'
import { stations, fuelTypes, formatSAR } from '@/lib/stations-data'

const weekData = [
  { day: 'السبت', value: 540 },
  { day: 'الأحد', value: 610 },
  { day: 'الإثنين', value: 480 },
  { day: 'الثلاثاء', value: 720 },
  { day: 'الأربعاء', value: 650 },
  { day: 'الخميس', value: 830 },
  { day: 'الجمعة', value: 910 },
]

export function SalesPanel() {
  const max = Math.max(...weekData.map((d) => d.value))
  const totalSales = stations.reduce((s, st) => s + st.todaySales, 0)
  const sortedStations = [...stations].sort(
    (a, b) => b.todaySales - a.todaySales,
  )
  const maxStation = sortedStations[0].todaySales || 1

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">
              مبيعات الأسبوع
            </h3>
            <p className="text-xs text-muted-foreground">
              إجمالي المبيعات اليومية (بالألف ر.س)
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground">
            <Calendar className="size-4" />
            هذا الأسبوع
          </button>
        </div>
        <div className="mt-8 flex h-56 items-end justify-between gap-3">
          {weekData.map((d) => (
            <div
              key={d.day}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <span className="font-mono text-xs font-bold text-foreground">
                {d.value}
              </span>
              <div className="flex w-full items-end justify-center">
                <div
                  className="w-full max-w-10 rounded-t-lg bg-primary transition-all hover:opacity-80"
                  style={{ height: `${(d.value / max) * 170}px` }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">إجمالي مبيع اليوم</p>
          <p className="mt-2 font-mono text-3xl font-extrabold text-foreground">
            {formatSAR(totalSales)}
            <span className="text-sm font-normal text-muted-foreground">
              {' '}
              ر.س
            </span>
          </p>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-[var(--success)]">
            <TrendingUp className="size-3.5" />
            +12.4% مقارنة بالأمس
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 text-sm font-bold text-foreground">
            التوزيع حسب نوع الوقود
          </p>
          <div className="space-y-3">
            {fuelTypes.map((f, i) => {
              const pct = [48, 34, 18][i]
              return (
                <div key={f.key}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-foreground">{f.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: f.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-3">
        <h3 className="mb-4 text-base font-bold text-foreground">
          المبيع حسب المحطة
        </h3>
        <div className="space-y-4">
          {sortedStations.map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              <span className="w-44 shrink-0 truncate text-sm text-foreground">
                {s.name}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(s.todaySales / maxStation) * 100}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-left font-mono text-sm font-bold text-foreground">
                {formatSAR(s.todaySales)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
