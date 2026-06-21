import { Fuel } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RanzLogo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/40">
        <Fuel className="size-6" strokeWidth={2.5} />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-mono text-3xl font-black tracking-[0.18em] text-primary">
            RANZ
          </span>
          <span className="mt-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground">
            إدارة محطات الوقود
          </span>
        </div>
      )}
    </div>
  )
}
