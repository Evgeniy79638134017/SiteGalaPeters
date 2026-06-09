# PROMPT_010_server_bootstrap

## Контекст
Проект AntiAge, задача TASK-010 (Фаза 0.1 из IMPLEMENTATION_PLAN.md): первичная
настройка и защита арендованного RU-VPS. Сервер: reg.ru «Amber Natrium»,
IP 89.108.76.118, Ubuntu LTS, доступ root по паролю (пароль знает только владелец).
Прочитай перед стартом: CLAUDE.md (Часть I), .claude/tasks/SPRINT.md,
.claude/context/ARCHITECTURE.md, SERVER_SETUP.md (раздел «1. Базовая защита сервера»).

## Цель
Защищённый доступ к серверу: вход только по SSH-ключу, пользователь deploy с sudo,
парольный вход отключён, фаервол и fail2ban активны, система обновлена.
Готово = `ssh deploy@89.108.76.118` входит по ключу без пароля; `ssh root@... -o
PreferredAuthentications=password` отклоняется; `ufw status` = active (22, 80, 443);
`systemctl is-active fail2ban` = active.

## Вайб
Аккуратная пошаговая настройка с проверкой после каждого шага. Главное правило —
НЕ ПОТЕРЯТЬ ДОСТУП: парольный вход отключать только ПОСЛЕ подтверждённого входа по ключу
во втором терминале. Ничего лишнего не устанавливать.

## Технические параметры
- Работаешь с локальной машины владельца (Windows): команды ssh из терминала VS Code.
- Порядок:
  1. Проверь/создай локальный ключ: `ssh-keygen -t ed25519` (если ~/.ssh/id_ed25519 нет).
  2. Закинь ключ руту: `ssh-copy-id root@89.108.76.118` (или ручное добавление в
     authorized_keys). Пароль вводит ВЛАДЕЛЕЦ сам в терминале — не проси его написать в чат.
  3. Войди по ключу, обнови систему: `apt update && apt upgrade -y`.
  4. Создай пользователя: `adduser --disabled-password deploy`, `usermod -aG sudo deploy`,
     скопируй authorized_keys рута в /home/deploy/.ssh (права 700/600, владелец deploy).
  5. Проверь вход `ssh deploy@89.108.76.118` В ОТДЕЛЬНОМ терминале, не закрывая root-сессию.
  6. Только после успеха — в /etc/ssh/sshd_config: PasswordAuthentication no,
     PermitRootLogin prohibit-password; `systemctl restart sshd`.
  7. Заблокируй пароль root: `passwd -l root` (пароль из письма reg.ru скомпрометирован
     перепиской — он больше работать не должен).
  8. `ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable`.
  9. `apt install -y fail2ban && systemctl enable --now fail2ban`.
- Edge cases: если ssh-copy-id недоступен в Windows — используй
  `type %USERPROFILE%\.ssh\id_ed25519.pub | ssh root@89.108.76.118 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"`.
  Если после рестарта sshd сессия отвалилась и входа нет — НЕ продолжать, статус Blocked,
  у владельца есть консоль восстановления в панели reg.ru.

## Visual Guidance
- Следуй структуре SERVER_SETUP.md §1 — это эталон. Postgres/Node НЕ ставить (это TASK-011).

## Ожидания качества
- Все 4 проверки из «Цели» пройдены, вывод команд приложи в отчёт.
- Отчёт .claude/reports/REPORT_TASK-010_<дата>.md по _TEMPLATE.md (гейты сборки/линта = N/A,
  вместо них — 4 проверки доступа; поле «Следующий шаг» = TASK-011 Postgres).
- Запись в .claude/logs/CHANGELOG.md; статус TASK-010 в SPRINT.md → [x]; коммит и пуш.
- DON'T: не записывать пароли ни в какие файлы/коммиты; не ставить ничего кроме
  ufw/fail2ban; не менять порт SSH; не трогать панель reg.ru.
