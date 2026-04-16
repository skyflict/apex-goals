import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './slices/authSlice'
import goalsReducer from './slices/goalsSlice'
import uiReducer    from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth:  authReducer,
    goals: goalsReducer,
    ui:    uiReducer,
  },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
