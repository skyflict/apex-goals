import type { GoalPlan } from '@/types'

export interface GoalResponse {
  acknowledgment: string
  plan: GoalPlan
  category: string
  nextAction: string
}

export async function generateGoalPlan(
  want: string,
  have: string,
  timeline: string,
): Promise<GoalResponse> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('API ключ не найден. Добавь VITE_OPENROUTER_API_KEY в файл .env')
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'content-type':  'application/json',
      'HTTP-Referer':  'http://localhost:5173',
      'X-Title':       'Planika Goals',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `Ты — AI-коуч приложения Planika для постановки и достижения целей. Отвечай строго в формате JSON без markdown.

Составляй подробный, практичный и персональный план. Не ограничивайся общими фразами. Учитывай цель, текущие ресурсы пользователя и выбранный срок.
Пиши на русском, дружелюбно, но конкретно. Каждый шаг должен быть применимым: что делать, зачем делать и какой результат считать готовым.
Если срок короткий — делай план плотнее. Если срок длинный — разбивай на этапы. Не придумывай недостижимых обещаний.

Формат ответа:
{
  "acknowledgment": "Мотивирующее признание цели пользователя (1-2 предложения на русском)",
  "plan": {
    "title": "Короткое название цели (3-6 слов на русском)",
    "deadline": "Понятный срок, связанный с запросом пользователя",
    "pace": "Рекомендуемый темп (например '30 минут в день, 5 раз в неделю')",
    "overview": "Краткое описание стратегии в 2-3 предложениях: с чего начать, как наращивать сложность, какой итог ожидается",
    "steps": [
      {
        "title": "Название этапа",
        "why": "Зачем нужен этап и какую проблему он закрывает",
        "actions": ["Конкретное действие 1", "Конкретное действие 2", "Конкретное действие 3"],
        "result": "Проверяемый результат этапа"
      }
    ],
    "weeklyPlan": ["Что делать в первую неделю", "Что делать во вторую неделю", "Что делать дальше"],
    "risks": ["Возможная помеха и как её обойти", "Возможная помеха и как её обойти"],
    "successCriteria": ["Как пользователь поймёт, что цель достигнута", "Измеримый критерий прогресса"]
  },
  "category": "Одно из: Здоровье, Карьера, Образование, Финансы, Хобби, Спорт, Личное развитие",
  "nextAction": "Первое конкретное действие, которое можно сделать сегодня"
}

Требования:
- В "steps" верни 5-7 этапов.
- В каждом "actions" верни 3-5 конкретных действий.
- "weeklyPlan" должен содержать 4-6 пунктов.
- "risks" должен содержать 2-4 пункта.
- "successCriteria" должен содержать 2-4 пункта.`,
        },
        {
          role: 'user',
          content: `Хочу: ${want}\n\nЧто уже есть: ${have}\n\nСрок: ${timeline}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } }
    throw new Error(err?.error?.message ?? `HTTP ${response.status}`)
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> }
  return JSON.parse(data.choices[0].message.content) as GoalResponse
}
