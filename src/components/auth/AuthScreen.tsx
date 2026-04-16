import React, { useState } from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { login, setAuthTab } from '@/store/slices/authSlice'
import { setScreen }         from '@/store/slices/uiSlice'
import { Button }            from '@/components/ui/Button'
import { Input }             from '@/components/ui'
import { BackIcon }          from '@/components/icons'
import { colors, fonts, radius } from '@/styles/theme'

export const AuthScreen: React.FC = () => {
  const dispatch  = useAppDispatch()
  const activeTab = useAppSelector(s => s.auth.activeTab)

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    dispatch(login({ name: name || 'Никита', email: email || 'user@apex.ai' }))
    dispatch(setScreen('dashboard'))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '40px 20px', background: colors.bg }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        <Button
          variant="text"
          size="sm"
          onClick={() => dispatch(setScreen('landing'))}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}
        >
          <BackIcon size={14} /> Назад
        </Button>

        <div style={{ fontSize: 22, fontWeight: 500, color: colors.accent, letterSpacing: '1.5px', fontFamily: fonts.serif, marginBottom: 2 }}>
          Apex
        </div>
        <div style={{ fontSize: 12, color: colors.textFaint, marginBottom: 28 }}>цели с ИИ</div>

        <div style={{ background: colors.card, border: `1px solid rgba(255,255,255,0.09)`, borderRadius: radius.xl, padding: 30 }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: radius.md, padding: 3, gap: 3, marginBottom: 22 }}>
            {(['login', 'register'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => dispatch(setAuthTab(tab))}
                style={{
                  flex:         1,
                  padding:      10,
                  borderRadius: radius.sm,
                  border:       'none',
                  fontFamily:   fonts.sans,
                  fontSize:     13,
                  cursor:       'pointer',
                  transition:   'all 0.15s',
                  background:   activeTab === tab ? colors.accent : 'transparent',
                  color:        activeTab === tab ? colors.bg : 'rgba(237,232,223,0.4)',
                  fontWeight:   activeTab === tab ? 500 : 400,
                }}
              >
                {tab === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeTab === 'register' && (
              <Input label="Имя" type="text" placeholder="Никита" value={name} onChange={e => setName(e.target.value)} />
            )}
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Пароль" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />

            <Button fullWidth size="md" style={{ marginTop: 6 }} onClick={handleSubmit}>
              {activeTab === 'login' ? 'Войти в Apex' : 'Создать аккаунт'}
            </Button>

            <Button
              variant="text"
              size="sm"
              onClick={() => dispatch(setAuthTab(activeTab === 'login' ? 'register' : 'login'))}
              style={{ fontSize: 12 }}
            >
              {activeTab === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </Button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'rgba(237,232,223,0.18)' }}>
          Продолжая, ты соглашаешься с условиями использования
        </div>
      </div>
    </div>
  )
}
