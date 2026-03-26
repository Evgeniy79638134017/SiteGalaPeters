# PLAN.md — Пошаговый план реализации (v3, после аудита)

## Изменения v3

- Обновлён стек: Next.js 15, Tailwind v4, Arcjet, Umami, Inngest
- Добавлен Этап 0.5: Безопасность + Email инфраструктура
- Этап 3 (квиз): добавлен алгоритм расчёта, consent flow, JWT tokens
- Этап 4 (партнёрство): добавлен FAQ "Это сетевой маркетинг?"
- Этап 8: добавлены Umami, PostHog, Sentry, Privacy Policy
- Добавлен Этап 9: AI-чат + PWA (v1.1)

## Правила работы

- Между этапами: `/clear` для чистого контекста
- После каждого этапа: проверить в браузере + `git commit`
- Перед каждой сессией: "Прочитай @CLAUDE.md и @ARCHITECTURE.md"
- Если дизайн "generic": скажи Claude перечитать секцию дизайн-системы
- Все формы: Arcjet protection + ConsentCheckbox + Zod validation
- Server Actions для мутаций, НЕ отдельные API routes

---

## ЭТАП 0: Инициализация (30 мин)

### Промпт
```
Прочитай @CLAUDE.md и @ARCHITECTURE.md полностью.

Создай Next.js 15 проект с App Router и TypeScript:
npx create-next-app@latest antiage-platform --typescript --tailwind --eslint --app --src-dir

Установи основные зависимости:
npm install framer-motion @prisma/client react-hook-form @hookform/resolvers zod lucide-react resend @arcjet/next inngest

npm install -D prisma @next/bundle-analyzer

Настрой shadcn/ui (New York стиль, CLI v4):
npx shadcn@latest init
npx shadcn@latest add button card input textarea accordion badge separator tabs sheet dialog progress radio-group checkbox

Tailwind v4 — globals.css с @theme:
Добавь ВСЕ кастомные цвета из CLAUDE.md через @theme {}:
- Тёплая: primary, primary-light, primary-soft, primary-bg, primary-cream, primary-dark
- Холодная: accent, accent-mid, accent-light, accent-soft, accent-bg
- Нейтральные: text, text-muted, bg, gold

Подключи шрифты через next/font (variable fonts):
- Playfair Display (variable) — subsets: ['cyrillic', 'latin']
- Cormorant Garamond (variable) — subsets: ['cyrillic', 'latin']
- Source Sans 3 (variable) — subsets: ['cyrillic', 'latin']
- Caveat (variable) — subsets: ['cyrillic', 'latin']

globals.css: @theme с палитрой + base styles (body font 18px).
layout.tsx: шрифты + мета-данные + lang="ru".
Prisma: скопируй schema из ARCHITECTURE.md (полная версия v3).
Структура папок: как в CLAUDE.md.

Создай пустые файлы:
- src/app/not-found.tsx
- src/app/error.tsx
- src/app/loading.tsx
- src/app/privacy/page.tsx

НЕ создавай компоненты — только инфраструктуру.
Убедись npm run dev работает.
```

---

## ЭТАП 0.5: Безопасность + Email инфраструктура (30 мин) — НОВЫЙ

### Промпт
```
Прочитай @CLAUDE.md секции "Безопасность" и "Email-архитектура".

1. Arcjet setup (src/lib/arcjet.ts):
   - Базовая конфигурация: shield + detectBot + tokenBucket
   - Экспорт ajWithEmail для форм с email (+ validateEmail)
   - Env: ARCJET_KEY

2. Security headers (next.config.js):
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: camera=(), microphone=(), geolocation=()
   - HSTS

3. ConsentCheckbox.tsx (src/components/forms/):
   - Чекбокс + текст "Я согласен(а) на обработку персональных данных"
   - Ссылка на /privacy
   - Props: checked, onChange, required
   - aria-required="true"

4. React Email шаблоны (src/emails/):
   - QuizResultEmail.tsx — результаты квиза (bioAge, рекомендации)
   - WelcomeEmail.tsx — приветствие
   - PartnerApplicationEmail.tsx — подтверждение заявки
   - AdminNotificationEmail.tsx — уведомление эксперту
   Стиль: тёплые цвета, лого, footer с отпиской

5. Inngest client (src/lib/inngest.ts):
   - Inngest client setup
   - Quiz drip function skeleton (5 шагов)

6. Analytics helper (src/lib/analytics.ts):
   - Umami event tracking: trackEvent(name, data)
   - Env: NEXT_PUBLIC_UMAMI_WEBSITE_ID

7. Privacy Policy page (src/app/privacy/page.tsx):
   - Базовый контент: какие данные, зачем, как храним, права
   - Стиль: простой текст, холодная палитра, breadcrumbs

Env variables (.env.example):
DATABASE_URL, ARCJET_KEY, RESEND_API_KEY, INNGEST_EVENT_KEY,
NEXT_PUBLIC_UMAMI_WEBSITE_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET
```

