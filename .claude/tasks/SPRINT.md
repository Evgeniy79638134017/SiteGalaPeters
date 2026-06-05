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
- [ ] TASK-001: Починить lint-ошибку в `antiage-platform/src/components/shared/CountUp.tsx` (`react-hooks/set-state-in-effect`). Промт: `.claude/prompts/PROMPT_001_lint_countup.md`.
- [ ] TASK-002: Добавить статьи `BLOG_POSTS` в `antiage-platform/src/app/sitemap.ts` (сейчас в sitemap только листинг /blog).
- [ ] TASK-003: Добавить дисклеймеры — медицинский (футер + страницы программ/блога) и «не является лекарственным средством» на материалах с БАД (L5, L15, H4).
- [ ] TASK-004: Мелочи кода (L2*, L4*): `z.email()` вместо `z.string().email()` в `src/actions/*`; единый валидатор email (убрать дубль regex в `EmailGate.tsx`).

### Открытые вопросы для Vision Holder

- [ВОПРОС] Домен сайта не зарегистрирован. Нужен для TASK-015 (Nginx+TLS+переключение фронта): без домена нельзя выпустить TLS-сертификат и открыть API наружу. Решить: имя в зоне .ru, регистрация на reg.ru (аккаунт заказчика).
- Редактура контента под рекламу БАД (L6) и тексты дисклеймеров — нужен ли проход юриста до публикации (см. BACKLOG ВОПРОСЫ).

### Закрытые задачи

- [x] TASK-010 (2026-06-05): RU-VPS защищён — SSH-ключ, deploy+sudo, парольный вход выключен,
  root заблокирован, ufw + fail2ban active. 4/4 проверки доступа пройдены.
- [x] TASK-011 (2026-06-05): PostgreSQL 16 на VPS (localhost-only), БД antiage + роль antiage_app,
  миграция init применена (9 таблиц), migrate status = up to date. 4/4 проверки пройдены.
- [x] TASK-012 (2026-06-05): API-сервис antiage-api (Express+Prisma) под PM2 на 127.0.0.1:3001,
  приём quiz/contact/partner + ConsentLog. 4/4 проверки пройдены, тестовые данные удалены.

---

## Workflow отчётов

После каждой завершённой задачи исполнитель пишет отчёт в `.claude/reports/REPORT_TASK-NNN_YYYY-MM-DD.md`
по шаблону `.claude/reports/_TEMPLATE.md`. Cowork обязан прочитать отчёт до принятия задачи.
Подробные правила — в корневом `CLAUDE.md`, секция «Reports w