import Link from "next/link";
import { Brain } from "lucide-react";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export function QuizCTA() {
  return (
    <section className="bg-teal-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <AnimateOnScroll className="flex justify-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-teal-soft/40 flex items-center justify-center">
              <Brain className="w-16 h-16 md:w-20 md:h-20 text-teal-mid" strokeWidth={1.5} />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.15} className="space-y-5">
            <h2 className="text-teal">
              Узнайте ваш биологический возраст
            </h2>
            <ul className="space-y-3 text-text-muted text-lg">
              {[
                "Оценка энергии и здоровья",
                "Персональные рекомендации",
                "Подбор программы именно для вас",
              ].map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-teal-mid/20 flex items-center justify-center text-teal-mid text-sm">
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <Link
              href="/quiz"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-teal-mid px-8 text-white font-semibold text-lg hover:bg-teal hover:scale-[1.02] transition-all"
            >
              Начать тест — 2 минуты
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
