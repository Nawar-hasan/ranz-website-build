export type StationStatus = 'online' | 'maintenance' | 'offline'

export interface Station {
  id: string
  name: string
  city: string
  status: StationStatus
  pumps: number
  activePumps: number
  todaySales: number
  todayLiters: number
  tankLevel: number
  pumpsNeedRefill: number
  link: string
}

export const stations: Station[] = [
  {
    id: 'st-01',
    name: 'محطة المداين',
    city: 'حايل',
    status: 'online',
    pumps: 4,
    activePumps: 4,
    todaySales: 18355,
    todayLiters: 150,
    tankLevel: 30,
    pumpsNeedRefill: 70,
    link: 'https://tanksalmdain.ranzstation.com/',
  },
  {
    id: 'st-02',
    name: 'محطة الضبيان',
    city: 'حايل',
    status: 'online',
    pumps: 14,
    activePumps: 14,
    todaySales: 142900,
    todayLiters: 61200,
    tankLevel: 64,
    pumpsNeedRefill: 0,
    link: '#',
  },
  {
    id: 'st-03',
    name: 'محطة الحميدان',
    city: 'حايل',
    status: 'maintenance',
    pumps: 4,
    activePumps: 4,
    todaySales: 98500,
    todayLiters: 41800,
    tankLevel: 38,
    pumpsNeedRefill: 3,
    link: '#',
  },
  {
    id: 'st-04',
    name: 'محطة الرصف',
    city: 'حايل',
    status: 'online',
    pumps: 4,
    activePumps: 4,
    todaySales: 121300,
    todayLiters: 52600,
    tankLevel: 71,
    pumpsNeedRefill: 1,
    link: '#',
  },
  {
    id: 'st-05',
    name: 'محطة الوسيطاء',
    city: 'حايل',
    status: 'offline',
    pumps: 3,
    activePumps: 3,
    todaySales: 0,
    todayLiters: 0,
    tankLevel: 19,
    pumpsNeedRefill: 4,
    link: '#',
  },
]

export interface FuelType {
  key: string
  label: string
  price: number
  color: string
}

export const fuelTypes: FuelType[] = [
  { key: '91', label: 'بنزين 91', price: 2.18, color: 'var(--chart-2)' },
  { key: '95', label: 'بنزين 95', price: 2.33, color: 'var(--chart-1)' },
  { key: 'diesel', label: 'ديزل', price: 1.15, color: 'var(--chart-4)' },
]

export const statusMeta: Record<
  StationStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  online: {
    label: 'متصلة',
    dot: 'bg-[var(--success)]',
    text: 'text-[var(--success)]',
    bg: 'bg-[var(--success)]/10',
  },
  maintenance: {
    label: 'صيانة',
    dot: 'bg-[var(--warning)]',
    text: 'text-[var(--warning)]',
    bg: 'bg-[var(--warning)]/10',
  },
  offline: {
    label: 'متوقفة',
    dot: 'bg-destructive',
    text: 'text-destructive',
    bg: 'bg-destructive/10',
  },
}

export function formatSAR(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}
