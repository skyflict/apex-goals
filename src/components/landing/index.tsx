import React from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setScreen }      from '@/store/slices/uiSlice'
import { setAuthTab }     from '@/store/slices/authSlice'
import { Button }         from '@/components/ui/Button'
import {
  ProgressRing,
  EyebrowLabel,
  SerifHeading,
  Em,
  GoldTexture,
} from '@/components/ui'
import { SparkIcon, TargetIcon, ChartIcon } from '@/components/icons'
import { colors, fonts, radius } from '@/styles/theme'

// ─── Navbar ──────────────────────────────────────────────────────────────────
export const LandingNav: React.FC = () => {
  const dispatch = useAppDispatch()

  const goAuth = (tab: 'login' | 'register') => {
    dispatch(setAuthTab(tab))
    dispatch(setScreen('auth'))
  }

  return (
    <nav style={{
      padding:       '16px 40px',
      borderBottom:  `1px solid ${colors.border}`,
      display:       'flex',
      justifyContent:'space-between',
      alignItems:    'center',
      background:    'rgba(11,13,20,0.82)',
      backdropFilter:'blur(14px)',
      position:      'sticky',
      top:           0,
      zIndex:        50,
    }} className="landing-nav">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{
          fontSize: 24, fontWeight: 400, color: colors.accent,
          letterSpacing: '1.5px', fontFamily: fonts.serif, fontStyle: 'italic',
          lineHeight: 1,
        }}>
          Apex
        </div>
        <div style={{
          fontSize: 9.5, letterSpacing: '2px', textTransform: 'uppercase',
          color: colors.textGhost, fontFamily: fonts.sans,
        }}>
          цели с ИИ
        </div>
      </div>

      <div className="landing-nav-links" style={{ display: 'flex', gap: 28 }}>
        {['Возможности', 'Как работает', 'Отзывы', 'Тарифы'].map(l => (
          <a key={l} href="#" style={{
            fontSize: 12.5, color: colors.textMuted, textDecoration: 'none',
            letterSpacing: '0.2px', fontFamily: fonts.sans,
          }}>{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Button variant="text" size="sm" onClick={() => goAuth('login')}>Войти</Button>
        <Button variant="primary" size="sm" onClick={() => goAuth('register')}>Начать бесплатно</Button>
      </div>
    </nav>
  )
}

// ─── AppPreview (hi-fi mini screenshot) ───────────────────────────────────────
const PREVIEW_GOALS = [
  { pct: 42, color: colors.accent, label: 'Испанский',   level: 'B2',   sub: '127 дн' },
  { pct: 68, color: colors.teal,   label: 'Полумарафон', level: '21.1', sub: '54 дн'  },
  { pct: 25, color: colors.purple, label: 'Пет-проект',  level: 'MVP',  sub: '89 дн'  },
]

export const AppPreview: React.FC = () => (
  <div style={{
    flex:         '0 0 340px',
    background:   colors.surface,
    border:       `1px solid ${colors.borderStrong}`,
    borderRadius: radius.xxl,
    padding:      20,
    position:     'relative',
    overflow:     'hidden',
    boxShadow:    '0 30px 80px -30px rgba(0,0,0,0.6), 0 10px 30px -10px rgba(232,153,48,0.08)',
  }} className="app-preview">
    <GoldTexture opacity={0.025} />

    {/* Hero mini */}
    <div style={{
      background:  `linear-gradient(135deg, rgba(232,153,48,0.1), ${colors.deepCard})`,
      border:      `1px solid ${colors.accentBorder}`,
      borderRadius: radius.lg,
      padding:     '12px 14px',
      display:     'flex',
      alignItems:  'center',
      gap:         14,
      marginBottom:12,
      position:    'relative',
    }}>
      <ProgressRing progress={45} size={52} strokeWidth={4} color={colors.accent} trackColor="rgba(232,153,48,0.12)">
        <span style={{
          fontFamily: fonts.serif, fontSize: 18, fontStyle: 'italic',
          color: colors.accent, fontWeight: 500,
        }}>
          45
        </span>
      </ProgressRing>
      <div style={{ flex: 1 }}>
        <EyebrowLabel size={8.5} spacing="1.5px" color={colors.accent} style={{ marginBottom: 3 }}>
          Средний прогресс
        </EyebrowLabel>
        <div style={{ fontSize: 12, color: colors.text, fontFamily: fonts.serif, fontStyle: 'italic', lineHeight: 1.3 }}>
          Впереди графика на <span style={{ color: colors.accent }}>4 дня</span>
        </div>
      </div>
    </div>

    {/* Goal rows */}
    {PREVIEW_GOALS.map(g => (
      <div key={g.label} style={{
        background:   colors.deepCard,
        border:       `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding:      '10px 12px',
        display:      'flex',
        alignItems:   'center',
        gap:          11,
        marginBottom: 5,
        position:     'relative',
        overflow:     'hidden',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: g.color, opacity: 0.85 }}/>
        <ProgressRing progress={g.pct} size={34} strokeWidth={3} color={g.color}>
          <span style={{ fontSize: 9, fontFamily: fonts.mono, color: g.color }}>{g.pct}</span>
        </ProgressRing>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11.5, fontWeight: 500, color: colors.text }}>{g.label}</span>
            <span style={{
              fontSize: 8.5, fontFamily: fonts.mono, color: g.color,
              background: `${g.color}22`, padding: '1px 5px', borderRadius: 3,
            }}>{g.level}</span>
          </div>
          <div style={{ fontSize: 9.5, color: colors.textFaint, marginTop: 1, fontFamily: fonts.mono }}>{g.sub}</div>
        </div>
      </div>
    ))}

    {/* Insight */}
    <div style={{
      background:   colors.accentBg,
      border:       `1px solid ${colors.accentBorder}`,
      borderRadius: radius.md,
      padding:      '9px 11px',
      display:      'flex',
      gap:          8,
      marginTop:    10,
    }}>
      <SparkIcon size={11} color={colors.accent} />
      <span style={{
        fontSize: 10.5, color: colors.text, lineHeight: 1.5,
        fontFamily: fonts.serif, fontStyle: 'italic',
      }}>
        Ты на <span style={{ color: colors.accent, fontStyle: 'normal', fontFamily: fonts.sans, fontWeight: 500 }}>12 дней</span> впереди графика
      </span>
    </div>
  </div>
)

// ─── HeroSection ──────────────────────────────────────────────────────────────
export const HeroSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const goAuth = (tab: 'login' | 'register') => {
    dispatch(setAuthTab(tab))
    dispatch(setScreen('auth'))
  }

  return (
    <section style={{
      maxWidth:   1080,
      margin:     '0 auto',
      padding:    '72px 40px 60px',
      display:    'flex',
      alignItems: 'center',
      gap:        56,
      flexWrap:   'wrap',
      position:   'relative',
    }} className="hero-section">
      {/* Aurora glow */}
      <div style={{
        position: 'absolute', top: -100, right: -80, width: 540, height: 420,
        background: 'radial-gradient(ellipse, rgba(232,153,48,0.12), transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      <div style={{ flex: 1, minWidth: 280, position: 'relative', zIndex: 1 }} className="fade-up">
        {/* Eyebrow pill */}
        <div style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          8,
          background:   colors.accentBg,
          border:       `1px solid ${colors.accentBorder}`,
          borderRadius: radius.full,
          padding:      '5px 13px',
          marginBottom: 24,
          boxShadow:    `0 0 0 4px rgba(232,153,48,0.04)`,
        }}>
          <SparkIcon size={11} color={colors.accent} />
          <span style={{
            fontSize: 11, color: colors.accent, fontWeight: 500,
            letterSpacing: '0.8px', textTransform: 'uppercase',
          }}>
            ИИ-коуч · beta
          </span>
        </div>

        <SerifHeading size={56} style={{ marginBottom: 20 }}>
          Ставь цели.<br/>
          ИИ поможет<br/>
          <Em>их достичь.</Em>
        </SerifHeading>

        <p style={{
          fontSize: 15.5, color: colors.textMuted, lineHeight: 1.75,
          maxWidth: 440, marginBottom: 30, fontFamily: fonts.sans,
        }}>
          Опиши цель в свободной форме — ИИ задаст вопросы, создаст персональный план и поможет не сбиться с пути.
        </p>

        <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginBottom: 28 }}>
          <Button size="md" onClick={() => goAuth('register')}>Начать бесплатно</Button>
          <Button variant="ghost" size="md" onClick={() => goAuth('login')}>Уже есть аккаунт</Button>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex' }}>
            {['А', 'М', 'К'].map((l, i) => (
              <div key={l} style={{
                width:          27, height: 27,
                borderRadius:   '50%',
                background:     [colors.accent, colors.teal, colors.purple][i],
                border:         `2px solid ${colors.bg}`,
                marginLeft:     i > 0 ? -8 : 0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       10.5, fontWeight: 600,
                color:          i === 2 ? colors.bg : colors.bg,
              }}>
                {l}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: colors.textFaint, fontFamily: fonts.sans }}>
            <span style={{ color: colors.text, fontFamily: fonts.mono, fontWeight: 500 }}>1 200+</span>{' '}
            человек достигают целей с Apex
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AppPreview />
      </div>
    </section>
  )
}

// ─── FeaturesSection ──────────────────────────────────────────────────────────
const FEATURES = [
  { n: '01', Icon: SparkIcon,  color: colors.accent,  title: 'ИИ понимает тебя',     body: 'Пишешь в свободной форме — «хочу похудеть к лету» или «запустить бизнес». ИИ задаёт вопросы и разбирается.' },
  { n: '02', Icon: TargetIcon, color: colors.teal,    title: 'Разбивает на шаги',    body: 'Большая цель → конкретные вехи с дедлайнами. Ты всегда знаешь, что делать сегодня, а не через полгода.' },
  { n: '03', Icon: ChartIcon,  color: colors.purple,  title: 'Адаптивный трекинг',   body: 'ИИ замечает отставания, корректирует план и подсказывает — ты достигнешь цели в любом случае.' },
]

export const FeaturesSection: React.FC = () => (
  <section style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 40px' }} className="features-section">
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <EyebrowLabel style={{ marginBottom: 12 }}>Возможности</EyebrowLabel>
      <SerifHeading size={42}>
        Почему <Em>Apex</Em>
      </SerifHeading>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 14,
    }} className="features-grid">
      {FEATURES.map(f => (
        <div key={f.title} style={{
          background:   colors.surface,
          border:       `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding:      '26px 24px 24px',
          position:     'relative',
          overflow:     'hidden',
          transition:   'border-color 0.2s, transform 0.2s',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
            background: f.color, opacity: 0.8,
          }}/>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: 20,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: radius.md,
              background: `${f.color}1A`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <f.Icon size={20} color={f.color} />
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 11, color: colors.textGhost,
              letterSpacing: '1px',
            }}>
              {f.n}
            </div>
          </div>

          <div style={{
            fontFamily: fonts.serif, fontSize: 20, fontWeight: 500,
            color: colors.text, marginBottom: 10, letterSpacing: '-0.005em',
          }}>
            {f.title}
          </div>
          <div style={{
            fontSize: 13.5, color: colors.textMuted, lineHeight: 1.75,
            fontFamily: fonts.sans,
          }}>
            {f.body}
          </div>
        </div>
      ))}
    </div>
  </section>
)

// ─── HowItWorks ───────────────────────────────────────────────────────────────
const STEPS = [
  { n: '1', color: colors.accent, title: 'Опиши цель', body: 'Напиши в чате что хочешь достичь и к какому сроку — в любых словах.' },
  { n: '2', color: colors.teal,   title: 'Получи план', body: 'ИИ задаёт пару вопросов и строит реалистичный план с вехами.' },
  { n: '3', color: colors.purple, title: 'Достигай',    body: 'Отмечаешь прогресс, ИИ анализирует и подсказывает. Фокус на действиях.' },
]

export const HowItWorksSection: React.FC = () => (
  <section style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 40px 72px' }} className="how-section">
    <div style={{ textAlign: 'center', marginBottom: 52 }}>
      <EyebrowLabel style={{ marginBottom: 12 }}>Как это работает</EyebrowLabel>
      <SerifHeading size={42}>
        Три шага до <Em>результата</Em>
      </SerifHeading>
    </div>

    <div style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 32,
    }} className="how-grid">
      {/* Connecting line (desktop only) */}
      <div className="how-line" style={{
        position: 'absolute',
        top:      32,
        left:     '16%',
        right:    '16%',
        height:   1,
        background: `linear-gradient(90deg, ${colors.accent}33, ${colors.teal}33, ${colors.purple}33)`,
        zIndex:   0,
      }}/>

      {STEPS.map(s => (
        <div key={s.n} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            border: `1.5px solid ${s.color}66`,
            background: colors.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: `0 0 0 8px ${colors.bg}, 0 0 24px ${s.color}33`,
          }}>
            <span style={{
              fontSize: 28, fontWeight: 400, color: s.color,
              fontFamily: fonts.serif, fontStyle: 'italic', lineHeight: 1,
            }}>
              {s.n}
            </span>
          </div>
          <div style={{
            fontSize: 17, fontWeight: 500, marginBottom: 8,
            color: colors.text, fontFamily: fonts.serif,
          }}>
            {s.title}
          </div>
          <div style={{
            fontSize: 13, color: colors.textMuted, lineHeight: 1.7,
            maxWidth: 260, margin: '0 auto', fontFamily: fonts.sans,
          }}>
            {s.body}
          </div>
        </div>
      ))}
    </div>
  </section>
)

