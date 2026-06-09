# PROMPT_022_rate_limit

## Контекст
TASK-022 (аудит H1): формы публичны (https://gpeters.ru/api/*), защиты от спама/ботов
нет. Решение Cowork: nginx limit_req (без внешних вендоров; Arcjet не нужен — формы
уже за нашим nginx). Прочитай: CLAUDE.md, .claude/reports/REPORT_TASK-015_2026-06-05.md
(текущий nginx-конфиг), REPORT_TASK-012 (API).

## Цель
Лимиты на /api/* в nginx: защита от перебора при нулевых ложных срабатываниях
для людей. Готово = (1) limit_req_zone (по $binary_remote_addr) применён к location
/api/: rate 10r/m, burst 5, nodelay; статус отказа 429; (2) healthz исключён из
лимита (location = /api/healthz без limit_req) — мониторинг не страдает;
(3) проверка: серия из 20 быстрых POST /api/contact с одного IP → часть 429,
строки в БД только от успешных; одиночные запросы → 200; (4) nginx -t, reload,
сайт и формы работают; (5) в отчёте — фрагмент конфига и вывод тестов.

## Вайб
Консервативно: лимиты щадящие (человек не упрётся), боты режутся. Только nginx.

## Технические параметры
- limit_req_zone в http-контексте (файл /etc/nginx/conf.d/ratelimit.conf):
  zone=api_forms:10m rate=10r/m. В location /api/ — limit_req zone=api_forms burst=5 nodelay;
  limit_req_status 429;
- Тест с локальной машины (curl в цикле), тестовые записи task022-test@example.com
  удалить из БД после проверки.
- Edge: за прокси Vercel НЕ ходим — лимиты только в нашем nginx; X-Forwarded-For не
  использовать в ключе (внешние клиенты ходят напрямую, $binary_remote_addr корректен).

## Visual Guidance
- Стиль конфига — как существующий site-конфиг из REPORT_TASK-015.

## Ожидания качества
- Отчёт REPORT_TASK-022_<дата>.md (конфиг + тесты), CHANGELOG, SPRINT → [x], коммит/пуш.
- «Следующий шаг» = TASK-052/053 по спринту.
- DON'T: не трогать ufw/sshd/PM2/код API; лимиты на / (страницы) НЕ вешать.