---

## ЭТАП 1: Layout + WaveDivider (1 час)

### Промпт
```
Прочитай @CLAUDE.md (дизайн-система, двойная палитра).

Создай layout-компоненты:

### WaveDivider.tsx (src/components/shared/)
КРИТИЧЕСКИЙ КОМПОНЕНТ — используется между КАЖДОЙ секцией.
- Props: fromColor (CSS var), toColor (CSS var), variant (1|2|3|4)
- 4 разных органических SVG-формы (мягкие волны, перетекания)
- Вдохновение: плавные формы как на картинках заказчика —
  мягкие изгибы, перетекающие из одного цвета в другой
- Полная ширина, высота 60-80px, responsive
- preserveAspectRatio="none" для растягивания
- НЕ прямые линии, НЕ зигзаги — только плавные кривые

### Header.tsx
- Лого: "AntiAge" (Playfair Display, цвет accent)
  Под лого: "молодость доступна каждому" (Caveat, мелко, primary)
- Навигация: Программы | Партнёрство | Блог | Обо мне | Контакты
  Шрифт Source Sans 3, 16px, цвет text
  Hover: цвет accent-mid, underline
- Trust-badge справа: "30+ лет опыта" (мелко, accent-light bg)
- Кнопка: "Telegram" (bg accent-mid, text white)
- Sticky с backdrop-blur при скролле
- Mobile: Sheet (боковая панель справа), НЕ dropdown

### Footer.tsx
- Фон: text (#3D2E22), текст primary-cream
- Сверху: WaveDivider (variant=4, from page-bg to text)
- 4 колонки → 2 → 1 на mobile
- Соцсети: Telegram, YouTube, Instagram (Lucide иконки)
- Ссылка на /privacy внизу

Обнови layout.tsx.
Все тексты на русском. Тёплый стиль, НЕ корпоративный.
```

---

## ЭТАП 2: Главная страница (2 часа)

### Промпт 2.1: Hero + QuizCTA
```
Прочитай @CLAUDE.md и @ARCHITECTURE.md (секция 2.1).

Создай Hero.tsx (тёплая палитра):
- 90vh desktop, auto mobile
- Два столбца: текст 55%, фото-placeholder 45%
- Фон: мягкий переход от primary-cream к primary-bg
- Декор: мягкие органические blob-формы в фоне (opacity 0.1)
- Badge над h1: "Продукт своего продукта" (Caveat, bg primary-soft)
- h1: "Молодость доступна каждому" (Playfair, 56px, text)
- p: описание (Source Sans 3, 20px, text-muted, line-height 1.7)
- Кнопки:
  [Пройти тест — 2 минуты] (bg primary, text white, h-14, rounded-xl)
  [Подписаться в Telegram] (outline accent-mid, h-14)
- Анимация: staggered fade-in + slide-up (Framer Motion)
- Mobile: текст сверху, фото снизу, кнопки full-width
- Umami events: quiz_cta_hero_clicked, telegram_hero_clicked

Создай QuizCTA.tsx (холодная палитра):
- Фон: accent-bg
- Слева: иконка (Brain из Lucide, большая, accent-mid)
- Справа:
  h2: "Узнайте ваш биологический возраст" (Playfair, accent)
  3 пункта: "Оценка энергии и здоровья", "Персональные рекомендации",
  "Подбор программы именно для вас"
  [Начать тест — 2 минуты] (bg accent-mid, text white)
- Между Hero и QuizCTA: WaveDivider (variant=1, cream → accent-bg)
```

