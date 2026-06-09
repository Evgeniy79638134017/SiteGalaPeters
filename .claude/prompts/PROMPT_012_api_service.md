# PROMPT_012_api_service

## Контекст
Проект AntiAge, задача TASK-012 (Фаза 0.3) — ключевой архитектурный шаг: приём форм
переезжает с server actions Vercel на API российского VPS. Готово: сервер защищён
(TASK-010), PostgreSQL + миграция (TASK-011), креды БД на сервере в
/home/deploy/.antiage_db_env (600). Доступ: ssh deploy@89.108.76.118 по ключу.
Прочитай: CLAUDE.md (Часть I, инварианты), .claude/context/ARCHITECTURE.md,
SERVER_SETUP.md §3, antiage-platform/src/actions/*.ts (логика для переноса),
antiage-platform/prisma/schema.prisma, .claude/reports/REPORT_TASK-011_2026-06-05.md.

## Цель
На VPS работает API-сервис под PM2 (переживает ребут), слушает ТОЛЬКО 127.0.0.1:3001:
POST /api/quiz, /api/contact, /api/partner, GET /healthz. Zod-валидация зеркальна
src/actions; записи в БД + ConsentLog (ipAddress, userAgent).
Готово = healthz 200 (curl с сервера); по тестовому POST на каждый эндпоинт появляются
строки в БД (проверка psql); невалидный payload → 400 и записей нет;
`ss -tlnp | grep 3001` → только 127.0.0.1; `pm2 status` online + pm2 save/startup сделаны.

## Вайб
Production-минимализм: маленький, скучный, надёжный сервис. Без лишних зависимостей.
Секреты — только на сервере. Код — в репозитории.

## Технические параметры
- Новый пакет `antiage-api/` в корне репо: TypeScript, Express (или Fastify — выбери,
  зафиксируй выбор в отчёте), zod, @prisma/client. Свои package.json/tsconfig (strict).
- Prisma-клиент: генерация по схеме antiage-platform
  (`prisma generate --schema ../antiage-platform/prisma/schema.prisma`) либо иной
  простейший рабочий способ — задокументируй в отчёте.
- Логика эндпоинтов — перенос из src/actions (схемы Zod скопировать 1:1):
  quiz → quizResult.create + emailContact.upsert + consentLog.create;
  contact → contactMessage.create + consentLog.create;
  partner → partnerApplication.create + consentLog.create.
  ConsentLog: action, source, ipAddress (req-ip, готовность к X-Forwarded-For), userAgent.
  Server actions в antiage-platform НЕ удалять (фронт переключаем в TASK-015).
- Сервер: Node 22 LTS (NodeSource), код в /home/deploy/antiage-api (rsync/scp),
  `npm ci --omit=dev`; сборку (tsc → dist) делай локально или на сервере — выбери,
  задокументируй. ENV: PORT=3001, HOST=127.0.0.1, DATABASE_URL — читать из
  /home/deploy/.antiage_db_env (pm2 ecosystem/env_file; в репо секретов нет).
  `pm2 start dist/server.js --name antiage-api && pm2 save` + выполнить команду pm2 startup.
- Тестовые записи: email вида task012-test@example.com; после проверки удали их из БД
  (задокументируй удаление в отчёте).
- Edge cases: ошибка БД → 500 с generic-телом (без stack trace); JSON limit 100kb;
  повторный quiz с тем же email → upsert контакта, новый QuizResult.

## Visual Guidance
- Валидация/поля — зеркально antiage-platform/src/actions/*.ts (это эталон).
- Отчёт — в стиле REPORT_TASK-011 (таблица проверок, ход работы, решения).

## Ожидания качества
- Гейты: tsc antiage-api без ошибок; 4 проверки из «Цели» с выводами команд в отчёте.
- Коммит и пуш: antiage-api/**, отчёт REPORT_TASK-012_<дата>.md, CHANGELOG, SPRINT → [x].
- Поле «Следующий шаг» = TASK-014 (email из API) и TASK-015 (Nginx+TLS, ждёт домена).
- DON'T: не открывать порты/ufw; не ставить и не настраивать Nginx (TASK-015);
  не отправлять email (TASK-014); не коммитить секреты/.env; не менять schema.prisma
  и существующий код antiage-platform; пароли/креды в отчёт не вставлять.
