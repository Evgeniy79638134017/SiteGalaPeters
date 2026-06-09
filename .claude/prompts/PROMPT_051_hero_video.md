# PROMPT_051_hero_video

## Контекст
TASK-051 (SPRINT-3): затемнённое фоновое видео в Hero главной — «подтверждение
выступлений» эксперта. Медиа готовы (TASK-050, Cowork) в ContentFiles/web_ready/:
hero-bg.mp4 (9.3 МБ, 720p/25fps, без звука, faststart), hero-poster.jpg (выбран
владельцем: кадр 1.5s — Галина с микрофоном на сцене; видео стартует с этого же кадра),
og.jpg (1200x630, тот же кадр). Сайт за nginx на VPS (TASK-015: конфиг в
REPORT_TASK-015). Прочитай: CLAUDE.md (Часть I), .claude/context/ARCHITECTURE.md,
antiage-platform/src/components/sections/Hero.tsx, src/app/layout.tsx,
.claude/reports/REPORT_TASK-015_2026-06-05.md.

## Цель
Hero главной с фоновым видео и корректными фоллбеками; og-превью для шеринга.
Готово =
(1) https://gpeters.ru/media/hero-bg.mp4 → 200 с кэш-заголовком (отдаёт nginx с VPS);
(2) на главной видео фоном в Hero: autoPlay/muted/loop/playsInline, затемнение поверх,
    текст hero читаем; постер виден до загрузки видео;
(3) при prefers-reduced-motion видео НЕ воспроизводится — статичный постер;
(4) в metadata появились openGraph.images (/images/og.jpg, 1200x630) и
    twitter card summary_large_image — видно в HTML прода;
(5) lint/tsc/build зелёные; LCP не деградирует (preload="metadata"/"none", постер мгновенный).

## Вайб
Кинематографично, но дисциплинированно: композицию и тексты Hero не менять —
только подложить видео-слой с затемнением. Видео в git НЕ попадает.

## Технические параметры
- Видео на VPS: scp ContentFiles/web_ready/hero-bg.mp4 → /var/www/media/hero-bg.mp4
  (создать каталог, права на чтение nginx). В существующий server-блок gpeters.ru
  добавить `location /media/ { alias /var/www/media/; expires 30d;
  add_header Cache-Control "public"; }` (nginx -t → reload).
- Постер и OG — лёгкие, кладутся в git: ContentFiles/web_ready/hero-poster.jpg →
  antiage-platform/public/images/hero-poster.jpg; og.jpg → public/images/og.jpg.
- Hero.tsx: <video> абсолютным слоем под контентом (object-cover, весь блок),
  src="/media/hero-bg.mp4" (ОТНОСИТЕЛЬНЫЙ — same-origin через прокси),
  poster="/images/hero-poster.jpg", autoPlay muted loop playsInline preload="metadata".
  Затемнение: полупрозрачный слой поверх видео (чёрный ~45-55% или ténue-градиент
  в палитре сайта) — подбери так, чтобы текст читался (проверь контраст визуально).
  prefers-reduced-motion: useReducedMotion (framer-motion уже в проекте) → рендерить
  только постер-изображение без <video>.
- layout.tsx: openGraph.images=[{url:"/images/og.jpg",width:1200,height:630}],
  twitter.card="summary_large_image".
- Edge: на Vercel-домене (*.vercel.app) /media/ недоступен — допустимо (канонический
  домен gpeters.ru); видео не должно блокировать первый рендер.

## Visual Guidance
- Композиция Hero остаётся текущей (Hero.tsx — эталон). Эффект — как фоновые видео
  на лендингах конференций: тёмная подложка, контент поверх.

## Ожидания качества
- Проверки (1)-(5) с выводами в отчёт; скриншоты hero desktop (1440) и mobile (390)
  через Playwright — в отчёт (файлами в .claude/reports/assets/ можно).
- Отчёт REPORT_TASK-051_<дата>.md, CHANGELOG, SPRINT → [x], коммит/пуш
  (в git: Hero.tsx, layout.tsx, public/images/{hero-poster,og}.jpg; видео — НЕТ).
- «Следующий шаг» = TASK-052 (реальные фото на сайт).
- DON'T: видео в git/public не класть; тексты/CTA hero не менять; nginx — только
  добавление location /media/; ufw/sshd не трогать.
