# ARCHITECTURE.md — Полная архитектура (v3, после аудита и исследования)

## 1. Ключевые изменения v3 (после аудита)

### Добавлено:
- **Полная Prisma-схема** с EmailContact, EmailSequence, AdminUser, BlogCategory, ConsentLog
- **Алгоритм расчёта биологического возраста** (calculateBioAge)
- **Telegram Bot архитектура** (webhook, flow, безопасность)
- **Email drip-серия** (5 писем через Inngest + Resend)
- **Безопасность**: Arcjet, CSP, GDPR consent flow, security headers
- **Аналитика**: Umami + PostHog (privacy-first, без куки)
- **Страница Privacy Policy** (/privacy)
- **Страница Before/After галерея** (/gallery) — v1.1
- **Error boundaries** и loading states
- **INP < 200ms** вместо устаревшего FID

### Обновлено:
- Next.js 14 → **Next.js 15** (fetch no-store по умолчанию, улучшенные Server Actions)
- Tailwind config → **Tailwind v4 @theme** (CSS-first конфигурация)
- shadcn/ui → **CLI v4** (design system presets, AI agent skills)

### Конкурентные преимущества:
1. Next.js vs Tilda у конкурентов → скорость, SEO, уникальный дизайн
2. Квиз-воронка → ни один русскоязычный конкурент не использует
3. Двойная палитра → визуально отличается от всех
4. 62 года как живое доказательство → сильнейший trust-элемент
5. Privacy-first аналитика → нет баннера куки, не отпугивает аудиторию 40-70
6. AI-чат (v1.1) → ни один русскоязычный конкурент не имеет (аналог Dr. Hyman)

---

## 2. Структура страниц

### 2.1 Главная (`/`)

```
┌─────────────────────────────────────────────┐
│  HEADER (sticky, backdrop-blur)              │
│  Лого | Программы | Партнёрство | Блог |     │
│  Обо мне | Контакты        [Telegram btn]    │
│  + Trust-badge: "30+ лет в anti-age"         │
├── волнистый SVG-разделитель (тёплый) ────────┤
│  HERO (тёплая палитра, 90vh)                 │
│  Фото/видео справа, текст слева:             │
│  badge: "Продукт своего продукта"            │
│  h1: "Молодость доступна каждому"            │
│  p: "Мне 62. Без очков. Энергии больше..."   │
│  [Пройти тест] (primary) [В Telegram] (out)  │
├── органическая волна (cream → accent-bg) ────┤
│  КВИЗ-БАННЕР (холодная палитра)              │
│  "Узнайте ваш биологический возраст"         │
│  Иконка + 3 пункта что узнаете              │
│  [Начать тест — 2 минуты]                    │
├── волна (accent-bg → cream) ─────────────────┤
│  ТРИ КИТА ЗДОРОВЬЯ (тёплый фон)             │
│  Биохимия (тил) | Биомеханика (терракот) |   │
│  Биоэнергетика (циан)                        │
├── волна ─────────────────────────────────────┤
│  РЕЗУЛЬТАТЫ В ЦИФРАХ (холодный фон)         │
│  30+ лет | 1000+ людей | 62 без очков        │
│  Анимированные счётчики                      │
├── волна ─────────────────────────────────────┤
│  ОБО МНЕ (краткий, тёплый фон)              │
│  Фото + 2 абзаца + цитата (Caveat)          │
│  [Читать полную историю →]                   │
├── волна ─────────────────────────────────────┤
│  ОТЗЫВЫ (холодный фон)                       │
│  Видео-карусель + текстовые карточки         │
├── волна ─────────────────────────────────────┤
│  ПАРТНЁРСТВО-БАННЕР (тёплый фон, accent)    │
│  "Хотите строить бизнес в anti-age?"         │
│  [Узнать подробности]                        │
├── волна ─────────────────────────────────────┤
│  БЛОГ (холодный фон)                         │
│  3 карточки последних статей                 │
├── волна ─────────────────────────────────────┤
│  FOOTER (тёмный: --text фон, светлый текст)  │
│  Telegram | YouTube | Instagram | Email       │
└─────────────────────────────────────────────┘
```

