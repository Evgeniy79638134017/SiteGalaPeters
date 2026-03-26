# Anti-Age Platform — Персональный сайт эксперта по anti-age

## Описание проекта
Многостраничный сайт для эксперта по anti-age с 30-летним опытом (женщина, 62 года).
Сайт — основной бизнес-инструмент: набор партнёров в MLM-команду (Jeunesse/Velovita),
привлечение подписчиков в Telegram, продажа программ и консультаций.

КОНТЕКСТ: Русскоязычная веб-инфраструктура Jeunesse разрушена (домен захвачен).
Личный сайт эксперта — ЕДИНСТВЕННОЕ профессиональное digital-присутствие.
Конкуренты (Баранова, Пятибрат, Корнилова) используют Tilda+GetCourse.
Мы строим на Next.js — это даёт преимущество в скорости, SEO и уникальности дизайна.

## Целевая аудитория
- Русскоязычные женщины 40–70 лет по всему миру
- 90%+ владеют смартфоном (AARP 2025), средний пользователь 50+ = 7 устройств
- Цифровая грамотность 68/100 (НАФИ 2025), женщины сравнялись с мужчинами
- НО: 45% людей 55+ чувствуют себя уязвимыми к мошенничеству онлайн
- ВЫВОД: крупный текст, простая навигация, максимум trust-сигналов

### 4 сегмента аудитории (разные боли → разный контент)
| Сегмент | Возраст | Главная боль | Триггер | Контент-ключ |
|---------|---------|-------------|---------|-------------|
| «Первые сигналы» | 40–45 | Потеря привлекательности | Шок от зеркала | Красота, кожа, фигура |
| «Буря перименопаузы» | 45–50 | Усталость, приливы, бессонница | 88% депрессия, 87% усталость | Менопауза, сон, настроение |
| «Новая реальность» | 50–60 | Остеопороз, саркопения | Страх за здоровье | Энергия, суставы, кости |
| «Мудрость или борьба» | 60–70 | Зависимость, инвалидность | Когнитивные функции | Независимость, мозг, сердце |

## Tech Stack

### Основной стек
- **Next.js 15** (App Router) — RSC, Server Actions, Streaming, ISR
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first конфигурация, @theme вместо tailwind.config.js)
- **shadcn/ui** (CLI v4, New York стиль) — копируемые компоненты
- **Framer Motion** + **Motion Primitives** (анимации с shadcn-совместимостью)
- **Prisma ORM** + **PostgreSQL** (Vercel Postgres или Supabase)
- **Vercel** (деплой, edge functions)

### Email и коммуникации
- **Resend** (транзакционные email, React Email шаблоны)
- **Inngest** (очереди для drip-серий, retry logic, scheduled jobs)
- **Telegram Bot API** (webhook, результаты квиза, follow-up)

### Безопасность
- **Arcjet** (bot-защита + rate limiting + email validation + Shield WAF)
- **Zod** (валидация всех Server Actions)
- **CSP middleware** (nonce-based Content Security Policy)
- Security headers (X-Frame-Options, HSTS, X-Content-Type-Options)

### Аналитика (privacy-first, без куки, без баннера)
- **Umami** (основная аналитика, self-hosted, GDPR-compliant)
- **PostHog** (heatmaps, session replay — free tier 1M events/мес)
- Микро-конверсии: quiz_started → quiz_step_N → email_submitted → consultation_booked

### Мониторинг и оптимизация
- **Sentry** (error tracking, performance monitoring) — MCP подключён
- **Cloudinary** (оптимизация изображений, AVIF/WebP) — MCP подключён
- **Lighthouse MCP** (аудит производительности)
- **A11y MCP** (аудит доступности)

### Будущее (v1.1–v2)
- **Vercel AI SDK** + RAG (AI-чат на контенте эксперта, аналог «Ask AI Mark» у Hyman)
- **Serwist** (PWA: offline-доступ к квизу, push-уведомления)
- Membership/подписка (закрытый контент, live Q&A)

