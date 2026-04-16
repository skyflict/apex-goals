import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch }  from '@/hooks/useAppDispatch'
import { useAppSelector }  from '@/hooks/useAppSelector'
import { addChatMessage, addGoal } from '@/store/slices/goalsSlice'
import { setDashboardTab }         from '@/store/slices/uiSlice'
import { Button }                  from '@/components/ui/Button'
import { BackIcon, SendIcon, SparkIcon } from '@/components/icons'
import { colors, fonts, radius }   from '@/styles/theme'
import type { GoalPlan } from '@/types'

// ─── BubbleAI ─────────────────────────────────────────────────────────────────
const BubbleAI: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    background:   colors.card,
    border:       `1px solid ${colors.border}`,
    borderRadius: '4px 14px 14px 14px',
    padding:      '11px 15px',
    maxWidth:     '88%',
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
  }}>
    <p style={{ fontSize: 13, color: colors.text, lineHeight: 1.65, fontFamily: fonts.sans }}>{text}</p>
  </div>
)

// ─── PlanCard ────────────────────────────────────────────────────────────────
const PlanCard: React.FC<{ plan: GoalPlan; onSave: () => void }> = ({ plan, onSave }) => (
  <div style={{
    background:   colors.card,
    border:       `1px solid ${colors.border}`,
    borderRadius: '4px 14px 14px 14px',
    padding:      '13px 15px',
    maxWidth:     '96%',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 11 }}>
      <SparkIcon size={11} color={colors.accent} />
      <span style={{ fontSize: 10, color: colors.accent, fontWeight: 500 }}>Готово! Вот твой план</span>
    </div>

    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: radius.md, padding: '13px 15px', marginBottom: 13 }}>
      <div style={{ fontSize: 17, fontWeight: 500, fontFamily: fonts.serif, marginBottom: 2 }}>{plan.title}</div>
      <div style={{ fontSize: 11, color: colors.textFaint, marginBottom: 11 }}>
        Дедлайн: {plan.deadline} · {plan.pace}
      </div>
      {plan.steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ width: 19, height: 19, borderRadius: '50%', border: `1.5px solid rgba(232,153,48,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <span style={{ fontSize: 9, color: 'rgba(232,153,48,0.7)', fontWeight: 500 }}>{i + 1}</span>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(237,232,223,0.65)', lineHeight: 1.6, fontFamily: fonts.sans }}>{step}</p>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" style={{ flex: 1, justifyContent: 'center' }} onClick={onSave}>
        Сохранить цель
      </Button>
      <Button variant="ghost" size="sm">Изменить</Button>
    </div>
  </div>
)

// ─── Mock AI responses ────────────────────────────────────────────────────────
const AI_FLOW: Array<{ role: 'ai' | 'plan'; text?: string; plan?: GoalPlan }> = [
  { role: 'ai', text: 'Отлично! К какому сроку хочешь достичь цели? И есть ли уже какой-то опыт или ресурсы?' },
  { role: 'ai', text: 'Понял. Дай мне секунду — составлю персональный план...' },
  {
    role: 'plan',
    plan: {
      title:    'Играть 5 песен на гитаре',
      deadline: 'к 14 октября 2025',
      pace:     '20–30 мин/день',
      steps:    ['Базовые аккорды Am, Em, G, C', 'Первая полная песня', 'Репертуар из 3 песен', 'Финальный мини-концерт'],
    },
  },
]

// ─── NewGoalScreen ────────────────────────────────────────────────────────────
export const NewGoalScreen: React.FC = () => {
  const dispatch  = useAppDispatch()
  const messages  = useAppSelector(s => s.goals.chatMessages)
  const [input,   setInput]   = useState('')
  const [aiStep,  setAiStep]  = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput('')

    dispatch(addChatMessage({ id: Date.now().toString(), role: 'user', text }))

    // Simulate AI reply
    const next = AI_FLOW[aiStep]
    if (next) {
      setTimeout(() => {
        dispatch(addChatMessage({ id: (Date.now() + 1).toString(), ...next }))
        setAiStep(s => s + 1)
      }, 800)
    }
  }

  const handleSave = () => {
    dispatch(addGoal({
      id:         Date.now().toString(),
      title:      'Играть 5 песен на гитаре',
      progress:   0,
      daysLeft:   183,
      category:   'Хобби',
      nextAction: 'Выучить аккорд Am',
      color:      colors.accent,
      milestones: [
        { id: 'n1', text: 'Базовые аккорды Am, Em, G, C', date: 'Май 2025',     done: false, current: true },
        { id: 'n2', text: 'Первая полная песня',           date: 'Июль 2025',    done: false },
        { id: 'n3', text: 'Репертуар из 3 песен',          date: 'Сентябрь 2025',done: false },
        { id: 'n4', text: 'Финальный мини-концерт',        date: 'Октябрь 2025', done: false },
      ],
    }))
    dispatch(setDashboardTab('home'))
  }

  const showInput = !messages.some(m => m.role === 'plan')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 680 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Button variant="icon" onClick={() => dispatch(setDashboardTab('home'))} style={{ padding: '7px 11px' }}>
          <BackIcon size={14} />
        </Button>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Новая цель</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {messages.map(m => (
          <React.Fragment key={m.id}>
            {m.role === 'ai'   && <BubbleAI   text={m.text!} />}
            {m.role === 'user' && <BubbleUser text={m.text!} />}
            {m.role === 'plan' && m.plan && <PlanCard plan={m.plan} onSave={handleSave} />}
          </React.Fragment>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {showInput && (
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: 9, alignItems: 'flex-end', flexShrink: 0 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Напиши свою цель..."
            rows={2}
            style={{
              flex:         1,
              background:   'rgba(255,255,255,0.05)',
              border:       `1px solid rgba(255,255,255,0.1)`,
              borderRadius: radius.md,
              color:        colors.text,
              fontFamily:   fonts.sans,
              fontSize:     14,
              padding:      '10px 14px',
              lineHeight:   1.5,
            }}
          />
          <Button size="sm" style={{ padding: '10px 14px', flexShrink: 0, height: 44, alignSelf: 'flex-end' }} onClick={send}>
            <SendIcon size={15} />
          </Button>
        </div>
      )}
    </div>
  )
}
