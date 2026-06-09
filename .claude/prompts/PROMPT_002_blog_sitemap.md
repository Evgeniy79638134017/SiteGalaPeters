# PROMPT_002_blog_sitemap

## Контекст
TASK-002 (аудит M3): статьи блога не попадают в sitemap — в
antiage-platform/src/app/sitemap.ts есть статические страницы и PROGRAMS, но нет BLOG_POSTS.
Прочитай: CLAUDE.md (Часть I), src/app/sitemap.ts, src/content/blog-posts.ts.

## Цель
Все статьи блога присутствуют в sitemap. Готово = функция sitemap() возвращает записи
/blog/<slug> для каждого поста из BLOG_POSTS (сейчас 6), проверено фактическим вызовом
(например, `npx tsx -e` или временный скрипт) с выводом списка URL в отчёт.

## Вайб
Минимальное вмешательство: один файл, по образцу соседнего кода.

## Технические параметры
- cwd: antiage-platform/. Маппинг как у PROGRAMS: changeFrequency "monthly", priority 0.7,
  lastModified: now (поле date у постов — русская строка, парсить не надо).
- Импорт BLOG_POSTS из "@/content/blog-posts".

## Visual Guidance
- Образец — блок programPages в этом же файле sitemap.ts.

## Ожидания качества
- Гейты: npm run lint, npx tsc --noEmit, npm run build — зелёные.
- Отчёт REPORT_TASK-002 (короткий), CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: не менять другие записи sitemap, не трогать robots.ts.
