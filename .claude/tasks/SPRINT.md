# AntiAge — Активный спринт

## SPRINT-3: контент и наполнение  [ПЛАНИРУЕТСЯ]

**Цель:** живой контент — видео-hero, реальные фото, каталог программ по образцу doksveta.ru/programs.

### Задачи (черновик, промты по мере готовности решений)

- [ ] TASK-059: 9-я программа «Клеточное омоложение» (контент Галины, флагман). Промт: `.claude/prompts/PROMPT_059_program_omolozhenie.md`.
- [x] TASK-056: Круглые фото Галины на программах (hero + цитата). Промт: `.claude/prompts/PROMPT_056_program_circles.md`. Отчёт: `.claude/reports/REPORT_TASK-056_2026-06-08.md`.
- [ ] TASK-057: Кнопка «Скачать таблицу приёма» → JPG расписания (html2canvas). Промт: `.claude/prompts/PROMPT_057_download_table.md`.
- [ ] TASK-058: AI-обложки статей блога (ждёт: файлы из Downloads → ContentFiles/web_ready/blog-covers/, затем Cowork отберёт+оптимизирует, потом промт).

- [x] TASK-022: Rate limiting /api/* в nginx (H1; решение PM — без Arcjet). Промт: `.claude/prompts/PROMPT_022_rate_limit.md`. Отчёт: `.claude/reports/REPORT_TASK-022_2026-06-06.md`.

- [x] TASK-050 (2026-06-06, Cowork): медиа готовы в ContentFiles/web_ready/ — hero-bg.mp4 (9.3 МБ, 720p/25fps, без звука), 4 постера-кандидата, OG-кандидат 1200x630, 6 фото в jpg+webp (≤1600px). CR3 отложен (нет RAW-конвертера; нужен JPG-экспорт от владельца).
- [x] TASK-051: Видео-фон в Hero главной (затемнение, постер 1.5s, фоллбеки; видео на VPS /media/). Промт: `.claude/prompts/PROMPT_051_hero_video.md`. Отчёт: `.claude/reports/REPORT_TASK-051_2026-06-06.md`.
- [x] TASK-052: Реальные фото на сайт (about/preview/accent; назначения утверждены; …27 — ждёт уточнения). Промт: `.claude/prompts/PROMPT_052_real_photos.md`. Отчёт: `.claude/reports/REPORT_TASK-052_2026-06-06.md`.
- [x] TASK-054: Реальные соцсети/Telegram (GalaProMolodost, galina.peters, @galinapeters, TikTok) + ORDER_URL. Промт: `.claude/prompts/PROMPT_054_socials.md`. Отчёт: `.claude/reports/REPORT_TASK-054_2026-06-06.md`.
- [x] TASK-055: Возраст 62 → 63 (текущий — да; историческое «зрение в 62» — нет). Промт: `.claude/prompts/PROMPT_055_age_update.md`. Отчёт: `.claude/reports/REPORT_TASK-055_2026-06-07.md`.
- [x] TASK-053: Каталог 8 программ (структура+контент doksveta, ToV Галины; реф-код позже). Промт: `.claude/prompts/PROMPT_053_programs_catalog.md`. Отчёт: `.claude/reports/REPORT_TASK-053_2026-06-07.md`. Зависело от TASK-054 (ORDER_URL).

### Вопросы для Vision Holder (SPRINT-3)

- [РЕШЕНО] dudnikpromo2.mp4 — финальная версия. Постер выбран владельцем: кадр 1.5s (Галина с микрофоном на сцене) — hero-poster.jpg; og.jpg из того же кадра.
- [РЕШЕНО] Программы: структура И наполнение — с doksveta.ru/programs (8 программ, свой проект семьи), адаптация под Tone of Voice Галины (источник ToV — ANTIAGE_1_ЛИЧНОСТЬ_И_СТИЛЬ.txt); врачебные формулировки скорректировать под позиционирование Галины (риск L15). Драфт делает Cowork → валидация владельцем → TASK-053 имплементация.

---

## SPRINT-2: право и согласия

**Цель:** привести согласия и обязательные юр-элементы сайта в соответствие 152-ФЗ/ФЗ-38.

**Стартовал:** 2026-06-05

### Задачи

- [x] TASK-013: Раздельные согласия (ПДн / рассылка) на формах + раздельная фиксация в ConsentLog; редеплой API. Промт: `.claude/prompts/PROMPT_013_split_consent.md`. Отчёт: `.claude/reports/REPORT_TASK-013_2026-06-05.md`.

---

## SPRINT-1: технические задачи без юридического гейта  [ЗАКРЫТ 2026-06-05]

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
- [x] TASK-004: Единый валидатор email (z.email, без дубля regex). Промт: `.claude/prompts/PROMPT_004_email_validation.md`. Отчёт: `.claude/reports/REPORT_TASK-004_2026-06-05.md`.

### Открытые вопросы для Vision Holder

- [РЕШЕНО] Контактный email = gpeters@mail.ru ✅; соцсети получены 06.06: TG t.me/GalaProMolodost, IG galina.peters, YT @galinapeters, TikTok gala_lucky (TASK-054). Реф-код agenyz — придёт позже (кнопки временно на TG). Цифры: 30+ лет/1000+ людей. Тон §3 — ок.
- [РЕШЕНО 07.06] Возраст: текущий = 63 (TASK-055); исторические упоминания и slug статьи про зрение — не трогаем.
- [ВОПРОС] Email-провайдер (российский ESP) для TASK-014 — отложено заказчиком; задача ждёт.
- Редактура контента под рекламу БАД (L6) и тексты дисклеймеров — нужен ли проход юриста до публикации (см. BACKLOG ВОПРОСЫ).

### Закрытые задачи

- [x] TASK-010 (2026-06-05): RU-VPS защищён — SSH-ключ, deploy+sudo, парольный вход выключен,
  root заблокирован, ufw + fail2ban active. 4/4 проверки доступа пройдены.
- [x] TASK-011 (2026-06-05): PostgreSQL 16 на VPS (localhost-only), БД antiage + роль antiage_app,
  миграция init применена (9 таблиц), migrate status = up to date. 4/4 проверки пройдены.
- [x] TASK-012 (2026-06-05): API-сервис antiage-api (Express+Prisma) под PM2 на 127.0.0.1:3001,
  приём quiz/contact/partner + ConsentLog. 4/4 проверки