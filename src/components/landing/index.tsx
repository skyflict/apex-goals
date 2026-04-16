import React from 'react'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setScreen }      from '@/store/slices/uiSlice'
import { setAuthTab }     from '@/store/slices/authSlice'
import { Button }         from '@/components/ui/Button'
import { ProgressRing }   from '@/components/ui'
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
      padding:      '15px 36px',
      borderBottom: `1px solid ${colors.border}`,
      display:      'flex',
      justifyContent: 'space-between',
      alignItems:   'center',
      background:   colors.bg,
      position:     'sticky',
      top:          0,
      zIndex:       50,
    }}>
      <div style={{ fontSize: 21, fontWeight: 500, color: colors.accent, letterSpacing: '1.5px', fontFamily: fonts.serif }}>
        Apex
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Button variant="text" size="sm" onClick={() => goAuth('login')}>Войти</Button>
        <Button variant="primary" size="sm" onClick={() => goAuth('register')}>Начать бесплатно</Button>
      </div>
    </nav>
  )
}

// ─── AppPreview (mini screenshot) ─────────────────────────────────────────────
const PREVIEW_GOALS = [
  { pct: 42, color: colors.accent,  label: 'Испанский B2',  sub: '127 дн.' },
  { pct: 68, color: colors.teal,    label: 'Полумарафон',   sub: '54 дн.' },
  { pct: 25, color: colors.purple,  label: 'Пет-проект',    sub: '89 дн.' },
]

