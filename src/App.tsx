import React from 'react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { LandingScreen }  from '@/components/landing/LandingScreen'
import { AuthScreen }     from '@/components/auth/AuthScreen'
import { Dashboard }      from '@/components/dashboard/Dashboard'

const App: React.FC = () => {
  const screen = useAppSelector(s => s.ui.screen)

  return (
    <>
      {screen === 'landing'   && <LandingScreen />}
      {screen === 'auth'      && <AuthScreen />}
      {screen === 'dashboard' && <Dashboard />}
    </>
  )
}

export default App
