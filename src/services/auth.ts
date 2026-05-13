import type { AuthChangeEvent, Session, User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/services/supabase'
import type { User } from '@/types'

const redirectTo = window.location.origin

export const toAppUser = (user: SupabaseUser): User => ({
  uid:      user.id,
  name:     (user.user_metadata?.full_name as string | undefined)
    ?? (user.user_metadata?.name as string | undefined)
    ?? user.email?.split('@')[0]
    ?? 'Пользователь',
  email:    user.email ?? '',
  photoURL: (user.user_metadata?.avatar_url as string | undefined) ?? null,
})

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user ? toAppUser(data.session.user) : null)
  })

  const { data } = supabase.auth.onAuthStateChange((
    _event: AuthChangeEvent,
    session: Session | null,
  ) => {
    callback(session?.user ? toAppUser(session.user) : null)
  })

  return () => data.subscription.unsubscribe()
}

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })
  if (error) throw error
  return null
}

export const signInWithApple = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo },
  })
  if (error) throw error
  return null
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  if (!data.user) throw new Error('Не удалось войти.')
  return toAppUser(data.user)
}

export const createAccountWithEmail = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name || email.split('@')[0] },
      emailRedirectTo: redirectTo,
    },
  })
  if (error) throw error
  if (!data.session) {
    throw new Error('Аккаунт создан. Проверь почту и подтверди регистрацию.')
  }
  if (!data.user) throw new Error('Не удалось создать аккаунт.')
  return toAppUser(data.user)
}

export const signOutUser = () => supabase.auth.signOut()
