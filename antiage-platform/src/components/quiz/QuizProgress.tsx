"use client";

import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-text-muted">
          Шаг {currentStep} из {totalSteps}
        </span>
        <span className="text-teal-mid font-medium">{percent}%</span>
      </div>
      <Progress value={percent} className="h-2.5 bg-brand-soft/30 [&>div]:bg-teal-mid [&>div]:transition-all [&>div]:duration-500" />
    </div>
  );
}
