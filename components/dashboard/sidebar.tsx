'use client'

import {
  LayoutDashboard,
  Gauge,
  SlidersHorizontal,
  FileText,
  Receipt,
  Fuel,
  Tags,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react'
import { RanzLogo } from '@/components/ranz-logo'
import { cn } from '@/lib/utils'

export type SectionKey = 'readings' | 'management'

const nav: {
  key: SectionKey
  label: string
  icon: typeof LayoutDashboard
  hint: string
}[] = [
  {
    key: 'readings',
    label: 'قراءات المحطات',
    icon: Gauge,
    hint: 'متابعة أداء المحطات الخمس',
  },
  {
    key: 'management',
    label: 'إدارة المحطات',
    icon: SlidersHorizontal,
    hint: 'السجلات، المبيع، المضخات والأسعار',
  },
]

const tools = [
  { label: 'السجلات', icon: FileText },
  { label: 'تقارير المبيع', icon: Receipt },
  { label: 'المضخات', icon: Fuel },
  { label: 'لوحة الأسعار', icon: Tags },
]

export function Sidebar({
  active,
  onSelect,
  onLogout,
}: {
  active: SectionKey
  onSelect: (key: SectionKey) => void
  onLogout: () => void
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-l border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
      <div className="px-2">
        <RanzLogo />
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          الأقسام الرئيسية
        </p>
        {nav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={cn(
                'group flex items-start gap-3 rounded-xl px-3 py-3 text-right transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent',
              )}
            >
              <Icon className="mt-0.5 size-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-sm font-bold">{item.label}</span>
                <span
                  className={cn(
                    'text-[11px]',
                    isActive
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground',
                  )}
                >
                  {item.hint}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-8 flex flex-col gap-1">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          الخدمات
        </p>
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <button
              key={tool.label}
              onClick={() => onSelect('management')}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <Icon className="size-4 text-muted-foreground" />
              {tool.label}
            </button>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-4">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
          <Settings className="size-4 text-muted-foreground" />
          الإعدادات
        </button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
          <LifeBuoy className="size-4 text-muted-foreground" />
          الدعم الفني
        </button>
      </div>
    </aside>
  )
}
