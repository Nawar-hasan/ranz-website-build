'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoginScreen({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('الرجاء إدخال اسم المستخدم وكلمة المرور')
      return
    }
    setLoading(true)
    // Front-end demo gate. Replace with real authentication later.
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 700)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute -top-32 left-0 size-[26rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 size-[24rem] rounded-full bg-destructive/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-4" />
          رجوع
        </button>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/10">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-2xl bg-white px-6 py-4 ring-1 ring-border">
              <Image
                src="/ranz-logo-header.png"
                alt="شعار شركة رانز"
                width={170}
                height={58}
                priority
                className="h-auto w-[150px]"
              />
            </div>
            <h1 className="mt-6 text-2xl font-black text-foreground">
              تسجيل الدخول
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              أدخل بياناتك للوصول إلى لوحة تحكم المحطات
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-semibold text-foreground"
              >
                اسم المستخدم
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="h-12 w-full rounded-xl border border-input bg-background pr-10 pl-4 text-sm text-foreground outline-none ring-ring/40 transition focus:border-ring focus:ring-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-input bg-background pr-10 pl-10 text-sm text-foreground outline-none ring-ring/40 transition focus:border-ring focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPass ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPass ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="mt-2 h-12 gap-2 rounded-xl text-base font-bold shadow-lg shadow-primary/30"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? 'جارٍ الدخول...' : 'دخول'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          نظام إدارة محطات الوقود — RANZ
        </p>
      </div>
    </main>
  )
}
