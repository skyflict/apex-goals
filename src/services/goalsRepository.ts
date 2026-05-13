import { supabase } from '@/services/supabase'
import type { Goal, GoalPlan } from '@/types'

interface GoalRow {
  id: string
  user_id: string
  title: string
  level: string | null
  progress: number
  days_left: number
  category: string
  next_action: string
  next_duration: string | null
  color: string
  streak: number | null
  milestones: Goal['milestones']
}

const fromGoalRow = (row: GoalRow): Goal => ({
  id:           row.id,
  title:        row.title,
  level:        row.level ?? undefined,
  progress:     row.progress,
  daysLeft:     row.days_left,
  category:     row.category,
  nextAction:   row.next_action,
  nextDuration: row.next_duration ?? undefined,
  color:        row.color,
  streak:       row.streak ?? undefined,
  milestones:   row.milestones ?? [],
})

const toGoalRow = (userId: string, goal: Goal) => ({
  id:            goal.id,
  user_id:       userId,
  title:         goal.title,
  level:         goal.level ?? null,
  progress:      goal.progress,
  days_left:     goal.daysLeft,
  category:      goal.category,
  next_action:   goal.nextAction,
  next_duration: goal.nextDuration ?? null,
  color:         goal.color,
  streak:        goal.streak ?? null,
  milestones:    goal.milestones,
  updated_at:    new Date().toISOString(),
})

export const loadUserGoals = async (): Promise<Goal[]> => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return ((data ?? []) as GoalRow[]).map(fromGoalRow)
}

export const saveUserGoal = async (userId: string, goal: Goal) => {
  const { error } = await supabase
    .from('goals')
    .upsert(toGoalRow(userId, goal), { onConflict: 'id' })

  if (error) throw error
}

export const saveGoalPlan = async (
  userId: string,
  payload: {
    input: {
      want: string
      have: string
      timeline: string
    }
    response: {
      acknowledgment: string
      plan: GoalPlan
      category: string
      nextAction: string
    }
  },
) => {
  const { error } = await supabase
    .from('goal_plans')
    .insert({
      user_id:  userId,
      input:    payload.input,
      response: payload.response,
    })

  if (error) throw error
}
