import React from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { setDashboardTab } from '@/store/slices/uiSlice'
import { HomeIcon, PlusIcon, ChartIcon } from '@/components/icons'
import { colors, fonts, radius } from '@/styles/theme'
import type { DashboardTab } from '@/types'

interface NavItem { id: DashboardTab; label: string; Icon: React.FC<{ size?: number; color?: string }> }

const NAV: NavItem[] = [
  { id: 'home',   label: 'Дашборд',    Icon: HomeIcon  },
  { id: 'new',    label: 'Новая цель', Icon: PlusIcon  },
  { id: 'detail', label: 'Прогресс',   Icon: ChartIcon },
]

export const Sidebar: React.FC = () => {
  const dispatch     = useAppDispatch()
  const activeTab    = useAppSelector(s => s.ui.dashboardTab)
  const user         = useAppSelector(s => s.auth.user)
  const goalsCount   = useAppSelector(s => s.goals.goals.length)

  return (
    <aside style={{
      width:        200,
      background:   colors.dark,
      borderRight:  `1px solid ${colors.border}`,
      padding:      '22px 12px',
      display:      'flex',
      flexDirection:'column',
      flexShrink:   0,
      height:       '100vh',
      position:     'sticky',
      top:          0,
    }}>
      <div style={{ marginBottom: 28, paddingLeft: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 500, color: colors.accent, letterSpacing: '1.5px', fontFamily: fonts.serif }}>
          Apex
        </div>
        <div style={{ fontSize: 10, color: 'rgba(237,232,223,0.28)', letterSpacing: '0.5px' }}>цели с ИИ</div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {NAV.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => dispatch(setDashboardTab(id))}
              style={{
                display:     'flex',
                alignItems:  'center',
                gap:         10,
                padding:     '9px 12px',
                borderRadius: radius.md,
                border:      'none',
                fontFamily:  fonts.sans,
                fontSize:    13,
                cursor:      'pointer',
                transition:  'all 0.15s',
                background:  active ? 'rgba(232,153,48,0.11)' : 'transparent',
                color:       active ? colors.accent : 'rgba(237,232,223,0.45)',
                width:       '100%',
                textAlign:   'left',
              }}
            >
              <Icon size={15} color={active ? colors.accent : undefined} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* User chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.md }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(232,153,48,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: colors.accent, flexShrink: 0 }}>
          {(user?.name?.[0] ?? 'Н').toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{user?.name ?? 'Никита'}</div>
          <div style={{ fontSize: 10, color: 'rgba(237,232,223,0.3)' }}>{goalsCount} {goalsCount === 1 ? 'цель' : 'цели'} активны</div>
        </div>
      </div>
    </aside>
  )
}
