import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Goal, ChatMessage } from '@/types'
import { SAMPLE_GOALS, INITIAL_CHAT } from '@/constants/data'

interface GoalsState {
  goals:          Goal[]
  selectedGoalId: string | null
  chatMessages:   ChatMessage[]
}

const initialState: GoalsState = {
  goals:          SAMPLE_GOALS,
  selectedGoalId: null,
  chatMessages:   INITIAL_CHAT,
}

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    selectGoal(state, action: PayloadAction<string>) {
      state.selectedGoalId = action.payload
    },
    clearSelectedGoal(state) {
      state.selectedGoalId = null
    },
    addGoal(state, action: PayloadAction<Goal>) {
      state.goals.push(action.payload)
    },
    updateProgress(state, action: PayloadAction<{ id: string; progress: number }>) {
      const goal = state.goals.find(g => g.id === action.payload.id)
      if (goal) goal.progress = action.payload.progress
    },
    completeMilestone(state, action: PayloadAction<{ goalId: string; milestoneId: string }>) {
      const goal = state.goals.find(g => g.id === action.payload.goalId)
      if (!goal) return
      const ms = goal.milestones.find(m => m.id === action.payload.milestoneId)
      if (ms) {
        ms.done    = true
        ms.current = false
        // mark next milestone as current
        const next = goal.milestones.find(m => !m.done && !m.current)
        if (next) next.current = true
      }
    },
    addChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.chatMessages.push(action.payload)
    },
    resetChat(state) {
      state.chatMessages = INITIAL_CHAT
    },
  },
})

export const {
  selectGoal,
  clearSelectedGoal,
  addGoal,
  updateProgress,
  completeMilestone,
  addChatMessage,
  resetChat,
} = goalsSlice.actions

export default goalsSlice.reducer
