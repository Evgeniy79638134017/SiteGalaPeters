"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-cream text-center px-6">
      <h1 className="text-teal mb-4">Что-то пошло не так</h1>
      <p className="text-text-muted text-lg mb-8 max-w-md">
        Произошла ошибка. Попробуйте обновить страницу.
      </p>
      <button
        onClick={reset}
        className="h-14 px-8 bg-brand text-white rounded-xl font-semibold hover:bg-brand-light transition-colors"
      >
        Попробовать снова
      </button>
    </main>
  );
}
