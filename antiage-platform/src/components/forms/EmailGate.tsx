"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { TELEGRAM_BOT_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

interface EmailGateProps {
  quizResultId: string;
  onEmailSubmit: (email: string) => void;
  isSubmitting?: boolean;
}

export function EmailGate({ quizResultId, onEmailSubmit, isSubmitting }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Введите email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Некорректный email");
      return;
    }
    if (!consent) {
      setError("Необходимо согласие на обработку данных");
      return;
    }

    trackEvent("quiz_email_submitted");
    onEmailSubmit(email);
  }

  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full bg-teal-bg flex items-center justify-center mx-auto">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-teal">Ваши результаты готовы!</h2>
        <p className="text-text-muted text-lg">
          Куда отправить персональный отчёт?
        </p>
      </div>

      {/* Email форма */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <label htmlFor="quiz-email" className="text-sm font-medium text-text">
            Ваш email
          </label>
          <Input
            id="quiz-email"
            type="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base bg-white border-brand-soft/50 focus:border-teal-mid"
            autoComplete="email"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="quiz-consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            className="mt-0.5 data-[state=checked]:bg-teal-mid data-[state=checked]:border-teal-mid"
          />
          <label htmlFor="quiz-consent" className="text-sm text-text-muted leading-snug cursor-pointer">
            Я согласен(а) на обработку персональных данных и получение сообщений.{" "}
            <a href="/privacy" target="_blank" className="text-teal-mid underline">
              Политика конфиденциальности
            </a>
          </label>
        </div>

        {error && (
          <div role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl bg-teal-mid text-white font-semibold text-lg hover:bg-teal hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправляем..." : "Получить результаты"}
        </button>
      </form>

      {/* Разделитель */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-brand-soft/50" />
        <span className="text-sm text-text-muted">или</span>
        <div className="flex-1 h-px bg-brand-soft/50" />
      </div>

      {/* Telegram */}
      <a
        href={`${TELEGRAM_BOT_URL}?start=${quizResultId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("quiz_telegram_clicked")}
        className="flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-teal-mid text-teal-mid font-semibold text-lg hover:bg-teal-bg transition-all w-full"
      >
        <Send className="w-5 h-5" />
        Получить в Telegram
      </a>
    </div>
  );
}
