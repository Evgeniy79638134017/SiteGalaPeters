"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { quizQuestions } from "@/content/quiz-questions";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResultsView } from "./QuizResults";
import { trackEvent } from "@/lib/analytics";
import { ArrowLeft } from "lucide-react";

type QuizState = "quiz" | "results";

export function QuizStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, setState] = useState<QuizState>("quiz");
  const shouldReduceMotion = useReducedMotion();

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  const handleSelect = useCallback(
    (answerId: string) => {
      const questionId = currentQuestion.id;
      setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
      trackEvent(`quiz_step_${currentStep + 1}`);

      // Автопереход с задержкой
      setTimeout(() => {
        if (isLastStep) {
          trackEvent("quiz_completed");
          setState("results");
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }, 300);
    },
    [currentStep, currentQuestion.id, isLastStep]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  if (state === "results") {
    return <QuizResultsView answers={answers} />;
  }

  const variants = {
    enter: { opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -40 },
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Прогресс */}
      <QuizProgress currentStep={currentStep + 1} totalSteps={totalSteps} />

      {/* Вопрос с анимацией */}
      <div className="mt-8 min-h-90 md:min-h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial={shouldReduceMotion ? false : "enter"}
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <QuizQuestion
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onSelect={handleSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="mt-6 flex items-center justify-between">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 h-12 px-5 rounded-xl text-text-muted hover:text-text hover:bg-brand-soft/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
        ) : (
          <div />
        )}
        <p className="text-sm text-text-muted">
          Выберите один вариант
        </p>
      </div>

      {/* Trust */}
      <div className="mt-10 text-center">
        <p className="text-sm text-text-muted/60">
          Тест прошли <span className="font-semibold text-text-muted">2000+</span> женщин
        </p>
      </div>
    </div>
  );
}
