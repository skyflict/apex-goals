import React from 'react'

interface IconProps {
  size?:  number
  color?: string
}

export const HomeIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 12L12 3l9 9v9h-6v-6H9v6H3V12z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

export const PlusIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const ChartIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 18l5-5 4 3 5-6 4 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="3" width="18" height="18" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
)

export const SparkIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

export const SendIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2l-7 20-4-9M22 2L2 9l9 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const BackIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M11 6L5 12l6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12l5 5 9-10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowIcon: React.FC<IconProps> = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const TargetIcon: React.FC<IconProps> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
)
