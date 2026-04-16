import type { Goal, ChatMessage } from '@/types'

export const SAMPLE_GOALS: Goal[] = [
  {
    id: '1',
    title: 'Выучить испанский B2',
    progress: 42,
    daysLeft: 127,
    category: 'Образование',
    nextAction: 'Урок: Past Tense',
    color: '#E89930',
    milestones: [
      { id: 'm1-1', text: 'Базовые аккорды Am, Em, G', date: 'Март 2025', done: true },
      { id: 'm1-2', text: 'Первый full строк', date: 'Март 2025', done: true },
      { id: 'm1-3', text: 'Сыграть первую полную песню', date: 'Апрель 2025', done: false, current: true },
      { id: 'm1-4', text: 'Репертуар 3 песни', date: 'Июнь 2025', done: false },
      { id: 'm1-5', text: 'Финальный концерт для себя', date: 'Октябрь 2025', done: false },
    ],
  },
  {
    id: '2',
    title: 'Пробежать полумарафон',
    progress: 68,
    daysLeft: 54,
    category: 'Спорт',
    nextAction: 'Пробежка 10 км в пятницу',
    color: '#4ECDB8',
    milestones: [
      { id: 'm2-1', text: 'Пробежать 5 км без остановок', date: 'Февраль 2025', done: true },
      { id: 'm2-2', text: 'Пробежать 10 км', date: 'Март 2025', done: true },
      { id: 'm2-3', text: 'Пробежать 15 км', date: 'Апрель 2025', done: false, current: true },
      { id: 'm2-4', text: 'Полумарафон 21.1 км', date: 'Июнь 2025', done: false },
    ],
  },
  {
    id: '3',
    title: 'Запустить пет-проект',
    progress: 25,
    daysLeft: 89,
    category: 'Карьера',
    nextAction: 'Написать MVP backend',
    color: '#A78BFA',
    milestones: [
      { id: 'm3-1', text: 'Определить идею и стек', date: 'Март 2025', done: true },
      { id: 'm3-2', text: 'Написать MVP backend', date: 'Апрель 2025', done: false, current: true },
      { id: 'm3-3', text: 'Запустить frontend', date: 'Май 2025', done: false },
      { id: 'm3-4', text: 'Первые 10 пользователей', date: 'Июль 2025', done: false },
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
