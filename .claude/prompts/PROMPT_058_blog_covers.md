# PROMPT_058_blog_covers

## Контекст
TASK-058: на статьях блога нет обложек — в карточках сейчас пустая заглушка
`<div className="aspect-16/10 bg-brand-soft/30" />`, поля под картинку в данных нет.
Cowork сгенерировал и оптимизировал 6 обложек, они УЖЕ В РЕПО:
public/images/blog/<slug>.jpg — имя файла = slug статьи (16:10, ~80-110 КБ). Слаги:
bady-vitaminy-kollagen-chto-rabotaet-posle-50, menopauza-posle-45-eto-perezagruzka,
kak-ya-vernula-zrenie-v-62, energiya-na-ves-den-5-utrennikh-shagov,
tri-kita-zdorovya-sistema-30-let, ot-ya-uzhe-staraya-k-ya-tolko-nachinayu.
Прочитай: CLAUDE.md, src/content/blog-posts.ts (interface BlogPost + массив),
src/components/sections/BlogPreview.tsx, src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx.

## Цель
Обложки видны в карточках (главная + /blog) и в шапке статьи.
Готово = (1) в interface BlogPost добавлено поле coverImage: string; каждой из 6
статей проставлен путь `/images/blog/<slug>.jpg`; (2) заглушки
`aspect-16/10 bg-brand-soft/30` заменены на <Image> с обложкой (object-cover,
сохранить соотношение 16/10) в BlogPreview и на /blog; (3) на странице статьи
/blog/[slug] обложка выводится в hero (если уместно по вёрстке); (4) alt = заголовок
статьи; (5) lint/tsc/build зелёные; прод — главная, /blog и 1 статья показывают картинки.

## Вайб
Минимально: добавить поле + заменить пустые div на Image. Вёрстку карточек не
переделывать, только наполнить картинкой существующий контейнер 16:10.

## Технические параметры
- cwd antiage-platform/. next/image: для карточек fill + sizes, контейнер relative
  с aspect-16/10 overflow-hidden; для hero статьи — по месту.
- Путь обложки можно хранить явной строкой в данных (надёжнее, чем собирать из slug).
- Файлы уже в public/images/blog/ — закоммить их вместе с кодом.

## Visual Guidance
- Контейнер уже есть (aspect-16/10) — просто положить в него Image вместо цветной заливки.

## Ожидания качества
- Скрин/curl: главная (превью блога) и /blog показывают обложки.
- Отчёт REPORT_TASK-058, CHANGELOG, SPRINT → [x], коммит/пуш (код + 6 jpg).
- DON'T: тексты статей не менять; другие изображения не трогать.
