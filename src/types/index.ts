// ─── Routing ─────────────────────────────────────────────────────────────────
export type AppScreen = 'landing' | 'auth' | 'dashboard'
export type AuthTab = 'login' | 'register'
export type DashboardTab = 'home' | 'new' | 'detail'

// ─── Domain ──────────────────────────────────────────────────────────────────
export interface User {
  name: string
  email: string
}

export interface Milestone {
  id: string
  text: string
  date: string
  done: boolean
  current?: boolean
}

export interface Goal {
  id: string
  title: string
  level?: string          // e.g. "B2", "21.1K", "MVP"
  progress: number        // 0–100
  daysLeft: number
  category: string
  nextAction: string
  nextDuration?: string   // e.g. "40 мин"
  color: string
  streak?: number
  milestones: Milestone[]
}

export interface GoalPlan {
  title: string
  deadline: string
  pace: string
  overview?: string
  steps: Array<string | GoalPlanStep>
  weeklyPlan?: string[]
  risks?: string[]
  successCriteria?: string[]
}

export interface GoalPlanStep {
  title: string
  why?: string
  actions: string[]
  result?: string
}

export interface ChatMessage {
  id: string
  role: 'ai' | 'user' | 'plan'
  text?: string
  plan?: GoalPlan
}

// ─── UI helpers ───────────────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'ghost' | 'text' | 'icon'
export type ButtonSize = 'sm' | 'md' | 'lg'
