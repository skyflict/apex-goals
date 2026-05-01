import React from 'react'
import { colors, fonts, radius } from '@/styles/theme'

// ─── ProgressRing ─────────────────────────────────────────────────────────────
interface ProgressRingProps {
  progress:     number   // 0–100
  size?:        number
  strokeWidth?: number
  color?:       string
  trackColor?:  string
  showLabel?:   boolean
  fontSize?:    number
  children?:    React.ReactNode
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size        = 60,
  strokeWidth = 4,
  color       = colors.accent,
  trackColor  = 'rgba(255,255,255,0.07)',
  showLabel   = true,
  fontSize,
  children,
}) => {
  const r             = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset        = circumference * (1 - progress / 100)

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={trackColor} strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      <div style={{
        position:       'absolute',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}>
        {children ?? (showLabel && (
          <span style={{
            fontSize:   fontSize ?? (size < 50 ? 8 : size < 70 ? 10 : 12),
            fontWeight: 500,
            color,
            fontFamily: fonts.mono,
          }}>
            {progress}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── EyebrowLabel — uppercase tiny-caps used for section meta ─────────────────
interface EyebrowLabelProps {
  children: React.ReactNode
  color?:   string
  size?:    number
  spacing?: string
  style?:   React.CSSProperties
}

export const EyebrowLabel: React.FC<EyebrowLabelProps> = ({
  children,
  color   = colors.textGhost,
  size    = 10.5,
  spacing = '1.8px',
  style,
}) => (
  <div style={{
    fontSize:       size,
    letterSpacing:  spacing,
    textTransform:  'uppercase',
    color,
    fontFamily:     fonts.sans,
    ...style,
  }}>
    {children}
  </div>
)

// ─── SerifHeading — serif display with optional italic accent ─────────────────
interface SerifHeadingProps {
  size?:    number
  children: React.ReactNode
  style?:   React.CSSProperties
}

export const SerifHeading: React.FC<SerifHeadingProps> = ({ size = 44, children, style }) => (
  <h2 style={{
    fontFamily:    fonts.serif,
    fontSize:      size,
    fontWeight:    400,
    letterSpacing: '-0.015em',
    lineHeight:    1.05,
    color:         colors.text,
    margin:        0,
    ...style,
  }}>
    {children}
  </h2>
)

// Italic + accent color span for inline emphasis inside serif headings
export const Em: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = colors.accent }) => (
  <span style={{ fontStyle: 'italic', color }}>{children}</span>
)

// ─── SectionDivider — thin rule w/ italic caption centered ───────────────────
interface SectionDividerProps { label?: string }

export const SectionDivider: React.FC<SectionDividerProps> = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '12px 0' }}>
    <div style={{ flex: 1, height: 1, background: colors.border }}/>
    {label && (
      <div style={{ fontFamily: fonts.serif, fontStyle: 'italic', fontSize: 14, color: colors.textMuted }}>
        {label}
      </div>
    )}
    <div style={{ flex: 1, height: 1, background: colors.border }}/>
  </div>
)

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && (
      <label style={{ fontSize: 11, color: 'rgba(237,232,223,0.42)', fontFamily: fonts.sans }}>
        {label}
      </label>
    )}
    <input
      style={{
        background:   'rgba(255,255,255,0.06)',
        border:       '1px solid rgba(255,255,255,0.1)',
        borderRadius: radius.md,
        color:        colors.text,
        fontFamily:   fonts.sans,
        fontSize:     14,
        padding:      '13px 14px',
        width:        '100%',
        transition:   'border-color 0.15s',
        ...style,
      }}
      {...props}
    />
  </div>
)

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  children:  React.ReactNode
  color?:    string
  bgColor?:  string
  fontSize?: number
  mono?:     boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color    = 'rgba(237,232,223,0.45)',
  bgColor  = 'rgba(255,255,255,0.07)',
  fontSize = 10,
  mono     = false,
}) => (
  <span style={{
    fontSize,
    background:    bgColor,
    color,
    padding:       '2px 8px',
    borderRadius:  4,
    flexShrink:    0,
    fontFamily:    mono ? fonts.mono : fonts.sans,
    letterSpacing: mono ? '0.5px' : undefined,
    whiteSpace:    'nowrap',
  }}>
    {children}
  </span>
)

// ─── GoldTexture — subtle diagonal stripes overlay ────────────────────────────
export const GoldTexture: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => (
  <div style={{
    position:      'absolute',
    inset:         0,
    opacity,
    background:    'repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 6px)',
    pointerEvents: 'none',
  }}/>
)

// ─── StripeCard — card with left accent stripe ────────────────────────────────
interface StripeCardProps {
  stripe?:  string
  children: React.ReactNode
  style?:   React.CSSProperties
  onClick?: () => void
}

