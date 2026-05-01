import type { Goal, ChatMessage } from '@/types'

export const SAMPLE_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Выучить испанский',
    level: 'B2',
    progress: 42,
    daysLeft: 127,
    category: 'Образование',
    nextAction: 'Урок: Past Tense',
    nextDuration: '40 мин',
    color: '#E89930',
    streak: 18,
    milestones: [
      { id: 'm1-1', text: 'Базовая грамматика A1', date: 'Фев', done: true },
      { id: 'm1-2', text: 'Словарь 1 000 слов', date: 'Март', done: true },
      { id: 'm1-3', text: 'Past Tense — разговор', date: 'Апр', done: false, current: true },
      { id: 'm1-4', text: 'Смотреть фильм без сабов', date: 'Июнь', done: false },
      { id: 'm1-5', text: 'Сдать DELE B2', date: 'Окт', done: false },
    ],
  },
  {
    id: '2',
    title: 'Пробежать полумарафон',
    level: '21.1K',
    progress: 68,
    daysLeft: 54,
    category: 'Спорт',
    nextAction: 'Длинная 10 км',
    nextDuration: '1 ч 05',
    color: '#4ECDB8',
    streak: 31,
    milestones: [
      { id: 'm2-1', text: '5 км без остановок', date: 'Фев', done: true },
      { id: 'm2-2', text: '10 км темповая',     date: 'Март', done: true },
      { id: 'm2-3', text: '15 км длинная',      date: 'Апр', done: false, current: true },
      { id: 'm2-4', text: 'Полумарафон 21.1 км', date: 'Июнь', done: false },
    ],
  },
  {
    id: '3',
    title: 'Запустить пет-проект',
    level: 'MVP',
    progress: 25,
    daysLeft: 89,
    category: 'Карьера',
    nextAction: 'MVP backend',
    nextDuration: '2 ч',
    color: '#A78BFA',
    streak: 6,
    milestones: [
      { id: 'm3-1', text: 'Определить идею и стек', date: 'Март', done: true },
      { id: 'm3-2', text: 'MVP backend', date: 'Апр', done: false, current: true },
      { id: 'm3-3', text: 'Запустить frontend', date: 'Май', done: false },
      { id: 'm3-4', text: 'Первые 10 пользователей', date: 'Июль', done: false },
    ],
  },
]

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'c1',
    role: 'ai',
    text: 'Привет! Расскажи, что хочешь достичь — в любых словах, без формальностей.',
  },
]

// Week rhythm — default placeholder. In production, computed from completed tasks.
export const WEEK_RHYTHM = [
  { day: 'Пн', value: 100, done: true },
  { day: 'Вт', value: 65,  done: true },
  { day: 'Ср', value: 80,  done: true },
  { day: 'Чт', value: 50,  done: true },
  { day: 'Пт', value: 70,  today: true },
  { day: 'Сб', value: 40 },
  { day: 'Вс', value: 30 },
] as const
