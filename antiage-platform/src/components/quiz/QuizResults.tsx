"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { calculateBioAge } from "@/lib/quiz-logic";
import type { QuizResultData } from "@/lib/quiz-logic";
import { EmailGate } from "@/components/forms/EmailGate";
import { trackEvent } from "@/lib/analytics";
import { FlaskConical, Activity, Brain, ArrowRight } from "lucide-react";

const PILLAR_META = {
  biochemistry: {
    title: "Биохимия тела",
    Icon: FlaskConical,
    color: "text-teal-mid",
    bg: "bg-teal-bg",
    href: "/programs/biochemistry",
  },
  biomechanics: {
    title: "Биомеханика",
    Icon: Activity,
    color: "text-brand",
    bg: "bg-brand-bg",
    href: "/programs/biomechanics",
  },
  bioenergy: {
    title: "Биоэнергетика",
    Icon: Brain,
    color: "text-teal-light",
    bg: "bg-teal-bg",
    href: "/programs/bioenergy",
  },
} as const;

interface QuizResultsViewProps {
  answers: Record<string, string>;
}

export function QuizResultsView({ answers }: QuizResultsViewProps) {
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const result: QuizResultData = useMemo(() => calculateBioAge(answers), [answers]);
  const quizResultId = useMemo(() => crypto.randomUUID(), []);

  const pillar = PILLAR_META[result.pillarPriority];

  async function handleEmailSubmit(email: string) {
    setIsSubmitting(true);
    try {
      // TODO: вызвать Server Action submitQuiz
      // Пока просто открываем результаты
      console.log("Quiz submit:", { email, result, answers });
      trackEvent("quiz_result_viewed");
      setGateUnlocked(true);
    } catch {
      console.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Gate — email/Telegram
  if (!gateUnlocked) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <EmailGate
          quizResultId={quizResultId}
          onEmailSubmit={handleEmailSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }

  // Результаты
  const scalePercent = Math.max(0, Math.min(100, ((result.bioAge - (result.realAge - 10)) / 20) * 100));

  const riskColors = {
    green: { bar: "bg-emerald-500", text: "text-emerald-700", label: "Отлично! Вы моложе своего возраста" },
    yellow: { bar: "bg-amber-400", text: "text-amber-700", label: "Хорошо, но есть потенциал для улучшения" },
    orange: { bar: "bg-orange-500", text: "text-orange-700", label: "Внимание! Пора действовать" },
  };
  const risk = riskColors[result.riskLevel];

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Визуальная шкала */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
        <h2 className="text-center text-teal">Ваш результат</h2>

        <div className="flex justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-sm text-text-muted mb-1">Паспортный возраст</div>
            <div className="font-heading text-4xl md:text-5xl font-bold text-text">
              {result.realAge}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-muted mb-1">Биологический возраст</div>
            <div className={`font-heading text-4xl md:text-5xl font-bold ${risk.text}`}>
              {result.bioAge}
            </div>
          </div>
        </div>

        {/* Шкала */}
        <div className="space-y-2">
          <div className="relative h-4 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${risk.bar} transition-all duration-1000`}
              style={{ width: `${scalePercent}%` }}
            />
          </div>
          <p className={`text-center text-sm font-medium ${risk.text}`}>
            {risk.label}
          </p>
        </div>

        {result.delta !== 0 && (
          <p className="text-center text-text-muted">
            {result.delta < 0
              ? `Ваш организм на ${Math.abs(result.delta)} лет моложе паспортного возраста!`
              : `Ваш организм старше паспортного возраста на ${result.delta} лет`}
          </p>
        )}
      </div>

      {/* Приоритетный "кит" */}
      <div className={`${pillar.bg} rounded-2xl p-6 md:p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center`}>
            <pillar.Icon className={`w-6 h-6 ${pillar.color}`} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-sm text-text-muted">Ваш приоритет</div>
            <div className="font-heading text-xl font-bold text-text">{pillar.title}</div>
          </div>
        </div>
        <Link
          href={pillar.href}
          className={`inline-flex items-center gap-2 ${pillar.color} font-medium hover:underline`}
        >
          Подробнее о программе <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Рекомендации */}
      <div className="space-y-4">
        <h3 className="text-center">Ваши персональные рекомендации</h3>
        {result.recommendations.map((rec, i) => {
          const meta = PILLAR_META[rec.pillar];
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex gap-4">
              <div className={`shrink-0 w-10 h-10 rounded-lg ${meta.bg} flex items-center justify-center`}>
                <meta.Icon className={`w-5 h-5 ${meta.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-semibold text-text mb-1">{rec.title}</div>
                <p className="text-text-muted text-[15px] leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/contacts"
          onClick={() => trackEvent("quiz_cta_clicked", { type: "consultation" })}
          className="inline-flex h-14 items-center justify-center rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
        >
          Записаться на консультацию
        </Link>
        <a
          href="https://t.me/antiage_channel"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("quiz_cta_clicked", { type: "telegram" })}
          className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-teal-mid px-8 text-teal-mid font-semibold text-lg hover:bg-teal-bg transition-all"
        >
          В Telegram за советами
        </a>
      </div>
    </div>
  );
}
