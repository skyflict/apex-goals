export const colors = {
  // Surfaces
  bg:           '#0B0D14',
  surface:      '#131720',
  card:         '#141820',
  dark:         '#0E1018',
  deepCard:     '#0F1219',

  // Borders
  border:       'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.12)',
  borderHover:  'rgba(232,153,48,0.28)',

  // Accents — gold
  accent:       '#E89930',
  accentSoft:   '#F5B85C',
  accentDeep:   '#B67520',
  accentBg:     'rgba(232,153,48,0.1)',
  accentBorder: 'rgba(232,153,48,0.2)',

  // Categorical
  teal:         '#4ECDB8',
  purple:       '#A78BFA',
  rose:         '#E8789A',

  // Text
  text:         '#EDE8DF',
  textMuted:    'rgba(237,232,223,0.55)',
  textFaint:    'rgba(237,232,223,0.35)',
  textGhost:    'rgba(237,232,223,0.22)',
} as const

export const fonts = {
  sans:  "'DM Sans', sans-serif",
  serif: "'Cormorant Garamond', serif",
  mono:  "'JetBrains Mono', ui-monospace, monospace",
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

// Breakpoints for @media queries
export const bp = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 1024px)',
} as const
