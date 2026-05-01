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
import { WEEK_RHYTHM }     from '@/constants/data'
import { colors, fonts, radius } from '@/styles/theme'

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const user     = useAppSelector(s => s.auth.user)
  const goals    = useAppSelector(s => s.goals.goals)

  const avgProgress = goals.length
    ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length)
    : 0
  const streak = 18

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
            {goals.length} активные цели — ты опережаешь график на 4 дня.
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
                Ты впереди графика на <Em>4 дня</Em>
              </div>
              <div style={{ fontSize: 12.5, color: colors.textMuted, lineHeight: 1.5, fontFamily: fonts.sans }}>
                Сохраняй текущий темп — и полумарафон случится на 12 дней раньше срока.
              </div>
            </div>
          </div>

          {/* Stats column */}
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 8 }}>
            <StatCard label="Активных целей" value={goals.length}   sub="в работе"       color={colors.accent} />
            <StatCard label="Задач за неделю" value={14}             sub="+3 к прошлой"    color={colors.teal}   />
            <StatCard label="Текущая серия"   value={streak}         sub="дней подряд"    color={colors.purple} />
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
            <div>Завершённые · 7</div>
          </div>
        </div>

        {/* Goal rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {goals.map(g => (
            <GoalCard key={g.id} goal={g} onClick={() => handleGoalClick(g.id)} />
          ))}
        </div>

        {/* Insight + Week rhythm */}
        <div className="home-bottom-row" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 12,
          marginTop: 22,
        }}>
          <AiInsight
            serif
            label="Инсайт от ИИ · 2 мин назад"
            text={
              <>
                Ты отстаёшь по испанскому на 3 урока. Занимайся{' '}
                <span style={{ color: colors.accent, fontStyle: 'normal', fontFamily: fonts.sans, fontWeight: 500 }}>
                  40 мин/день
                </span>{' '}
                вместо 20 на этой неделе — и вернёшься в график.
              </>
            }
            actions={
              <>
                <Button size="sm">Принять план</Button>
                <Button size="sm" variant="ghost">Отложить</Button>
              </>
            }
          />
          <WeekRhythm days={WEEK_RHYTHM} summary="14 / 18 задач" />
        </div>
      </div>
    </div>
  )
}
