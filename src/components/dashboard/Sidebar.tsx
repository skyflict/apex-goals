import React, { useState } from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { setDashboardTab, setScreen } from '@/store/slices/uiSlice'
import { BrandLogo, EyebrowLabel } from '@/components/ui'
import { colors, fonts, radius } from '@/styles/theme'
import { signOutUser }     from '@/services/auth'
import type { DashboardTab } from '@/types'

interface NavItem { id: DashboardTab | string; label: string; active?: boolean }

const NAV: NavItem[] = [
  { id: 'home',   label: 'Дашборд'     },
  { id: 'new',    label: 'Новая цель'  },
  { id: 'detail', label: 'Прогресс'    },
]

export const Sidebar: React.FC = () => {
  const dispatch     = useAppDispatch()
  const activeTab    = useAppSelector(s => s.ui.dashboardTab)
  const user         = useAppSelector(s => s.auth.user)
  const goals        = useAppSelector(s => s.goals.goals)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (id: DashboardTab | string, selectable: boolean) => {
    if (!selectable) return
    dispatch(setDashboardTab(id as DashboardTab))
    setMenuOpen(false)
  }

  return (
    <aside style={{
      width:        240,
      background:   colors.dark,
      borderRight:  `1px solid ${colors.border}`,
      padding:      '26px 16px 20px',
      display:      'flex',
      flexDirection:'column',
      flexShrink:   0,
      height:       '100vh',
      position:     'sticky',
      top:          0,
    }} className={`dashboard-sidebar${menuOpen ? ' is-menu-open' : ''}`}>
      {/* Logo */}
      <div style={{ padding: '0 8px 28px' }}>
        <BrandLogo size={26} />
        <EyebrowLabel size={9.5} spacing="2px" style={{ marginTop: 4 }}>
          цели с ИИ
        </EyebrowLabel>
      </div>

      <button
        type="button"
        className="dashboard-menu-button"
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <EyebrowLabel size={9.5} spacing="1.5px" style={{ padding: '0 12px 10px' }}>
        Навигация
      </EyebrowLabel>

      <nav className="dashboard-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(({ id, label }) => {
          const active = activeTab === id
          const selectable = ['home', 'new', 'detail'].includes(id as string)
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id, selectable)}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         11,
                padding:     '10px 12px',
                borderRadius: radius.md,
                border:      'none',
                fontFamily:  fonts.sans,
                fontSize:    13,
                cursor:      selectable ? 'pointer' : 'default',
                transition:  'all 0.15s',
                background:  active ? 'rgba(232,153,48,0.11)' : 'transparent',
                color:       active ? colors.accent : colors.textMuted,
                textAlign:   'left',
                position:    'relative',
                opacity:     selectable ? 1 : 0.7,
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute', left: 0, top: 8, bottom: 8,
                  width: 2, background: colors.accent, borderRadius: 2,
                }}/>
              )}
              <span style={{
                width: 14, height: 14, borderRadius: 3,
                border: `1.2px solid ${active ? colors.accent : colors.borderStrong}`,
                flexShrink: 0,
              }}/>
              {label}
            </button>
          )
        })}
      </nav>

      {/* Goals accordion */}
      <EyebrowLabel size={9.5} spacing="1.5px" style={{ padding: '24px 12px 10px' }}>
        Мои цели
      </EyebrowLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {goals.map(g => (
          <div key={g.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', fontSize: 12, color: colors.textMuted,
            cursor: 'pointer', borderRadius: 8,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: g.color, flexShrink: 0 }}/>
            <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.title}</div>
            <div style={{ fontSize: 10, color: colors.textGhost, fontFamily: fonts.mono }}>{g.progress}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      {/* User chip */}
      <button
        type="button"
        onClick={() => {
          void signOutUser().then(() => dispatch(setScreen('auth')))
        }}
        title="Выйти"
        style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        fontFamily: fonts.sans,
        textAlign: 'left',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(232,153,48,0.4), rgba(232,153,48,0.12))',
          border: `1px solid ${colors.accentBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, color: colors.accent, fontWeight: 500,
          flexShrink: 0,
        }}>
          {(user?.name?.[0] ?? 'Н').toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: colors.text }}>
            {user?.name ?? 'Никита'}
          </div>
          <div style={{ fontSize: 10, color: colors.textGhost, letterSpacing: '0.3px' }}>
            Pro · {goals.length} {goals.length === 1 ? 'цель' : 'цели'}
          </div>
        </div>
        <div style={{ fontSize: 12, color: colors.textFaint }}>⋯</div>
      </button>
    </aside>
  )
}
