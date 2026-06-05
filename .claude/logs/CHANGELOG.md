# AntiAge — Лог изменений

## Шаблон записи

```
## [TASK-XXX] Название — YYYY-MM-DD
- Что сделано: краткое описание результата
- Файлы: пути изменённых/созданных файлов
- Сборка (antiage-platform): PASS / FAIL / N/A
- Линт: PASS / FAIL / N/A
- Проверка типов (tsc): PASS / FAIL / N/A
- Дельта размера: +X kb / -X kb / no change / N/A
- Проблемы: нет / описание блокеров
```

---

## История

<!-- Новые записи добавляются сверху. -->

## [TASK-011] PostgreSQL на VPS + первая миграция Prisma — 2026-06-05
- Что сделано: сервер перезагружен (снят reboot-required); установлен PostgreSQL 16.14 (active,
  только localhost); создана БД `antiage` + роль `antiage_app` (владелец, least privilege);
  применена миграция `20260605151106_init` (9 таблиц + 4 enum + 7 unique-индексов), запись в
  `_prisma_migrations`, `migrate status` = up to date. Креды — только на сервере
  (`/home/deploy/.antiage_db_env`, 600), в git/отчёт/чат не попадают.
- Файлы: `antiage-platform/prisma/migrations/20260605151106_init/migration.sql`,
  `…/migration_lock.toml`, `antiage-platform/.gitattributes` (LF для миграций),
  `.claude/reports/REPORT_TASK-011_2026-06-05.md`, `.claude/tasks/SPRINT.md` (TASK-011 → [x]).
- Сборка (antiage-platform): N/A
- Линт: N/A
- Проверка типов (tsc): PASS (после prisma generate, клиент v7.5.0)
- Дельта размера: N/A
- Проблемы: Windows OpenSSH `-L` туннель нестабилен (падал после 1-го соединения) → миграция
  применена через `migrate diff` + `migrate deploy` вместо `migrate dev` (артефакт идентичен);
  migration.sql приведён к LF, checksum в БД синхронизирован, добавлен `.gitattributes`.

## [TASK-010] Первичная настройка и защита RU-VPS — 2026-06-05
- Что сделано: сервер 89.108.76.118 (Ubuntu 24.04.3 LTS) защищён — вход только по SSH-ключу,
  создан `deploy` с sudo (NOPASSWD drop-in), парольная аутентификация отключена, пароль root
  заблокирован (`passwd -l`), ufw active (OpenSSH/80/443), fail2ban active (jail sshd), система
  обновлена. Все 4 проверки доступа из промта пройдены (см. отчёт).
- Файлы: `.claude/reports/REPORT_TASK-010_2026-06-05.md`, `.claude/tasks/SPRINT.md` (TASK-010 → [x]).
  На сервере (вне репо): deploy + /home/deploy/.ssh, /etc/sudoers.d/90-deploy,
  /etc/ssh/sshd_config.d/{50-cloud-init,99-hardening}.conf. Локально: ~/.ssh/id_ed25519 (не в git).
- Сборка (antiage-platform): N/A
- Линт: N/A
- Проверка типов (tsc): N/A
- Дельта размера: N/A
- Проблемы: SSH-сессия один раз оборвалась на обновлении glibc (восстановлено detached-апгрейдом);
  сервер требует reboot для активации нового ядра/glibc — рекомендован владельцу перед TASK-011.