// ─── CtaBanner ────────────────────────────────────────────────────────────────
export const CtaBanner: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto 80px', padding: '0 40px' }} className="cta-section">
      <div style={{
        background:   `linear-gradient(135deg, rgba(232,153,48,0.12), ${colors.surface} 70%)`,
        border:       `1px solid ${colors.accentBorder}`,
        borderRadius: radius.xxl,
        padding:      '56px 44px',
        textAlign:    'center',
        position:     'relative',
        overflow:     'hidden',
      }}>
        <GoldTexture opacity={0.035} />

        <EyebrowLabel color={colors.accent} style={{ marginBottom: 14, position: 'relative' }}>
          Начни сегодня
        </EyebrowLabel>

        <SerifHeading size={40} style={{ marginBottom: 14, position: 'relative' }}>
          Готов <Em>начать?</Em>
        </SerifHeading>

        <p style={{
          fontSize: 14.5, color: colors.textMuted, marginBottom: 30,
          position: 'relative', fontFamily: fonts.sans,
        }}>
          Это бесплатно. Первая цель — уже через 2 минуты.
        </p>

        <div style={{ position: 'relative' }}>
          <Button size="lg" onClick={() => { dispatch(setAuthTab('register')); dispatch(setScreen('auth')) }}>
            Создать аккаунт бесплатно
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─── LandingFooter ────────────────────────────────────────────────────────────
export const LandingFooter: React.FC = () => (
  <footer style={{
    borderTop: `1px solid ${colors.border}`,
    padding:   '24px 40px',
    display:   'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth:  1080,
    margin:    '0 auto',
  }}>
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 10,
    }}>
      <div style={{
        fontSize: 20, color: colors.accent, fontFamily: fonts.serif,
        fontStyle: 'italic', letterSpacing: '1.2px',
      }}>
        Apex
      </div>
      <EyebrowLabel size={9.5} spacing="1.8px">цели с ИИ</EyebrowLabel>
    </div>
    <div style={{
      fontSize: 11, color: colors.textGhost, fontFamily: fonts.mono,
      letterSpacing: '0.5px',
    }}>
      © 2026 · APEX
    </div>
  </footer>
)
