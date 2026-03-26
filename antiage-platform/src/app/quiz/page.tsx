import type { Metadata } from "next";
import { QuizStepper } from "@/components/quiz/QuizStepper";

export const metadata: Metadata = {
  title: "Тест: Ваш биологический возраст",
  description:
    "Пройдите тест из 7 вопросов и узнайте свой биологический возраст. Получите персональные рекомендации по anti-age.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 md:py-16">
        <QuizStepper />
      </div>
    </div>
  );
}