### Промпт 2.2: ThreePillars + Results
```
Создай ThreePillars.tsx и Results.tsx.

ThreePillars:
- Фон: primary-cream
- WaveDivider сверху (accent-bg → cream)
- h2: "Три кита здоровья и молодости" (Playfair, center)
- p: "Комплексный подход — не что-то одно, а совокупность" (center)
- 3 карточки (grid, gap-8):

  Биохимия: border-bottom 3px accent-mid, иконка FlaskConical (accent-mid)
  h3: "Биохимия тела", p: "БАДы, питание, вода — фундамент"
  Фон карточки: white, hover: translateY(-4px) + shadow

  Биомеханика: border-bottom 3px primary, иконка Activity (primary)
  h3: "Биомеханика", p: "Движение, гимнастики — тело создано для движения"

  Биоэнергетика: border-bottom 3px accent-light, иконка Brain (accent-light)
  h3: "Биоэнергетика", p: "Мысли — ваш главный anti-age крем"

- Каждая → /programs/[slug]
- Scroll-triggered staggered reveal

Results:
- Фон: accent-bg
- WaveDivider (cream → accent-bg)
- 3 метрики: "30+" (лет опыта), "1000+" (людей), "62" (без очков)
- Числа: Playfair, 64px, accent
- Count-up анимация при появлении (IntersectionObserver)
```

### Промпт 2.3: Остальные секции главной
```
Создай оставшиеся секции и собери page.tsx:

AboutPreview.tsx (тёплый фон primary-bg):
- Фото-placeholder слева, текст справа
- Цитата (Caveat, italic, primary-dark):
  "Я говорю только о том, что проверила на себе"
- [Читать историю →] (accent-mid)

Testimonials.tsx (холодный фон accent-bg):
- h2: "Истории трансформаций"
- CSS scroll-snap карусель (НЕ тяжёлые библиотеки)
- 4 placeholder-карточки: аватар + цитата + имя + возраст + результат
- Фон карточки: white, rounded-2xl, shadow-sm

PartnershipCTA.tsx (тёплый баннер):
- Полная ширина, фон primary
- h2: "Хотите строить бизнес в anti-age?" (white)
- p: "Рынок растёт на 10-12% ежегодно" (white/80)
- [Узнать подробности] (bg white, text primary)

BlogPreview.tsx (нейтральный фон):
- 3 карточки-placeholder
- [Все статьи →]

Собери в app/page.tsx с WaveDivider между КАЖДОЙ секцией:
Hero → wave → QuizCTA → wave → ThreePillars → wave → Results →
wave → AboutPreview → wave → Testimonials → wave → PartnershipCTA →
wave → BlogPreview → wave → Footer
```

---

## ЭТАП 3: Квиз-воронка (2 часа) — КЛЮЧЕВОЙ

