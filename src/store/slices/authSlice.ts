import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthTab, User } from '@/types'

interface AuthState {
  isAuthenticated: boolean
  user:            User | null
  activeTab:       AuthTab
  isAuthReady:     boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user:            null,
  activeTab:       'login',
  isAuthReady:     false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.isAuthenticated = Boolean(action.payload)
      state.user            = action.payload
      state.isAuthReady     = true
    },
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true
      state.user            = action.payload
      state.isAuthReady     = true
    },
    logout(state) {
      state.isAuthenticated = false
      state.user            = null
      state.isAuthReady     = true
    },
    setAuthTab(state, action: PayloadAction<AuthTab>) {
      state.activeTab = action.payload
    },
  },
})

export const { setUser, login, logout, setAuthTab } = authSlice.actions
export default authSlice.reducer
