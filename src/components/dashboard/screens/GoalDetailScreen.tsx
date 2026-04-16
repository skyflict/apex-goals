import React from 'react'
import { useAppDispatch }    from '@/hooks/useAppDispatch'
import { useAppSelector }    from '@/hooks/useAppSelector'
import { completeMilestone } from '@/store/slices/goalsSlice'
import { setDashboardTab }   from '@/store/slices/uiSlice'
import { Button }            from '@/components/ui/Button'
import { ProgressRing, Badge, AiInsight } from '@/components/ui'
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
  <div style={{ display: 'flex', gap: 13, paddingBottom: isLast ? 0 : 20, position: 'relative' }}>
    {/* Connector line */}
    {!isLast && (
      <div style={{ position: 'absolute', left: 10, top: 22, bottom: 0, width: 1, background: 'rgba(255,255,255,0.07)' }} />
    )}

    {/* Dot */}
    <div
      onClick={milestone.current ? onComplete : undefined}
      style={{
        width:          21, height: 21,
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
      }}
    >
      {milestone.done    && <CheckIcon size={9} color={colors.bg} />}
      {milestone.current && <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />}
    </div>

    {/* Text */}
    <div style={{ paddingTop: 1 }}>
      <div style={{
        fontSize:        12,
        fontWeight:      milestone.current ? 500 : 400,
        color:           milestone.done    ? 'rgba(237,232,223,0.35)'
                       : milestone.current ? colors.text
                       : 'rgba(237,232,223,0.45)',
        textDecoration:  milestone.done ? 'line-through' : 'none',
        fontFamily:      fonts.sans,
      }}>
        {milestone.text}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(237,232,223,0.25)', marginTop: 2, fontFamily: fonts.sans }}>
        {milestone.date}
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
    <div style={{ padding: '20px', maxWidth: 680, animation: 'fadeUp 0.25s ease' }}>

      {/* Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
        <Button variant="icon" onClick={() => dispatch(setDashboardTab('home'))} style={{ padding: '7px 11px' }}>
          <BackIcon size={14} />
        </Button>
        <span style={{ fontSize: 11, color: colors.textFaint }}>/ Мои цели</span>
      </div>

      {/* Hero */}
      <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 20, padding: '22px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 20 }}>
        <ProgressRing progress={goal.progress} size={90} color={goal.color} fontSize={14} />
        <div>
          <Badge>{goal.category}</Badge>
          <h1 style={{ fontSize: 21, fontWeight: 500, fontFamily: fonts.serif, margin: '8px 0 4px', lineHeight: 1.2 }}>
            {goal.title}
          </h1>
          <p style={{ fontSize: 13, color: colors.textFaint }}>{goal.daysLeft} дней до дедлайна</p>
        </div>
      </div>

      {/* Next action */}
      <div style={{ background: 'rgba(232,153,48,0.07)', border: `1px solid rgba(232,153,48,0.17)`, borderRadius: radius.lg, padding: '13px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: colors.accent, fontWeight: 500, marginBottom: 3 }}>Следующий шаг</div>
          <div style={{ fontSize: 13, color: colors.text, fontFamily: fonts.sans }}>{goal.nextAction}</div>
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
      <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(237,232,223,0.45)', marginBottom: 14 }}>Вехи</p>
      <div style={{ marginBottom: 22 }}>
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
        text="Ты занимаешься стабильно — молодец. При текущем темпе достигнешь цели на 12 дней раньше срока."
        color={colors.teal}
        label="Анализ ИИ"
      />
    </div>
  )
}