### Промпт
```
Прочитай @CLAUDE.md (секция квиз, алгоритм) и @ARCHITECTURE.md (секция 2.2).

Создай полную квиз-систему:

### quiz-questions.ts (src/content/)
7 вопросов, каждый = {id, question, options: [{id, text, score}]}:
1. Возраст: 40-45(0) / 45-50(0) / 50-60(0) / 60+(0) — определяет realAge
2. Энергия утром: разбитой(3) / нормально но к вечеру(2) /
   в целом хорошо(1) / энергии хоть отбавляй(0)
3. Качество сна: бессонница(3) / просыпаюсь ночью(2) /
   сплю но не высыпаюсь(1) / отлично сплю(0)
4. Физическая активность: не двигаюсь(3) / иногда гуляю(2) /
   2-3 раза в неделю(1) / каждый день(0)
5. Питание: ем что попало(3) / стараюсь но не всегда(2) /
   слежу за питанием(1) / осознанный подход + БАДы(0)
6. Настроение: часто раздражаюсь(3) / перепады(2) /
   в целом стабильно(1) / позитивный настрой(0)
7. Главная цель: энергию / внешность / здоровье / всё вместе

### quiz-logic.ts (src/lib/)
ТОЧНО по алгоритму из ARCHITECTURE.md:
- realAge из вопроса 1 (43/48/55/63)
- Сумма баллов вопросов 2-6 → delta (-5/-2/0/+3/+7)
- bioAge = realAge + delta
- pillarPriority: вопросы 2+3→biochemistry, 4→biomechanics, 5+6→bioenergy
- recommendations: 3 совета по pillarPriority + худший вопрос + цель
- riskLevel: delta<0→green, 0-3→yellow, >3→orange
- Генерация JWT token (signed, expires 7 дней)

### QuizStepper.tsx
- Multi-step с плавными переходами (Framer Motion AnimatePresence)
- Прогресс-бар сверху (shadcn Progress)
- "Шаг N из 7"
- Карточки-варианты: большие, кликабельные, hover (тил или терракот border)
- При клике → автопереход (delay 300ms)
- Кнопка "Назад" всегда видна
- Mobile: карточки вертикально, full-width
- Umami events: quiz_step_{N}

### QuizResults.tsx
- Gate: "Ваши результаты готовы! Куда отправить?"
  [Email ___] + ConsentCheckbox (обязательный!)
  [Получить результаты] (disabled без consent)
  --- или ---
  [Получить в Telegram →] (→ t.me/Bot?start={quizResultId})
- После gate:
  Визуальная шкала: "Паспортный: 55 | Биологический: 48"
  Цвет: green/yellow/orange по riskLevel
  Приоритетный "кит" + ссылка на программу
  3 рекомендации с иконками
  CTA: [Записаться на консультацию] + [В Telegram за советами]

### Server Action: submitQuiz.ts (src/actions/)
- Zod-валидация входных данных
- Arcjet: ajWithEmail protection
- Сохранение QuizResult в Prisma
- Создание/обновление EmailContact (+ consent log)
- Отправка QuizResultEmail через Resend (мгновенно)
- Создание EmailSequenceStep записей (5 шагов drip)
- Запуск Inngest function "quiz-drip-sequence"
- Возврат JWT token для доступа к результатам

### Страницы:
- app/quiz/page.tsx → QuizStepper (SSG shell + client island)
- app/quiz/results/page.tsx → QuizResults (dynamic, проверка JWT token)

Дизайн: чистый, спокойный. Фон primary-cream.
Карточки вариантов: белые с border, hover → тень + border-accent.
Trust внизу: "Тест прошли 2000+ женщин"
```

---

## ЭТАП 4: Партнёрство (1.5 часа)

### Промпт
```
Прочитай @CLAUDE.md и @ARCHITECTURE.md (секция 2.5).
ВАЖНО: attraction-маркетинг. НЕ агрессивный рекрутинг.

Создай /partnership/page.tsx (тёплая палитра доминирует):

1. Hero: gradient от primary-soft к primary-cream
   Breadcrumbs: Главная > Партнёрство
   h1: "Построй бизнес в индустрии здоровья" (Playfair, text)
   p: "Anti-age рынок — один из самых быстрорастущих в мире"
   [Заполнить заявку ↓] (bg primary, scroll к форме)

2. Рыночные данные (4 карточки, animated counters):
   "150+ млрд ₽" рынок | "+58%" рост аудитории | "10-12%" рост | "39 стран"
   Фон: accent-bg, числа: Playfair 48px accent

3. Что получаете (4 карточки, иконки Lucide):
   Наставник (Users), Обучение (GraduationCap),
   Продукты (Package), Команда (Heart)
   Фон карточки: white, border-bottom primary

4. Как это работает (horizontal stepper):
   4 шага: номер + иконка + заголовок + описание
   Линия-соединитель между шагами (primary-soft)

5. Для кого (3 блока с иконками):
   Фон: primary-bg

6. FAQ: shadcn Accordion, 6-8 вопросов
   ОБЯЗАТЕЛЬНО включить: "Это сетевой маркетинг?" →
   Честный, уважительный ответ в формате attraction-marketing
   Фон: accent-bg

7. Форма (id="apply", multi-step):
   Шаг 1: Имя + Email + Telegram (3 поля, крупные)
   Шаг 2: Телефон + "Расскажите о себе" (textarea) + ConsentCheckbox
   Прогресс-бар, кнопка Назад видна
   Arcjet protection (rate limit + bot + email validation)
   Submit → Server Action (submitPartner.ts) → Prisma + Resend
   Success: "Спасибо! Мы свяжемся в течение 24 часов"

WaveDivider между КАЖДОЙ секцией.
НЕ использовать слова "MLM", "сетевой маркетинг", "пирамида".
Использовать: "команда", "партнёрство", "бизнес в здоровье".
```

