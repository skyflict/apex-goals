import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppScreen, DashboardTab } from '@/types'

interface UIState {
  screen:       AppScreen
  dashboardTab: DashboardTab
}

const initialState: UIState = {
  screen:       'landing',
  dashboardTab: 'home',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScreen(state, action: PayloadAction<AppScreen>) {
      state.screen = action.payload
    },
    setDashboardTab(state, action: PayloadAction<DashboardTab>) {
      state.dashboardTab = action.payload
    },
  },
})

export const { setScreen, setDashboardTab } = uiSlice.actions
export default uiSlice.reducer
