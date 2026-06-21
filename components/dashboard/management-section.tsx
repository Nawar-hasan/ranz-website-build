'use client'

import { useState } from 'react'
import { FileText, Receipt, Fuel, Tags } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RecordsPanel } from '@/components/dashboard/panels/records-panel'
import { SalesPanel } from '@/components/dashboard/panels/sales-panel'
import { PumpsPanel } from '@/components/dashboard/panels/pumps-panel'
import { PricesPanel } from '@/components/dashboard/panels/prices-panel'

type Tab = 'records' | 'sales' | 'pumps' | 'prices'

const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: 'records', label: 'قراءة السجلات', icon: FileText },
  { key: 'sales', label: 'قراءة المبيع', icon: Receipt },
  { key: 'pumps', label: 'التحكم بالمضخات', icon: Fuel },
  { key: 'prices', label: 'لوحة الأسعار', icon: Tags },
]

export function ManagementSection() {
  const [tab, setTab] = useState<Tab>('records')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-2">
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          )
        })}
      </div>

      {tab === 'records' && <RecordsPanel />}
      {tab === 'sales' && <SalesPanel />}
      {tab === 'pumps' && <PumpsPanel />}
      {tab === 'prices' && <PricesPanel />}
    </div>
  )
}
