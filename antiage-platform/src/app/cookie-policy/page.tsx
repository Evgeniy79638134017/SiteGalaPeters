import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Политика в отношении файлов cookie",
  description:
    "Какие файлы cookie использует сайт AntiAge, зачем они нужны и как ими управлять.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-warm-bg py-16 px-6">
      <article className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-teal">Политика в отношении файлов cookie</h1>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">1. Что такое файлы cookie</h2>
          <p className="text-text-muted">
            Cookie — это небольшие текстовые файлы, которые сайт сохраняет в вашем браузере.
            Они помогают сайту работать, запоминать ваши настройки и собирать обезличенную
            статистику. Cookie не выполняют программ и не могут навредить устройству.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">2. Какие cookie мы используем сейчас</h2>
          <p className="text-text-muted">
            В настоящее время сайт использует <strong>только необходимые (технические) cookie</strong> —
            они нужны для базовой работы сайта, и по закону для них не требуется отдельное согласие:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted">
            <li>обеспечение работы и безопасности сайта (поддержание сессии, защита форм);</li>
            <li>сохранение ваших настроек, включая ваш выбор в отношении cookie.</li>
          </ul>
          <p className="text-text-muted">
            Эти cookie не идентифицируют вас как личность и не используются для рекламы или
            профилирования.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">3. Аналитика без cookie</h2>
          <p className="text-text-muted">
            Для понимания, какие страницы полезны посетителям, мы используем аналитику{" "}
            <strong>Umami</strong>. Она работает <strong>без файлов cookie</strong>, не сохраняет
            ваш IP-адрес и не идентифицирует вас. Собираются только обезличенные, агрегированные
            данные (например, количество просмотров страниц). Поэтому такая аналитика не требует
            вашего согласия.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">4. Аналитические и маркетинговые cookie</h2>
          <p className="text-text-muted">
            Аналитические и маркетинговые сервисы (например, Яндекс.Метрика, Google Analytics,
            рекламные пиксели) <strong>сейчас на сайте не активны</strong> и cookie не устанавливают.
          </p>
          <p className="text-text-muted">
            В будущем такие cookie могут использоваться <strong>только с вашего предварительного
            согласия</strong>. Если мы их подключим, перед загрузкой соответствующих скриптов вы
            увидите запрос согласия и сможете принять или отклонить эти категории; до получения
            согласия они загружаться не будут.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">5. Как управлять cookie</h2>
          <p className="text-text-muted">
            Вы можете в любой момент удалить уже сохранённые cookie и запретить их установку через
            настройки вашего браузера (раздел «Конфиденциальность» / «Cookie»). Инструкции есть в
            справке вашего браузера (Chrome, Safari, Firefox, Яндекс.Браузер и др.).
          </p>
          <p className="text-text-muted">
            Обратите внимание: отключение необходимых (технических) cookie может привести к тому,
            что часть функций сайта будет работать некорректно.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">6. Отзыв согласия</h2>
          <p className="text-text-muted">
            Согласие на необязательные cookie (когда такие появятся) можно отозвать так же просто,
            как оно было дано — изменив свой выбор или удалив cookie через настройки браузера.
            Отзыв согласия не влияет на работу необходимых cookie.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">7. Контакты и связанные документы</h2>
          <p className="text-text-muted">
            По вопросам обработки данных и использования cookie свяжитесь с оператором по адресу{" "}
            <a
              href={`mailto:${EMAIL_CONTACT}`}
              className="text-teal-mid underline hover:text-teal transition-colors"
            >
              {EMAIL_CONTACT}
            </a>
            .
          </p>
          <p className="text-text-muted">
            Как мы обрабатываем персональные данные, описано в{" "}
            <Link href="/privacy" className="text-teal-mid underline hover:text-teal transition-colors">
              Политике конфиденциальности
            </Link>
            .
          </p>
        </section>
      </article>
    </main>
  );
}
