# PROMPT_077_moscow_first_geo

## Контекст
TASK-077 (ФИКС регрессии). После TASK-075/076 видео в РФ грузится плохо: источник
СТАРТУЕТ с Vercel (`VIDEO_CDN_URL` = gala-antiage.vercel.app), а Vercel в России
ЗАБЛОКИРОВАН. Каждый РФ-посетитель (основная аудитория) сначала упирается в
заблокированный Vercel, ждёт таймаут 2.5с, потом фолбэк на Москву — задержка/«висит»,
иногда видео не появляется. Нужно перевернуть логику: по умолчанию Москва (работает для
всех, мгновенна в РФ), Vercel — только для зарубежных пользователей. Прочитай: CLAUDE.md,
src/components/sections/Hero.tsx, src/lib/constants.ts (VIDEO_CDN_URL, VIDEO_ORIGIN_URL),
.claude/reports/REPORT_TASK-075/076.

## Цель
РФ-аудитория получает Москву сразу (без штрафа), зарубежная — Vercel с фолбэком на Москву.
Готово =
(1) выбор НАЧАЛЬНОГО источника по часовому поясу браузера:
    `Intl.DateTimeFormat().resolvedOptions().timeZone`. Если таймзона российская/CIS
    (список ниже) → стартуем с Москвы (VIDEO_ORIGIN_URL), Vercel НЕ трогаем;
    иначе → стартуем с Vercel (VIDEO_CDN_URL), при таймауте/ошибке → фолбэк на Москву
    (как в TASK-075);
(2) если таймзону определить нельзя → дефолт Москва (безопасно);
(3) РФ-кейс: видео грузится с Москвы сразу, БЕЗ обращения к заблокированному Vercel и
    без 2.5с задержки;
(4) зарубежный кейс: Vercel-first → фолбэк на Москву сохранён;
(5) постер/lazy/reduced-motion/saveData и условие из TASK-076 (3g не блокируем) — без изменений;
(6) lint/tsc/build зелёные; на проде: при РФ-таймзоне `document.querySelector('video').currentSrc`
    указывает на /media (Москва) сразу; видео играет.

## Вайб
Точечно: добавить определение «РФ/CIS таймзона» и выбрать стартовый src. Остальную логику
Hero (фолбэк, таймаут, постер, lazy) не ломать.

## Технические параметры
- cwd antiage-platform/. Список РФ/CIS таймзон (helper `isRuLikeTimeZone()`), напр.:
  начинается с "Europe/Moscow","Europe/Kaliningrad","Europe/Samara","Europe/Volgograd",
  "Europe/Astrakhan","Europe/Saratov","Europe/Ulyanovsk","Europe/Kirov",
  "Asia/Yekaterinburg","Asia/Omsk","Asia/Novosibirsk","Asia/Barnaul","Asia/Tomsk",
  "Asia/Novokuznetsk","Asia/Krasnoyarsk","Asia/Irkutsk","Asia/Chita","Asia/Yakutsk",
  "Asia/Khandyga","Asia/Vladivostok","Asia/Ust-Nera","Asia/Magadan","Asia/Sakhalin",
  "Asia/Srednekolymsk","Asia/Kamchatka","Asia/Anadyr",
  плюс CIS по желанию ("Asia/Almaty","Asia/Tashkent","Europe/Minsk","Asia/Tbilisi","Asia/Yerevan","Asia/Baku").
  Сравнение точное по множеству (Set), без эвристик по языку (navigator.language ненадёжен).
- Стартовый src выставляется там же, где сейчас `setVideoSrc(VIDEO_CDN_URL)` — заменить на
  выбор по таймзоне. Гард switchedRef и фолбэк не трогать (фолбэк на Москву остаётся для
  зарубежной ветки; для РФ-ветки мы и так на Москве).

## Ожидания качества
- Отчёт REPORT_TASK-077: как определяется таймзона, какой src выбирается для РФ vs зарубеж,
  подтверждение, что при РФ-таймзоне currentSrc=/media сразу (без запроса к vercel.app).
  CHANGELOG, SPRINT → [x], коммит/пуш.
- DON'T: не убирать фолбэк на Москву; не трогать постер/lazy/reduced-motion/3g-фикс;
  не использовать navigator.language как основной признак.