---

## ЭТАП 5: Обо мне (1 час)

### Промпт
```
Прочитай @CLAUDE.md, @ARCHITECTURE.md (2.3).
Возьми контент из @ContentFiles/ANTIAGE_1_ЛИЧНОСТЬ_И_СТИЛЬ.txt
и @ContentFiles/ANTIAGE_5_КЕЙСЫ_И_ИСТОРИИ.txt

Создай /about/page.tsx (холодная палитра = доверие):

1. Breadcrumbs: Главная > Обо мне
   Hero: компактный, bg accent-bg
   h1: "Мой путь к молодости длиной в 30 лет" (Playfair, accent)

2. Timeline (вертикальная шкала, scroll-triggered):
   Линия по центру (desktop) / слева (mobile)
   8 точек-событий, чередуются left/right:
   - 30 лет назад: начало БАДов
   - 20+ лет: "Вы молодеете!"
   - 15 лет бессонницы → победа
   - 12 лет без алкоголя
   - Косметолог в 45
   - Круиз по Карибам
   - Добавление гимнастик
   - 62 года: без очков, энергия
   Каждая точка: кружок (accent-mid) + карточка + дата

3. ТОП-5 принципов (5 карточек, иконки):
   Вода (Droplets) | Сон (Moon) | Движение (Activity) |
   Питание+БАДы (Apple) | Мышление (Brain)
   bg accent-bg, border accent-light

4. Цитаты (блок, тёплый фон primary-bg):
   3 цитаты шрифтом Caveat, 28px, primary-dark
   (из ANTIAGE_7_КОНТЕНТ_И_ЦИТАТЫ.txt)
   Между ними: тонкий разделитель

5. CTA: [Пройти тест] + [Стать партнёром]
```

---

## ЭТАП 6: Программы (1 час)

### Промпт
```
Прочитай @CLAUDE.md, @ARCHITECTURE.md (2.4).
Контент: @ContentFiles/ANTIAGE_3_ПРОДУКТ_И_УСЛУГИ.txt,
         @ContentFiles/ANTIAGE_9_ОТРАСЛЕВАЯ_ЭКСПЕРТИЗА.txt

Создай обзорную + 3 подстраницы:

/programs/page.tsx:
- Breadcrumbs: Главная > Программы
- Hero: "Три кита здоровья" (Playfair)
- Инфографика последовательности (горизонтальный stepper):
  БАДы → Питание → Привычки → Движение → Практики
  С иконками и стрелками, scroll-triggered
- 3 больших карточки-ссылки (каждая — свой цвет)

/programs/biochemistry/page.tsx: hero bg accent-bg, border accent-mid
/programs/biomechanics/page.tsx: hero bg primary-bg, border primary
/programs/bioenergy/page.tsx: hero bg accent-bg, border accent-light

Каждая подстраница:
- Breadcrumbs: Главная > Программы > {Название}
- Hero с цветом
- Описание (3-4 абзаца)
- "Что входит" — чеклист с галочками (Lucide Check)
- "Для кого" — 3 пункта
- FAQ — Accordion (4-5 вопросов)
- CTA: [Пройти тест] + [Записаться на консультацию]
- WaveDivider между секциями
```

---

## ЭТАП 7: Блог + Контакты (1 час)

