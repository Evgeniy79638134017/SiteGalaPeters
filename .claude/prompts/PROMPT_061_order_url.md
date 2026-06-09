# PROMPT_061_order_url

## Контекст
TASK-061: пришла реферальная ссылка agenyz Галины — заменить временный ORDER_URL
(сейчас = Telegram-канал) на реальную. Прочитай: CLAUDE.md,
src/lib/constants.ts (ORDER_URL + TODO-коммент), где используется ORDER_URL
(HealthProgramPage кнопки «Заказать комплексы»).

## Цель
Кнопки «Заказать комплексы» ведут на реф-ссылку Галины.
Готово = (1) в constants.ts ORDER_URL = "https://agenyz.ru/registration?bonus=001-078135&language=ru";
TODO-комментарий удалён; (2) кнопки «Заказать комплексы» на страницах программ
ведут на эту ссылку (target="_blank" rel="noopener noreferrer", если так у внешних
ссылок принято в проекте); (3) lint/tsc/build зелёные; прод — на 1 программе кнопка
«Заказать» открывает agenyz с bonus=001-078135.

## Вайб
Точечная замена одной константы. Кнопку «Написать в Telegram» НЕ трогать
(она остаётся TELEGRAM_CHANNEL_URL).

## Технические параметры
- cwd antiage-platform/. Менять только ORDER_URL. Соцсети/каналы не трогать.

## Ожидания качества
- Отчёт REPORT_TASK-061 (короткий), CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: TELEGRAM_CHANNEL_URL и прочие ссылки не менять.
