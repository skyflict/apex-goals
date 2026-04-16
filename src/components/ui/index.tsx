import React from 'react'
import { colors, fonts, radius } from '@/styles/theme'

// ─── ProgressRing ─────────────────────────────────────────────────────────────
interface ProgressRingProps {
  progress:     number   // 0–100
  size?:        number
  strokeWidth?: number
  color?:       string
  showLabel?:   boolean
  fontSize?:    number
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size        = 60,
  strokeWidth = 4,
  color       = colors.accent,
  showLabel   = true,
  fontSize,
}) => {
  const r             = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset        = circumference * (1 - progress / 100)

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      {showLabel && (
        <div style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       fontSize ?? (size < 50 ? 8 : size < 70 ? 10 : 12),
          fontWeight:     500,
          color,
          fontFamily:     fonts.sans,
        }}>
          {progress}%
        </div>
      )}
    </div>
  )
}

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
        background:  'rgba(255,255,255,0.06)',
        border:      '1px solid rgba(255,255,255,0.1)',
        borderRadius: radius.md,
        color:       colors.text,
        fontFamily:  fonts.sans,
        fontSize:    14,
        padding:     '13px 14px',
        width:       '100%',
        transition:  'border-color 0.15s',
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
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color   = 'rgba(237,232,223,0.45)',
  bgColor = 'rgba(255,255,255,0.07)',
  fontSize = 10,
}) => (
  <span style={{
    fontSize,
    background:   bgColor,
    color,
    padding:      '2px 9px',
    borderRadius: radius.full,
    flexShrink:   0,
    fontFamily:   fonts.sans,
    whiteSpace:   'nowrap',
  }}>
    {children}
  </span>
)

// ─── AiInsight ────────────────────────────────────────────────────────────────
interface AiInsightProps {
  text:    string
  color?:  string
  label?:  string
}

export const AiInsight: React.FC<AiInsightProps> = ({
  text,
  color = colors.accent,
  label = 'Инсайт от ИИ',
}) => (
  <div style={{
    background:   `${color}11`,
    border:       `1px solid ${color}28`,
    borderRadius: radius.lg,
    padding:      '14px 16px',
    display:      'flex',
    gap:          10,
  }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(237,232,223,0.6)', lineHeight: 1.65 }}>{text}</div>
    </div>
  </div>
)

// ─── StatCard ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div style={{
    background:   colors.surface,
    border:       `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding:      '12px 14px',
  }}>
    <div style={{ fontSize: 10, color: 'rgba(237,232,223,0.36)', marginBottom: 4, fontFamily: fonts.sans }}>
      {label}
    </div>
    <div style={{ fontSize: 21, fontWeight: 500, fontFamily: fonts.serif }}>
      {value}
    </div>
  </div>
)
