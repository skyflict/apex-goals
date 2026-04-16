import React from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { selectGoal }      from '@/store/slices/goalsSlice'
import { setDashboardTab } from '@/store/slices/uiSlice'
import { Button }          from '@/components/ui/Button'
import { StatCard, AiInsight } from '@/components/ui'
import { GoalCard }        from '@/components/dashboard/GoalCard'
import { colors, fonts }   from '@/styles/theme'

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const user     = useAppSelector(s => s.auth.user)
  const goals    = useAppSelector(s => s.goals.goals)

  const avgProgress = Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length)
  const completedTasks = 14

  const handleGoalClick = (id: string) => {
    dispatch(selectGoal(id))
    dispatch(setDashboardTab('detail'))
  }

  return (
    <div style={{ padding: '22px 20px', maxWidth: 720, animation: 'fadeUp 0.25s ease' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: 'rgba(237,232,223,0.35)', marginBottom: 3 }}>
          {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 500, fontFamily: fonts.serif }}>
          Добрый день, {user?.name ?? 'Никита'}
        </h1>
        <div style={{ fontSize: 13, color: 'rgba(237,232,223,0.45)', marginTop: 3 }}>
          {goals.length} активные цели — ты в пути
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9, marginBottom: 22 }}>
        <StatCard label="Активных целей" value={goals.length} />
        <StatCard label="Задач выполнено" value={completedTasks} />
        <StatCard label="Средний прогресс" value={`${avgProgress}%`} />
      </div>

      {/* Goals list */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(237,232,223,0.52)' }}>Мои цели</div>
        <Button size="sm" style={{ fontSize: 12, padding: '7px 13px' }} onClick={() => dispatch(setDashboardTab('new'))}>
          + Добавить
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        {goals.map(g => (
          <GoalCard key={g.id} goal={g} onClick={() => handleGoalClick(g.id)} />
        ))}
      </div>

      <AiInsight
        text="Ты отстаёшь по испанскому на 3 урока. Занимайся 40 мин/день вместо 20 на этой неделе — и вернёшься в график."
        color={colors.accent}
      />
    </div>
  )
}
