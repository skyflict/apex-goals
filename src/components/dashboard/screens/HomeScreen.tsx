import React from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { selectGoal }      from '@/store/slices/goalsSlice'
import { setDashboardTab } from '@/store/slices/uiSlice'
import { Button }          from '@/components/ui/Button'
import {
  ProgressRing,
  StatCard,
  AiInsight,
  WeekRhythm,
  EyebrowLabel,
  SerifHeading,
  Em,
  GoldTexture,
} from '@/components/ui'
import { GoalCard }        from '@/components/dashboard/GoalCard'
import { colors, fonts, radius } from '@/styles/theme'
import type { WeekDay }    from '@/components/ui'

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const user     = useAppSelector(s => s.auth.user)
  const goals    = useAppSelector(s => s.goals.goals)

  const avgProgress = goals.length
    ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length)
    : 0
  const completedGoals = goals.filter(g => g.progress >= 100).length
  const activeGoals = goals.filter(g => g.progress < 100).length
  const completedMilestones = goals.reduce((sum, goal) => (
    sum + goal.milestones.filter(m => m.done).length
  ), 0)
  const totalMilestones = goals.reduce((sum, goal) => sum + goal.milestones.length, 0)
  const currentGoal = goals.find(g => g.milestones.some(m => m.current)) ?? goals[0]
  const currentMilestone = currentGoal?.milestones.find(m => m.current)
  const streak = goals.reduce((max, goal) => Math.max(max, goal.streak ?? 0), 0)
  const nearestDeadline = goals.length
    ? Math.min(...goals.map(goal => goal.daysLeft))
    : 0
  const progressLabel = goals.length
    ? avgProgress >= 70
      ? 'Темп высокий'
      : avgProgress >= 35
        ? 'План набирает ход'
        : 'Стартовый этап'
    : 'Пока нет целей'
  const progressText = goals.length
    ? avgProgress >= 70
      ? 'Большая часть пути уже закрыта. Сейчас важнее удержать ритм и не распыляться на новые задачи.'
      : avgProgress >= 35
        ? `Следующий фокус: ${currentGoal?.nextAction ?? 'выбрать ближайшее действие'}`
        : 'Создай первую цель и сохрани AI-план — дашборд начнёт считать прогресс автоматически.'
    : 'Добавь цель через AI-коуча, и здесь появятся прогресс, ближайшее действие и история движения.'
  const weekRhythm = buildWeekRhythm(completedMilestones, totalMilestones)

  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })

  const handleGoalClick = (id: string) => {
    dispatch(selectGoal(id))
    dispatch(setDashboardTab('detail'))
  }

  return (
    <div className="home-screen" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Aurora bg */}
      <div style={{
        position: 'absolute', top: -140, right: -100, width: 620, height: 420,
        background: 'radial-gradient(ellipse, rgba(232,153,48,0.1), transparent 65%)',
        pointerEvents: 'none',
      }}/>

      {/* Top bar */}
      <div className="home-topbar" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 40px',
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky', top: 0, zIndex: 5,
        background: 'rgba(11,13,20,0.8)', backdropFilter: 'blur(14px)',
      }}>
        <div className="home-search" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${colors.border}`,
          borderRadius: 999,
          padding: '6px 14px',
          fontSize: 12, color: colors.textFaint,
          width: 280,
        }}>
          <span>⌕</span>
          <span>Поиск целей, задач, заметок…</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: colors.textGhost, fontFamily: fonts.mono }}>⌘K</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 11, color: colors.textMuted, letterSpacing: '0.3px' }}>
            Серия <b style={{ color: colors.accent }}>{streak} дней</b>
          </div>
          <Button size="sm" onClick={() => dispatch(setDashboardTab('new'))}>+ Новая цель</Button>
        </div>
      </div>

      {/* Content */}
      <div className="home-content" style={{ padding: '28px 40px 60px', maxWidth: 1120, position: 'relative' }}>
        {/* Greeting */}
        <div style={{ marginBottom: 24 }}>
          <EyebrowLabel style={{ marginBottom: 8 }}>{today}</EyebrowLabel>
          <SerifHeading size={44}>
            Добрый день, <Em>{user?.name ?? 'Никита'}</Em>
          </SerifHeading>
          <div style={{ fontSize: 14, color: colors.textMuted, marginTop: 8, fontFamily: fonts.sans }}>
            {activeGoals} активные цели · {completedMilestones} из {totalMilestones} этапов закрыто.
          </div>
        </div>

        {/* Hero + stats row */}
        <div className="home-hero-row" style={{
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gap: 14,
          marginBottom: 14,
        }}>
          {/* Hero card */}
          <div style={{
            background:   `linear-gradient(135deg, rgba(232,153,48,0.09) 0%, ${colors.surface} 60%)`,
            border:       `1px solid ${colors.accentBorder}`,
            borderRadius: radius.xxl,
            padding:      '24px 26px',
            display:      'flex',
            alignItems:   'center',
            gap:          24,
            position:     'relative',
            overflow:     'hidden',
          }}>
            <GoldTexture opacity={0.03} />
            <ProgressRing
              progress={avgProgress}
              size={104}
              strokeWidth={6}
              color={colors.accent}
              trackColor="rgba(232,153,48,0.12)"
            >
              <div style={{
                fontFamily: fonts.serif, fontSize: 30, fontStyle: 'italic',
                fontWeight: 500, color: colors.accent, lineHeight: 1,
              }}>
                {avgProgress}<span style={{ fontSize: 14, color: colors.textMuted, fontStyle: 'normal' }}>%</span>
              </div>
            </ProgressRing>
            <div style={{ flex: 1 }}>
              <EyebrowLabel color={colors.accent} style={{ marginBottom: 6 }}>
                Средний прогресс
              </EyebrowLabel>
              <div style={{
                fontFamily: fonts.serif, fontSize: 22, fontWeight: 400,
                color: colors.text, lineHeight: 1.2, marginBottom: 4,
              }}>
                {progressLabel}: <Em>{avgProgress}%</Em>
              </div>
              <div style={{ fontSize: 12.5, color: colors.textMuted, lineHeight: 1.5, fontFamily: fonts.sans }}>
                {progressText}
              </div>
            </div>
          </div>

          {/* Stats column */}
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 8 }}>
            <StatCard label="Активных целей" value={activeGoals} sub={`${completedGoals} завершено`} color={colors.accent} />
            <StatCard label="Этапов закрыто" value={completedMilestones} sub={`из ${totalMilestones || 0} в планах`} color={colors.teal} />
            <StatCard label="Ближайший срок" value={nearestDeadline || '—'} sub={goals.length ? 'дней осталось' : 'создай цель'} color={colors.purple} />
          </div>
        </div>

        {/* Goals section */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          padding: '20px 2px 14px',
        }}>
          <div>
            <EyebrowLabel style={{ marginBottom: 4 }}>Мои цели</EyebrowLabel>
            <SerifHeading size={22}>
              Что <Em>в работе</Em>
            </SerifHeading>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: colors.textMuted, fontFamily: fonts.sans }}>
            <div>Все · <b style={{ color: colors.text }}>{goals.length}</b></div>
            <div style={{ color: colors.textGhost }}>·</div>
            <div>Завершённые · {completedGoals}</div>
          </div>
        </div>

        {/* Goal rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {goals.length ? (
            goals.map(g => (
              <GoalCard key={g.id} goal={g} onClick={() => handleGoalClick(g.id)} />
            ))
          ) : (
            <div style={{
              border:       `1px solid ${colors.border}`,
              background:   colors.surface,
              borderRadius: radius.xl,
              padding:      '22px',
              display:      'flex',
              justifyContent: 'space-between',
              alignItems:   'center',
              gap:          16,
            }}>
              <div>
                <div style={{ fontSize: 16, color: colors.text, marginBottom: 5 }}>Целей пока нет</div>
                <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5 }}>
                  Создай первую цель, и она появится здесь вместе с прогрессом, этапами и ближайшим действием.
                </div>
              </div>
              <Button size="sm" onClick={() => dispatch(setDashboardTab('new'))}>Создать</Button>
            </div>
          )}
        </div>

        {/* Insight + rhythm */}
        <div className="home-bottom-row" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 12,
          marginTop: 22,
        }}>
          <AiInsight
            serif
            label="Инсайт от ИИ"
            text={
              <>
                {currentGoal ? (
                  <>
                    Ближайший фокус: <span style={{ color: colors.accent, fontStyle: 'normal', fontFamily: fonts.sans, fontWeight: 500 }}>
                      {currentMilestone?.text ?? currentGoal.nextAction}
                    </span>. Это продвинет цель «{currentGoal.title}» без лишнего планирования.
                  </>
                ) : (
                  <>
                    Опиши первую цель, текущие ресурсы и срок. AI соберёт план, а дашборд начнёт показывать реальную историю прогресса.
                  </>
                )}
                {/* spacing */}
                {' '}
                {currentGoal && currentGoal.nextDuration && (
                  <>
                    Рекомендуемый слот:{' '}
                    <span style={{ color: colors.accent, fontStyle: 'normal', fontFamily: fonts.sans, fontWeight: 500 }}>
                      {currentGoal.nextDuration}
                    </span>.
                  </>
                )}
              </>
            }
            actions={
              <Button size="sm" onClick={() => dispatch(setDashboardTab(currentGoal ? 'detail' : 'new'))}>
                {currentGoal ? 'Открыть цель' : 'Создать цель'}
              </Button>
            }
          />
          <WeekRhythm
            days={weekRhythm}
            summary={`${completedMilestones} / ${totalMilestones || 0} этапов`}
          />
        </div>
      </div>
    </div>
  )
}

const buildWeekRhythm = (completed: number, total: number): WeekDay[] => {
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1
  const percent = total ? Math.max(10, Math.round((completed / total) * 100)) : 8

  return labels.map((day, index) => ({
    day,
    value: index <= todayIndex ? Math.min(100, percent + index * 4) : 12,
    done: index < todayIndex && completed > 0,
    today: index === todayIndex,
  }))
}
