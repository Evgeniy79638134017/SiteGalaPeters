# PROMPT_041_repo_hygiene

## Контекст
TASK-041 + гигиена git. Долги: (1) тяжёлые/чувствительные ИСХОДНИКИ в `ContentFiles/`
(видео 85 МБ, .CR3 23 МБ, исходные фото, транскрипты ANTIAGE_*.txt) рискуют попасть в git
при `git add .` (раздувание + утечка, AUDIT L1*, LEGAL L1); (2) координационный слой
`.claude/` (prompts/, BACKLOG.md, context/, settings.json, README_СИСТЕМА.md,
reports/_TEMPLATE.md) не закоммичен — живёт только на диске. Прочитай: CLAUDE.md, PROJECT_STATUS.md.

## Цель
Игнорировать рабочие исходники ContentFiles/; закоммитить .claude/. ВАЖНО: ассеты сайта
в `antiage-platform/public/` (включая будущее видео в public/media/) ДОЛЖНЫ оставаться в git.
Готово =
(1) в siteGala/.gitignore добавлено правило **`/ContentFiles/`** (именно каталог исходников;
    НЕ глобальный `*.mp4`/`*.CR3` — чтобы не задеть public-ассеты);
(2) проверка, что код/сборка не импортируют из ContentFiles (grep по antiage-platform/src,
    antiage-api — ссылок нет); если есть — BLOCKER;
(3) `git rm -r --cached ContentFiles` (файлы остаются на диске, перестают отслеживаться);
(4) закоммичен .claude/ (`git add .claude/`) — без секретов (settings.json = только permissions);
(5) `git ls-files | grep -E 'ContentFiles|dudnikpromo|\.CR3'` → пусто; `.claude`-файлы в `git ls-files`;
    `git ls-files antiage-platform/public` по-прежнему содержит ассеты (public НЕ затронут).

## Вайб
Аккуратно, обратимо. Историю git НЕ переписывать. public/ не трогать.

## Технические параметры
- cwd репозитория siteGala/. .gitignore дополнить, существующее не сносить.
- НЕ добавлять глобальных `*.mp4`/`*.CR3` — только `/ContentFiles/` (там все тяжёлые исходники).
- Не коммитить .env*, секреты, node_modules, .next.

## Ожидания качества
- Отчёт REPORT_TASK-041 (что в .gitignore, что rm --cached, какие .claude-файлы вошли,
  вывод git ls-files фрагментами). CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: не переписывать историю; не удалять файлы с диска; public/ не игнорировать.
