# PROMPT_060b_recenter_avatar

## Контекст
TASK-060b: Cowork перекадрировал hero-кружок (лицо чуть левее по просьбе владельца).
Файл public/images/expert-circle-hero.jpg УЖЕ ОБНОВЛЁН в рабочем дереве (тот же путь,
новый кроп). Кода менять не нужно — только закоммитить новый бинарник, чтобы Vercel
пересобрал. Прочитай: CLAUDE.md.

## Цель
Обновлённый кружок на проде. Готово = git показывает изменённый
expert-circle-hero.jpg; коммит и пуш; после деплоя на /programs/* и в шапке кружок
с новым кадрированием (curl _next/image → 200; при возможности — скрин).

## Технические параметры
- `git add antiage-platform/public/images/expert-circle-hero.jpg`, коммит
  «TASK-060b: recenter hero avatar crop (face slightly left)», пуш в main.
- Больше ничего не трогать. Кода/компонентов не менять.

## Ожидания качества
- Запись в CHANGELOG, SPRINT (можно строкой к TASK-060), коммит/пуш.
- DON'T: не менять компоненты, не трогать expert-circle-quote.jpg и др. фото.
