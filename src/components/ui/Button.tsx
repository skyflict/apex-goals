import React from 'react'
import type { ButtonVariant, ButtonSize } from '@/types'
import { colors, fonts, radius } from '@/styles/theme'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant
  size?:      ButtonSize
  fullWidth?: boolean
  children:   React.ReactNode
}

const variantMap: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: colors.accent, color: colors.bg, border: 'none', fontWeight: 500 },
  ghost:   { background: 'rgba(255,255,255,0.07)', color: colors.text, border: `1px solid rgba(255,255,255,0.12)` },
  text:    { background: 'none', color: colors.textMuted, border: 'none', padding: 0 },
  icon:    { background: 'rgba(255,255,255,0.07)', color: colors.text, border: `1px solid rgba(255,255,255,0.12)`, padding: '7px 10px' },
}

const sizeMap: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: 12, padding: '7px 13px' },
  md: { fontSize: 14, padding: '11px 20px' },
  lg: { fontSize: 15, padding: '13px 26px' },
}

export const Button: React.FC<ButtonProps> = ({
  variant   = 'primary',
  size      = 'md',
  fullWidth = false,
  children,
  style,
  ...props
}) => (
  <button
    style={{
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            6,
      borderRadius:   radius.md,
      fontFamily:     fonts.sans,
      cursor:         'pointer',
      transition:     'opacity 0.15s, background 0.15s',
      width:          fullWidth ? '100%' : undefined,
      ...variantMap[variant],
      ...sizeMap[size],
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
)
