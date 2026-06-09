# PROMPT_054_socials

## Контекст
TASK-054: заменить заглушки соцсетей (@antiage, antiage_channel) реальными ссылками
Галины (получены от владельца). Прочитай: CLAUDE.md,
antiage-platform/src/lib/constants.ts, src/lib/jsonld.ts,
src/components/layout/{Footer,Header,CTABanner}.tsx (использования констант).

## Цель
Все ссылки соцсетей/Telegram на сайте — реальные. Готово =
(1) constants.ts: TELEGRAM_CHANNEL_URL=https://t.me/GalaProMolodost;
    YOUTUBE_URL=https://youtube.com/@galinapeters;
    INSTAGRAM_URL=https://www.instagram.com/galina.peters;
    новая TIKTOK_URL=https://www.tiktok.com/@gala_lucky;
    новая ORDER_URL=https://t.me/GalaProMolodost с комментарием
    «TODO: заменить на реферальную ссылку agenyz Галины, когда придёт код» —
    будет использована в TASK-053 кнопками «Заказать»;
(2) футер: TikTok добавлен к списку соцсетей (иконки TikTok в lucide нет —
    допустима текстовая ссылка в том же стиле); рядом с Instagram — сноска
    «* Meta Platforms (Instagram) признана экстремистской организацией и запрещена
    на территории РФ» мелким текстом (как принято юридически);
(3) jsonld sameAs — все 4 ссылки;
(4) на проде старых @antiage/antiage_channel не осталось (grep по живым страницам);
(5) lint/tsc/build зелёные.

## Вайб
Точечная замена констант + сноска. Вёрстку не перестраивать.

## Технические параметры
- TELEGRAM_BOT_URL (квиз-бот) НЕ трогать — бот отдельная задача (TASK-031).
- Сноску Meta — в самый низ футера, text-xs muted.

## Visual Guidance
- Стиль ссылок — существующий блок «Мы в соцсетях» футера.

## Ожидания качества
- Отчёт REPORT_TASK-054_<дата>.md (короткий), CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: тексты разделов не менять; bot-URL не трогать.