### 2.2 Квиз (`/quiz`) — ЦЕНТРАЛЬНАЯ ВОРОНКА

```
┌─────────────────────────────────────────────┐
│  Прогресс-бар (заполняется по шагам)         │
│  "Шаг 3 из 7"                                │
├─────────────────────────────────────────────┤
│  ВОПРОС (крупно, по центру)                  │
│  "Как вы оцениваете свой уровень энергии?"   │
│                                              │
│  4 варианта (большие кликабельные карточки): │
│  ┌──────────┐ ┌──────────┐                   │
│  │ Энергия  │ │ Нормально│                   │
│  │ на нуле  │ │ но к     │                   │
│  │  (3 бал) │ │ вечеру   │                   │
│  │          │ │  (2 бал) │                   │
│  └──────────┘ └──────────┘                   │
│  ┌──────────┐ ┌──────────┐                   │
│  │ В целом  │ │ Энергии  │                   │
│  │ хорошо   │ │ хоть     │                   │
│  │  (1 бал) │ │ отбавляй │                   │
│  │          │ │  (0 бал) │                   │
│  └──────────┘ └──────────┘                   │
│                                              │
│  [← Назад]              [Далее →]            │
├─────────────────────────────────────────────┤
│  Trust: "Тест прошли 2000+ женщин"           │
└─────────────────────────────────────────────┘
```

**Алгоритм расчёта биологического возраста:**
```
Вопрос 1 (возраст): определяет realAge (базовое значение)
  40-45 → realAge = 43
  45-50 → realAge = 48
  50-60 → realAge = 55
  60+   → realAge = 63

Вопросы 2-7: каждый ответ = 0-3 балла (0 = отлично, 3 = проблема)

Сумма баллов (0-18) → delta:
  0-4   → delta = -5  (bio < real, отлично!)
  5-7   → delta = -2  (bio < real, хорошо)
  8-10  → delta = 0   (bio = real, норма)
  11-13 → delta = +3  (bio > real, внимание)
  14-18 → delta = +7  (bio > real, срочно)

bioAge = realAge + delta

Приоритетный "кит" (pillarPriority):
  Вопросы 2 (энергия) + 3 (сон)        → biochemistry score
  Вопрос 4 (активность)                 → biomechanics score
  Вопросы 5 (питание) + 6 (настроение) → bioenergy score
  Наибольший score = приоритетное направление

Рекомендации (3 штуки) — выбираются из банка по:
  1. pillarPriority (главная рекомендация)
  2. Вопрос с наихудшим результатом
  3. Цель пользователя (вопрос 7)

riskLevel:
  delta < 0  → green  (шкала зелёная)
  delta 0-3  → yellow (шкала жёлтая)
  delta > 3  → orange (шкала оранжевая)
```

**Результаты квиза** (`/quiz/results`):
```
┌─────────────────────────────────────────────┐
│  GATE (перед результатами)                   │
│  "Ваши результаты готовы!"                   │
│  "Куда отправить персональный отчёт?"        │
│                                              │
│  [Email: ___________]                        │
│  ☑ Согласен(а) на обработку данных           │
│     и получение сообщений (ссылка /privacy)  │
│  [Получить результаты]                       │
│                                              │
│  --- или ---                                 │
│  [Получить в Telegram →]                     │
│  (→ t.me/BotName?start={quizResultId})       │
├─────────────────────────────────────────────┤
│  РЕЗУЛЬТАТЫ (после gate)                     │
│                                              │
│  ┌─ Визуальная шкала ─────────────────┐      │
│  │ Паспортный: 55    Биологический: 48│      │
│  │ ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░ │      │
│  │ (зелёная шкала: вы моложе!)        │      │
│  └────────────────────────────────────┘      │
│                                              │
│  Ваш приоритет: БИОХИМИЯ                    │
│  Рекомендация 1: ...                         │
│  Рекомендация 2: ...                         │
│  Рекомендация 3: ...                         │
│                                              │
│  [Записаться на консультацию]                │
│  [Подписаться на Telegram для советов]        │
└─────────────────────────────────────────────┘
```

