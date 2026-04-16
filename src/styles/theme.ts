export const colors = {
  bg:           '#0B0D14',
  surface:      '#131720',
  card:         '#141820',
  dark:         '#0E1018',
  deepCard:     '#0F1219',
  border:       'rgba(255,255,255,0.07)',
  borderHover:  'rgba(232,153,48,0.28)',
  accent:       '#E89930',
  accentBg:     'rgba(232,153,48,0.1)',
  accentBorder: 'rgba(232,153,48,0.2)',
  teal:         '#4ECDB8',
  purple:       '#A78BFA',
  text:         '#EDE8DF',
  textMuted:    'rgba(237,232,223,0.5)',
  textFaint:    'rgba(237,232,223,0.35)',
} as const

export const fonts = {
  sans:  "'DM Sans', sans-serif",
  serif: "'Cormorant Garamond', serif",
} as const

export const radius = {
  sm:   8,
  md:   10,
  lg:   13,
  xl:   16,
  xxl:  20,
  card: 14,
  full: 9999,
} as const

export const transition = {
  fast:   'all 0.15s ease',
  normal: 'all 0.22s ease',
} as const
