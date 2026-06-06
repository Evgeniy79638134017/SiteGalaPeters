# AntiAge — Активный спринт

## SPRINT-1: технические задачи без юридического гейта

**Цель:** закрыть быстрые технические долги фронта + первичная настройка сервера.
Настройка VPS (TASK-010/011) не собирает ПДн и юр.гейта не ждёт; публичный сбор данных
(TASK-012+) — только после закрытия Фазы −1.

**Стартовал:** 2026-05-31
**Завершён:** —

### Задачи

- [x] TASK-010: Первичная настройка и защита RU-VPS (reg.ru, 89.108.76.118): SSH-ключи, deploy, отключение паролей, ufw, fail2ban. Промт: `.claude/prompts/PROMPT_010_server_bootstrap.md`. Отчёт: `.claude/reports/REPORT_TASK-010_2026-06-05.md`.
- [x] TASK-011: PostgreSQL на VPS + первая миграция Prisma (включая перезагрузку сервера шагом 0). Промт: `.claude/prompts/PROMPT_011_postgres_migrate.md`. Отчёт: `.claude/reports/REPORT_TASK-011_2026-06-05.md`.
- [x] TASK-012: API-сервис приёма форм на VPS (Node+PM2, только 127.0.0.1): /api/quiz, /api/contact, /api/partner + ConsentLog. Промт: `.claude/prompts/PROMPT_012_api_service.md`. Отчёт: `.claude/reports/REPORT_TASK-012_2026-06-05.md`.
- [x] TASK-015: Nginx + TLS на gpeters.ru: / → Vercel, /api → локальный API; сквозной тест форм. Промт: `.claude/prompts/PROMPT_015_nginx_tls.md`. Отчёт: `.claude/reports/REPORT_TASK-015_2026-06-05.md`.
- [x] TASK-019: Переключить формы фронта на /api + домен gpeters.ru в metadata (canonical-баг с прода). Промт: `.claude/prompts/PROMPT_019_frontend_switch.md`. Отчёт: `.claude/reports/REPORT_TASK-019_2026-06-05.md`.
- [x] TASK-001: Починить lint-ошибку в `antiage-platform/src/components/shared/CountUp.tsx` (`react-hooks/set-state-in-effect`). Промт: `.claude/prompts/PROMPT_001_lint_countup.md`. Отчёт: `.claude/reports/REPORT_TASK-001_2026-06-05.md`.
- [x] TASK-002: Добавить статьи `BLOG_POSTS` в sitemap. Промт: `.claude/prompts/PROMPT_002_blog_sitemap.md`. Отчёт: `.claude/reports/REPORT_TASK-002_2026-06-05.md`.
- [x] TASK-003: Дисклеймеры (медицинский + БАД). Промт: `.claude/prompts/PROMPT_003_disclaimers.md`. Отчёт: `.claude/reports/REPORT_TASK-003_2026-06-05.md`.
- [ ] TASK-004: Единый валидатор email (z.email, без дубля regex). Промт: `.claude/prompts/PROMPT_004_email_validation.md`.

### Открытые вопросы для Vision Holder

- [РЕШЕНО] Контактный email = gpeters@mail.ru (TASK-019 заменит hello@antiage.ru). Ссылки соцсетей — позже.
- [ВОПРОС] Email-провайдер (российский ESP) для TASK-014 — отложено заказчиком; задача ждёт.
- Редактура контента под рекламу БАД (L6) и тексты дисклеймеров — нужен ли проход юриста до публикации (см. BACKLOG ВОПРОСЫ).

### Закрытые задачи

- [x] TASK-010 (2026-06-05): RU-VPS защищён — SSH-ключ, deploy+sudo, парольный вход выключен,
  root заблокирован, ufw + fail2ban active. 4/4 проверки доступа пройдены.
- [x] TASK-011 (2026-06-05): PostgreSQL 16 на VPS (localhost-only), БД antiage + роль antiage_app,
  миграция init применена (9 таблиц), migrate status = up to date. 4/4 проверки пройдены.
- [x] TASK-012 (2026-06-05): API-сервис antiage-api (Express+Prisma) под PM2 на 127.0.0.1:3001,
  приём quiz/contact/partner + ConsentLog. 4/4 проверки пройдены, тестовые данные удалены.
- [x] TASK-015 (2026-06-05): Nginx + TLS на gpeters.ru (/ → Vercel, /api → локальный API),
  Let's Encrypt + авто-редирект, реальный IP в ConsentLog. 6/6 проверок, тестовая запись удалена.
- [x] TASK-019 (2026-06-05): формы фронта → same-origin /api (РФ-БД), domain antiage.ru → gpeters.ru
  (canonical/og fix), src/actions удалён, vercel.json ignoreCommand. 5/5 проверок, тест-данные удалены.
- [x] TASK-001 (2026-06-05): lint-фикс CountUp.tsx (set-state-in-effect) — производное значение
  вместо setState в эффекте. eslint . зелёный (0 ошибок), поведение счётчика сохранено.
- [x] TASK-002 (2026-06-05): статьи блога (BLOG_POSTS) добавлены в sitemap (6 URL /blog/<slug>).
  Проверено вызовом sitemap() — 17 URL всего. Lint/tsc/build зелёные.
- [x] TASK-003 (2026-06-05): медицинский дисклеймер в футере (все страницы) + блок «БАД. Не является
  лекарственным средством» (Disclaimer.tsx) на программах и статьях блога. Тексты в DOM подтверждены.

---

## Workflow отчётов

После каждой завершённой задачи исполни