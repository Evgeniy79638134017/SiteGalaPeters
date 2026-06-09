# PROMPT_070_perf_baseline

## Контекст
TASK-070 (SPRINT-4, Вариант A из PERF_ARCHITECTURE_PLAN.md): зафиксировать метрики «ДО»
оптимизации — иначе нельзя доказать, что ускорили и не замедлили РФ. Прочитай: CLAUDE.md,
PERF_ARCHITECTURE_PLAN.md (§7 «план внедрения», §1 узкое место).

## Цель
Базовые замеры производительности до изменений, сохранённые в репо.
Готово = .claude/reports/PERF_BASELINE_<дата>.md с таблицей метрик:
(1) размер и тип ответа главной, /programs/<slug>, /blog (curl -w: time_total,
size_download, http_code) — с локальной машины;
(2) вес и время загрузки видео https://gpeters.ru/media/hero-bg.mp4 (curl -w time_total,
size_download) — несколько прогонов, среднее;
(3) заголовки кэша/сжатия текущие: `curl -I` по странице и по видео
(есть ли gzip/br, Cache-Control, http-версия);
(4) пометка: PageSpeed/WebPageTest из ЕС и из РФ владелец/PM снимет вручную (вставить
ссылки/скрин позже) — executor делает только то, что доступно из CLI.

## Вайб
Только измерение, ничего не менять. Это «фотография до».

## Технические параметры
- Инструменты: curl (-w '%{time_total} %{size_download} %{http_code} %{http_version}\n' -o /dev/null -s).
  3-5 прогонов на URL, привести среднее.
- Не трогать сервер/код.

## Ожидания качества
- Отчёт PERF_BASELINE_<дата>.md (это не REPORT_TASK — это эталон для сравнения),
  + строка в CHANGELOG, SPRINT → TASK-070 [x], коммит/пуш.
- DON'T: никаких изменений конфигов/кода.
