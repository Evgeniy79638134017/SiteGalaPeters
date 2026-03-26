"use client";

import type { QuizQuestion as QuizQuestionType } from "@/content/quiz-questions";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: string | undefined;
  onSelect: (answerId: string) => void;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onSelect,
}: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-teal text-xl md:text-2xl">
        {question.question}
      </h2>

      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`
                relative flex items-center min-h-[64px] md:min-h-[72px] px-5 py-4
                rounded-xl border-2 text-left text-base md:text-lg
                transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-teal-mid bg-teal-bg text-teal shadow-sm scale-[1.02]"
                    : "border-brand-soft/50 bg-white text-text hover:border-teal-mid/50 hover:shadow-sm hover:-translate-y-0.5"
                }
              `}
              aria-pressed={isSelected}
            >
              <span className={`
                shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-colors
                ${isSelected ? "border-teal-mid bg-teal-mid" : "border-text-muted/30"}
              `}>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