export const StripeCard: React.FC<StripeCardProps> = ({ stripe = colors.accent, children, style, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background:   colors.surface,
      border:       `1px solid ${colors.border}`,
      borderRadius: radius.xl,
      padding:      '18px 22px',
      position:     'relative',
      overflow:     'hidden',
      cursor:       onClick ? 'pointer' : 'default',
      transition:   'all 0.2s',
      ...style,
    }}
  >
    <div style={{
      position:   'absolute',
      left:       0,
      top:        0,
      bottom:     0,
      width:      2,
      background: stripe,
      opacity:    0.9,
    }}/>
    {children}
  </div>
)

// ─── AiInsight ────────────────────────────────────────────────────────────────
interface AiInsightProps {
  text:    React.ReactNode
  color?:  string
  label?:  string
  actions?: React.ReactNode
  serif?:  boolean
}

export const AiInsight: React.FC<AiInsightProps> = ({
  text,
  color   = colors.accent,
  label   = 'Инсайт от ИИ',
  actions,
  serif   = false,
}) => (
  <div style={{
    background:   `${color}10`,
    border:       `1px solid ${color}33`,
    borderRadius: radius.xl,
    padding:      '16px 20px',
    display:      'flex',
    gap:          14,
  }}>
    <div style={{
      width:          36, height: 36,
      borderRadius:   10,
      background:     `${color}22`,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      flexShrink:     0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <EyebrowLabel color={color} size={10} spacing="1.6px" style={{ fontWeight: 500, marginBottom: 4 }}>
        {label}
      </EyebrowLabel>
      <div style={{
        fontFamily: serif ? fonts.serif : fonts.sans,
        fontStyle:  serif ? 'italic'    : 'normal',
        fontSize:   serif ? 17          : 13,
        color:      colors.text,
        lineHeight: 1.5,
      }}>
        {text}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{actions}</div>}
    </div>
  </div>
)

// ─── StatCard — labeled stat with big italic number + stripe ──────────────────
interface StatCardProps {
  label:    string
  value:    string | number
  sub?:     string
  color?:   string
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, sub, color = colors.accent }) => (
  <StripeCard stripe={color} style={{
    padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 14,
    borderRadius: radius.xl,
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <EyebrowLabel size={9.5} spacing="1.4px" style={{ marginBottom: 4 }}>{label}</EyebrowLabel>
      {sub && (
        <div style={{ fontSize: 11, color: colors.textFaint, fontFamily: fonts.sans }}>{sub}</div>
      )}
    </div>
    <div style={{
      fontFamily: fonts.serif,
      fontStyle:  'italic',
      fontSize:   32,
      fontWeight: 400,
      color,
      lineHeight: 1,
      flexShrink: 0,
    }}>
      {value}
    </div>
  </StripeCard>
)

// ─── WeekRhythm — bar chart for daily task completion ─────────────────────────
export interface WeekDay {
  day:    string     // "Пн", "Вт", …
  value:  number     // 0–100
  done?:  boolean
  today?: boolean
}

interface WeekRhythmProps {
  days:    readonly WeekDay[]
  caption?: string
  summary?: string
  height?: number
}

export const WeekRhythm: React.FC<WeekRhythmProps> = ({
  days,
  caption = 'Ритм недели',
  summary,
  height  = 64,
}) => (
  <div style={{
    background:   colors.surface,
    border:       `1px solid ${colors.border}`,
    borderRadius: radius.xl,
    padding:      '16px 20px 14px',
  }}>
    <div style={{
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'baseline',
      marginBottom:   14,
    }}>
      <EyebrowLabel size={10} spacing="1.6px">{caption}</EyebrowLabel>
      {summary && (
        <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: fonts.mono }}>
          {summary}
        </span>
      )}
    </div>
    <div style={{
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'flex-end',
      gap:            8,
      height,
    }}>
      {days.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{
              width:      '100%',
              height:     `${d.value}%`,
              background: d.today
                            ? colors.accent
                            : d.done
                              ? 'rgba(232,153,48,0.35)'
                              : 'rgba(255,255,255,0.08)',
              borderRadius: 3,
              boxShadow:    d.today ? `0 0 12px ${colors.accent}` : 'none',
            }}/>
          </div>
          <div style={{
            fontSize:      9.5,
            color:         d.today ? colors.accent : d.done ? colors.textMuted : colors.textGhost,
            fontWeight:    d.today ? 600 : 400,
            letterSpacing: '0.4px',
            fontFamily:    fonts.sans,
          }}>
            {d.day}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── MilestoneTimeline — horizontal pip bar (done / current / todo) ──────────
interface MilestoneTimelineProps {
  milestones: { done: boolean; current?: boolean }[]
  color:      string
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones, color }) => {
  const doneCount = milestones.filter(m => m.done).length
  return (
    <div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
        {milestones.map((m, i) => (
          <div key={i} style={{
            flex:         1,
            height:       3,
            borderRadius: 2,
            background:   m.done
                            ? color
                            : m.current
                              ? `${color}55`
                              : 'rgba(255,255,255,0.06)',
          }}/>
        ))}
      </div>
      <EyebrowLabel size={10} spacing="1.2px" style={{ fontFamily: fonts.mono }}>
        {doneCount}/{milestones.length} ВЕХ
      </EyebrowLabel>
    </div>
  )
}
