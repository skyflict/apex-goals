import React from 'react'
import type { Goal } from '@/types'
import {
  ProgressRing,
  Badge,
  MilestoneTimeline,
  EyebrowLabel,
} from '@/components/ui'
import { colors, fonts, radius } from '@/styles/theme'

interface GoalCardProps {
  goal:     Goal
  onClick?: () => void
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => (
  <div
    onClick={onClick}
    className="goal-card"
    style={{
      background:   colors.surface,
      border:       `1px solid ${colors.border}`,
      borderRadius: radius.xl,
      padding:      '18px 22px',
      display:      'grid',
      gridTemplateColumns: '56px 1fr 180px 160px 80px',
      alignItems:   'center',
      gap:          22,
      position:     'relative',
      overflow:     'hidden',
      cursor:       onClick ? 'pointer' : 'default',
      transition:   'all 0.2s',
      marginBottom: 10,
    }}
    onMouseEnter={e => {
      if (!onClick) return
      ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.borderHover
    }}
    onMouseLeave={e => {
      ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.border
    }}
  >
    {/* Left stripe */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0,
      width: 2, background: goal.color, opacity: 0.9,
    }}/>

    {/* Progress ring */}
    <ProgressRing progress={goal.progress} size={54} strokeWidth={4} color={goal.color}>
      <span style={{ fontSize: 11, fontWeight: 500, color: goal.color, fontFamily: fonts.mono }}>
        {goal.progress}
      </span>
    </ProgressRing>

    {/* Title + category */}
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{
          fontFamily: fonts.serif, fontSize: 18, fontWeight: 500,
          color: colors.text, letterSpacing: '-0.005em',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {goal.title}
        </span>
        {goal.level && (
          <Badge color={goal.color} bgColor={`${goal.color}1A`} fontSize={9.5} mono>
            {goal.level}
          </Badge>
        )}
      </div>
      <div style={{ fontSize: 11.5, color: colors.textFaint, letterSpacing: '0.2px', fontFamily: fonts.sans }}>
        {goal.category}
      </div>
    </div>

    {/* Today's action */}
    <div className="goal-card-next">
      <EyebrowLabel size={9.5} spacing="1.4px" style={{ marginBottom: 3 }}>Сегодня</EyebrowLabel>
      <div style={{ fontSize: 12.5, color: colors.text, fontWeight: 500, fontFamily: fonts.sans }}>
        {goal.nextAction}
      </div>
      {goal.nextDuration && (
        <div style={{ fontSize: 10.5, color: colors.textFaint, fontFamily: fonts.mono, marginTop: 2 }}>
          ≈ {goal.nextDuration}
        </div>
      )}
    </div>

    {/* Timeline mini */}
    <div className="goal-card-timeline">
      <MilestoneTimeline milestones={goal.milestones} color={goal.color} />
    </div>

    {/* Days left */}
    <div style={{ textAlign: 'right' }}>
      <div style={{
        fontFamily: fonts.serif, fontStyle: 'italic',
        fontSize: 26, fontWeight: 400, color: colors.text, lineHeight: 1,
      }}>
        {goal.daysLeft}
      </div>
      <EyebrowLabel size={9.5} spacing="1.2px" style={{ marginTop: 3 }}>дней</EyebrowLabel>
    </div>
  </div>
)
