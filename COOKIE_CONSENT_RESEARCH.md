# COOKIE_CONSENT_RESEARCH — Cookie-баннер и согласие: как сделать правильно

**Дата:** 11.06.2026 · Автор: Cowork (PM) · Источников: 48 (РФ-право + EU/GDPR + техническая реализация Next.js)
**Контекст сайта:** gpeters.ru — Next.js App Router, аналитика **Umami (cookieless, без cookie)**, формы уже имеют отдельный чекбокс согласия на ПДн (TASK-013), основная аудитория РФ + часть из Европы.

---

> **ОБНОВЛЕНО 11.06.2026:** владелец подтвердил планы подключить Яндекс.Метрику, Google Analytics и платное продвижение. Это переводит проект на **Вариант B** (раздел 4) — полноценный баннер с блокировкой скриптов обязателен. Раздел 0 ниже описывает «нулевую» ситуацию (только Umami); ваш фактический сценарий — раздел 4 «Вариант B».

## 0. Главный вывод за 30 секунд (если бы была только Umami)

1. **Сайт без cookie не сломается.** То, что «без cookie работает некорректно» — это *строго необходимые* cookie (сессия, авторизация, корзина, CSRF-токен). По закону РФ и ЕС они **разрешены без всякого согласия** и их **никогда не блокируют**. Баннер их не трогает.

2. **Прямо сейчас полноценный блокирующий cookie-баннер вам юридически НЕ обязателен** — потому что единственная аналитика (Umami) cookieless и не собирает персональные данные. И в РФ, и по позиции европейского регулятора (CNIL) cookieless-аналитика, как правило, баннера не требует. Достаточно **информационного уведомления** + **Политики в отношении cookie**.

3. **Полноценный баннер с блокировкой скриптов нужен будет только если вы добавите Яндекс.Метрику, рекламные пиксели VK/Mail.ru или похожие трекеры.** Тогда они = персональные данные, и нужен предварительный opt-in.

4. **Идею «галочка согласия на cookie прежде чем что-то делать на сайте» — реализовывать НЕ так, как звучит.** Блокировать пользование сайтом до принятия cookie (cookie-wall) в ЕС прямо запрещено и делает согласие недействительным. Необходимые cookie не требуют галочки вообще. Галочка нужна только для *необязательных* трекеров — и она не должна мешать человеку пользоваться сайтом.

5. **Согласие в форме (ПДн) и согласие на cookie — РАЗНЫЕ вещи.** Форму отправки заявки **нельзя** блокировать cookie-баннером. У формы свой чекбокс ПДн — он и остаётся единственным условием отправки формы.

---

## 1. Что говорит закон РФ

