import React, { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { LandingScreen }  from '@/components/landing/LandingScreen'
import { AuthScreen }     from '@/components/auth/AuthScreen'
import { Dashboard }      from '@/components/dashboard/Dashboard'
import { setUser }        from '@/store/slices/authSlice'
import { clearGoals, setGoals } from '@/store/slices/goalsSlice'
import { setScreen }      from '@/store/slices/uiSlice'
import { subscribeToAuth } from '@/services/auth'
import { loadUserGoals }  from '@/services/goalsRepository'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const screen = useAppSelector(s => s.ui.screen)

  useEffect(() => {
    const unsubscribe = subscribeToAuth(user => {
      dispatch(setUser(user))
      if (!user) {
        dispatch(clearGoals())
        return
      }

      dispatch(setScreen('dashboard'))
      loadUserGoals()
        .then(goals => dispatch(setGoals(goals)))
        .catch(err => {
          console.error('Failed to load goals from Supabase', err)
          dispatch(setGoals([]))
        })
    })

    return unsubscribe
  }, [dispatch])

  return (
    <>
      {screen === 'landing'   && <LandingScreen />}
      {screen === 'auth'      && <AuthScreen />}
      {screen === 'dashboard' && <Dashboard />}
    </>
  )
}

export default App
