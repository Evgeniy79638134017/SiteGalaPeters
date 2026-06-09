# PROMPT_074_cdn_origin_diag

## Контекст
TASK-074 (диагностика, SPRINT-4): Gcore CDN отдаёт 504 на https://cdn.gpeters.ru/media/hero-bg.mp4,
при этом origin https://gpeters.ru/media/hero-bg.mp4 здоров (200, видео играет в браузере из РФ).
Вывод: edge Gcore не может забрать файл с нашего Nginx (origin pull виснет → 504). Origin pull
protocol уже выставлен в HTTPS, кэш Gcore очищен. Нужно понять: ДОХОДЯТ ли запросы Gcore до
нашего Nginx и что он с ними делает. НИЧЕГО НЕ МЕНЯТЬ — только чтение логов и проверки.
Прочитай: CLAUDE.md, .claude/reports/REPORT_TASK-015 и REPORT_TASK-071 (текущий nginx-конфиг
и кэш), PERF_ARCHITECTURE_PLAN.md.

## Цель
Определить причину 504 на стороне origin или подтвердить, что проблема вне нас (Gcore).
Готово = отчёт с ответами на вопросы ниже, подкреплённый выводами логов/команд.

## Что проверить на сервере (ssh deploy@89.108.76.118), только чтение
1. Приходят ли запросы Gcore к /media/hero-bg.mp4: грепнуть access-логи Nginx за последний час
   по `media/hero-bg`:
   `sudo grep "media/hero-bg" /var/log/nginx/access.log | tail -40`
   — посмотреть IP-источники (edge Gcore), коды ответов (200/301/499/504/444), время ответа
   (если в log_format есть $request_time/$upstream_response_time — привести).
2. error-лог за тот же период: `sudo tail -100 /var/log/nginx/error.log` — искать timeout,
   upstream, SSL, limiting requests, "client closed", "no live upstreams".
3. Как наш Nginx обрабатывает /media/ для ВНЕШНЕГО клиента по HTTPS с Host: gpeters.ru —
   воспроизвести «как Gcore»:
   `curl -sI --resolve gpeters.ru:443:127.0.0.1 https://gpeters.ru/media/hero-bg.mp4` (локально на сервере)
   и с указанием только заголовков, что шлёт CDN (Range, Accept-Encoding).
4. Не блокирует ли что-то соединения: `sudo ufw status verbose` (443 открыт?),
   `sudo fail2ban-client status` и статус джейлов — не забанены ли подсети Gcore;
   проверить, нет ли в nginx `limit_req`/`limit_conn`, задевающего /media/ (после TASK-071/022).
5. Гипотеза проверки: возможно, location /media/ при HTTPS-запросе с определёнными заголовками
   проваливается в `location /` → proxy_pass на Vercel → таймаут. Проверить, что /media/
   匹 matchится именно как статика (отдаётся с диска), а не уходит в прокси: сверить с конфигом.

## Вайб
Только диагностика. Никаких правок конфигов/фаервола в этой задаче (если найдём причину —
исправление будет отдельной задачей с бэкапом и откатом).

## Ожидания качества
- Отчёт REPORT_TASK-074: для каждого пункта 1–5 — что увидели (с фрагментами логов/выводов),
  и ВЫВОД: (а) запросы Gcore доходят и origin отвечает быстро 200 → проблема на стороне Gcore
  (идём в их поддержку / Путь B); (б) запросы доходят, но origin отвечает 504/долго/уходит в
  прокси → причина у нас, описать какая; (в) запросы НЕ доходят → сеть/фаервол.
- «Следующий шаг» — рекомендация на основе вывода.
- CHANGELOG, SPRINT → TASK-074 [x], коммит/пуш.
- DON'T: не менять nginx/ufw/fail2ban/PM2; не трогать код; секреты не светить.
