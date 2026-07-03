'use client'

import Image from 'next/image'
import { ArrowLeft, Gauge, Fuel, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const highlights = [
  {
    icon: Fuel,
    title: 'محطات رانز',
    desc: 'إدارة موحّدة لجميع محطات الوقود من مكان واحد',
  },
  {
    icon: Gauge,
    title: 'قراءات لحظية',
    desc: 'متابعة المبيعات والمضخات ومستويات الخزانات',
  },
  {
    icon: ShieldCheck,
    title: 'تحكم آمن',
    desc: 'دخول محمي وإدارة كاملة للأسعار والمضخات',
  },
]

export function IntroScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* warm ambient accents */}
      <div className="pointer-events-none absolute -top-32 right-0 size-[28rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 size-[26rem] rounded-full bg-destructive/10 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Logo card */}
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <div className="flex items-center justify-center rounded-3xl bg-white px-10 py-8 shadow-2xl shadow-primary/20 ring-1 ring-border">
            <Image
              src="/ranz-logo-header.png"
              alt="شعار شركة رانز"
              width={260}
              height={90}
              priority
              className="h-auto w-[220px] md:w-[260px]"
            />
          </div>
        </div>

        <h1 className="mt-10 text-balance text-3xl font-black leading-tight text-foreground md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          نظام إدارة محطات الوقود
        </h1>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground md:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          منصة رانز لإدارة وتشغيل المحطات: قراءات المبيعات، التحكم بالمضخات،
          وإدارة لوحة الأسعار لجميع المحطات الخمس من لوحة تحكم واحدة.
        </p>

        {/* Highlights */}
        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <h.icon className="size-5" strokeWidth={2.4} />
              </div>
              <span className="font-bold text-foreground">{h.title}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {h.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 fill-mode-both">
          <Button
            size="lg"
            onClick={onEnter}
            className="group h-13 gap-2 rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/30"
          >
            الدخول إلى لوحة التحكم
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">
          شركة مقامات الخليج للوقود — RANZ
        </p>
      </div>
    </main>
  )
}