**Безопасность результатов:**
- Результаты доступны по signed JWT token (не по email)
- Token expires через 7 дней
- URL: /quiz/results?token={signedJWT}
- Без валидного токена → редирект на /quiz

### 2.3 Обо мне (`/about`) — холодная палитра (доверие)

```
┌─────────────────────────────────────────────┐
│  Breadcrumbs: Главная > Обо мне              │
│  HERO: компактный, фон accent-bg             │
│  "Мой путь к молодости длиной в 30 лет"     │
├── волна ─────────────────────────────────────┤
│  TIMELINE (scroll-triggered reveal)          │
│  • 30 лет назад — начало БАДов              │
│  • Победа над бессонницей                    │
│  • Косметолог: "Видно, что ухаживаете"       │
│  • Круиз по Карибам — шок                    │
│  • 62 года — без очков, энергия              │
├── волна ─────────────────────────────────────┤
│  ТОП-5 ПРИНЦИПОВ (иконки + тил-карточки)    │
│  Вода | Сон | Движение | Питание | Мышление │
├── волна ─────────────────────────────────────┤
│  ЦИТАТЫ (Caveat, крупно, тёплый фон)        │
│  "Я говорю только о том, что проверила"      │
│  "Тело — самовосстанавливающаяся система"    │
├── волна ─────────────────────────────────────┤
│  CTA: [Пройти тест] + [Стать партнёром]     │
└─────────────────────────────────────────────┘
```

### 2.4 Программы (`/programs`)

