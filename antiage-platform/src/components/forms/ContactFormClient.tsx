"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";
import { postJson } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

export function ContactFormClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Введите имя"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Введите корректный email"); return; }
    if (!message.trim()) { setError("Введите сообщение"); return; }
    if (!consent) { setError("Необходимо согласие на обработку данных"); return; }

    setIsSubmitting(true);
    trackEvent("contact_form_submitted");
    const result = await postJson("/api/contact", { name, email, message });

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 rounded-full bg-teal-bg flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-teal-mid" />
        </div>
        <h3 className="text-teal">Сообщение отправлено!</h3>
        <p className="text-text-muted">Мы ответим в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-text">Ваше имя</label>
        <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как вас зовут?" className="h-12 text-base bg-white border-brand-soft/50 focus:border-teal-mid" autoComplete="name" />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-text">Email</label>
        <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.ru" className="h-12 text-base bg-white border-brand-soft/50 focus:border-teal-mid" autoComplete="email" />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-text">Сообщение</label>
        <Textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ваш вопрос или сообщение..." className="min-h-28 text-base bg-white border-brand-soft/50 focus:border-teal-mid resize-none" rows={4} />
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="contact-consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} className="mt-0.5 data-[state=checked]:bg-teal-mid data-[state=checked]:border-teal-mid" />
        <label htmlFor="contact-consent" className="text-sm text-text-muted leading-snug cursor-pointer">
          Я согласен(а) на обработку персональных данных.{" "}
          <a href="/privacy" target="_blank" className="text-teal-mid underline">Политика конфиденциальности</a>
        </label>
      </div>

      {error && (
        <div role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" /></svg>
          {error}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl bg-teal-mid text-white font-semibold text-lg hover:bg-teal hover:scale-[1.01] transition-all disabled:opacity-60">
        {isSubmitting ? "Отправляем..." : "Отправить сообщение"}
      </button>
    </form>
  );
}
