# PROMPT_011_postgres_migrate

## Контекст
Проект AntiAge, задача TASK-011 (Фаза 0.2). TASK-010 закрыта: сервер 89.108.76.118
(Ubuntu 24.04) защищён, вход `ssh deploy@89.108.76.118` по ключу, sudo NOPASSWD.
Висит `*** System restart required ***` (glibc) — закрываем здесь шагом 0.
Прочитай: CLAUDE.md (Часть I), .claude/tasks/SPRINT.md, .claude/context/ARCHITECTURE.md,
SERVER_SETUP.md §2, .claude/reports/REPORT_TASK-010_2026-06-05.md,
antiage-platform/prisma/schema.prisma, antiage-platform/prisma.config.ts.

## Цель
PostgreSQL работает на VPS (только localhost), создана БД `antiage` с пользователем
`antiage_app`, применена первая миграция Prisma (создан каталог prisma/migrations).
Готово = `systemctl is-active postgresql` = active; `ss -tlnp | grep 5432` слушает ТОЛЬКО
127.0.0.1 (и ::1); `sudo -u postgres psql -d antiage -c "\dt"` показывает таблицы схемы
(EmailContact, QuizResult, PartnerApplication, ContactMessage, ConsentLog и др.);
`prisma/migrations/*_init/` закоммичен.

## Вайб
Аккуратно, по шагам, с проверкой после каждого. Минимум сущностей: только Postgres.
Секреты не попадают ни в git, ни в отчёт, ни в чат.

## Технические параметры
- Шаг 0: `sudo reboot`, подожди ~60–90 с, проверь `ssh deploy@...` работает и
  `*** System restart required ***` исчез (`ls /var/run/reboot-required` → нет файла).
- Установка: `sudo apt install -y postgresql`. Проверь `listen_addresses` — должен быть
  localhost (дефолт). Наружу 5432 НЕ открывать (ufw не трогать).
- БД и пользователь: сгенерируй стойкий пароль (openssl rand -base64 24), создай
  `antiage` (db) и `antiage_app` (user, владелец БД). Для первой миграции дай
  `ALTER USER antiage_app CREATEDB;` (нужно Prisma для shadow database; после миграции
  можно `NOCREATEDB`).
- Креды сохрани ТОЛЬКО на сервере: `/home/deploy/.antiage_db_env` (chmod 600, owner deploy),
  формат `DATABASE_URL=postgresql://antiage_app:<пароль>@localhost:5432/antiage?schema=public`.
  Они понадобятся API в TASK-012.
- Первая миграция — с локальной машины через SSH-туннель:
  1) `ssh -L 15432:localhost:5432 deploy@89.108.76.118 -N` (фоновый туннель);
  2) в PowerShell сессии: `$env:DATABASE_URL="postgresql://antiage_app:<пароль>@localhost:15432/antiage?schema=public"`
     (только в сессии, НИКАКИХ записей в файлы репо);
  3) cwd `antiage-platform/`: `npx prisma migrate dev --name init` → создаст
     `prisma/migrations/<ts>_init/` и применит к БД через туннель;
  4) закрой туннель, очисти env (`Remove-Item Env:DATABASE_URL`).
- Edge cases: если migrate ругается на shadow DB — проверь CREATEDB у antiage_app.
  Если порт 15432 занят — возьми другой. Пароль БД в команды отчёта не вставлять
  (маскируй как `<пароль>`).

## Visual Guidance
- Команды и структура — по SERVER_SETUP.md §2. Стиль отчёта — как REPORT_TASK-010 (эталон).

## Ожидания качества
- Все проверки из «Цели» пройдены, выводы команд в отчёте (пароль замаскирован).
- `npx tsc --noEmit` в antiage-platform после миграции — без ошибок (prisma generate
  обновит клиент).
- Коммит: `prisma/migrations/**`, отчёт, CHANGELOG, SPRINT (TASK-011 → [x]). Пуш.
- Отчёт `.claude/reports/REPORT_TASK-011_<дата>.md`, поле «Следующий шаг» = TASK-012 (API).
- DON'T: не открывать 5432 наружу; не коммитить пароли/.env; не ставить Node/PM2/Nginx;
  не менять schema.prisma; не трогать ufw/sshd.
