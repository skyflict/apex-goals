import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { addChatMessage, addGoal, clearChat } from '@/store/slices/goalsSlice'
import { setDashboardTab }                    from '@/store/slices/uiSlice'
import { Button }                             from '@/components/ui/Button'
import { BackIcon, SparkIcon }                from '@/components/icons'
import { colors, fonts, radius }              from '@/styles/theme'
import { generateGoalPlan }                   from '@/services/ai'
import { saveGoalPlan, saveUserGoal }         from '@/services/goalsRepository'
import type { GoalResponse }                  from '@/services/ai'
import type { Goal, GoalPlan, GoalPlanStep }  from '@/types'

const TIMELINE_OPTIONS = [
  { value: 'день', label: 'День' },
  { value: 'неделя', label: 'Неделя' },
  { value: 'месяц', label: 'Месяц' },
  { value: 'полгода', label: 'Полгода' },
  { value: 'custom', label: 'Другое' },
] as const

const HAVE_QUICK_REPLIES = [
  'Начинаю с нуля',
  'Есть базовый опыт',
  'Могу уделять 30 минут в день',
]

const isDetailedStep = (step: GoalPlan['steps'][number]): step is GoalPlanStep => (
  typeof step !== 'string'
)

const getStepTitle = (step: GoalPlan['steps'][number]) => (
  isDetailedStep(step) ? step.title : step
)

// ─── BubbleAI ─────────────────────────────────────────────────────────────────
const BubbleAI: React.FC<{ text: string; muted?: boolean }> = ({ text, muted }) => (
  <div style={{
    background:   colors.card,
    border:       `1px solid ${colors.border}`,
    borderRadius: '4px 14px 14px 14px',
    padding:      '11px 15px',
    maxWidth:     '88%',
    opacity:      muted ? 0.65 : 1,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
      <SparkIcon size={11} color={colors.accent} />
      <span style={{ fontSize: 10, color: colors.accent, fontWeight: 500 }}>ИИ-коуч</span>
    </div>
    <p style={{ fontSize: 13, color: 'rgba(237,232,223,0.8)', lineHeight: 1.65, fontFamily: fonts.sans }}>{text}</p>
  </div>
)

// ─── BubbleUser ───────────────────────────────────────────────────────────────
const BubbleUser: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    background:   'rgba(232,153,48,0.13)',
    border:       `1px solid ${colors.accentBorder}`,
    borderRadius: '14px 4px 14px 14px',
    padding:      '11px 15px',
    maxWidth:     '88%',
    marginLeft:   'auto',
    whiteSpace:   'pre-line',
  }}>
    <p style={{ fontSize: 13, color: colors.text, lineHeight: 1.65, fontFamily: fonts.sans }}>{text}</p>
  </div>
)