export const AppPreview: React.FC = () => (
  <div style={{
    flex:         '0 0 310px',
    background:   colors.surface,
    border:       `1px solid rgba(255,255,255,0.09)`,
    borderRadius: radius.xxl,
    padding:      18,
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 9, color: colors.textFaint }}>Добрый день, Никита</div>
        <div style={{ fontSize: 15, fontWeight: 500, fontFamily: fonts.serif }}>Мои цели</div>
      </div>
      <div style={{
        background:   colors.accentBg,
        borderRadius: radius.sm,
        padding:      '3px 9px',
        fontSize:     10,
        color:        colors.accent,
        fontWeight:   500,
      }}>
        3 активны
      </div>
    </div>

    {PREVIEW_GOALS.map(g => (
      <div key={g.label} style={{
        background:   colors.deepCard,
        border:       `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding:      '10px 11px',
        display:      'flex',
        alignItems:   'center',
        gap:          11,
        marginBottom: 6,
      }}>
        <ProgressRing progress={g.pct} size={38} color={g.color} fontSize={7} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 500 }}>{g.label}</div>
          <div style={{ fontSize: 9, color: 'rgba(237,232,223,0.38)', marginTop: 1 }}>{g.sub}</div>
        </div>
      </div>
    ))}

    <div style={{
      background:   colors.accentBg,
      border:       `1px solid ${colors.accentBorder}`,
      borderRadius: radius.sm,
      padding:      '8px 10px',
      display:      'flex',
      gap:          7,
      marginTop:    8,
    }}>
      <SparkIcon size={10} color={colors.accent} />
      <span style={{ fontSize: 10, color: 'rgba(237,232,223,0.55)', lineHeight: 1.55 }}>
        Ты на 12 дней впереди графика по бегу!
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
      maxWidth: 1040,
      margin:   '0 auto',
      padding:  '64px 36px 52px',
      display:  'flex',
      alignItems: 'center',
      gap:      52,
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 260 }} className="fade-up">
        <div style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          7,
          background:   colors.accentBg,
          border:       `1px solid ${colors.accentBorder}`,
          borderRadius: radius.full,
          padding:      '5px 13px',
          marginBottom: 22,
        }}>
          <SparkIcon size={11} color={colors.accent} />
          <span style={{ fontSize: 11, color: colors.accent, fontWeight: 500 }}>ИИ-коуч для твоих целей</span>
        </div>

        <h1 style={{
          fontSize:     50,
          fontWeight:   500,
          lineHeight:   1.08,
          color:        colors.text,
          marginBottom: 18,
          fontFamily:   fonts.serif,
        }}>
          Ставь цели.<br />ИИ поможет<br />
          <em style={{ color: colors.accent }}>их достичь.</em>
        </h1>

        <p style={{ fontSize: 15, color: colors.textMuted, lineHeight: 1.75, maxWidth: 420, marginBottom: 30 }}>
          Опиши цель в свободной форме — ИИ задаст вопросы, создаст персональный план и поможет не сбиться с пути.
        </p>

        <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginBottom: 26 }}>
          <Button size="md" onClick={() => goAuth('register')}>Начать бесплатно</Button>
          <Button variant="ghost" size="md" onClick={() => goAuth('login')}>Уже есть аккаунт</Button>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            {['А', 'М', 'К'].map((l, i) => (
              <div key={l} style={{
                width:          25, height: 25,
                borderRadius:   '50%',
                background:     [colors.accent, colors.teal, colors.purple][i],
                border:         `2px solid ${colors.bg}`,
                marginLeft:     i > 0 ? -7 : 0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       10, fontWeight: 600,
                color:          i === 2 ? '#EDE8DF' : colors.bg,
              }}>
                {l}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: colors.textFaint }}>1 200+ человек достигают целей с Apex</span>
        </div>
      </div>

      <AppPreview />
    </section>
  )
}

// ─── FeaturesSection ──────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: SparkIcon,  color: colors.accent, bg: colors.accentBg,         title: 'ИИ понимает тебя',     body: 'Пишешь в свободной форме — «хочу похудеть к лету» или «запустить бизнес». ИИ задаёт вопросы и разбирается.' },
  { Icon: TargetIcon, color: colors.teal,   bg: 'rgba(78,205,184,0.1)',   title: 'Разбивает на шаги',    body: 'Большая цель → конкретные вехи с дедлайнами. Ты всегда знаешь, что делать сегодня, а не через полгода.' },
  { Icon: ChartIcon,  color: colors.purple, bg: 'rgba(167,139,250,0.1)', title: 'Адаптивный трекинг',   body: 'ИИ замечает отставания, корректирует план и подсказывает — ты достигнешь цели в любом случае.' },
]

export const FeaturesSection: React.FC = () => (
  <section style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 36px' }}>
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', borderRadius: radius.full, padding: '4px 13px', marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: colors.textFaint, letterSpacing: '0.8px' }}>ВОЗМОЖНОСТИ</span>
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 500, fontFamily: fonts.serif }}>Почему Apex?</h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
      {FEATURES.map(f => (
        <div key={f.title} style={{
          background:   colors.surface,
          border:       `1px solid ${colors.border}`,
          borderRadius: radius.xl,
          padding:      24,
          transition:   'border-color 0.2s',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: radius.md, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
            <f.Icon size={19} color={f.color} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{f.title}</div>
          <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.75 }}>{f.body}</div>
        </div>
      ))}
    </div>
  </section>
)

// ─── HowItWorks ───────────────────────────────────────────────────────────────
const STEPS = [
  { n: '1', color: colors.accent,  title: 'Опиши цель',   body: 'Напиши в чате что хочешь достичь и к какому сроку — в любых словах.' },
  { n: '2', color: colors.teal,    title: 'Получи план',   body: 'ИИ задаёт пару вопросов и строит реалистичный план с вехами.' },
  { n: '3', color: colors.purple,  title: 'Достигай',      body: 'Отмечаешь прогресс, ИИ анализирует и подсказывает. Фокус на действиях.' },
]

export const HowItWorksSection: React.FC = () => (
  <section style={{ maxWidth: 1040, margin: '0 auto', padding: '20px 36px 64px' }}>
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', borderRadius: radius.full, padding: '4px 13px', marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: colors.textFaint, letterSpacing: '0.8px' }}>КАК ЭТО РАБОТАЕТ</span>
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 500, fontFamily: fonts.serif }}>Три шага до результата</h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 28 }}>
      {STEPS.map(s => (
        <div key={s.n} style={{ textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', border: `1.5px solid ${s.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ fontSize: 22, fontWeight: 500, color: s.color, fontFamily: fonts.serif }}>{s.n}</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{s.title}</div>
          <div style={{ fontSize: 13, color: colors.textFaint, lineHeight: 1.7 }}>{s.body}</div>
        </div>
      ))}
    </div>
  </section>
)

// ─── CtaBanner ────────────────────────────────────────────────────────────────
export const CtaBanner: React.FC = () => {
  const dispatch = useAppDispatch()
  return (
    <section style={{ maxWidth: 1040, margin: '0 auto 72px', padding: '0 36px' }}>
      <div style={{ background: colors.surface, border: `1px solid ${colors.accentBorder}`, borderRadius: radius.xxl, padding: '48px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 500, marginBottom: 10, fontFamily: fonts.serif }}>Готов начать?</h2>
        <p style={{ fontSize: 14, color: colors.textMuted, marginBottom: 26 }}>Это бесплатно. Первая цель — уже через 2 минуты.</p>
        <Button size="lg" onClick={() => { dispatch(setAuthTab('register')); dispatch(setScreen('auth')) }}>
          Создать аккаунт бесплатно
        </Button>
      </div>
    </section>
  )
}

// ─── LandingFooter ────────────────────────────────────────────────────────────
export const LandingFooter: React.FC = () => (
  <footer style={{ borderTop: `1px solid ${colors.border}`, padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1040, margin: '0 auto' }}>
    <div style={{ fontSize: 18, color: 'rgba(232,153,48,0.65)', fontFamily: fonts.serif }}>Apex</div>
    <div style={{ fontSize: 11, color: 'rgba(237,232,223,0.2)' }}>© 2026 Apex · Цели с ИИ</div>
  </footer>
)
