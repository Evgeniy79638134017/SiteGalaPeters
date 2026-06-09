# PROMPT_013_split_consent

## Контекст
TASK-013 (Фаза 0.3-bis, юр.риски L3/L4/L10). Сейчас один общий чекбокс согласия
объединяет «обработку ПДн + получение сообщений» (EmailGate квиза и PartnerForm) —
это недействительное согласие по 152-ФЗ (правила с 01.09.2025) и ст.18 ФЗ-38.
API (antiage-api) флаги согласия не принимает; ConsentLog пишет одну строку.
Прочитай: CLAUDE.md (Часть I + инварианты), LEGAL_RISKS.md (L3, L4, L10),
.claude/context/ARCHITECTURE.md,
antiage-platform/src/components/forms/{EmailGate,ContactFormClient,PartnerForm}.tsx,
antiage-api/src/{schemas.ts,server.ts}, antiage-platform/prisma/schema.prisma (model ConsentLog),
.claude/reports/REPORT_TASK-012_2026-06-05.md, REPORT_TASK-015_2026-06-05.md.

## Цель
Раздельные согласия на формах + раздельная фиксация в БД, БЕЗ изменения схемы Prisma.
Готово =
(1) на квизе и партнёрке ДВА отдельных, НЕ предустановленных чекбокса: «обработка ПДн»
    (обязательный) и «рекламная рассылка» (необязательный); у квиза текст согласия на ПДн
    явно включает данные о состоянии здоровья (спец.категория, L3);
(2) контакт-форма — один обязательный чекбокс «обработка ПДн» (рассылки нет);
(3) форму нельзя отправить без согласия на ПДн; рассылка уходит в payload отдельным флагом;
(4) API требует consentData=true (иначе 400) и пишет в ConsentLog отдельную строку
    action="data_processing"; при consentMarketing=true — вторую строку action="marketing";
(5) сквозной тест на https://gpeters.ru: submit без рассылки → 1 строка ConsentLog;
    submit с рассылкой → 2 строки; submit без ПДн-согласия → 400, строк нет; тестовые удалить.

## Вайб
Юридическая точность + минимум кода. Без миграции БД (ConsentLog.action — свободная строка).
Тексты согласий ниже — рабочая редакция, финал утвердит юрист (гейт −1.4); НЕ переписывать.

## Технические параметры
- Тексты чекбоксов (рабочая редакция):
  • ПДн (контакт/партнёр): «Я согласен(а) на обработку персональных данных в соответствии
    с Политикой конфиденциальности.»
  • ПДн (квиз): «Я согласен(а) на обработку персональных данных, включая данные о состоянии
    здоровья, в соответствии с Политикой конфиденциальности.»
  • Рассылка (квиз/партнёр): «Согласен(а) получать информационные и рекламные сообщения
    (необязательно).»
  Ссылка на /privacy сохраняется в ПДн-чекбоксе.
- Фронт: в каждой форме отдельные состояния consentData/consentMarketing; submit блокируется
  без consentData; оба флага идут в тело запроса (postJson). Контакт-форма — только consentData.
- API схемы (antiage-api/src/schemas.ts): добавить в Quiz/Contact/Partner поля
  consentData: z.literal(true) (обязателен), consentMarketing: z.boolean().optional() (квиз/партнёр).
- API server.ts: после успешной записи сущности — consentLog.create(action:"data_processing",
  source: <quiz_gate|contact_form|partner_form>, ipAddress, userAgent, email); если
  consentMarketing===true — второй consentLog.create(action:"marketing", те же поля).
  EmailContact.consentGiven=true, consentDate=now (как и было). Маркетинг-флаг в EmailContact
  НЕ добавляем (потребует миграции) — это отметить как зависимость для TASK-014/017.
- ДЕПЛОЙ ОБЯЗАТЕЛЕН (в отличие от TASK-004): логика API меняется. Пересобрать antiage-api
  (tsc→dist), переложить на VPS, `pm2 reload antiage-api`. Подтвердить healthz 200.
- Edge: старый payload без consentData → 400 (это ок, фронт обновляется тем же деплоем Vercel).

## Visual Guidance
- Разметка чекбокса — по образцу существующего consent-блока в EmailGate.tsx (Checkbox+label,
  стили teal-mid). Второй чекбокс — той же версткой, ниже.

## Ожидания качества
- Гейты: antiage-platform lint+tsc+build ✅; antiage-api tsc ✅; 5 проверок из «Цели»
  с выводами (psql-счётчики ConsentLog) в отчёте; подтвердить pm2 reload + healthz.
- Отчёт REPORT_TASK-013_<дата>.md, CHANGELOG, SPRINT → [x], коммит/пуш.
- «Следующий шаг» = TASK-014 (email, ждёт ESP). Отметить: маркетинг-согласие в БД
  (колонка EmailContact) отложено до TASK-014/017 (потребует миграции).
- DON'T: не менять schema.prisma (без миграции); не трогать nginx/Postgres-конфиги;
  тексты согласий не переписывать; секретов в репо/отчёте нет.
