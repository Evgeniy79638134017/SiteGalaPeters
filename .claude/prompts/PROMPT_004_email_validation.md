# PROMPT_004_email_validation

## Контекст
TASK-004 (аудит L2*/L4*): в actions используется устаревший z.string().email() (Zod 4),
а в EmailGate.tsx — отдельный самописный regex; два источника правды для email.
Прочитай: CLAUDE.md, antiage-platform/src/actions/*.ts,
src/components/forms/EmailGate.tsx, antiage-api/src/schemas.ts (зеркало схем).

## Цель
Единый валидатор email. Готово = (1) создан src/lib/validators.ts с emailSchema на
z.email(); (2) все три action и EmailGate используют его (regex удалён);
(3) antiage-api/src/schemas.ts тоже переведён на z.email() — зеркальность сохранена;
(4) lint/tsc/build зелёные в обоих пакетах.

## Вайб
Защитный рефакторинг: поведение для пользователя не меняется, сообщения об ошибках
(«Некорректный email») сохранить.

## Технические параметры
- cwd: antiage-platform/ и antiage-api/. Zod v4: z.email() — top-level API.
- EmailGate — клиентский компонент: импорт zod допустим; проверка через
  emailSchema.safeParse(email).success.

## Visual Guidance
- Паттерн схем — текущие файлы actions; не менять структуру ответов action’ов.

## Ожидания качества
- Гейты: npm run lint + npx tsc --noEmit + npm run build (antiage-platform);
  npx tsc --noEmit (antiage-api).
- Отчёт REPORT_TASK-004, CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: не менять тексты ошибок и UX форм; не трогать серверный деплой antiage-api
  (обновление кода на VPS не требуется — схема совместима; отметь это в отчёте).
