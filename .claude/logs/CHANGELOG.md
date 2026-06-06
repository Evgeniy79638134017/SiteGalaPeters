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

## [TASK-013] Раздельные согласия (ПДн / рассылка) — 2026-06-05
- Что сделано: на квизе/партнёрке — два неустановленных чекбокса (ПДн обязателен, рассылка нет),
  контакт — один (ПДн); квиз-текст включает данные о здоровье. API: consentData=z.literal(true)
  (иначе 400) + consentMarketing optional; ConsentLog пишет action="data_processing", при маркетинге
  — вторую строку action="marketing". Схема Prisma не менялась. Деплой: antiage-api пересобран,
  pm2 reload, healthz 200; фронт — Vercel. Сквозной тест: 1/2/1 строки + 400 без consentData;
  тестовые данные удалены.
- Файлы: `…/forms/{EmailGate,ContactFormClient,PartnerForm}.tsx`, `…/quiz/QuizResults.tsx`,
  `antiage-api/src/{schemas.ts,server.ts}`, `.claude/reports/REPORT_TASK-013_2026-06-05.md`,
  `.claude/tasks/SPRINT.md` (TASK-013 → [x]).
- Сборка (antiage-platform): PASS; antiage-api tsc: PASS + deploy + pm2 reload OK
- Линт: PASS
- Проверка типов (tsc): PASS (оба пакета)
- Дельта размера: незначительная (без новых зависимостей)
- Проблемы: marketing-флаг в EmailContact отложен (нужна миграция) → TASK-014/017.

## [TASK-004] Единый email-валидатор — 2026-06-05
- Что сделано: создан src/lib/validators.ts (emailSchema = z.email(), isValidEmail); regex удалён
  из ContactFormClient/PartnerForm/EmailGate; antiage-api/src/schemas.ts переведён z.string().email()
  → z.email() (×3, зеркальность сохранена). Тексты ошибок и UX не менялись.
- Файлы: `antiage-platform/src/lib/validators.ts` (new), `…/forms/{ContactFormClient,PartnerForm,
  EmailGate}.tsx`, `antiage-api/src/schemas.ts`, `.claude/reports/REPORT_TASK-004_2026-06-05.md`,
  `.claude/tasks/SPRINT.md` (TASK-004 → [x]).
- Сборка (antiage-platform): PASS; antiage-api tsc: PASS
- Линт: PASS
- Проверка типов (tsc): PASS (оба пакета)
- Дельта размера: незначительная (без новых зависимостей)
- Проблемы: src/actions уже удалён в TASK-019 (дедуп применён к 3 формам); antiage-api на VPS
  не передеплоен — z.email() ≡ z.string().email(), схема совместима.

## [TASK-003] Дисклеймеры (медицинский + БАД) — 2026-06-05
- Что сделано: медицинский дисклеймер в Footer.tsx (на всех страницах через layout); новый
  компонент Disclaimer.tsx («БАД. Не является лекарственным средством.», gold-блок, text-sm)
  размещён на странице программ, подстраницах программ и статьях блога. Формулировки — рабочая
  редакция (до юр.гейта), не менялись. Подтверждено grep по prerendered HTML.
- Файлы: `src/components/shared/Disclaimer.tsx` (new), `src/components/layout/Footer.tsx`,
  `src/app/programs/page.tsx`, `src/app/programs/[slug]/page.tsx`, `src/app/blog/[slug]/page.tsx`,
  `.claude/reports/REPORT_TASK-003_2026-06-05.md`, `.claude/tasks/SPRINT.md` (TASK-003 → [x]).
- Сборка (antiage-platform): PASS
- Линт: PASS
- Проверка типов (tsc): PASS
- Дельта размера: незначительная (без новых зависимостей)
- Проблемы: тексты — рабочая редакция, финал утверждает юрист (гейт −1.4).

## [TASK-002] Статьи блога в sitemap — 2026-06-05
- Что сделано: в src/app/sitemap.ts добавлен блок blogPages (по образцу programPages) — 6 записей
  /blog/<slug> из BLOG_POSTS (monthly, priority 0.7). Проверено фактическим вызовом sitemap():
  17 URL всего, 6 блоговых. robots.ts и прочие записи не трогались.
- Файлы: `antiage-platform/src/app/sitemap.ts`, `.claude/reports/REPORT_TASK-002_2026-06-05.md`,
  `.claude/tasks/SPRINT.md` (TASK-002 → [x]).
- Сборка (antiage-platform): PASS
- Линт: PASS
- Проверка типов (tsc): PASS
- Дельта размера: незначительная (без новых зависимостей)
- Проблемы: нет.

## [TASK-001] Lint-фикс CountUp.tsx — 2026-06-05
- Что сделано: убрана ошибка `react-hooks/set-state-in-effect` в CountUp.tsx — синхронный
  `setCount(end)` в reduced-motion ветке эффекта заменён на производное `displayCount` при рендере.
  Поведение счётчика (анимация и prefers-reduced-motion) сохранено, пропсы не менялись.
