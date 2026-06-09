# PROMPT_001_lint_countup

## Контекст
Проект AntiAge, SPRINT-1, задача TASK-001. Линтер падает на одном файле
(`react-hooks/set-state-in-effect`) — это блокирует «зелёный lint» как gate.
Прочитай перед стартом: `CLAUDE.md`, `.claude/tasks/SPRINT.md`,
`.claude/context/ARCHITECTURE.md`, файл `antiage-platform/src/components/shared/CountUp.tsx`.
Состояние: `npx tsc --noEmit` проходит; `npx eslint .` даёт 1 ошибку в CountUp.tsx:44.

## Цель
Починить lint-ошибку в `CountUp.tsx` (синхронный `setState` внутри `useEffect`).
Готово = `npx eslint .` в `antiage-platform/` без ошибок и предупреждений, поведение
счётчика не изменилось (анимация и ветка `prefers-reduced-motion` работают как раньше).

## Вайб
Минимальное вмешательство. Чинить только эту ошибку, не рефакторить остальной компонент,
не менять публичные пропсы. Не трогать другие файлы.

## Технические параметры
- cwd для команд: `antiage-platform/`.
- Менеджер пакетов: npm. Линт: `npm run lint` (или `npx eslint .`). Типы: `npx tsc --noEmit`.
- Подход к фиксу: инициализировать стартовое значение через ленивый инициализатор `useState`
  или вынести синхронную установку из тела эффекта (см. правило react-hooks/set-state-in-effect).
- Edge case: при `shouldReduceMotion` счётчик сразу показывает конечное значение — это поведение
  обязано сохраниться.

## Visual Guidance
- Паттерн стейта/эффектов бери из соседних клиентских компонентов в
  `antiage-platform/src/components/shared/` (`AnimateOnScroll.tsx`). UI не меняется — скриншот не нужен.

## Ожидания качества
- `npx eslint .` зелёный; `npx tsc --noEmit` без ошибок.
- Запись в `.claude/logs/CHANGELOG.md` по шаблону (с дельтой размера, если изменилась).
- Отчёт `.claude/reports/REPORT_TASK-001_2026-MM-DD.md` по `_TEMPLATE.md`, поле «Следующий шаг» заполнено.
- Статус TASK-001 в `.claude/tasks/SPRINT.md` → `[x]`.
- DON'T: не менять пропсы CountUp, не трогать другие компоненты, не добавлять библиотеки.
