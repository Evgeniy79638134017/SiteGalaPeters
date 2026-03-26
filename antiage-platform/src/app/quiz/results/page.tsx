import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Результаты теста",
  description: "Ваши персонализированные результаты теста на биологический возраст.",
};

export default function QuizResultsPage() {
  // Результаты показываются через QuizStepper → QuizResultsView (client-side)
  // Эта страница — fallback для прямого доступа по URL
  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-teal">Результаты теста</h1>
        <p className="text-text-muted text-lg">
          Чтобы увидеть результаты, пройдите тест.
        </p>
        <a
          href="/quiz"
          className="inline-flex h-14 items-center justify-center rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light transition-colors"
        >
          Пройти тест — 2 минуты
        </a>
      </div>
    </div>
  );
}