### Промпт
```
Создай блог и контакты:

/blog/page.tsx:
- Breadcrumbs: Главная > Блог
- Фильтры: табы (shadcn Tabs) — по BlogCategory
- Сетка: 2 колонки desktop, 1 mobile
- Карточка: обложка-placeholder + badge-категория + h3 + превью + дата
- 3 демо-статьи с реальным контентом (из @ContentFiles/ANTIAGE_11)
- ISR: revalidate: 3600

/blog/[slug]/page.tsx:
- Breadcrumbs: Главная > Блог > {Категория} > {Статья}
- h1 + обложка + дата + категория
- Контент
- Sidebar: QuizCTA-виджет + Telegram-виджет + похожие статьи
- Кнопки шеринга: Telegram, VK, WhatsApp
- CTA внизу: подписка на Telegram
- JSON-LD: Article + FAQPage (если есть FAQ)

/contacts/page.tsx:
- Breadcrumbs: Главная > Контакты
- 4 карточки (Telegram, Email, Instagram, YouTube)
- Холодная палитра, иконки Lucide
- Форма обратной связи + ConsentCheckbox + Arcjet
- Server Action: submitContact.ts

CTABanner.tsx (mobile only):
- Фиксированный внизу, 2 кнопки: [Тест] + [Telegram]
- Скрывается при приближении к footer
- Umami events: cta_banner_quiz_clicked, cta_banner_telegram_clicked
```

---

## ЭТАП 8: SEO + Безопасность + Полировка (1.5 часа)

### Промпт
```
Финальная полировка:

1. SEO:
   - metadata + og:image на каждой странице (уникальные)
   - JSON-LD: Person, MedicalBusiness, Article, FAQPage,
     BreadcrumbList, Organization, VideoObject, Service
   - sitemap.xml + robots.txt (Next.js автогенерация)
   - Keyword mapping (см. ARCHITECTURE.md секция 6)

2. Аналитика:
   - Umami script в layout.tsx (через next/script, defer)
   - PostHog dynamic import (только клиент)
   - Sentry setup (error tracking + performance)
   - Все Umami events из ARCHITECTURE.md секция 6

3. Производительность:
   - next/image: formats: ['image/avif', 'image/webp'], priority для hero
   - Dynamic imports: Framer Motion, PostHog, каруселей
   - Variable fonts: font-display: swap, preload
   - Cloudinary URLs для тяжёлых изображений
   - Tree-shake lucide-react (отдельные импорты)
   - Bundle analyzer: проверить размер бандла

4. Доступность:
   - aria-labels на всех интерактивных элементах
   - alt-тексты на русском для всех изображений
   - Focus-стили (видимые outline)
   - Ошибки форм: иконка + текст + aria-live
   - Контрастность 7:1 (проверить через A11y MCP)
   - Touch targets 48×48px (проверить через A11y MCP)

5. Error pages:
   - not-found.tsx: красивая 404 с CTA (квиз + главная)
   - error.tsx: graceful error boundary с retry
   - loading.tsx: skeleton loaders

6. Проверить через MCP:
   - Lighthouse MCP: все метрики > 90
   - A11y MCP: WCAG 2.2 AA compliance
   - Playwright MCP: e2e тест квиза (start → complete → gate → results)

7. npm run build без ошибок
```

---

## ЭТАП 9: AI-чат + PWA (v1.1, отдельный спринт)

### Промпт
```
Функции второго релиза:

1. AI-чат виджет (Vercel AI SDK + Anthropic):
   - Кнопка в правом нижнем углу "Спросить у эксперта"
   - RAG на базе контента сайта + статей блога
   - System prompt: тон эксперта, НЕ медицинские советы
   - Streaming ответы (useChat hook)
   - Guardrails: медицинский disclaimer
   - Arcjet: AI prompt injection protection

2. PWA (Serwist):
   - manifest.json (иконки, theme-color primary)
   - Service worker: cache static + quiz pages
   - Offline fallback page
   - Push notifications (новые статьи)
   - Install prompt после прохождения квиза

3. Before/After галерея (/gallery):
   - Карусель трансформаций (фото До/После)
   - Disclaimer: "Результаты индивидуальны"
   - CTA: [Пройти тест] + [Консультация]

4. Адаптивный квиз (AI-powered):
   - Вопросы меняются на основе предыдущих ответов
   - Vercel AI SDK для генерации персонализированных рекомендаций
   - A/B тест: статичный vs адаптивный квиз
```

---

## ПРОМПТЫ ДЛЯ ОТЛАДКИ

