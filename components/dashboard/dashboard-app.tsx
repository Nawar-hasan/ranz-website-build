'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Sidebar, type SectionKey } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { ReadingsSection } from '@/components/dashboard/readings-section'
import { ManagementSection } from '@/components/dashboard/management-section'
import { RanzLogo } from '@/components/ranz-logo'

export function DashboardApp({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<SectionKey>('readings')
  const [navOpen, setNavOpen] = useState(false)

  function select(key: SectionKey) {
    setActive(key)
    setNavOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active={active} onSelect={select} onLogout={onLogout} />

      {/* Mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 border-l border-sidebar-border bg-sidebar p-4">
            <div className="flex items-center justify-between">
              <RanzLogo />
              <button
                onClick={() => setNavOpen(false)}
                className="flex size-9 items-center justify-center rounded-lg border border-border"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <button
                onClick={() => select('readings')}
                className={`rounded-xl px-4 py-3 text-right text-sm font-bold ${active === 'readings' ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
              >
                قراءات المحطات
              </button>
              <button
                onClick={() => select('management')}
                className={`rounded-xl px-4 py-3 text-right text-sm font-bold ${active === 'management' ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
              >
                إدارة المحطات
              </button>
              <button
                onClick={onLogout}
                className="mt-2 rounded-xl px-4 py-3 text-right text-sm font-bold text-muted-foreground hover:bg-sidebar-accent"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header active={active} onToggleNav={() => setNavOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
          {active === 'readings' ? <ReadingsSection /> : <ManagementSection />}
        </main>
      </div>
    </div>
  )
}
