"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitPartner } from "@/actions/submitPartner";
import { trackEvent } from "@/lib/analytics";

type FormStep = 1 | 2;

export function PartnerForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [consent, setConsent] = useState(false);

  function handleNextStep() {
    setError("");
    if (!name.trim()) { setError("Введите имя"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Введите корректный email"); return; }
    trackEvent("partner_form_step_2");
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!consent) { setError("Необходимо согласие на обработку данных"); return; }

    setIsSubmitting(true);
    trackEvent("partner_form_submitted");

    const result = await submitPartner({ name, email, telegram, phone, about });

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-10">
        <div className="w-16 h-16 rounded-full bg-teal-bg flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-teal-mid" />
        </div>
        <h3 className="text-teal">Спасибо за заявку!</h3>
        <p className="text-text-muted text-lg max-w-md mx-auto">
          Мы свяжемся с вами в течение 24 часов. А пока — подписывайтесь на наш Telegram-канал.
        </p>
        <a
          href="https://t.me/antiage_channel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center rounded-xl bg-teal-mid px-8 text-white font-semibold hover:bg-teal transition-colors"
        >
          Подписаться в Telegram
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      {/* Прогресс */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-text-muted">
          <span>Шаг {step} из 2</span>
        </div>
        <Progress value={step === 1 ? 50 : 100} className="h-2 bg-brand-soft/30 [&>div]:bg-brand [&>div]:transition-all" />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="partner-name" className="text-sm font-medium text-text">Ваше имя *</label>
            <Input
              id="partner-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как вас зовут?"
              className="h-12 text-base bg-white border-brand-soft/50 focus:border-brand"
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="partner-email" className="text-sm font-medium text-text">Email *</label>
            <Input
              id="partner-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.ru"
              className="h-12 text-base bg-white border-brand-soft/50 focus:border-brand"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="partner-telegram" className="text-sm font-medium text-text">Telegram</label>
            <Input
              id="partner-telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
              className="h-12 text-base bg-white border-brand-soft/50 focus:border-brand"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="partner-phone" className="text-sm font-medium text-text">Телефон</label>
            <Input
              id="partner-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="h-12 text-base bg-white border-brand-soft/50 focus:border-brand"
              autoComplete="tel"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="partner-about" className="text-sm font-medium text-text">Расскажите о себе</label>
            <Textarea
              id="partner-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Чем занимаетесь? Почему интересует anti-age?"
              className="min-h-28 text-base bg-white border-brand-soft/50 focus:border-brand resize-none"
              rows={4}
            />
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="partner-consent"
              checked={consent}
              onCheckedChange={(c) => setConsent(c === true)}
              className="mt-0.5 data-[state=checked]:bg-brand data-[state=checked]:border-brand"
            />
            <label htmlFor="partner-consent" className="text-sm text-text-muted leading-snug cursor-pointer">
              Я согласен(а) на обработку персональных данных и получение сообщений.{" "}
              <a href="/privacy" target="_blank" className="text-teal-mid underline">
                Политика конфиденциальности
              </a>
            </label>
          </div>
        </div>
      )}

      {error && (
        <div role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
          {error}
        </div>
      )}

      {/* Навигация */}
      <div className="flex gap-3">
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 h-14 rounded-xl border-2 border-brand-soft text-text-muted font-semibold hover:bg-brand-soft/20 transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        )}
        {step === 1 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full h-14 rounded-xl bg-brand text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.01] transition-all inline-flex items-center justify-center gap-2"
          >
            Далее <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-14 rounded-xl bg-brand text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.01] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </button>
        )}
      </div>
    </form>
  );
}