- Файлы: `antiage-platform/src/components/shared/CountUp.tsx`,
  `.claude/reports/REPORT_TASK-001_2026-06-05.md`, `.claude/tasks/SPRINT.md` (TASK-001 → [x]).
- Сборка (antiage-platform): N/A
- Линт: PASS (был 1 error → 0)
- Проверка типов (tsc): PASS
- Дельта размера: незначительная (без новых зависимостей)
- Проблемы: нет.

## [TASK-019] Переключение форм фронта на /api + домен gpeters.ru — 2026-06-05
- Что сделано: формы (контакт/партнёр/квиз) шлют same-origin POST на /api/* (хелпер src/lib/api.ts)
  вместо server actions → ПДн пишутся в РФ-БД. Квиз-сабмит реализован (был stub), resultToken
  доходит до результатов. src/actions удалён. Дефолт домена antiage.ru → gpeters.ru (canonical/og,
  sitemap, robots, jsonld, blog), email hello@antiage.ru → gpeters@mail.ru. Добавлен vercel.json
  (ignoreCommand). Сквозной тест на https://gpeters.ru: 1/1/1/1/3 строки, тестовые удалены.
- Файлы: src/lib/api.ts (new), forms/{ContactFormClient,PartnerForm}.tsx, quiz/QuizResults.tsx,
  app/{layout,sitemap,robots,blog/[slug]/page}.tsx, lib/{constants,jsonld}.ts, vercel.json (new),
  удалён src/actions/*. Отчёт REPORT_TASK-019_2026-06-05.md, SPRINT (TASK-019 → [x]).
- Сборка (antiage-platform): PASS
- Линт: пред-существующая ошибка CountUp.tsx (TASK-001), файлы TASK-019 чистые; на build не влияет
- Проверка типов (tsc): PASS
- Дельта размера: без новых зависимостей (нативный fetch); кода −141/+68 строк
- Проблемы: линт-долг CountUp оставлен за TASK-001; соцсети не менялись (уточнит владелец).

## [TASK-015] Nginx + TLS на gpeters.ru — 2026-06-05
- Что сделано: Nginx reverse-proxy на VPS — `/` → Vercel (gala-antiage.vercel.app, подмена Host),
  `/api/` → локальный antiage-api (127.0.0.1:3001). TLS Let's Encrypt на gpeters.ru+www (certbot
  --nginx, 80→443, авто-продление). В antiage-api добавлен alias `/api/healthz`. Реальный IP
  посетителя доходит до ConsentLog (X-Forwarded-For + trust proxy). 6/6 проверок, тестовая строка удалена.
- Файлы: `antiage-api/src/server.ts` (healthz на ["/healthz","/api/healthz"]),
  `.claude/reports/REPORT_TASK-015_2026-06-05.md`, `.claude/tasks/SPRINT.md` (TASK-015 → [x]).
  На сервере (вне репо): /etc/nginx/sites-available/gpeters.ru, сертификаты Let's Encrypt.
- Сборка (antiage-api tsc): PASS
- Линт: N/A
- Проверка типов (tsc): PASS
- Дельта размера: без изменений зависимостей (правка 1 строки + nginx/certbot на сервере)
- Проблемы: Vercel отдаёт 404 при Host=gpeters.ru → подмена Host на vercel-домен; dry-run с
  --no-random-sleep-on-renew для быстрой проверки.

## [TASK-012] API-сервис приёма форм на VPS — 2026-06-05
- Что сделано: новый пакет `antiage-api/` (Express 5 + Zod + Prisma через @prisma/adapter-pg),
  развёрнут на VPS под PM2 (online, pm2 save + startup), слушает только 127.0.0.1:3001.
  Эндпоинты GET /healthz, POST /api/quiz|/contact|/partner; Zod-схемы 1:1 из src/actions;
  запись в БД + ConsentLog (ip/userAgent). 4/4 проверки из «Цели» пройдены, тестовые строки удалены.
- Файлы: `antiage-api/**` (src, prisma/schema.prisma-копия, ecosystem.config.js, package*.json,
  tsconfig.json, .gitignore), `.claude/reports/REPORT_TASK-012_2026-06-05.md`,
  `.claude/tasks/SPRINT.md` (TASK-012 → [x]). На сервере: /home/deploy/antiage-api, pm2-deploy.service.
- Сборка (antiage-api tsc): PASS
- Линт: N/A (ESLint в пакете не настраивался; tsc strict)
- Проверка типов (tsc): PASS
- Дельта размера: новый сервис antiage-api (express/zod/@prisma/client/@prisma/adapter-pg/pg/prisma/dotenv, точные версии)
- Проблемы: Prisma 7 wasm-клиент требует driver adapter (добавлены @prisma/adapter-pg+pg);
  пакет держит копию schema.prisma (миграции не запускает); фронтовые server actions не тронуты.

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
