# PROMPT_056_program_circles

## Контекст
TASK-056 (SPRINT-3): добавить круглые фото Галины на страницы программ — как на
doksveta (портрет в hero + портрет у блока-цитаты «Главный закон здоровья»). Фото
уже в репо: public/images/expert-accent.jpg (портрет-headshot, лучше для круга),
expert-about.jpg, expert-preview.jpg. Прочитай: CLAUDE.md,
src/components/programs/HealthProgramPage.tsx, src/app/programs/[slug]/page.tsx,
src/components/sections/Hero.tsx (паттерн next/image).

## Цель
На каждой странице программы — круглый портрет Галины в hero и у цитаты.
Готово = (1) в hero программы (справа/сверху, как на доксвете) круглый <Image>
expert-accent.jpg; (2) у блока цитаты «Главный закон здоровья» — круглый портрет
(тот же или expert-preview.jpg); (3) next/image, круглая маска (rounded-full,
object-cover, фикс. размеры ~96-140px), alt «Галина — эксперт по anti-age»;
(4) lint/tsc/build зелёные; прод — ≥2 программы проверены.

## Вайб
Только добавление портретов в существующую вёрстку; композицию/тексты не менять.

## Технические параметры
- cwd antiage-platform/. Размер кружка hero ~120-140px, у цитаты ~80-96px.
- Если у цитаты сейчас нет аватара-слота — добавить рядом с текстом цитаты слева.
- Не плодить новые фото-файлы; брать из public/images.

## Visual Guidance
- Референс расположения — doksveta.ru/programs/nervnaya-sistema (круг в hero
  справа-сверху + круг у цитаты). Палитра/вёрстка — наша.

## Ожидания качества
- Скрин (или curl-проверка _next/image URL) 1 программы в отчёт.
- Отчёт REPORT_TASK-056, CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: 3 страницы китов не трогать сверх добавления портрета; составы не менять.