## Архитектура
```
src/
├── app/
│   ├── page.tsx                  # Главная
│   ├── about/page.tsx            # Обо мне
│   ├── programs/
│   │   ├── page.tsx              # Все программы
│   │   ├── biochemistry/page.tsx # Биохимия
│   │   ├── biomechanics/page.tsx # Биомеханика
│   │   └── bioenergy/page.tsx    # Биоэнергетика
│   ├── partnership/
│   │   ├── page.tsx              # О партнёрстве
│   │   └── apply/page.tsx        # Форма заявки
│   ├── quiz/
│   │   ├── page.tsx              # Квиз "Ваш биологический возраст"
│   │   └── results/page.tsx      # Результаты квиза (gate: email/Telegram)
│   ├── blog/
│   │   ├── page.tsx              # Список статей
│   │   └── [slug]/page.tsx       # Статья
│   ├── gallery/page.tsx          # До/После трансформации (v1.1)
│   ├── contacts/page.tsx         # Контакты
│   ├── privacy/page.tsx          # Политика конфиденциальности
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # 404 страница с CTA
│   ├── loading.tsx               # Глобальный loading
│   ├── error.tsx                 # Глобальный error boundary
│   └── globals.css               # Глобальные стили + @theme
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Шапка + навигация
│   │   ├── Footer.tsx            # Подвал
│   │   ├── MobileMenu.tsx        # Мобильное меню (Sheet, не hamburger-dropdown)
│   │   └── CTABanner.tsx         # Плавающий баннер (mobile)
│   ├── sections/
│   │   ├── Hero.tsx              # Hero-секция
│   │   ├── ThreePillars.tsx      # Три кита здоровья
│   │   ├── Results.tsx           # Результаты/цифры
│   │   ├── Testimonials.tsx      # Видео-отзывы + текстовые
│   │   ├── AboutPreview.tsx      # Краткое «Обо мне»
│   │   ├── QuizCTA.tsx           # Баннер квиза
│   │   ├── PartnershipCTA.tsx    # Баннер партнёрства
│   │   └── BlogPreview.tsx       # Последние статьи
│   ├── quiz/
│   │   ├── QuizStepper.tsx       # Multi-step квиз (7 вопросов)
│   │   ├── QuizQuestion.tsx      # Одиночный вопрос
│   │   ├── QuizProgress.tsx      # Прогресс-бар
│   │   └── QuizResults.tsx       # Страница результатов + gate
│   ├── forms/
│   │   ├── PartnerForm.tsx       # Форма заявки партнёра (multi-step)
│   │   ├── ContactForm.tsx       # Форма обратной связи
│   │   ├── EmailGate.tsx         # Gate для результатов квиза
│   │   └── ConsentCheckbox.tsx   # GDPR: согласие на обработку данных
│   ├── ui/                       # shadcn/ui компоненты
│   └── shared/
│       ├── SectionHeading.tsx    # Заголовок секции
│       ├── WaveDivider.tsx       # Органический SVG-разделитель
│       ├── TrustBadges.tsx       # Плашки доверия
│       ├── PillarCard.tsx        # Карточка "кита"
│       ├── TestimonialCard.tsx   # Карточка отзыва
│       └── BlogCard.tsx          # Карточка статьи
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── utils.ts                  # Утилиты
│   ├── quiz-logic.ts             # Логика расчёта квиза
│   ├── constants.ts              # Тексты, ссылки, данные квиза
│   ├── arcjet.ts                 # Arcjet: rate limiting, bot protection
│   └── analytics.ts              # Umami event tracking helpers
├── emails/                       # React Email шаблоны
│   ├── QuizResultEmail.tsx       # Результаты квиза
│   ├── WelcomeEmail.tsx          # Приветственное письмо
│   ├── PartnerApplicationEmail.tsx # Уведомление о заявке
│   └── DripEmail.tsx             # Шаблон прогревающей серии
├── actions/
│   ├── submitQuiz.ts             # Server Action: квиз
│   ├── submitPartner.ts          # Server Action: заявка партнёра
│   ├── submitContact.ts          # Server Action: обратная связь
│   └── subscribe.ts              # Server Action: подписка на email
├── content/
│   ├── programs.ts               # Контент программ
│   ├── testimonials.ts           # Отзывы
│   ├── quiz-questions.ts         # Вопросы квиза
│   └── faq.ts                    # FAQ
└── public/
    ├── images/
    ├── icons/
    ├── fonts/
    └── manifest.json             # PWA манифест (v1.1)
```