Обзорная + 3 подстраницы. Каждый "кит" — свой цвет:
- Биохимия → тил (#2A8F8F фон accent-bg)
- Биомеханика → терракот (#C97B4B фон primary-bg)
- Биоэнергетика → циан (#5BC4C4 фон accent-bg)

Подстраница содержит: hero с цветом, описание, "что входит" (чеклист),
"для кого", FAQ (Accordion), CTA на квиз и консультацию.

### 2.5 Партнёрство (`/partnership`) — ПРИОРИТЕТ, тёплая палитра

ВАЖНО: attraction-маркетинг, НЕ агрессивный рекрутинг.
"Люди присоединяются к людям, не к компаниям."

```
┌─────────────────────────────────────────────┐
│  Breadcrumbs: Главная > Партнёрство          │
│  HERO: тёплый градиент                       │
│  "Построй бизнес в самой быстрорастущей      │
│   индустрии здоровья"                        │
│  [Заполнить заявку ↓]                        │
├── волна ─────────────────────────────────────┤
│  РЫНОЧНЫЕ ДАННЫЕ (animated counters)         │
│  150+ млрд ₽ | +58% аудитория | +12% рост   │
├── волна ─────────────────────────────────────┤
│  ЧТО ВЫ ПОЛУЧАЕТЕ (4 карточки)              │
│  Наставник | Обучение | Продукты | Команда   │
├── волна ─────────────────────────────────────┤
│  КАК ЭТО РАБОТАЕТ (stepper, 4 шага)         │
│  Заявка → Знакомство → Обучение → Рост      │
├── волна ─────────────────────────────────────┤
│  ДЛЯ КОГО (3 портрета)                      │
├── волна ─────────────────────────────────────┤
│  FAQ (Accordion, 6-8 вопросов)               │
│  Включая: "Это сетевой маркетинг?" →        │
│  Честный ответ в формате attraction-marketing│
├── волна ─────────────────────────────────────┤
│  ФОРМА ЗАЯВКИ (multi-step, 2 шага)           │
│  Шаг 1: Имя + Email + Telegram               │
│  Шаг 2: "Расскажите о себе" + телефон        │
│  ☑ Согласие на обработку данных (обязат.)    │
│  → Arcjet: rate limit + bot protection       │
│  → Server Action → Prisma + Resend           │
│  → "Спасибо! Свяжемся в 24 часа"            │
└─────────────────────────────────────────────┘
```

### 2.6 Блог (`/blog`) — чередование палитр

Фильтры: Все | БАДы | Питание | Движение | Мышление | Уход | Стиль
Карточки: 2 колонки desktop, 1 mobile
Статья: breadcrumbs + контент + sidebar (CTA квиз + Telegram + похожие)
Кнопки шеринга: Telegram, VK, WhatsApp

### 2.7 Контакты (`/contacts`) — холодная палитра

4 карточки (Telegram, Email, Instagram, YouTube) + форма обратной связи.
Форма защищена Arcjet (rate limit + bot detection).

### 2.8 Политика конфиденциальности (`/privacy`) — НОВОЕ

Обязательная страница:
- Какие данные собираем (email, Telegram, ответы квиза)
- Зачем (результаты квиза, рассылка, обработка заявок)
- Как храним (PostgreSQL, шифрование)
- Кому передаём (Resend для email, Telegram Bot API)
- Права пользователя (удаление, отписка)
- Контактный email для запросов

### 2.9 До/После галерея (`/gallery`) — v1.1

- Карусель трансформаций с фото До/После
- Disclaimer: "Результаты индивидуальны"
- CTA: [Пройти тест] + [Записаться на консультацию]

---

## 3. База данных (Prisma) — ОБНОВЛЁННАЯ

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================
// КОНТАКТЫ И ПОДПИСЧИКИ
// ========================

model EmailContact {
  id            String          @id @default(cuid())
  email         String          @unique
  name          String?
  telegramHandle String?
  source        ContactSource   @default(QUIZ)
  consentGiven  Boolean         @default(false)
  consentDate   DateTime?
  unsubscribed  Boolean         @default(false)
  unsubscribedAt DateTime?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  quizResults   QuizResult[]
  emailSequences EmailSequenceStep[]
}

enum ContactSource {
  QUIZ
  PARTNER_FORM
  CONTACT_FORM
  BLOG
  MANUAL
}

// ========================
// КВИЗ
// ========================

model QuizResult {
  id              String       @id @default(cuid())
  contactId       String?
  contact         EmailContact? @relation(fields: [contactId], references: [id])
  answers         Json         // {question_id: {answer_id, score}}
  realAge         Int          // паспортный возраст (из вопроса 1)
  bioAge          Int          // рассчитанный биологический возраст
  delta           Int          // bioAge - realAge
  pillarPriority  String       // "biochemistry" | "biomechanics" | "bioenergy"
  recommendations Json         // [{title, description, pillar}]
  riskLevel       String       // "green" | "yellow" | "orange"
  resultToken     String       @unique // signed JWT для доступа к результатам
  tokenExpiresAt  DateTime     // срок действия токена (7 дней)
  createdAt       DateTime     @default(now())
}

// ========================
// EMAIL DRIP-СЕРИЯ
// ========================

model EmailSequenceStep {
  id            String       @id @default(cuid())
  contactId     String
  contact       EmailContact @relation(fields: [contactId], references: [id])
  sequenceName  String       // "quiz_drip_5" | "partner_welcome"
  stepNumber    Int          // 1-5
  scheduledAt   DateTime     // когда отправить
  sentAt        DateTime?    // когда фактически отправлено
  openedAt      DateTime?    // когда открыто (Resend webhook)
  clickedAt     DateTime?    // когда кликнуто (Resend webhook)
  status        EmailStatus  @default(SCHEDULED)
  createdAt     DateTime     @default(now())

  @@unique([contactId, sequenceName, stepNumber])
}

enum EmailStatus {
  SCHEDULED
  SENT
  OPENED
  CLICKED
  BOUNCED
  FAILED
}

// ========================
// ПАРТНЁРСТВО
// ========================

model PartnerApplication {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  telegram  String?
  about     String?
  status    PartnerStatus @default(NEW)
  source    String?  // "direct" | "quiz" | "blog"
  consentGiven Boolean @default(false)
  consentDate DateTime?
  assignedTo String? // ID администратора/консультанта
  notes     String?  // Заметки администратора
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum PartnerStatus {
  NEW
  CONTACTED
  IN_PROGRESS
  PARTNER
  REJECTED
}

// ========================
// КОНТАКТНЫЕ СООБЩЕНИЯ
// ========================

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  read      Boolean  @default(false)
  repliedAt DateTime?
  consentGiven Boolean @default(false)
  createdAt DateTime @default(now())
}

// ========================
// БЛОГ
// ========================

model BlogCategory {
  id    String     @id @default(cuid())
  name  String     @unique // "БАДы", "Питание", "Движение"
  slug  String     @unique // "bady", "pitanie", "dvizhenie"
  posts BlogPost[]
}

model BlogPost {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  excerpt     String
  content     String
  categoryId  String
  category    BlogCategory  @relation(fields: [categoryId], references: [id])
  coverImage  String?       // Cloudinary URL
  published   Boolean       @default(false)
  publishedAt DateTime?
  seoTitle    String?       // Если отличается от title
  seoDescription String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

// ========================
// СОГЛАСИЕ (GDPR LOG)
// ========================

model ConsentLog {
  id          String   @id @default(cuid())
  email       String
  action      String   // "subscribe" | "unsubscribe" | "delete_request"
  source      String   // "quiz_gate" | "partner_form" | "contact_form"
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
}

// ========================
// АДМИНИСТРИРОВАНИЕ
// ========================

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      AdminRole @default(CONSULTANT)
  createdAt DateTime @default(now())
}

enum AdminRole {
  ADMIN       // Полный доступ
  CONSULTANT  // Только свои заявки партнёров
}
```

---

## 4. Telegram Bot архитектура — НОВОЕ

### Webhook setup:
```
POST /api/telegram/webhook
Headers: X-Telegram-Bot-Api-Secret-Token: {SECRET}
```

### Flow "Получить результаты в Telegram":
```
1. Пользователь нажимает "Получить в Telegram" на gate
   ↓
2. Редирект на t.me/{BotUsername}?start={quizResultId}
   ↓
3. Пользователь нажимает "Start" в Telegram
   ↓
4. Webhook получает: /start {quizResultId}
   ↓
5. Валидация:
   - Проверка X-Telegram-Bot-Api-Secret-Token
   - Проверка quizResultId существует в БД
   - Rate limiting через Arcjet (10 req/min)
   ↓
6. Бот отправляет форматированное сообщение:
   - Биологический vs паспортный возраст
   - 3 рекомендации
   - Ссылка на полные результаты (с JWT token)
   ↓
7. Бот предлагает: "Подпишитесь на канал для ежедневных советов"
   - Кнопка → ссылка на Telegram-канал эксперта
   ↓
8. Сохранение telegramHandle в EmailContact
```

### Безопасность:
- Secret token валидируется на каждом запросе
- Arcjet rate limiting (10 req/min per chat_id)
- Логирование всех webhook-запросов в Sentry
- quizResultId проверяется в БД (не существует → игнор)

---

## 5. Волнистые SVG-разделители

Компонент WaveDivider.tsx:
- Props: fromColor, toColor, variant (1-4 разных формы)
- Вдохновение: мягкие органические формы с картинок заказчика
- Высота: 60-80px
- Полная ширина, responsive
- 4 варианта волны чтобы не повторяться
- SVG: viewBox="0 0 1440 80", width="100%", preserveAspectRatio="none"
- Path: плавные cubic bezier кривые, НЕ зигзаги

---

## 6. SEO и метрики

### JSON-LD схемы по страницам:
| Страница | Схемы |
|----------|-------|
| Все страницы | Organization, BreadcrumbList |
| Главная | Person, MedicalBusiness |
| Обо мне | Person (подробная) |
| Программы | Service (x3) |
| Блог (список) | CollectionPage |
| Блог (статья) | Article, FAQPage (если есть FAQ), VideoObject (если есть видео) |
| Квиз | WebApplication |
| Партнёрство | FAQPage |

### Keyword mapping:
| Страница | Целевые запросы |
|----------|---------------|
| Главная | "anti-age эксперт", "молодость после 50" |
| Квиз | "биологический возраст тест", "узнать биологический возраст" |
| Биохимия | "БАДы для женщин 50+", "коллаген для кожи" |
| Биомеханика | "гимнастика после 50", "упражнения для молодости" |
| Биоэнергетика | "психосоматика старения", "мышление и молодость" |
| Партнёрство | "бизнес в здоровье", "anti-age индустрия" |
| Блог | Long-tail по темам из ANTIAGE_11 |

### Core Web Vitals (обновлённые):
| Метрика | Цель | Описание |
|---------|------|----------|
| LCP | < 2.5s | Largest Contentful Paint |
| INP | < 200ms | Interaction to Next Paint (заменил FID) |
| CLS | < 0.1 | Cumulative Layout Shift |

### Аналитика (Umami events):
```
quiz_started → quiz_step_{N} → quiz_completed →
quiz_email_submitted → quiz_result_viewed → quiz_cta_clicked

partner_form_started → partner_form_step_2 → partner_form_submitted

blog_article_read → blog_article_shared → blog_cta_clicked

contact_form_submitted
telegram_button_clicked
```

Lighthouse: >90 по всем метрикам (Performance, Accessibility, Best Practices, SEO)

---

## 7. Мобильная адаптация

- Breakpoints: sm 640, md 768, lg 1024, xl 1280
- Touch targets: 48×48px минимум
- Навигация: Sheet (боковая панель), НЕ dropdown
- Формы: полная ширина, крупные поля
- CTABanner: фиксированный внизу (Telegram + Квиз)
- Карточки: вертикальный стек
- Шрифт body: min 16px на mobile
- Кнопки: full-width на mobile (min h-14)

---

## 8. Безопасность — НОВОЕ

### Arcjet защита:
- Все Server Actions защищены shield + detectBot + tokenBucket
- Формы с email: + validateEmail (блокировка disposable)
- Quiz submission: 5 req/min per IP
- Partner form: 3 req/min per IP
- Contact form: 3 req/min per IP
- Telegram webhook: 10 req/min per chat_id

### GDPR consent flow:
```
Форма с email/телефоном
    ↓
ConsentCheckbox (обязательный)
  ☑ "Я согласен(а) на обработку персональных данных
     и получение сообщений" [Политика конфиденциальности]
    ↓
При submit → ConsentLog запись (email, action, source, ip, userAgent)
    ↓
EmailContact.consentGiven = true, consentDate = now()
```

### Результаты квиза:
- Доступ только по signed JWT token
- Token содержит: quizResultId, exp (7 дней)
- Без валидного токена → редирект на /quiz
- Токен одноразовый для просмотра? Нет — многоразовый в течение 7 дней

### Security headers:
Настраиваются в next.config.js → headers()

---

## 9. Email drip-серия — НОВОЕ

### Архитектура: Resend + Inngest

```
Quiz completed + email gate
    ↓
Server Action: submitQuiz.ts
    ↓
1. Сохранить QuizResult в Prisma
2. Создать/обновить EmailContact
3. Отправить QuizResultEmail через Resend (мгновенно)
4. Создать 5 EmailSequenceStep записей
5. Запустить Inngest function "quiz-drip-sequence"
    ↓
Inngest (scheduled jobs):
  Step 1: +1 час  → "Ваши результаты + первый шаг"
  Step 2: +2 дня  → "Почему {pillarPriority} — ключ"
  Step 3: +4 дня  → "Как я победила бессонницу"
  Step 4: +7 дней → "3 простых привычки"
  Step 5: +10 дней → "Приглашение на консультацию"
    ↓
Resend webhooks → обновление EmailSequenceStep:
  email.sent → status = SENT
  email.delivered → (логируем)
  email.opened → openedAt = now(), status = OPENED
  email.clicked → clickedAt = now(), status = CLICKED
  email.bounced → status = BOUNCED
```

### React Email шаблоны:
- QuizResultEmail.tsx — персонализированные результаты (bioAge, рекомендации, CTA)
- WelcomeEmail.tsx — приветствие + первый совет по pillarPriority
- DripEmail.tsx — шаблон для серии (параметризованный заголовок + контент)
- PartnerApplicationEmail.tsx — подтверждение заявки
- AdminNotificationEmail.tsx — уведомление эксперту о новой заявке/контакте

### Отписка:
- Каждое письмо содержит ссылку "Отписаться"
- Ссылка ведёт на /api/unsubscribe?token={signedToken}
- Обновляет EmailContact.unsubscribed = true
- Логирует в ConsentLog (action: "unsubscribe")
- Останавливает все запланированные EmailSequenceStep
