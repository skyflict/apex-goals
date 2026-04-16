import React from 'react'
import type { Goal } from '@/types'
import { ProgressRing, Badge } from '@/components/ui'
import { ArrowIcon } from '@/components/icons'
import { colors, fonts, radius } from '@/styles/theme'

interface GoalCardProps {
  goal:     Goal
  onClick?: () => void
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background:   colors.surface,
      border:       `1px solid ${colors.border}`,
      borderRadius: radius.lg,
      padding:      '14px 16px',
      cursor:       onClick ? 'pointer' : 'default',
      transition:   'border-color 0.2s, background 0.2s',
      marginBottom: 8,
    }}
    onMouseEnter={e => {
      if (!onClick) return
      ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.borderHover
      ;(e.currentTarget as HTMLDivElement).style.background  = '#171C28'
    }}
    onMouseLeave={e => {
      ;(e.currentTarget as HTMLDivElement).style.borderColor = colors.border
      ;(e.currentTarget as HTMLDivElement).style.background  = colors.surface
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <ProgressRing progress={goal.progress} size={50} color={goal.color} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            fontSize:     13,
            fontWeight:   500,
            color:        colors.text,
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
            fontFamily:   fonts.sans,
          }}>
            {goal.title}
          </span>
          <Badge>{goal.category}</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(237,232,223,0.3)' }}>
          <ArrowIcon size={11} />
          <span style={{ fontSize: 11, color: 'rgba(237,232,223,0.45)', fontFamily: fonts.sans }}>
            {goal.nextAction}
          </span>
        </div>
      </div>

      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(237,232,223,0.75)', fontFamily: fonts.serif }}>
          {goal.daysLeft}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(237,232,223,0.3)', fontFamily: fonts.sans }}>
          дней
        </div>
      </div>
    </div>
  </div>
)
