# README.md — Anti-Age Platform v3

## Что изменилось в v3 (после аудита и исследования)

### Стек обновлён:
- Next.js 14 → **Next.js 15** (fetch no-store по умолчанию, улучшенные Server Actions)
- Tailwind config → **Tailwind v4** (CSS-first @theme, 5x быстрее билд)
- shadcn/ui → **CLI v4** (design system presets, AI agent skills)
- FID → **INP < 200ms** (метрика обновлена с марта 2024)

### Добавлено:
- **Полная Prisma-схема**: EmailContact, EmailSequence, AdminUser, BlogCategory, ConsentLog
- **Алгоритм расчёта биологического возраста** (баллы → delta → bioAge → рекомендации)
- **Telegram Bot архитектура** (webhook, flow, безопасность)
- **Email drip-серия** (5 писем через Inngest + Resend)
- **Безопасность**: Arcjet (bot/rate limit/email validation), CSP, security headers
- **GDPR consent flow**: ConsentCheckbox + Privacy Policy + ConsentLog
- **Аналитика**: Umami (privacy-first) + PostHog (heatmaps)
- **JWT tokens** для безопасного доступа к результатам квиза
- **Privacy Policy страница** (/privacy)
- **Before/After галерея** (/gallery — v1.1)
- **AI-чат + PWA** (Этап 9, v1.1)

### Конкурентные преимущества:
| Мы | Конкуренты (Tilda/GetCourse) |
|---|---|
| Next.js 15 — скорость, SEO | Tilda — шаблонный, медленный |
| Квиз-воронка (30-50% конверсия) | Нет квизов |
| Двойная палитра | Шаблонный дизайн |
| Arcjet bot-защита | Нет защиты форм |
| Privacy-first аналитика (без баннера куки) | Google Analytics (баннер пугает аудиторию 40-70) |
| AI-чат v1.1 (аналог Dr. Hyman) | Нет AI |
| 62 года = живое доказательство | Менее убедительный trust |

## Файлы

| Файл | Содержание | Версия |
|------|-----------|--------|
| CLAUDE.md | Мозг проекта: стек, палитра, шрифты, безопасность, аналитика | v3 |
| ARCHITECTURE.md | Wireframes, БД (полная), Telegram bot, email drip, SEO | v3 |
| PLAN.md | 10 этапов с промптами + промпты отладки + чеклист деплоя | v3 |
| ContentFiles/*.txt | 11 файлов с контентом бренда | v1 |

## Быстрый старт

```bash
mkdir antiage-platform && cd antiage-platform
# Скопируйте CLAUDE.md, ARCHITECTURE.md, PLAN.md в корень
# Скопируйте ANTIAGE_*.txt в папку content/
code .  # Откройте VS Code
# Запустите Claude Code → скопируйте промпт Этапа 0 из PLAN.md
```

## Этапы реализации

| Этап | Название | Время | Ключевое |
|------|---------|-------|----------|
| 0 | Инициализация | 30 мин | Next.js 15, Tailwind v4, Prisma, шрифты |
| 0.5 | Безопасность + Email | 30 мин | Arcjet, Resend, Inngest, Privacy Policy |
| 1 | Layout + WaveDivider | 1 час | Header, Footer, 4 варианта волн |
| 2 | Главная страница | 2 часа | Hero, QuizCTA, ThreePillars, Results |
| 3 | **Квиз-воронка** | 2 часа | **Ключевой этап**: 7 вопросов, алгоритм, gate, JWT |
| 4 | Партнёрство | 1.5 часа | Attraction-маркетинг, multi-step форма |
| 5 | Обо мне | 1 час | Timeline 30 лет, принципы, цитаты |
| 6 | Программы | 1 час | 3 подстраницы (биохимия/механика/энергетика) |
| 7 | Блог + Контакты | 1 час | ISR, фильтры, шеринг, CTABanner |
| 8 | SEO + Полировка | 1.5 часа | JSON-LD, Umami, Sentry, Lighthouse > 90 |
| 9 | AI-чат + PWA | v1.1 | Vercel AI SDK, Serwist, Before/After |

**Общее время v1: ~11-13 часов**

## MCP-серверы (12 штук)

| # | Сервер | Назначение |
|---|--------|-----------|
| 1 | Context7 | Актуальные доки библиотек |
| 2 | Playwright | Браузерная автоматизация и тестирование |
| 3 | A11y | WCAG-аудит доступности |
| 4 | Lighthouse | Performance, SEO, Core Web Vitals |
| 5 | Icons8 | Поиск иконок |
| 6 | Pickapicon | Иконки по описанию |
| 7 | Resend | Email API |
| 8 | Cloudinary | Оптимизация изображений |
| 9 | Sentry | Мониторинг ошибок |
| 10 | Figma-dev | Дизайн-файлы |
| 11 | Magic (21st.dev) | AI-генерация компонентов |
| 12 | PubMed | Медицинские исследования для блога |
