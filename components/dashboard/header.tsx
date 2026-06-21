'use client'

import { Bell, Search, Menu } from 'lucide-react'
import type { SectionKey } from '@/components/dashboard/sidebar'
import { RanzLogo } from '@/components/ranz-logo'

const titles: Record<SectionKey, { title: string; sub: string }> = {
  readings: {
    title: 'قراءات المحطات',
    sub: 'نظرة لحظية على أداء محطات رانز الخمس',
  },
  management: {
    title: 'إدارة المحطات',
    sub: 'السجلات والمبيعات والتحكم بالمضخات ولوحة الأسعار',
  },
}

export function Header({
  active,
  onToggleNav,
}: {
  active: SectionKey
  onToggleNav: () => void
}) {
  const meta = titles[active]
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleNav}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label="فتح القائمة"
          >
            <Menu className="size-5" />
          </button>
          <div className="lg:hidden">
            <RanzLogo showText={false} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-foreground md:text-2xl">
              {meta.title}
            </h1>
            <p className="hidden text-xs text-muted-foreground md:block">
              {meta.sub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              placeholder="بحث عن محطة أو سجل..."
              className="w-44 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="الإشعارات"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card py-1.5 pe-3 ps-1.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              م
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold leading-tight text-foreground">
                مدير النظام
              </p>
              <p className="text-[10px] text-muted-foreground">RANZ Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