Отдельного «закона о cookie» в России нет, и 152-ФЗ напрямую баннер не требует. Но позиция Роскомнадзора (озвучена на «Дне открытых дверей» 01.09.2023) и судебная практика устоялись: **если cookie позволяют идентифицировать пользователя или используются за рамками базовой работы сайта (аналитика, реклама, профилирование) — они приравниваются к персональным данным, и нужно согласие, которое на практике получают через баннер** ([Б-152](https://b-152.ru/cookie-fajly-kak-personalnye-dannye), [Право.ру](https://pravo.ru/opinion/250647/)).

**Тест Роскомнадзора (два вопроса):** (1) можно ли по данным идентифицировать пользователя? (2) используются ли они за рамками предоставления услуги (анализ поведения, реклама)? Если хотя бы один ответ «да» — это ПДн и нужно согласие.

- **Cookie = ПДн (нужно согласие):** Яндекс.Метрика, VK Pixel, рекламные/ретаргетинг-cookie, постоянные идентификаторы (UID), сторонние cookie. Даже связка cookie + IP без email/телефона уже трактуется как ПДн ([crmlove](https://crmlove.ru/blog/sbor-cookie-420fz)).
- **Cookie ≠ согласие (но информировать обязательно):** авторизация, корзина, CSRF, сессионные cookie. Основание — исполнение договора (п. 5 ч. 1 ст. 6 152-ФЗ) ([habr](https://habr.com/ru/articles/955092/)).

**Свежие изменения и штрафы (важно):**
- **С 30 мая 2025** (ФЗ № 420-ФЗ) резко выросли штрафы по ст. 13.11 КоАП: обработка без оснований — для юрлиц 150–300 тыс ₽ (повтор 300–500 тыс); неуведомление РКН — 100–300 тыс ₽; утечки — от 3 млн до 15 млн ₽; повторная утечка — **оборотный штраф 1–3% выручки**. Отменена 50%-я скидка за быструю уплату ([КонсультантПлюс](https://www.consultant.ru/legalnews/28492/)).
- **С 1 сентября 2025** согласие на обработку ПДн должно быть **отдельным документом** — нельзя «вшивать» его в оферту/заявку, нельзя объединять разные согласия, нельзя обуславливать пользование сайтом обязательной галочкой. Нарушение оформления — 300–700 тыс ₽ ([Гарант](https://www.garant.ru/article/1862510/), [roskom.online](https://roskom.online/articles/chto-izmenilos-s-1-sentyabrya-v-soglasiyah-na-obrabotku-pd/)).

**Что это значит для вас:** так как у вас Umami (cookieless, без идентификации) — по тесту РКН ПДн через cookie не собираются → **баннер строго не требуется**. Но **Политика в отношении cookie / упоминание в Политике конфиденциальности обязательны** (информирование о технических cookie). Если позже включите Метрику — согласие на неё придётся оформлять по новым правилам (отдельно, явно, до загрузки скрипта).

## 2. Что говорит ЕС (для европейских посетителей)

Европа строже России. Связка **ePrivacy Directive (ст. 5(3)) + GDPR**: на любые cookie, **кроме строго необходимых, нужен предварительный явный opt-in ДО их установки** ([GDPR.eu](https://gdpr.eu/cookies/), [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)).

Требования к баннеру в ЕС (из отчёта EDPB Cookie Banner Taskforce, 2023):
- равноправные кнопки **«Принять» / «Отклонить» на первом экране** (одинаковый размер/контраст);
- **никаких предустановленных галочек** (дело Planet49, CJEU);
- **запрет cookie-walls** — нельзя блокировать сайт до принятия необязательных cookie;
- гранулярность по категориям (отдельные тумблеры);
- отзыв согласия так же просто, как дача (постоянная ссылка «Настройки cookie»).

**Ключевое отличие от РФ:** в ЕС формулировка «продолжая пользоваться сайтом, вы соглашаетесь» (implied consent) **недействительна**. В РФ она на практике встречается, но для EU-аудитории недопустима.

**Штрафы GDPR за cookie реальны и крупные:** Google €60M+€40M+€150M, Amazon €35M, Microsoft €60M, Criteo €40M — преимущественно за отсутствие простой кнопки «Отклонить» и трекинг без согласия ([Hunton](https://www.hunton.com/privacy-and-information-security-law/cnil-fines-google-and-amazon-135-million-euros-for-alleged-cookie-violations), [CookieYes](https://www.cookieyes.com/blog/cookie-consent-fines/)).

**Смешанная аудитория РФ+ЕС:** безопаснее принять **EU-стандарт opt-in как базовый** (он автоматически покрывает и РФ), либо геотаргетировать баннер по стране со строгим вариантом по умолчанию. Но это актуально, **только если появятся cookie-трекеры**.

**Cookieless-аналитика и ЕС:** CNIL прямо допускает работу аналитики **без согласия** при условии анонимности, агрегирования, отсутствия рекламы и передачи третьим лицам ([CNIL Sheet n°16](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications)). Plausible/Umami не ставят cookie и не хранят IP → **баннер, как правило, не нужен** ([Plausible](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)). Оговорка: Германия и Италия трактуют строже.

## 3. Техника: как сделать рабочий баннер и НЕ сломать сайт

Главный принцип всех технических источников: **баннер сам по себе не делает сайт соответствующим закону — соответствие даёт блокировка скриптов на рантайме до согласия** ([dev.to/auditzo](https://dev.to/auditzo/gdpr-cookie-consent-in-2026-its-a-runtime-problem-not-a-banner-problem-4fok)).

**3.1. Необходимые cookie никогда не блокируются** — поэтому сайт не ломается. В конфиге они помечаются «всегда вкл, нельзя выключить»:
```js
categories: {
  necessary: { enabled: true, readOnly: true }, // сессия, авторизация, CSRF — всегда работают
  analytics: {},                                  // только после согласия
  ads: {}
}
```

**3.2. Блокировка трекеров до согласия** (нужна, только если добавите Метрику/пиксели). Два паттерна:
- Декларативно: `<script type="text/plain" data-category="analytics">` — браузер не исполняет код, пока категория не разблокирована ([orestbida](https://cookieconsent.orestbida.com/advanced/manage-scripts.html)).
- В React: монтировать `next/script` только при согласии (`strategy="afterInteractive"`, **не** `beforeInteractive`), либо вызывать `ym(ID,'init')` в колбэке `onConsent`. Официально Яндекс: «без согласия сниппет не загрузится» ([Yandex Metrica](https://yandex.com/support/metrica/en/general/notification.html)).

**3.3. Хранение выбора:** сам «cookie согласия» — строго необходимый, его исключают из согласия. Хранить можно в cookie (тогда читается на сервере без «мигания» баннера) или localStorage. Срок переспроса — 6–12 мес (orestbida по умолчанию 182 дня).

**3.4. Без мигания/hydration-ошибок:** баннер рендерить после mount (`useEffect` → `mounted`), либо читать cookie через `next/headers` на сервере ([Next.js docs](https://nextjs.org/docs/messages/react-hydration-error)).

**3.5. Библиотека (если понадобится):** **vanilla-cookieconsent (orestbida)** — бесплатно, MIT, self-hosted, умеет реальную блокировку скриптов, категории, лог согласий. Альтернатива `react-cookie-consent` — только UI, блокировку пишете сами. CookieYes/Cookiebot — внешний SaaS, частично платный.

**3.6. Связь с формами — НЕ блокировать форму баннером.** Согласие на ПДн (чекбокс в форме) и cookie-согласие независимы. Ставить отправку формы в зависимость от принятия cookie нельзя — это «принуждение», делает согласие недействительным ([transcend.io](https://transcend.io/blog/cookie-banner-101)). Форма работает всегда; её собственный чекбокс ПДн — единственное условие отправки.

---

## 4. Конкретный план для gpeters.ru

### Вариант A — сейчас (рекомендуется): только Umami, баннер не обязателен

1. Добавить страницу **«Политика в отношении файлов cookie»** (или раздел в Политике конфиденциальности): какие cookie используются (только технические/необходимые), что аналитика Umami работает без cookie и не идентифицирует пользователя, права пользователя, контакты оператора.
2. Показать **ненавязчивое информационное уведомление** один раз: «Сайт использует только технические файлы cookie, необходимые для его работы. Подробнее — в Политике в отношении cookie». Кнопка «Понятно». Без блокировки сайта, без блокировки форм.
3. Форму **не трогать** — её чекбокс ПДн уже корректен (TASK-013).

> Это закрывает РФ-требование информирования и безопасно для европейских посетителей, потому что cookieless-аналитика согласия не требует.

### Вариант B — ВЫБРАННЫЙ ПУТЬ (планируются Яндекс.Метрика + Google Analytics + продвижение)

> **Решение владельца (11.06.2026):** Метрика, Google Analytics и продвижение в Яндекс/Google точно будут. Значит баннер с блокировкой скриптов — **обязателен**. Информационного уведомления (Вариант A) уже недостаточно: оба счётчика ставят cookie, профилируют пользователя и работают на рекламу → это персональные данные. Для РФ нужно согласие, для EU-аудитории — предварительный opt-in.

#### ⚠️ Отдельная проблема: Google Analytics и локализация ПДн (152-ФЗ)

Это **не про баннер, а про другой закон** — но критично для вашего плана. По ст. 18.5 152-ФЗ первичный сбор ПДн граждан РФ должен идти в базу **на территории РФ**. Google Analytics передаёт данные (включая cookie + IP, которые РКН трактует как ПДн) на серверы Google **за рубежом**. Именно за это РКН штрафовал и блокировал зарубежные сервисы (см. кейсы Spotify, Match Group в разделе 1). Использование GA для российской аудитории — **зона повышенного риска** по локализации, отдельная от вопроса cookie-согласия.

- **Яндекс.Метрика** — данные в РФ, под локализацию подходит. Безопасный основной счётчик.
- **Google Analytics 4** — данные за рубежом. Юридически рискованно для РФ-аудитории; плюс Google свернул рекламные продажи в РФ. Рекомендация: либо отказаться от GA для РФ-трафика, либо подключать только под отдельным юр-ревью и осознанным риском. **Вынести на юр-гейт −1.4.**
- **Umami** оставить — он закрывает реальную продуктовую аналитику без юр-рисков; Метрика/GA нужны в основном под рекламные кабинеты и SEO-инструменты (Вебмастер/Search Console — это отдельные сервисы, cookie на ваш сайт не ставят, согласия не требуют).

#### Полноценный CMP (механика):
1. Подключить **vanilla-cookieconsent (orestbida)**: категории `necessary (readOnly) + analytics + ads`.
2. Метрику/пиксели грузить **только после согласия** (`type="text/plain" data-category="analytics"` или init в `onConsent`).
3. Баннер: равноправные «Принять» / «Отклонить» + «Настройки» (под EU-стандарт, он же покрывает РФ); постоянная ссылка «Настройки cookie» в футере для отзыва.
4. Согласие — отдельно от формы; форму по-прежнему **не блокировать**.
5. Согласие на Метрику оформить как отдельный документ/текст (требование РФ с 01.09.2025).

---

## 5. Разбор вашего исходного вопроса по пунктам

| Ваша формулировка | Как правильно |
|---|---|
| «сайт без cookie работает некорректно» | Это необходимые cookie (сессия/авторизация/CSRF). Они **всегда разрешены без согласия** и никогда не блокируются — сайт не сломается. |
| «обязательно поставить галочку согласия, прежде чем что-то делать на сайте» | Так делать **нельзя** (cookie-wall запрещён в ЕС, и не нужен для необходимых cookie). Галочка/кнопка нужна только для *необязательных* трекеров и не должна мешать пользоваться сайтом. |
| «мы смотрим cookie и записываем» | Если «смотрим и записываем» = аналитика/реклама → это ПДн, нужен предварительный opt-in. Но у вас Umami — он ничего идентифицирующего не пишет, поэтому согласие не требуется. |
| «должно реально работать» | «Реально работает» = блокировка необязательных скриптов до согласия (рантайм), а не просто показ баннера. Сейчас блокировать нечего (Umami cookieless). |
| связать с формами | Форму **не** блокировать баннером. Cookie-согласие и согласие-ПДн в форме — независимы. |

---

## 6. Источники (48)

### РФ-право (14)
1. [Гарант — Согласие на обработку ПДн с 1 сентября 2025](https://www.garant.ru/article/1862510/)
2. [КонсультантПлюс — Новые штрафы за ПДн с 30 мая 2025](https://www.consultant.ru/legalnews/28492/)
3. [КонсультантПлюс — Подборка «Файлы cookie / персональные данные»](https://www.consultant.ru/law/podborki/fajly_cookie_personalnye_dannye/)
4. [Б-152 — Cookie-файлы как персональные данные](https://b-152.ru/cookie-fajly-kak-personalnye-dannye)
5. [Право.ру — Файлы cookie и персональные данные](https://pravo.ru/opinion/250647/)
6. [IC-TECH — Нужно ли отдельное окно/баннер о согласии на cookie](https://ic-tech.ru/blog/faq/questions-152fz-site/nuzhno-li-na-sayte-razmeschat-otdelnoe-okno-banner-o-soglasii-na-cookie-ili-dostatochno-teksta-v-politike-konfidentsialnosti/)
7. [Habr — Согласие на обработку ПДн: где обязательно, где нет](https://habr.com/ru/articles/955092/)
8. [crmlove — Сбор cookie в 2025: правила 420-ФЗ](https://crmlove.ru/blog/sbor-cookie-420fz)
9. [Яндекс — Условия использования Яндекс Метрики](https://yandex.ru/legal/metrica_termsofuse/ru/)
10. [nashe.online — Согласие на обработку ПДн через Яндекс.Метрику](https://nashe.online/soglasie-na-obrabotku-personalnykh-dannykh-s-pomoshchyu-servisa-yandeks-metrika/)
11. [Umami — Privacy-Focused Web Analytics](https://umami.is/)
12. [SelfOps — Umami](https://selfops.ru/Umami)
13. [roskom.online — Что изменилось с 1 сентября в согласиях на ПДн](https://roskom.online/articles/chto-izmenilos-s-1-sentyabrya-v-soglasiyah-na-obrabotku-pd/)
14. [traff-agency — Юридическая безопасность сайта: ФЗ-152, cookie](https://traff-agency.ru/blog/yuridicheskaya-bezopasnost-sajta-fz-152-o-personalnyh-dannyh-cookie-i-soglasiya-na-reklamu-kak-ne-popast-na-shtraf)

### EU / GDPR (18)
15. [GDPR.eu — Cookies, the GDPR, and the ePrivacy Directive](https://gdpr.eu/cookies/)
16. [ICO — Cookies and similar technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)
17. [EDPB — Report of the Cookie Banner Taskforce (2023)](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)
18. [EDPB — Guidelines 05/2020 on consent](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf)
19. [EDPB — Guidelines 2/2023 on Art. 5(3) ePrivacy](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)
20. [Bird & Bird — Planet49: CJEU on Cookie Consent](https://www.twobirds.com/en/insights/2019/global/planet49-cjeu-rules-on-cookie-consent)
21. [Osborne Clarke — Planet49 consent requirements](https://www.osborneclarke.com/insights/planet49-cjeu-rules-consent-requirements-cookies)
22. [WSGR Data Advisor — EDPB Guidance on Cookie Banners](https://www.wsgrdataadvisor.com/2023/03/edpb-issues-guidance-on-cookie-banners/)
23. [Preiskel & Co — EU Requirements for Cookie Banners](https://www.preiskel.com/general-eu-requirements-for-cookie-banners-eu-edpb-task-force-report/)
24. [Cookiebot — EDPB Guidelines on Cookie Walls](https://www.cookiebot.com/en/edpb-guidelines/)
25. [CNIL — Sheet n°16: Analytics on websites](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications)
26. [Plausible — GDPR-compliant analytics without consent](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)
27. [Hunton — CNIL Fines Google and Amazon €135M](https://www.hunton.com/privacy-and-information-security-law/cnil-fines-google-and-amazon-135-million-euros-for-alleged-cookie-violations)
28. [CookieYes — Companies Hit With Cookie Consent Fines](https://www.cookieyes.com/blog/cookie-consent-fines/)
29. [Matomo — CNIL enforcement, cookie regulation 2025](https://matomo.org/blog/2025/09/cookie-regulation-cnil/)
30. [CookieYes — Geo-targeting cookie banner](https://www.cookieyes.com/blog/geo-targeting-banner/)
31. [Securiti — Consent Requirements in Russia (152-FZ)](https://securiti.ai/blog/consent-requirements-russia/)
32. [Mondaq — GDPR v. Russian Law on Personal Data](https://www.mondaq.com/russianfederation/privacy-protection/1510540/comparing-privacy-laws-gdpr-v-russian-law-on-personal-data)

### Техническая реализация (16)
33. [Cookiebot — Cookiebot CMP в Next.js App Router](https://support.cookiebot.com/hc/en-us/articles/27408568285212-Implementing-Cookiebot-CMP-in-a-Next-js-site-App-Router)
34. [orestbida — vanilla-cookieconsent Getting Started](https://cookieconsent.orestbida.com/essential/getting-started.html)
35. [orestbida — How to manage scripts](https://cookieconsent.orestbida.com/advanced/manage-scripts.html)
36. [dev.to/auditzo — GDPR Cookie Consent 2026: Runtime Problem](https://dev.to/auditzo/gdpr-cookie-consent-in-2026-its-a-runtime-problem-not-a-banner-problem-4fok)
37. [dev.to/shieldstring — Cookie Consent in Next.js](https://dev.to/shieldstring/how-to-handle-cookie-consent-in-any-nextjs-app-1ej4)
38. [Next.js docs — Hydration error](https://nextjs.org/docs/messages/react-hydration-error)
39. [LogRocket — Resolving hydration mismatch in Next.js](https://blog.logrocket.com/resolving-hydration-mismatch-errors-next-js/)
40. [TutoriaLibre — Fix Next.js Hydration & Theme Flash](https://tutorialibre.com/blog/theme-preferences-nextjs-hydration-errors/)
41. [Clym — Cookies, Local/Session Storage & Privacy Law](https://www.clym.io/blog/what-are-cookies-local-storage-and-session-storage-from-a-privacy-law-perspective)
42. [Yandex Metrica — Notice about collecting statistics](https://yandex.com/support/metrica/en/general/notification.html)
43. [Umami — GDPR Compliant Website Analytics](https://umami.is/blog/gdpr-compliant-website-analytics)
44. [PostHog — Best GDPR-compliant analytics tools](https://posthog.com/blog/best-gdpr-compliant-analytics-tools)
45. [TermsFeed — Analytics Tools and GDPR Consent](https://www.termsfeed.com/blog/analytics-tools-gdpr-consent/)
46. [Transcend — Cookie Banner 101](https://transcend.io/blog/cookie-banner-101)
47. [Secure Privacy — Cookie Banner UI/UX Best Practices](https://secureprivacy.ai/blog/cookie-banner-ui-ux-best-practices)
48. [npm — vanilla-cookieconsent](https://www.npmjs.com/package/vanilla-cookieconsent)

---

**Дисклеймер:** материал основан на открытых источниках 2023–2026 гг. и не является юридической консультацией. Перед запуском платного продвижения тексты согласий и политику cookie стоит проверить у профильного юриста/DPO (см. юр-гейт −1.4 в PROJECT_STATUS.md).
