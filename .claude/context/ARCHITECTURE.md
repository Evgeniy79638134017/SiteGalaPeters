# AntiAge — Архитектура (координационный контекст)

> Краткий источник правды для агентов. Подробности — в корневых документах репозитория:
> `../../ARCHITECTURE.md` (исходный дизайн), `../../AUDIT.md`, `../../PLAN_ANALYSIS.md`,
> `../../LEGAL_RISKS.md`, `../../IMPLEMENTATION_PLAN.md` (Ред. 3), `../../SERVER_SETUP.md`.
> Обновлять после каждого TASK, меняющего маршрут уровня корня, схему БД или ENV-контракт.

## Обзор

Сайт-платформа эксперта по anti-age (рус. аудитория, 40–70). Сбор лидов через квиз
«биологический возраст», формы партнёрства и контактов, блог, email-воронка. Сайт —
основной бизнес-инструмент. Аудитория — граждане РФ → действует 152-ФЗ.

## Целевая архитектура (гибрид, зафиксирована Ред. 3)

```
Браузер
 ├─ страницы  → RU-VPS (Nginx reverse proxy) → Vercel (Next.js: страницы, квиз-UI, блог)
 └─ формы/ПДн → RU-VPS (API-сервис) → PostgreSQL (на том же сервере, РФ)
                      RU-VPS API → Email-провайдер (РФ)
```

- Vercel — только витрина (контент, дизайн). Меняется часто (`git push`).
- RU-VPS — reverse proxy (обход блокировки Vercel в РФ) + API приёма форм + PostgreSQL (локализация ПДн). Меняется редко.
- Логика форм НЕ в server actions Vercel, а в API на RU-VPS (см. SERVER_SETUP.md).

## Дерево директорий (репозиторий siteGala/)

```
siteGala/
├── antiage-platform/        — приложение Next.js (cwd для build/lint)
│   ├── src/app/             — маршруты (App Router)
│   ├── src/actions/         — ВРЕМЕННО server actions (переезжают в API RU-VPS)
│   ├── src/components/      — UI (sections, forms, quiz, ui, layout, shared)
│   ├── src/content/         — контент (blog-posts, programs, quiz-questions)
│   ├── src/lib/             — db, quiz-logic, jsonld, analytics, constants
│   └── prisma/schema.prisma — модели БД (миграций пока нет)
├── ContentFiles/            — исходный контент бренда (вынести из git, L1*)
├── .claude/                 — координационный слой (этот каталог)
└── *.md                     — AUDIT / PLAN_ANALYSIS / LEGAL_RISKS / IMPLEMENTATION_PLAN / SERVER_SETUP
```

## Стек

Next.js 16.2 (App Router), React 19, TypeScript strict, Tailwind v4, Prisma 7 + PostgreSQL.
Менеджер пакетов: npm. Рабочая директория команд: `antiage-platform/`.

## Контракт окружения (ENV)

| Переменная | Назначение | Где |
|-----------|-----------|-----|
| DATABASE_URL | Подключение к Postgres (РФ, пулированное) | API/Prisma на RU-VPS |
| <ESP>_API_KEY | Отправка писем (РФ-провайдер) | API RU-VPS |
| TELEGRAM_BOT_TOKEN / TELEGRAM_WEBHOOK_SECRET | Бот/вебхук (если включаем) | API RU-VPS |
| JWT_SECRET | Токены доступа к результатам квиза (если включаем) | API RU-VPS |
| NEXT_PUBLIC_UMAMI_* | Аналитика | Vercel (клиент) |
| NEXT_PUBLIC_SITE_URL | Базовый URL | Vercel |

Секреты — только в env сервера/Vercel, не в git (см. AUDIT L1*).

## Схема данных (Prisma)

EmailContact, QuizResult, EmailSequenceStep, PartnerApplication, ContactMessage,
BlogCategory, BlogPost, ConsentLog, AdminUser. Данные квиза о здоровье = спец.категория
ПДн (ст.10 152-ФЗ) → отдельное письменное согласие. Все согласия фиксируются в ConsentLog.

## Инварианты архитектуры

1. Первичный сбор и хранение ПДн граждан РФ — только на сервере в РФ (152-ФЗ ч.5 ст.18). Никакого прямого сбора в зарубежную БД.
2. Согласия раздельные: (а) обработка ПДн, (б) рекламная рассылка. Данные о здоровье — письменное согласие.
3. Реклама БАД сопровождается «не является лекарственным средством»; без обещаний излечения.
4. Секреты — только в ENV, не в коде/git.
5. Бэкенд с ПДн (Фаза 0) не стартует до закрытия комплаенс-гейта (Фаза −1).
