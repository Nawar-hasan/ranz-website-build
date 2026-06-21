'use client'

import { Download, Filter } from 'lucide-react'
import { stations, statusMeta } from '@/lib/stations-data'

interface LogRow {
  time: string
  station: string
  event: string
  user: string
  type: 'info' | 'warning' | 'error' | 'success'
}

const logs: LogRow[] = [
  {
    time: '14:32',
    station: 'محطة رانز المركزية',
    event: 'تم تحديث سعر بنزين 95 إلى 2.33 ر.س',
    user: 'مدير النظام',
    type: 'success',
  },
  {
    time: '13:58',
    station: 'محطة رانز الطريق السريع',
    event: 'إيقاف المضخة رقم 6 للصيانة الدورية',
    user: 'فني المحطة',
    type: 'warning',
  },
  {
    time: '12:14',
    station: 'محطة رانز الشمالية',
    event: 'اكتمال تعبئة خزان الديزل بنجاح',
    user: 'النظام الآلي',
    type: 'info',
  },
  {
    time: '11:05',
    station: 'محطة رانز الصناعية',
    event: 'انقطاع الاتصال بوحدة التحكم الرئيسية',
    user: 'النظام الآلي',
    type: 'error',
  },
  {
    time: '09:47',
    station: 'محطة رانز الجنوبية',
    event: 'بدء وردية الصباح وتفعيل 5 مضخات',
    user: 'مشرف الوردية',
    type: 'success',
  },
  {
    time: '08:30',
    station: 'محطة رانز المركزية',
    event: 'قراءة العدادات الافتتاحية للخزانات',
    user: 'النظام الآلي',
    type: 'info',
  },
]

const typeColor: Record<LogRow['type'], string> = {
  info: 'bg-[var(--chart-2)]',
  warning: 'bg-[var(--warning)]',
  error: 'bg-destructive',
  success: 'bg-[var(--success)]',
}

export function RecordsPanel() {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h3 className="text-base font-bold text-foreground">
            سجل الأحداث والعمليات
          </h3>
          <p className="text-xs text-muted-foreground">
            آخر العمليات المسجلة على مستوى جميع المحطات
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
            <Filter className="size-4" />
            تصفية
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:opacity-90">
            <Download className="size-4" />
            تصدير
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 transition-colors hover:bg-secondary/40"
          >
            <span
              className={`mt-1.5 size-2.5 shrink-0 rounded-full ${typeColor[log.type]}`}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{log.event}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {log.station} • {log.user}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {log.time}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border p-4 text-xs text-muted-foreground">
        <span>عرض {logs.length} من 1,284 عملية</span>
        <div className="flex gap-1">
          {stations.map((s) => (
            <span
              key={s.id}
              className={`size-2 rounded-full ${statusMeta[s.status].dot}`}
              title={s.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
