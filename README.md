# Apex — цели с ИИ

Приложение для постановки целей с ИИ-коучем.

## Стек

| | |
|---|---|
| UI | React 18 + TypeScript |
| State | Redux Toolkit |
| Bundler | Vite |
| Fonts | Cormorant Garamond + DM Sans |

## Структура

```
src/
├── components/
│   ├── auth/         # Экран входа / регистрации
│   ├── dashboard/    # Личный кабинет
│   │   ├── screens/  # Home, NewGoal, GoalDetail
│   │   ├── GoalCard.tsx
│   │   ├── Sidebar.tsx
│   │   └── Dashboard.tsx
│   ├── icons/        # SVG-иконки
│   ├── landing/      # Лендинг
│   └── ui/           # Button, Input, Badge, ProgressRing, StatCard, AiInsight
├── constants/        # Тестовые данные
├── hooks/            # useAppDispatch, useAppSelector
├── store/
│   ├── slices/       # authSlice, goalsSlice, uiSlice
│   └── index.ts
├── styles/           # globals.css, theme.ts
├── types/            # TypeScript типы
├── App.tsx
└── main.tsx
```

## Запуск

```bash
npm install
npm run dev
```

## Продакшн-билд

```bash
npm run build
npm run preview
```

## Подключение реального ИИ

В `NewGoalScreen.tsx` замени mock `AI_FLOW` на вызов Anthropic API:

```ts
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: userMessage }],
  }),
})
```