## Дизайн-система

### Философия дизайна
Стиль «Snug Simple» (тренд 2025-2026): осмысленный минимализм с теплотой.
Ощущение: как будто близкая подруга делится секретом за чашкой чая.
НЕ медицинский, НЕ корпоративный, НЕ агрессивно-продающий.
Органические формы (волны, перетекания) вместо прямых линий.

### Двойная цветовая палитра

ТЁПЛАЯ (энергия, вдохновение, действие):
```css
--color-primary: #C97B4B;          /* Терракот — основной бренд */
--color-primary-light: #D4956B;    /* Коралл — кнопки, hover */
--color-primary-soft: #E8C4A0;     /* Персик — мягкие фоны */
--color-primary-bg: #F5E6D3;       /* Песок — фон секций */
--color-primary-cream: #FDF8F3;    /* Крем — основной фон страниц */
--color-primary-dark: #8B4513;     /* Жжёная сиена — заголовки на тёплом фоне */
```

ХОЛОДНАЯ (доверие, экспертность, спокойствие):
```css
--color-accent: #1A5C5C;           /* Глубокий тил — заголовки, навигация */
--color-accent-mid: #2A8F8F;       /* Тил — ссылки, иконки */
--color-accent-light: #5BC4C4;     /* Циан — подсветки, бейджи */
--color-accent-soft: #A0DFE0;      /* Светлый аква — мягкие фоны */
--color-accent-bg: #E0F5F5;        /* Лёд — альтернативный фон */
```

НЕЙТРАЛЬНЫЕ:
```css
--color-text: #3D2E22;             /* Тёмно-коричневый — основной текст */
--color-text-muted: #7A6B5D;       /* Приглушённый — вторичный текст */
--color-bg: #FAFAF8;               /* Тёплый белый — основной фон */
--color-gold: #C9A96E;             /* Золотой — премиальные акценты */
```

