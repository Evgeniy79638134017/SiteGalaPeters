# PERF_BASELINE — замер «ДО» (TASK-070, SPRINT-4 Вариант A)

**Дата:** 2026-06-09 · Снято: VS Code Claude (CLI) · Статус: эталон для сравнения
**Связано:** PERF_ARCHITECTURE_PLAN.md (§1 узкое место, §7 план внедрения).

> Это «фотография до» оптимизаций (TASK-071 nginx-кэш/сжатие/HTTP2, TASK-072 видео→Gcore CDN,
> TASK-073 ленивое видео). Ничего не менялось — только измерение. Сравнивать «после» теми же
> командами с той же машины.

## Условия замера

- **Инструмент:** `curl -w '%{time_total} %{size_download} %{http_code} %{http_version}' -o /dev/null -s`.
- **Откуда:** локальная машина исполнителя (РФ-сторона; трафик идёт через московский Nginx → Vercel).
  Значит это **РФ-baseline**. Замеры из ЕС/РФ через PageSpeed/WebPageTest снимет владелец/PM вручную
  (см. раздел «Внешние замеры» — ссылки/скрины вставить позже).
- **Прогоны:** страницы — 5 прогонов (среднее), запрос с `--compressed` (как браузер);
  видео — полные GET, 2 серии по 3 прогона.
- **Время `time_total`** включает downlink локальной машины (≈1 МБ/с на видео) — для видео это
  важная оговорка: вес файла объективен, абсолютное время зависит от канала. Сравнение «после»
  делать с той же машины/канала.

## 1. Страницы (5 прогонов, средн.)

| URL | avg time_total | size_download (gzip, тело) | code | HTTP |
|-----|---------------:|---------------------------:|:----:|:----:|
| `/` (главная) | **1.582 s** | 16 280 B | 200 | **1.1** |
| `/programs/kletochnoe-omolozhenie` | **1.573 s** | 22 313 B | 200 | 1.1 |
| `/programs` (каталог) | **1.493 s** | 14 725 B | 200 | 1.1 |
| `/blog` | **1.473 s** | 12 701 B | 200 | 1.1 |

HTML лёгкий (13–22 КБ в gzip) — узкое место не в нём (подтверждает §1 плана).

## 2. Видео `https://gpeters.ru/media/hero-bg.mp4`

| Параметр | Значение |
|----------|----------|
| Размер (Content-Length) | **9 513 760 B = 9.07 МБ** |
| time_total, серия 1 (3 прогона) | 11.12 / 11.46 / 9.90 s (средн. **10.83 s**) |
| time_total, серия 2 (avg 3 прогонов) | **8.61 s** |
| Диапазон | ≈ 8.6–11.5 s с локального канала |
| Скорость загрузки | ≈ 0.83–1.07 МБ/с |
| HTTP | **1.1** |

Самый тяжёлый ресурс на критическом пути; отдаётся **с московского диска без CDN** — для ЕС это
главный тормоз (цель TASK-072: Gcore edge; TASK-073: не грузить на slow/mobile).

## 3. Заголовки кэша / сжатия / протокола (текущие)

### Страница `/` (и `/blog` — то же по сжатию/кэшу)
| Заголовок | Значение | Вывод |
|-----------|----------|-------|
| HTTP-версия | `HTTP/1.1` | **нет HTTP/2** → цель TASK-071 |
| `Content-Encoding` | `gzip` | gzip есть (отдаёт Vercel, проходит через Nginx); **brotli нет** → цель TASK-071 |
| `Cache-Control` | `public, max-age=0, must-revalidate` | HTML **не кэшируется** на Nginx (ревалидация каждый раз) → цель TASK-071 `proxy_cache` |
| `X-Vercel-Cache` | `HIT` | Vercel edge-кэш отдаёт HTML, но Nginx ходит к нему каждый раз |
| `Vary` | `rsc, next-router-state-tree, …` | RSC-вариативность Next |
| `Server` | `nginx/1.24.0 (Ubuntu)` | прокси РФ |
| HSTS | `max-age=63072000; includeSubDomains; preload` | TLS-инвариант соблюдён |

### Видео `/media/hero-bg.mp4`
| Заголовок | Значение | Вывод |
|-----------|----------|-------|
| HTTP-версия | `HTTP/1.1` | нет HTTP/2 |
| `Content-Type` | `video/mp4` | — |
| `Content-Length` | `9513760` | 9.07 МБ |
| `Cache-Control` | `max-age=2592000, public` | кэш 30 дней — **уже хорошо** (на /media/ менять не надо) |
| `Accept-Ranges` | `bytes` | range-запросы поддержаны (важно для TASK-073) |
| `Content-Encoding` | — (нет) | корректно: mp4 не сжимают |

## 4. Узкие места (что должны улучшить следующие задачи)

1. **HTTP/1.1** на всём (страницы и видео) → **TASK-071** включает HTTP/2.
2. **Нет brotli**, HTML только gzip (от Vercel) → **TASK-071** добавит brotli на Nginx.
3. **HTML не кэшируется на Nginx** (`max-age=0, must-revalidate`) — каждый хит идёт к Vercel
   → **TASK-071** `proxy_cache` (НЕ кэшировать `/api`, `/media`).
4. **Видео 9.07 МБ из Москвы, без CDN** → **TASK-072** (Gcore edge) + **TASK-073** (ленивое
   видео, постер на slow/mobile).

## 5. Внешние замеры (вне CLI — заполнить вручную)

- [ ] PageSpeed Insights (mobile+desktop) для `/` — из ЕС: ссылка/скрин — _вставить_
- [ ] PageSpeed Insights для `/` — из РФ: ссылка/скрин — _вставить_
- [ ] WebPageTest (локация ЕС, напр. Frankfurt) — LCP/Start Render/видео-waterfall — _вставить_
- [ ] WebPageTest (локация РФ, напр. Moscow) — то же — _вставить_

> Цель: после TASK-071/072/073 повторить эти же CLI-замеры и внешние тесты, подтвердить
> ускорение ЕС (видео с ближайшего edge + кэш/сжатие/HTTP2) и **отсутствие регресса в РФ**.

## Приложение: сырые прогоны

```
PAGES (--compressed, 5 runs avg):
/                                   avg_time=1.582s  size=16280B  200  HTTP/1.1
/programs/kletochnoe-omolozhenie    avg_time=1.573s  size=22313B  200  HTTP/1.1
/programs                           avg_time=1.493s  size=14725B  200  HTTP/1.1
/blog                               avg_time=1.473s  size=12701B  200  HTTP/1.1

VIDEO /media/hero-bg.mp4 (full GET):
run1 time=11.116s size=9513760B speed=855871B/s   HTTP/1.1
run2 time=11.465s size=9513760B speed=829821B/s   HTTP/1.1
run3 time=9.904s  size=9513760B speed=960622B/s   HTTP/1.1
series2 avg over 3: time=8.61s  size=9513760B  avg_speed=1124077B/s
```
