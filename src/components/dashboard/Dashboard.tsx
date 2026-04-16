import React from 'react'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { Sidebar }         from './Sidebar'
import { HomeScreen }      from './screens/HomeScreen'
import { NewGoalScreen }   from './screens/NewGoalScreen'
import { GoalDetailScreen }from './screens/GoalDetailScreen'
import { colors }          from '@/styles/theme'

export const Dashboard: React.FC = () => {
  const tab = useAppSelector(s => s.ui.dashboardTab)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'home'   && <HomeScreen />}
        {tab === 'new'    && <NewGoalScreen />}
        {tab === 'detail' && <GoalDetailScreen />}
      </main>
    </div>
  )
}
