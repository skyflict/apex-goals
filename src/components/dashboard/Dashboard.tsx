import React from 'react'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { Sidebar }         from './Sidebar'
import { HomeScreen }      from './screens/HomeScreen'
import { NewGoalScreen }   from './screens/NewGoalScreen'
import { GoalDetailScreen }from './screens/GoalDetailScreen'

export const Dashboard: React.FC = () => {
  const tab = useAppSelector(s => s.ui.dashboardTab)

  return (
    <div className="dashboard-root" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className="dashboard-main" style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        {tab === 'home'   && <HomeScreen />}
        {tab === 'new'    && <NewGoalScreen />}
        {tab === 'detail' && <GoalDetailScreen />}
      </main>
    </div>
  )
}