### Если дизайн выглядит "generic"
```
Стоп. Дизайн выглядит как шаблонный AI-сайт.
Перечитай @CLAUDE.md секцию "Дизайн-система":
- Двойная палитра: тёплая (#C97B4B) + холодная (#2A8F8F)
- Фон: НЕ белый #FFF, а тёплый крем #FAFAF8 или #FDF8F3
- Органические волнистые разделители между КАЖДОЙ секцией
- Playfair Display для заголовков, Caveat для цитат
- Текст: тёмно-коричневый #3D2E22, НЕ чёрный
- Кнопки: крупные (h-14), rounded-xl
- Карточки: rounded-2xl, мягкие тени
Переделай с характером. Это тёплый, живой сайт, не корпоративный шаблон.
```

### Если волны между секциями не работают
```
WaveDivider отображается некорректно.
Требования:
- SVG с viewBox="0 0 1440 80", width="100%", preserveAspectRatio="none"
- Верхняя часть заполнена fromColor, нижняя toColor
- Path должен быть плавной кривой (cubic bezier), НЕ зигзаг
- 4 варианта чтобы не повторялись подряд
- На mobile тоже full-width без горизонтального скролла
```

### Если квиз ломается
```
Квиз не работает корректно. Проверь:
- QuizStepper хранит state всех ответов
- При клике на вариант: сохранение + автопереход (delay 300ms)
- Кнопка "Назад" возвращает к предыдущему вопросу с сохранёнными ответами
- AnimatePresence для плавных переходов
- На последнем вопросе: submit через Server Action
- Arcjet проверяет rate limit перед сохранением
- Gate: результаты НЕ показываются без email + consent
- calculateBioAge: алгоритм из ARCHITECTURE.md
- JWT token генерируется и передаётся в URL результатов
```

### Если Arcjet блокирует легитимные запросы
```
Arcjet слишком агрессивно блокирует.
Проверь:
- В dev-режиме используй mode: "DRY_RUN" для тестирования
- tokenBucket rate: увеличь до 10 req/min для тестов
- detectBot: проверь что не блокирует Chrome/Safari
- validateEmail: проверь что не блокирует популярные домены (mail.ru, yandex.ru)
В production верни mode: "LIVE"
```

---

## Чеклист перед деплоем

### Визуал и UX
- [ ] Двойная палитра применена: тёплая/холодная чередуются
- [ ] WaveDivider между КАЖДОЙ секцией
- [ ] Trust-элементы на каждой странице
- [ ] Mobile адаптация (375px+)
- [ ] Шрифты загружаются (Playfair, Source Sans, Caveat)
- [ ] Анимации плавные, prefers-reduced-motion работает
- [ ] Текст min 16px везде, body 18px
- [ ] Touch targets 48×48px
- [ ] Кнопки Telegram ведут на правильный канал

### Функциональность
- [ ] Квиз работает от начала до результатов
- [ ] Алгоритм bioAge считает корректно
- [ ] JWT token генерируется и валидируется
- [ ] Email gate: ConsentCheckbox работает
- [ ] Telegram gate: ссылка формируется правильно
- [ ] Формы (партнёр, контакт) отправляют данные
- [ ] Drip-серия запускается после квиза (Inngest)
- [ ] Email шаблоны рендерятся корректно

### Безопасность
- [ ] Arcjet защищает все формы (rate limit + bot + email)
- [ ] Security headers настроены
- [ ] CSP middleware работает
- [ ] ConsentCheckbox на каждой форме с email
- [ ] ConsentLog записывается
- [ ] Privacy Policy страница доступна
- [ ] JWT token для результатов квиза expires через 7 дней
- [ ] Telegram webhook валидирует secret token

### SEO и производительность
- [ ] SEO meta-данные заполнены на каждой странице
- [ ] JSON-LD схемы: Person, MedicalBusiness, Article, FAQ, Breadcrumbs
- [ ] sitemap.xml генерируется
- [ ] Lighthouse > 90 по всем метрикам
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Изображения: AVIF/WebP через Cloudinary
- [ ] Шрифты: variable, preloaded, swap

### Аналитика и мониторинг
- [ ] Umami tracking работает
- [ ] Все micro-conversion events отправляются
- [ ] Sentry настроен (errors + performance)
- [ ] Resend webhooks обрабатываются

### Контент и юридика
- [ ] Нет слов "лечение", "диагноз", "MLM", "пирамида"
- [ ] Disclaimer "Результаты индивидуальны" где нужно
- [ ] Privacy Policy актуальна
- [ ] SPF/DKIM/DMARC настроены для email домена