// ─── PlanCard ────────────────────────────────────────────────────────────────
const PlanCard: React.FC<{
  plan: GoalPlan
  category?: string
  nextAction?: string
  onSave: () => void
  onReset: () => void
}> = ({ plan, category, nextAction, onSave, onReset }) => (
  <div style={{
    background:   `linear-gradient(135deg, rgba(232,153,48,0.1), ${colors.card} 38%)`,
    border:       `1px solid ${colors.borderStrong}`,
    borderRadius: '4px 16px 16px 16px',
    padding:      '15px',
    maxWidth:     '100%',
    boxShadow:    '0 18px 54px rgba(0,0,0,0.18)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 11 }}>
      <SparkIcon size={11} color={colors.accent} />
      <span style={{ fontSize: 10, color: colors.accent, fontWeight: 500 }}>Готово! Вот твой план</span>
    </div>

    <div style={{ marginBottom: 13 }}>
      <div style={{ fontSize: 24, fontWeight: 500, fontFamily: fonts.serif, lineHeight: 1.05, marginBottom: 8 }}>
        {plan.title}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {category && <PlanPill label={category} />}
        <PlanPill label={plan.deadline} />
        <PlanPill label={plan.pace} />
      </div>
    </div>

    {nextAction && (
      <div style={{
        background:     'rgba(232,153,48,0.08)',
        border:         `1px solid ${colors.accentBorder}`,
        borderRadius:   radius.md,
        padding:        '11px 12px',
        marginBottom:   13,
        display:        'grid',
        gap:            4,
      }}>
        <span style={{ fontSize: 10, color: colors.accent, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Следующее действие
        </span>
        <p style={{ fontSize: 13, lineHeight: 1.5, color: colors.text }}>
          {nextAction}
        </p>
      </div>
    )}

    {plan.overview && (
      <PlanSection title="Стратегия">
        <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(237,232,223,0.74)' }}>
          {plan.overview}
        </p>
      </PlanSection>
    )}

    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: radius.md, padding: '12px', marginBottom: 13 }}>
      {plan.steps.map((step, i) => (
        <div key={i} style={{
          display:      'grid',
          gridTemplateColumns: '24px 1fr',
          gap:          10,
          alignItems:   'flex-start',
          padding:      i === 0 ? '0 0 10px' : i === plan.steps.length - 1 ? '10px 0 0' : '10px 0',
          borderBottom: i === plan.steps.length - 1 ? 'none' : `1px solid ${colors.border}`,
        }}>
          <div style={{
            width:          24,
            height:         24,
            borderRadius:   '50%',
            border:         `1.5px solid rgba(232,153,48,0.35)`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}>
            <span style={{ fontSize: 10, color: colors.accent, fontWeight: 600 }}>{i + 1}</span>
          </div>
          <div>
            <p style={{ fontSize: 14, color: colors.text, lineHeight: 1.45, fontFamily: fonts.sans, marginBottom: isDetailedStep(step) ? 5 : 0 }}>
              {getStepTitle(step)}
            </p>
            {isDetailedStep(step) && step.why && (
              <p style={{ fontSize: 12, color: colors.textMuted, lineHeight: 1.55, marginBottom: 7 }}>
                {step.why}
              </p>
            )}
            {isDetailedStep(step) && step.actions.length > 0 && (
              <ul style={{ display: 'grid', gap: 4, paddingLeft: 15, marginBottom: step.result ? 7 : 0 }}>
                {step.actions.map(action => (
                  <li key={action} style={{ fontSize: 12.5, color: 'rgba(237,232,223,0.68)', lineHeight: 1.5 }}>
                    {action}
                  </li>
                ))}
              </ul>
            )}
            {isDetailedStep(step) && step.result && (
              <p style={{ fontSize: 12, color: colors.accentSoft, lineHeight: 1.5 }}>
                Результат: {step.result}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 13 }}>
      {plan.weeklyPlan && plan.weeklyPlan.length > 0 && (
        <PlanSection title="Ритм по неделям" compact>
          <PlanBullets items={plan.weeklyPlan} />
        </PlanSection>
      )}
      {plan.successCriteria && plan.successCriteria.length > 0 && (
        <PlanSection title="Критерии успеха" compact>
          <PlanBullets items={plan.successCriteria} />
        </PlanSection>
      )}
      {plan.risks && plan.risks.length > 0 && (
        <PlanSection title="Риски" compact>
          <PlanBullets items={plan.risks} />
        </PlanSection>
      )}
    </div>

    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button size="sm" style={{ flex: 1, justifyContent: 'center' }} onClick={onSave}>
        Сохранить цель
      </Button>
      <Button variant="ghost" size="sm" onClick={onReset}>
        Изменить ввод
      </Button>
    </div>
  </div>
)

const PlanSection: React.FC<{ title: string; compact?: boolean; children: React.ReactNode }> = ({ title, compact, children }) => (
  <div style={{
    background:   'rgba(255,255,255,0.035)',
    border:       `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding:      compact ? '11px 12px' : '12px',
    marginBottom: compact ? 0 : 13,
  }}>
    <div style={{ fontSize: 10, color: colors.accent, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
      {title}
    </div>
    {children}
  </div>
)

const PlanBullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul style={{ display: 'grid', gap: 6, paddingLeft: 15 }}>
    {items.map(item => (
      <li key={item} style={{ fontSize: 12.5, color: 'rgba(237,232,223,0.7)', lineHeight: 1.5 }}>
        {item}
      </li>
    ))}
  </ul>
)

const PlanPill: React.FC<{ label: string }> = ({ label }) => (
  <span style={{
    border:       `1px solid ${colors.borderStrong}`,
    background:   'rgba(255,255,255,0.04)',
    borderRadius: radius.full,
    padding:      '5px 9px',
    color:        colors.textMuted,
    fontSize:     11,
    lineHeight:   1,
  }}>
    {label}
  </span>
)

// ─── GoalForm ─────────────────────────────────────────────────────────────────
const fieldStyle: React.CSSProperties = {
  width:        '100%',
  background:   'rgba(255,255,255,0.05)',
  border:       `1px solid rgba(255,255,255,0.1)`,
  borderRadius: radius.md,
  color:        colors.text,
  fontFamily:   fonts.sans,
  fontSize:     13,
  padding:      '9px 13px',
  lineHeight:   1.5,
  resize:       'none',
  outline:      'none',
  boxSizing:    'border-box',
  display:      'block',
}

const labelStyle: React.CSSProperties = {
  fontSize:      11,
  fontWeight:    500,
  color:         colors.textMuted,
  marginBottom:  5,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

interface GoalFormProps {
  onSubmit: (want: string, have: string, timeline: string) => void
  disabled: boolean
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, disabled }) => {
  const [want,     setWant]     = useState('')
  const [have,     setHave]     = useState('')
  const [timelinePreset, setTimelinePreset] = useState('месяц')
  const [customTimeline, setCustomTimeline] = useState('')

  const timeline = timelinePreset === 'custom' ? customTimeline : timelinePreset

  const canSubmit = want.trim() && have.trim() && timeline.trim() && !disabled

  return (
    <div className="new-goal-form" style={{ borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <SparkIcon size={11} color={colors.accent} />
        <span style={{ fontSize: 11, color: colors.accent, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Расскажи о своей цели
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div>
          <div style={labelStyle}>Чего я хочу достичь</div>
          <textarea
            value={want}
            onChange={e => setWant(e.target.value)}
            placeholder="Например: научиться играть на гитаре"
            rows={2}
            style={fieldStyle}
          />
        </div>

        <div>
          <div style={labelStyle}>Что у меня уже есть</div>
          <textarea
            value={have}
            onChange={e => setHave(e.target.value)}
            placeholder="Навыки, ресурсы, сколько времени в день могу уделять..."
            rows={2}
            style={fieldStyle}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {HAVE_QUICK_REPLIES.map(reply => (
              <button
                key={reply}
                type="button"
                onClick={() => setHave(current => current ? `${current}, ${reply.toLowerCase()}` : reply)}
                style={{
                  border:       `1px solid ${colors.borderStrong}`,
                  background:   'rgba(255,255,255,0.04)',
                  color:        colors.textMuted,
                  borderRadius: radius.full,
                  padding:      '6px 9px',
                  fontFamily:   fonts.sans,
                  fontSize:     11,
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={labelStyle}>За какой срок</div>
          <div className="timeline-options">
            {TIMELINE_OPTIONS.map(option => {
              const active = timelinePreset === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTimelinePreset(option.value)}
                  style={{
                    border:       `1px solid ${active ? colors.accentBorder : colors.borderStrong}`,
                    background:   active ? colors.accentBg : 'rgba(255,255,255,0.04)',
                    color:        active ? colors.accent : colors.textMuted,
                    borderRadius: radius.md,
                    padding:      '8px 9px',
                    fontFamily:   fonts.sans,
                    fontSize:     12,
                    fontWeight:   active ? 600 : 500,
                    minWidth:     0,
                  }}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
          {timelinePreset === 'custom' && (
            <input
              value={customTimeline}
              onChange={e => setCustomTimeline(e.target.value)}
              placeholder="Например: 3 месяца, к декабрю 2026..."
              style={{ ...fieldStyle, marginTop: 8 }}
            />
          )}
        </div>

        <Button
          style={{
            width:          '100%',
            justifyContent: 'center',
            marginTop:      4,
            opacity:        canSubmit ? 1 : 0.45,
            cursor:         canSubmit ? 'pointer' : 'not-allowed',
          }}
          disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) onSubmit(want.trim(), have.trim(), timeline.trim())
          }}
        >
          {disabled ? 'Составляю план...' : 'Создать план →'}
        </Button>
      </div>
    </div>
  )
}

// ─── NewGoalScreen ────────────────────────────────────────────────────────────
export const NewGoalScreen: React.FC = () => {
  const dispatch   = useAppDispatch()
  const messages   = useAppSelector(s => s.goals.chatMessages)
  const user       = useAppSelector(s => s.auth.user)
  const [isLoading,     setIsLoading]     = useState(false)
  const [lastResponse,  setLastResponse]  = useState<GoalResponse | null>(null)
  const bottomRef  = useRef<HTMLDivElement>(null)

  useEffect(() => { dispatch(clearChat()) }, [dispatch])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const hasUserMessage = messages.some(m => m.role === 'user')
  const hasPlan        = messages.some(m => m.role === 'plan')

  const handleFormSubmit = async (want: string, have: string, timeline: string) => {
    const userText = `Хочу: ${want}\nЕсть сейчас: ${have}\nСрок: ${timeline}`
    dispatch(addChatMessage({ id: `u-${Date.now()}`, role: 'user', text: userText }))

    setIsLoading(true)
    try {
      const result = await generateGoalPlan(want, have, timeline)
      setLastResponse(result)
      if (user) {
        void saveGoalPlan(user.uid, {
          input: { want, have, timeline },
          response: result,
        }).catch(err => console.error('Failed to save goal plan', err))
      }
      dispatch(addChatMessage({ id: `ai-${Date.now()}`,   role: 'ai',  text: result.acknowledgment }))
      dispatch(addChatMessage({ id: `plan-${Date.now()}`, role: 'plan', plan: result.plan }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Неизвестная ошибка'
      dispatch(addChatMessage({ id: `err-${Date.now()}`, role: 'ai', text: `Ошибка: ${msg}` }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    const planMsg = messages.find(m => m.role === 'plan')
    if (!planMsg?.plan) return

    const goal: Goal = {
      id:         crypto.randomUUID(),
      title:      planMsg.plan.title,
      progress:   0,
      daysLeft:   90,
      category:   lastResponse?.category   ?? 'Хобби',
      nextAction: lastResponse?.nextAction ?? (planMsg.plan.steps[0] ? getStepTitle(planMsg.plan.steps[0]) : ''),
      color:      colors.accent,
      milestones: planMsg.plan.steps.map((step, i) => ({
        id:      `new-${i}`,
        text:    getStepTitle(step),
        date:    planMsg.plan!.deadline,
        done:    false,
        current: i === 0,
      })),
    }

    if (user) {
      await saveUserGoal(user.uid, goal)
        .catch(err => console.error('Failed to save goal', err))
    }

    dispatch(addGoal(goal))
    dispatch(setDashboardTab('home'))
  }

  return (
    <div className="new-goal-screen" style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
      {/* Header */}
      <div className="new-goal-header" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <Button variant="icon" onClick={() => dispatch(setDashboardTab('home'))} style={{ padding: '7px 11px' }}>
          <BackIcon size={14} />
        </Button>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Новая цель</div>
      </div>

      {/* Messages */}
      <div className="new-goal-messages" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {messages.length === 0 && !isLoading && (
          <BubbleAI text="Привет! Заполни форму ниже — и я составлю персональный план для твоей цели." />
        )}
        {messages.map(m => (
          <React.Fragment key={m.id}>
            {m.role === 'ai'   && <BubbleAI   text={m.text!} />}
            {m.role === 'user' && <BubbleUser text={m.text!} />}
            {m.role === 'plan' && m.plan && (
              <PlanCard
                plan={m.plan}
                category={lastResponse?.category}
                nextAction={lastResponse?.nextAction}
                onSave={handleSave}
                onReset={() => {
                  setLastResponse(null)
                  dispatch(clearChat())
                }}
              />
            )}
          </React.Fragment>
        ))}
        {isLoading && (
          <BubbleAI text="Анализирую цель и составляю персональный план..." muted />
        )}
        <div ref={bottomRef} />
      </div>

      {/* 3-field form — shown until user submits */}
      {!hasUserMessage && !hasPlan && (
        <GoalForm onSubmit={handleFormSubmit} disabled={isLoading} />
      )}
    </div>
  )
}
