'use client'

import { useState } from 'react'
import { IntroScreen } from '@/components/landing/intro-screen'
import { LoginScreen } from '@/components/auth/login-screen'
import { DashboardApp } from '@/components/dashboard/dashboard-app'

type Stage = 'intro' | 'login' | 'dashboard'

export default function Page() {
  const [stage, setStage] = useState<Stage>('intro')

  if (stage === 'intro') {
    return <IntroScreen onEnter={() => setStage('login')} />
  }

  if (stage === 'login') {
    return (
      <LoginScreen
        onBack={() => setStage('intro')}
        onSuccess={() => setStage('dashboard')}
      />
    )
  }

  return <DashboardApp onLogout={() => setStage('intro')} />
}
