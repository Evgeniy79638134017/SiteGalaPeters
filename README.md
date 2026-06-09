# Anti-Age Platform — `gpeters.ru`

Персональный сайт эксперта по anti-age (Галина): лиды через квиз и формы, программы,
блог, привлечение в Telegram. Живой прод: **https://gpeters.ru**.

> Этот README отражает **фактическое** состояние. Полная сводка «сделано / открыто / долги» —
> в [PROJECT_STATUS.md](PROJECT_STATUS.md). «Мозг проекта» (домен, аудитория, дизайн-система) —
> в [CLAUDE.md](CLAUDE.md) Часть II (там местами описана v3-визия, не всё из неё реализовано —
> ориентируйтесь на разделы «Реализовано»/«Roadmap» ниже).

## Технологический стек (фактический, из `antiage-platform/package.json`)

| Технология | Версия | Примечание |
|------------|--------|-----------|
| Next.js | **16.2** (App Router, RSC) | сборка Turbopack |
| React / React DOM | **19.2** | |
| TypeScript | **5** (strict) | |
| Tailwind CSS | **v4** | CSS-first `@theme` в `globals.css` |
| Prisma ORM + PostgreSQL | **7.5** | driver adapter `@prisma/adapter-pg` (Prisma 7) |
| shadcn / Base UI | shadcn 4 / `@base-ui/react` 1 | копируемые UI-компоненты |
| Framer Motion | 12 | анимации, `useReducedMotion` |
| Zod | 4 | валидация форм/входных данных |
| Resend / Inngest | 6 / 4 | email/очереди — **заготовлены, не активны** (нужен ESP) |
| html2canvas | 1.4.1 | «Скачать таблицу приёма» → JPG |
| Хостинг | Vercel + RU-VPS (Nginx) | см. «Архитектура» |

## Архитектура (кратко) — гибрид RU-VPS + Vercel

```
Браузер → gpeters.ru → RU-VPS (Москва, Nginx reverse-proxy, TLS)
   ├─ /            → проксируется на Vercel (Next.js, глобальный edge)
   ├─ /api/*       → локальный API на VPS (Node/PM2, 127.0.0.1) → PostgreSQL (РФ)
   └─ /media/*     → статика с диска VPS (hero-видео)
```

- **ПДн граждан РФ — только в РФ-БД** (152-ФЗ): приём и запись форм идут через локальный API
  на VPS, не через server actions Vercel.
- Vercel в РФ заблокирован → весь трафик идёт через московский Nginx (разблокировка + локализация ПДн).
- Подробнее: [PERF_ARCHITECTURE_PLAN.md](PERF_ARCHITECTURE_PLAN.md), [SERVER_SETUP.md](SERVER_SETUP.md),
  [ARCHITECTURE.md](ARCHITECTURE.md).

## Реализовано (на проде)

**Инфраструктура / безопасность**
- RU-VPS защищён (SSH-ключи, ufw, fail2ban); PostgreSQL 16 (localhost-only) + миграции Prisma.
- API приёма форм (quiz / contact / partner) на VPS под PM2; Nginx + TLS (Let's Encrypt) на `gpeters.ru`.
- Rate-limiting форм `/api/*` — **средствами Nginx** (`limit_req`), без Arcjet.
- Nginx: HTTP/2, gzip, `proxy_cache` для статики Vercel (`/api`, `/media` не кэшируются).

**Право / согласия (152-ФЗ / ФЗ-38)**
- Раздельные согласия (ПДн / рассылка) + фиксация в `ConsentLog`; медицинский и БАД-дисклеймеры.

**Контент**
- Квиз «биологический возраст» (алгоритм bioAge, gate с обязательным согласием).
- 9 программ поддержки организма (каталог + подстраницы, кнопки заказа → реф-ссылка agenyz).
- Блог с обложками + статьи в `sitemap`; реальные фото Галины (hero, программы, аватар в шапке).
- Реальные соцсети/Telegram; «Скачать таблицу приёма» → JPG (html2canvas).

**Производительность видео/страниц**
- Постер-LCP + ленивое hero-видео (постер на мобайл/медленных/`saveData`).
- Выбор источника видео: РФ/СНГ-таймзоны → Москва сразу; зарубеж → Vercel-edge с фолбэком на Москву.

## Планы / Roadmap (v1.1) — НЕ реализовано

- **Email-рассылки**: транзакционные письма (результаты квиза) и drip-серия через Resend + Inngest —
  **ждут выбора российского ESP** (без него письма не отправляются).
- **Telegram-бот** (webhook, выдача результатов квиза) — продуктовое решение не принято.
- **JWT-доступ к результатам квиза** по токену — не реализован (сейчас результаты считаются на клиенте).
- **Аналитика**: helper `trackEvent` есть; подключение Umami / PostHog / Sentry — по мере настройки.
- **AI-чат** (Vercel AI SDK + RAG), **PWA** (Serwist, offline-квиз, push), **галерея До/После** (`/gallery`).
- Видео на внешнем CDN / HLS — **парковано** (для декоративного фона не оправдано; см. PROJECT_STATUS §5).

## Ждёт решения/данных владельца

- Российский **ESP** (для писем) · реквизиты ИП/ООО (оферта) · решение по Telegram-боту/JWT.
- Юр-гейт перед платным продвижением: регистрация ИП, уведомление РКН, финальное юр-ревью текстов
  (см. [LEGAL_RISKS.md](LEGAL_RISKS.md), PROJECT_STATUS §4).

## Документы

| Файл | Содержание |
|------|-----------|
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Актуальная сводка: сделано / открыто / долги |
| [CLAUDE.md](CLAUDE.md) | Координация (Часть I) + «мозг проекта» v3 (Часть II) |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Вайрфреймы, схема БД, SEO, email-/Telegram-архитектура (v3-визия) |
| [PLAN.md](PLAN.md) | Пошаговый план реализации (v3) |
| [PERF_ARCHITECTURE_PLAN.md](PERF_ARCHITECTURE_PLAN.md) | Производительность для зарубежной аудитории |
| [SERVER_SETUP.md](SERVER_SETUP.md) · [LEGAL_RISKS.md](LEGAL_RISKS.md) | Сервер · юридические риски |

## Локальная разработка

```bash
cd antiage-platform
npm install
npm run dev        # http://localhost:3000
npm run build      # prisma generate + next build
npm run lint       # eslint
npx tsc --noEmit   # проверка типов
```

`.env` — по образцу `.env.example` (DATABASE_URL и ключи; секреты в git не коммитятся).
Тяжёлые исходники контента лежат в `ContentFiles/` (вне git, см. `.gitignore`).

> MCP-серверы (Context7, Playwright, A11y, Lighthouse, Resend, Cloudinary, Sentry, PubMed и др.) —
> это инструменты разработки/ассистента, а не части продукта.
