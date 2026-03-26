import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных на сайте AntiAge.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-warm-bg py-16 px-6">
      <article className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-teal">Политика конфиденциальности</h1>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">1. Какие данные мы собираем</h2>
          <p className="text-text-muted">
            При использовании сайта мы можем собирать следующие персональные данные:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-text-muted">
            <li>Имя и адрес электронной почты (при заполнении форм)</li>
            <li>Имя пользователя Telegram (при выборе получения результатов в Telegram)</li>
            <li>Номер телефона (при подаче заявки на партнёрство)</li>
            <li>Ответы на вопросы квиза «Биологический возраст»</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">2. Зачем мы собираем данные</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted">
            <li>Отправка персонализированных результатов квиза</li>
            <li>Рассылка полезных материалов по теме anti-age</li>
            <li>Обработка заявок на партнёрство</li>
            <li>Ответы на обращения через форму обратной связи</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">3. Как мы храним данные</h2>
          <p className="text-text-muted">
            Данные хранятся в защищённой базе данных PostgreSQL. Доступ к данным
            имеют только авторизованные сотрудники.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">4. Передача третьим лицам</h2>
          <p className="text-text-muted">
            Мы используем сервис Resend для отправки электронных писем и Telegram
            Bot API для отправки результатов в Telegram. Мы не продаём и не
            передаём ваши данные другим третьим лицам.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">5. Ваши права</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-muted">
            <li>Вы можете отписаться от рассылки в любой момент</li>
            <li>Вы можете запросить удаление ваших данных</li>
            <li>Вы можете запросить копию ваших данных</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-teal">6. Контакты</h2>
          <p className="text-text-muted">
            По вопросам обработки персональных данных свяжитесь с нами через
            раздел «Контакты» на сайте.
          </p>
        </section>
      </article>
    </main>
  );
}