ПРАВИЛА ПРИМЕНЕНИЯ ЦВЕТА:
- Hero, CTA-кнопки, партнёрство, баннеры → ТЁПЛАЯ палитра
- "Обо мне", формы, footer, навигация → ХОЛОДНАЯ палитра
- Биохимия → тил, Биомеханика → терракот, Биоэнергетика → циан
- Фон страницы: чередование --color-primary-cream и --color-accent-bg между секциями
- Текст ВСЕГДА --color-text (#3D2E22), НЕ чёрный (#000)

### Tailwind v4 — CSS-first конфигурация
```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #C97B4B;
  --color-primary-light: #D4956B;
  --color-primary-soft: #E8C4A0;
  --color-primary-bg: #F5E6D3;
  --color-primary-cream: #FDF8F3;
  --color-primary-dark: #8B4513;

  --color-accent: #1A5C5C;
  --color-accent-mid: #2A8F8F;
  --color-accent-light: #5BC4C4;
  --color-accent-soft: #A0DFE0;
  --color-accent-bg: #E0F5F5;

  --color-text: #3D2E22;
  --color-text-muted: #7A6B5D;
  --color-bg: #FAFAF8;
  --color-gold: #C9A96E;

  --font-heading: "Playfair Display Variable", "PT Serif", serif;
  --font-subheading: "Cormorant Garamond Variable", "PT Serif", serif;
  --font-body: "Source Sans 3 Variable", "PT Sans", sans-serif;
  --font-handwritten: "Caveat Variable", cursive;
}
```

### Типографика
Заголовки: "Playfair Display" (элегантность) — с кириллицей
Подзаголовки: "Cormorant Garamond" (изысканность)
Основной: "Source Sans 3" (читаемость, 18px min) — отличная кириллица
Рукописный: "Caveat" (цитаты, подписи)
FALLBACK: "PT Serif" для заголовков, "PT Sans" для текста
NEVER: Inter, Roboto, Arial, system fonts

Использовать variable fonts через next/font — один файл 30KB вместо пяти по 20KB.

### Размеры текста (КРИТИЧНО для аудитории 40-70)
- h1: 48–56px (mobile: 32–36px)
- h2: 36–42px (mobile: 26–30px)
- h3: 24–28px (mobile: 20–24px)
- body: 18–20px (mobile: 16–18px) — НЕ МЕНЬШЕ 16px нигде
- small: 14–16px
- line-height: 1.6–1.7 для body
- Контрастность: цель 7:1 (минимум 4.5:1 WCAG AA)

### Органические разделители
Между секциями использовать волнистые SVG-формы (WaveDivider.tsx).
Вдохновение: мягкие перетекающие формы с картинок заказчика.
НЕ прямые линии. НЕ резкие границы.
Цвет волны = цвет следующей секции.

### Анимации
- Framer Motion + Motion Primitives для scroll-triggered reveal (IntersectionObserver)
- Staggered fade-in + slide-up при появлении секций
- Счётчики чисел с плавным count-up
- Мягкие hover: translateY(-4px) + shadow на карточках
- Progress bar в квизе — плавное заполнение
- `prefers-reduced-motion` — ОБЯЗАТЕЛЬНАЯ проверка
- НЕ агрессивные, НЕ быстрые, НЕ неоновые
- На медленных сетях (navigator.connection.effectiveType === '2g'/'3g') — отключить анимации

### Компоненты
- Карточки: rounded-2xl (16px), мягкие тени, чередование тёплых/холодных фонов
- Кнопки: rounded-xl (12px), крупные (min h-14 / 56px), hover с scale(1.02)
  Primary (тёплая): bg-primary text-white
  Secondary (холодная): bg-accent text-white
  Outline: border-2 border-primary/accent
- Формы: MULTI-STEP (конверсия +86% vs одношаговых)
  Крупные поля (min h-12 / 48px), labels НАД полями (не floating)
  Прогресс-бар сверху, кнопка "Назад" видимая
  Max 3-4 поля на шаг
  ConsentCheckbox обязателен на финальном шаге
- Touch targets: min 48×48px ВЕЗДЕ (WCAG 2.2 рекомендует 44×44, мы берём 48)

### Trust-элементы (ОБЯЗАТЕЛЬНЫ на каждой странице)
- "30+ лет личного опыта" — бейдж в header или hero
- "1000+ благодарных людей" — на главной
- "62 года — зрение без очков" — визуальное доказательство
- Реальные фото (НЕ стоковые)
- Видео-отзывы (самый убедительный формат для health-решений)
- "Продукт своего продукта" — живое доказательство системы

## Ключевой конверсионный инструмент: КВИЗ

Квиз "Узнайте ваш биологический возраст" — центральная воронка сайта.
Конверсия квизов: 30-50% (адаптивные до 63.8% в beauty/wellness).
Ни один русскоязычный конкурент не использует квизы.

### Структура воронки:
1. Привлечение → баннер квиза на главной и на каждой странице
2. 7 вопросов (multi-step с прогресс-баром)
3. Gate: email (основной) + опционально Telegram
4. Персонализированная страница результатов
5. Рекомендации продуктов/программ на основе ответов
6. Drip-серия (5-7 сообщений через Inngest + Resend)

### Вопросы квиза:
1. Возраст (40-45, 45-50, 50-60, 60+)
2. Уровень энергии (1-5 шкала)
3. Качество сна
4. Физическая активность
5. Питание
6. Стресс и настроение
7. Главная цель (энергия / внешность / здоровье / всё вместе)

### Алгоритм расчёта биологического возраста:
```typescript
// quiz-logic.ts
interface QuizResult {
  bioAge: number;          // рассчитанный биологический возраст
  delta: number;           // разница (bioAge - realAge)
  pillarPriority: 'biochemistry' | 'biomechanics' | 'bioenergy';
  recommendations: string[]; // 3 персональных совета
  riskLevel: 'green' | 'yellow' | 'orange'; // визуальный индикатор
}

// Логика подсчёта:
// - Каждый ответ = 0-3 балла (0 = отлично, 3 = проблемно)
// - Сумма баллов → delta: 0-5 = -3 года, 6-10 = 0, 11-15 = +3, 16-21 = +7
// - Вопросы 2-3 (энергия, сон) → вес для biochemistry
// - Вопрос 4 (активность) → вес для biomechanics
// - Вопросы 5-6 (питание, настроение) → вес для bioenergy
// - Наибольший вес = pillarPriority
// - riskLevel: delta < 0 = green, 0-3 = yellow, >3 = orange
```

### Микро-конверсии для отслеживания:
1. `quiz_started` — нажал "Пройти тест"
2. `quiz_step_1` ... `quiz_step_7` — каждый шаг
3. `quiz_completed` — ответил на все вопросы
4. `quiz_email_submitted` — ввёл email на gate
5. `quiz_telegram_clicked` — нажал "Получить в Telegram"
6. `quiz_result_viewed` — увидел результаты
7. `quiz_cta_clicked` — нажал CTA на странице результатов

## Email-архитектура (Resend + Inngest)

### Транзакционные письма (немедленно):
- Результаты квиза → QuizResultEmail.tsx
- Подтверждение заявки партнёра → PartnerApplicationEmail.tsx
- Уведомление эксперту о новой заявке → AdminNotificationEmail.tsx

### Drip-серия после квиза (через Inngest):
| # | Когда | Тема | Цель |
|---|-------|------|------|
| 1 | +1 час | «Ваши результаты + первый шаг» | Закрепить контакт |
| 2 | +2 дня | «Почему ваш {pillarPriority} — ключ к молодости» | Образование |
| 3 | +4 дня | «История: как я победила бессонницу за 15 лет» | Trust через историю |
| 4 | +7 дней | «3 простых привычки, которые изменят всё» | Практическая польза |
| 5 | +10 дней | «Приглашение на консультацию» | Конверсия |

### Настройка домена:
- SPF, DKIM, DMARC записи обязательны
- Верификация домена в Resend
- From: "Имя Эксперта <hello@домен.ru>"

## Telegram-интеграция

### Архитектура:
- Telegram Bot (webhook на /api/telegram/webhook)
- Webhook URL верифицирован через secret token
- Бот привязан к Next.js API Route (НЕ отдельный сервис)

### Flow "Получить результаты в Telegram":
1. Пользователь нажимает "Получить в Telegram" на gate
2. Открывается ссылка t.me/BotName?start=quizResultId
3. Бот получает /start quizResultId
4. Бот отправляет результаты квиза форматированным сообщением
5. Бот подписывает на канал эксперта

### Валидация безопасности:
- Проверка X-Telegram-Bot-Api-Secret-Token на каждом webhook
- Rate limiting через Arcjet (10 запросов/мин на IP)

## Безопасность

### Arcjet (все формы защищены):
```typescript
// lib/arcjet.ts
import arcjet, { shield, detectBot, tokenBucket, validateEmail } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),           // WAF
    detectBot({ mode: "LIVE" }),        // Блокировка ботов
    tokenBucket({ rate: 5, interval: "1m", capacity: 10 }), // Rate limit
  ],
});

// Для форм с email:
export const ajWithEmail = arcjet({
  ...aj,
  rules: [
    ...aj.rules,
    validateEmail({ mode: "LIVE", block: ["DISPOSABLE", "INVALID"] }),
  ],
});
```

### Consent flow (GDPR):
- ConsentCheckbox.tsx на КАЖДОЙ форме с email/телефоном
- Текст: "Я согласен(а) на обработку персональных данных и получение сообщений"
- Ссылка на /privacy (Политика конфиденциальности)
- Без чекбокса = кнопка Submit неактивна
- В БД сохраняется: consentGiven: true, consentDate: DateTime

### Security headers (next.config.js):
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### CSP middleware:
- Nonce-based script allowlisting
- Белый список: self, Umami, PostHog, Telegram виджет, YouTube embed

## Конверсионная воронка
```
Трафик (Telegram, поиск, реклама)
    ↓
Квиз на сайте (30-50% конверсия)
    ↓
Email/Telegram gate + consent
    ↓
Персонализированные результаты
    ↓
Drip-серия (5 писем через Inngest + Resend)
    ↓
Консультация / вебинар
    ↓
Продукт / партнёрство
```

## Правила кода

### Стиль
- TypeScript strict, никаких `any`
- Именованные экспорты, не default
- Tailwind utility classes + кастомные CSS @theme переменные
- Один файл = один компонент, PascalCase
- Server Components по умолчанию, "use client" только где нужно (квиз, формы, анимации)
- Server Actions для всех мутаций (НЕ отдельные /api/* роуты)
- Zod-валидация каждого Server Action (treat as public endpoint)

### Rendering стратегия
| Страница | Рендеринг | Причина |
|----------|----------|---------|
| Главная | SSG | Статический контент |
| Обо мне | SSG | Статический контент |
| Программы | SSG | Статический контент |
| Партнёрство | SSG | Статический контент |
| Квиз | SSG shell + Client Component island | Интерактивность |
| Результаты квиза | Dynamic | Персонализированные данные |
| Блог (список) | ISR (revalidate: 3600) | Обновляемый контент |
| Блог (статья) | ISR (revalidate: 3600) + on-demand | Обновляемый контент |
| Контакты | SSG | Статический контент |

### SEO
- Уникальный title, description, og:image на каждой странице
- JSON-LD: **Person**, **Article**, **Organization**, **FAQPage**, **BreadcrumbList**, **MedicalBusiness**, **VideoObject**
- Семантический HTML (header, main, section, article, aside, footer)
- alt-текст для всех изображений на русском
- INP < 200ms (заменил FID с марта 2024)

### Доступность (WCAG 2.2 AA+)
- Контрастность 7:1 (цель), 4.5:1 (минимум)
- Текст min 16px, body 18px
- Touch targets 48×48px
- Фокус-стили для клавиатуры
- aria-labels на интерактивных элементах
- Линейная навигация (НЕ глубокие деревья)
- Max 2-3 клика до любого контента
- Хлебные крошки на внутренних страницах
- Consistent help: ссылка на контакты в одном месте на каждой странице (WCAG 2.2 SC 3.2.6)
- Redundant entry: не просить повторно вводить данные (WCAG 2.2 SC 3.3.7)
- Accessible authentication: НЕ использовать CAPTCHA (Arcjet вместо этого)
- Ошибки форм: иконка + текст + aria-live (НЕ только красный цвет)

### Производительность
- next/image: AVIF первый, WebP fallback, lazy loading, blur placeholder
- next/font: variable fonts, font-display: swap, preload, subsets: ['cyrillic', 'latin']
- Dynamic imports для Framer Motion, каруселей, PostHog
- ISR для блога (revalidate: 3600) + on-demand revalidation
- Cloudinary для тяжёлых изображений (фото эксперта, обложки)
- Bundle analyzer: npx @next/bundle-analyzer
- Tree-shake иконки: импортировать отдельные, не весь lucide-react
- Lighthouse: цель > 90 по всем метрикам
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1

## Ограничения
- НИКОГДА: медицинские советы, гарантии, слова "лечение/вылечить/диагноз"
- ВМЕСТО: "поддержка здоровья", "улучшение качества жизни", "сохранение молодости"
- НЕ агрессивный рекрутинг (attraction-маркетинг, не push)
- НЕ слова "MLM", "сетевой маркетинг", "пирамида"
- Язык: русский основной (i18n в v2)

## Команды
- `npm run dev` — dev-сервер (порт 3000)
- `npm run build` — продакшен-сборка
- `npm run lint` — ESLint
- `npx prisma migrate dev` — миграции
- `npx prisma studio` — GUI базы данных
- `npx @next/bundle-analyzer` — анализ бандла

## MCP-серверы (подключены)
| Сервер | Использование |
|--------|-------------|
| Context7 | Актуальные доки Next.js, Tailwind, shadcn |
| Playwright | Тестирование квиза, форм, навигации |
| A11y | WCAG-аудит доступности |
| Lighthouse | Performance, SEO, Core Web Vitals |
| Icons8 + Pickapicon | Поиск иконок |
| Resend | Email API |
| Cloudinary | Оптимизация изображений |
| Sentry | Мониторинг ошибок |
| Figma-dev | Дизайн-макеты |
| Magic (21st.dev) | AI-генерация компонентов |
| PubMed | Медицинские исследования для блога |

## Документация
- Архитектура: @ARCHITECTURE.md
- План реализации: @PLAN.md
- Контент: @ContentFiles/
