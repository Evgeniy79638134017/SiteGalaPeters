# PROMPT_019_frontend_switch

## Контекст
TASK-019: сайт публично работает на https://gpeters.ru (TASK-015): / — Vercel,
/api/* — наш API (same-origin, CORS не нужен). Формы фронта всё ещё вызывают
server actions-заглушки; canonical/og:url в проде указывают на antiage.ru (старый
дефолт) — SEO-баг. Прочитай: CLAUDE.md, src/actions/*.ts,
src/components/forms/ContactFormClient.tsx, PartnerForm.tsx,
src/components/quiz/QuizStepper.tsx (вызов submitQuiz), antiage-api/src/schemas.ts,
src/lib/constants.ts, src/app/layout.tsx, sitemap.ts, robots.ts, src/lib/jsonld.ts,
.claude/reports/REPORT_TASK-015_2026-06-05.md.

## Цель
Формы сайта пишут в российскую БД, домен в метаданных верный.
Готово = (1) на https://gpeters.ru контакт-форма, партнёр-форма и квиз создают записи
в БД (сквозной тест после авто-деплоя; тестовые записи удалить); (2) в HTML прода
canonical и og:url = https://gpeters.ru; (3) src/actions/ удалена, нигде не
импортируется; (4) lint+tsc+build зелёные; (5) пуш в main → Vercel-деплой Ready.

## Вайб
Защитный рефакторинг: UX, тексты, состояния загрузки/ошибок форм не меняются.
Контракт ответов API уже зеркален contract'у actions — сохранить как есть.

## Технические параметры
- Создай src/lib/api.ts: маленький fetch-хелпер postJson<T>(path, body) →
  fetch(path, {method:"POST", headers:{"Content-Type":"application/json"},
  body: JSON.stringify(body)}) с обработкой не-2xx → {success:false, error}.
  Пути ОТНОСИТЕЛЬНЫЕ ("/api/contact" и т.д.) — same-origin через прокси.
- Замени вызовы: submitContact → postJson("/api/contact"), submitPartner →
  postJson("/api/partner"), submitQuiz → postJson("/api/quiz"). Формат ответов
  ({success, error?, resultToken?}) сохранить — UI не должен заметить разницы.
- Удали src/actions/ целиком (tsc поймает забытые импорты).
- Домен: во всех местах дефолт https://antiage.ru замени на https://gpeters.ru
  (layout.tsx metadataBase/alternates, sitemap.ts, robots.ts, jsonld.ts, constants).
  NEXT_PUBLIC_SITE_URL из env остаётся приоритетом.
- vercel.json в корне antiage-platform: ignoreCommand, пропускающий сборку, если
  в коммите менялись только файлы вне antiage-platform/ (наши .claude-коммиты не
  должны тратить билды). Проверь синтаксис по докам Vercel.
- Сквозной тест: после пуша дождись деплоя (curl https://gpeters.ru — проверь, что
  canonical сменился), затем POST-тесты форм с пометкой task019-test@example.com,
  проверка строк в БД по ssh, удаление тестовых записей (задокументируй).
- Edge: EmailGate/квиз — проверь, что resultToken из API доходит до экрана результатов.

## Visual Guidance
- Образец обработки ответа — текущие onSubmit в ContactFormClient/PartnerForm.

## Ожидания качества
- 5 проверок из «Цели» с выводами в отчёте (включая фрагмент HTML с canonical).
- Отчёт REPORT_TASK-019_<дата>.md, CHANGELOG, SPRINT → [x], коммит/пуш.
- «Следующий шаг» = TASK-014 (email, ждёт ESP) и TASK-013 (раздельные согласия).
- DON'T: не менять UX/тексты форм и чекбоксы согласий (это TASK-013); не трогать
  nginx/VPS (кроме чтения БД для проверки); не менять antiage-api; email hello@antiage.ru ЗАМЕНИ на gpeters@mail.ru (в constants.ts/jsonld.ts).
  Ссылки соцсетей (@antiage Telegram/YouTube/Instagram) НЕ менять — уточнит владелец позже.
