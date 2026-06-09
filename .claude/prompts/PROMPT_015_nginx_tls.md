# PROMPT_015_nginx_tls

## Контекст
TASK-015 (Фаза 0.5): включение сайта на домене. Готово: домен gpeters.ru и www
указывают на VPS 89.108.76.118 (A-записи проверены); Vercel-проект gala-antiage
(Pro, авто-деплой из main, Production Ready); API на VPS слушает 127.0.0.1:3001
(TASK-012); ufw уже разрешает 80/443.
Прочитай: CLAUDE.md (Часть I), .claude/context/ARCHITECTURE.md (целевая схема),
SERVER_SETUP.md, .claude/reports/REPORT_TASK-012_2026-06-05.md.

## Цель
https://gpeters.ru работает через Nginx на VPS: TLS Let's Encrypt с авто-продлением,
`/` проксируется на Vercel, `/api/` — на локальный API.
Готово = (1) https://gpeters.ru и https://www.gpeters.ru отдают сайт (200, контент
Vercel); (2) http→https редирект; (3) https://gpeters.ru/api/healthz → 200
{"status":"ok"}; (4) `certbot renew --dry-run` OK; (5) `ss -tlnp` — 3001 по-прежнему
только 127.0.0.1; (6) сквозной тест: POST на https://gpeters.ru/api/contact создаёт
строку в БД (ipAddress в ConsentLog = реальный внешний IP, не 127.0.0.1), тестовая
запись удалена.

## Вайб
Минимальный читаемый конфиг по образцу doksveta-схемы (proxy_pass на Vercel с
подменой Host). Код фронта НЕ трогаем (переключение форм — TASK-019).

## Технические параметры
- `sudo apt install -y nginx certbot python3-certbot-nginx`.
- Конфиг /etc/nginx/sites-available/gpeters.ru (+symlink в sites-enabled, убрать default):
  server_name gpeters.ru www.gpeters.ru;
  location /api/ → proxy_pass http://127.0.0.1:3001; + X-Real-IP, X-Forwarded-For, X-Forwarded-Proto;
  location / → proxy_pass https://<vercel-домен-проекта>; + proxy_set_header Host <vercel-домен>;
  proxy_ssl_server_name on; X-Forwarded-* заголовки.
- Точный production-домен Vercel определи сам (ожидаемо gala-antiage.vercel.app) и
  проверь curl'ом ДО прописывания; если у проекта другой URL — скорректируй.
- TLS: `sudo certbot --nginx -d gpeters.ru -d www.gpeters.ru` (email для уведомлений —
  gpeters@mail.ru). Проверь авто-редирект 80→443, `nginx -t` перед каждым reload.
- API и реальный IP: ConsentLog должен писать IP посетителя из X-Forwarded-For, а не
  127.0.0.1. Если antiage-api это не учитывает — добавь `app.set("trust proxy", "loopback")`
  (Express) в antiage-api, пересобери и переложи на сервер (pm2 reload). Это в объёме задачи.
- Edge cases: Vercel может отдавать 308 www→primary — убедись, что проксирование не
  зацикливается; favicon/_next/* должны грузиться (проверь 2-3 ассета curl'ом).

## Visual Guidance
- Эталон конфига — раздел Nginx в SERVER_SETUP.md и пример doksveta из ARCHITECTURE-обсуждения:
  та же пара proxy_pass/Host-подмена.

## Ожидания качества
- Все 6 проверок из «Цели» с выводами команд в отчёте; полный nginx-конфиг приложить
  в отчёт (конфиги сервера в репо не хранятся).
- Если менялся antiage-api — tsc без ошибок, коммит кода.
- Отчёт REPORT_TASK-015_<дата>.md, CHANGELOG, SPRINT → [x], коммит/пуш.
- Поле «Следующий шаг» = TASK-019 (переключение форм фронта на /api, домен в metadata)
  и TASK-014 (email, ждёт выбора ESP).
- DON'T: не менять фронт (кроме НИЧЕГО — формы в TASK-019); не открывать 3001 наружу;
  не трогать ufw/sshd/Postgres; секретов в репо/отчёте нет.
