import React from 'react'
import { useAppDispatch }    from '@/hooks/useAppDispatch'
import { useAppSelector }    from '@/hooks/useAppSelector'
import { completeMilestone } from '@/store/slices/goalsSlice'
import { setDashboardTab }   from '@/store/slices/uiSlice'
import { Button }            from '@/components/ui/Button'
import { ProgressRing, AiInsight, EyebrowLabel, StripeCard, GoldTexture } from '@/components/ui'
import { BackIcon, CheckIcon } from '@/components/icons'
import { colors, fonts, radius } from '@/styles/theme'
import type { Milestone } from '@/types'

// ─── MilestoneItem ────────────────────────────────────────────────────────────
interface MilestoneItemProps {
  milestone: Milestone
  isLast:    boolean
  onComplete?: () => void
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ milestone, isLast, onComplete }) => (
  <div style={{ display: 'flex', gap: 14, paddingBottom: isLast ? 0 : 22, position: 'relative' }}>
    {/* Connector line */}
    {!isLast && (
      <div style={{ position: 'absolute', left: 11, top: 24, bottom: 0, width: 1, background: 'rgba(255,255,255,0.07)' }} />
    )}

    {/* Dot */}
    <div
      onClick={milestone.current ? onComplete : undefined}
      style={{
        width:          22, height: 22,
        borderRadius:   '50%',
        flexShrink:     0,
        zIndex:         1,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         milestone.current ? 'pointer' : 'default',
        background:     milestone.done    ? colors.accent
                      : milestone.current ? 'rgba(232,153,48,0.14)'
                      : 'rgba(255,255,255,0.05)',
        border:         milestone.done    ? 'none'
                      : milestone.current ? `1.5px solid rgba(232,153,48,0.45)`
                      : `1.5px solid rgba(255,255,255,0.12)`,
        boxShadow:      milestone.current ? `0 0 0 4px rgba(232,153,48,0.08)` : 'none',
      }}
    >
      {milestone.done    && <CheckIcon size={9} color={colors.bg} />}
      {milestone.current && <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />}
    </div>

    {/* Text */}
    <div style={{ paddingTop: 1, flex: 1 }}>
      <div style={{
        display:        'flex',
        alignItems:     'baseline',
        justifyContent: 'space-between',
        gap:            10,
      }}>
        <div style={{
          fontSize:        13,
          fontWeight:      milestone.current ? 500 : 400,
          color:           milestone.done    ? colors.textFaint
                         : milestone.current ? colors.text
                         : colors.textMuted,
          textDecoration:  milestone.done ? 'line-through' : 'none',
          fontFamily:      fonts.sans,
        }}>
          {milestone.text}
        </div>
        <div style={{
          fontSize:      9.5,
          color:         milestone.current ? colors.accent : colors.textGhost,
          fontFamily:    fonts.mono,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          flexShrink:    0,
        }}>
          {milestone.date}
        </div>
      </div>
    </div>
  </div>
)

// ─── GoalDetailScreen ─────────────────────────────────────────────────────────
export const GoalDetailScreen: React.FC = () => {
  const dispatch      = useAppDispatch()
  const goals         = useAppSelector(s => s.goals.goals)
  const selectedId    = useAppSelector(s => s.goals.selectedGoalId)
  const goal          = goals.find(g => g.id === selectedId) ?? goals[0]

  if (!goal) return null

  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: 720, animation: 'fadeUp 0.25s ease' }}>

      {/* Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <Button variant="icon" onClick={() => dispatch(setDashboardTab('home'))} style={{ padding: '7px 11px' }}>
          <BackIcon size={14} />
        </Button>
        <span style={{
          fontSize:      10.5,
          letterSpacing: '1.6px',
          textTransform: 'uppercase',
          color:         colors.textGhost,
        }}>
          Мои цели · {goal.category}
        </span>
      </div>

      {/* Hero */}
      <StripeCard stripe={goal.color} style={{
        background:   `linear-gradient(135deg, ${goal.color}10 0%, ${colors.surface} 60%)`,
        padding:      '26px 26px',
        marginBottom: 14,
        display:      'flex',
        alignItems:   'center',
        gap:          26,
      }}>
        <GoldTexture opacity={0.025} />
        <ProgressRing progress={goal.progress} size={108} strokeWidth={6} color={goal.color} fontSize={16} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <EyebrowLabel color={goal.color}>{goal.category}</EyebrowLabel>
            {goal.level && (
              <span style={{
                fontSize:      9.5,
                fontFamily:    fonts.mono,
                color:         goal.color,
                background:    `${goal.color}1A`,
                padding:       '3px 7px',
                borderRadius:  4,
                letterSpacing: '0.5px',
              }}>
                {goal.level}
              </span>
            )}
          </div>
          <h1 style={{
            fontSize:      26,
            fontWeight:    500,
            fontFamily:    fonts.serif,
            margin:        '0 0 6px',
            lineHeight:    1.15,
            letterSpacing: '-0.005em',
          }}>
            {goal.title}
          </h1>
          <p style={{ fontSize: 13, color: colors.textMuted }}>
            <span style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 16, color: goal.color }}>
              {goal.daysLeft}
            </span> дней до дедлайна
          </p>
        </div>
      </StripeCard>

      {/* Next action */}
      <div style={{
        background:   'rgba(232,153,48,0.07)',
        border:       `1px solid ${colors.accentBorder}`,
        borderRadius: radius.lg,
        padding:      '14px 18px',
        marginBottom: 28,
        display:      'flex',
        justifyContent: 'space-between',
        alignItems:   'center',
        gap:          10,
      }}>
        <div>
          <EyebrowLabel color={colors.accent}>Следующий шаг</EyebrowLabel>
          <div style={{ fontSize: 13.5, color: colors.text, fontFamily: fonts.sans, marginTop: 4 }}>
            {goal.nextAction}
            {goal.nextDuration && (
              <span style={{
                fontSize:      11,
                color:         colors.textFaint,
                fontFamily:    fonts.mono,
                marginLeft:    8,
              }}>≈ {goal.nextDuration}</span>
            )}
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => {
            const current = goal.milestones.find(m => m.current)
            if (current) dispatch(completeMilestone({ goalId: goal.id, milestoneId: current.id }))
          }}
        >
          Выполнить
        </Button>
      </div>

      {/* Milestones */}
      <EyebrowLabel>Вехи · {goal.milestones.filter(m=>m.done).length} из {goal.milestones.length}</EyebrowLabel>
      <div style={{ marginTop: 18, marginBottom: 28 }}>
        {goal.milestones.map((m, i) => (
          <MilestoneItem
            key={m.id}
            milestone={m}
            isLast={i === goal.milestones.length - 1}
            onComplete={() => dispatch(completeMilestone({ goalId: goal.id, milestoneId: m.id }))}
          />
        ))}
      </div>

      {/* AI analysis */}
      <AiInsight
        text={<>Ты занимаешься стабильно — молодец. При текущем темпе достигнешь цели на <span style={{ color: colors.accent, fontStyle: 'normal', fontWeight: 600 }}>12 дней раньше</span> срока.</>}
        color={colors.accent}
        label="Анализ ИИ · 2 мин назад"
      />
    </div>
  )
}
