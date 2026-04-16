import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthTab, User } from '@/types'

interface AuthState {
  isAuthenticated: boolean
  user:            User | null
  activeTab:       AuthTab
}

const initialState: AuthState = {
  isAuthenticated: false,
  user:            null,
  activeTab:       'login',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true
      state.user            = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user            = null
    },
    setAuthTab(state, action: PayloadAction<AuthTab>) {
      state.activeTab = action.payload
    },
  },
})

export const { login, logout, setAuthTab } = authSlice.actions
export default authSlice.reducer
