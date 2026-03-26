import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream text-center px-6">
      <h1 className="text-teal mb-4">Страница не найдена</h1>
      <p className="text-text-muted text-lg mb-8 max-w-md">
        Возможно, страница была перемещена или удалена.
        Попробуйте начать с главной или пройти наш тест.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="h-14 px-8 bg-brand text-white rounded-xl font-semibold hover:bg-brand-light transition-colors inline-flex items-center"
        >
          На главную
        </Link>
        <Link
          href="/quiz"
          className="h-14 px-8 border-2 border-teal-mid text-teal-mid rounded-xl font-semibold hover:bg-teal-bg transition-colors inline-flex items-center"
        >
          Пройти тест
        </Link>
      </div>
    </main>
  );
}
