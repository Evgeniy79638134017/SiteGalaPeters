import type { Metadata } from "next";
import Link from "next/link";
import { Send, Video, Camera, Mail } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ContactFormClient } from "@/components/forms/ContactFormClient";
import {
  TELEGRAM_CHANNEL_URL,
  YOUTUBE_URL,
  INSTAGRAM_URL,
  EMAIL_CONTACT,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами: Telegram, email, Instagram, YouTube. Форма обратной связи.",
};

const CONTACT_CARDS = [
  { Icon: Send, label: "Telegram", value: "Канал и чат", href: TELEGRAM_CHANNEL_URL, color: "text-teal-mid", bg: "bg-teal-bg" },
  { Icon: Mail, label: "Email", value: EMAIL_CONTACT, href: `mailto:${EMAIL_CONTACT}`, color: "text-brand", bg: "bg-brand-bg" },
  { Icon: Camera, label: "Instagram", value: "@antiage", href: INSTAGRAM_URL, color: "text-teal-light", bg: "bg-teal-bg" },
  { Icon: Video, label: "YouTube", value: "AntiAge канал", href: YOUTUBE_URL, color: "text-brand-dark", bg: "bg-brand-bg" },
];

export default function ContactsPage() {
  return (
    <>
      <section className="bg-teal-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <span className="text-text">Контакты</span>
          </nav>
          <AnimateOnScroll>
            <h1 className="text-teal mb-4">Свяжитесь с нами</h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Выберите удобный способ связи или отправьте сообщение через форму.
            </p>
          </AnimateOnScroll>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_CARDS.map((card, i) => (
              <AnimateOnScroll key={card.label} delay={i * 0.1}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mx-auto mb-3`}>
                    <card.Icon className={`w-6 h-6 ${card.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="font-semibold text-text mb-1">{card.label}</div>
                  <div className="text-sm text-text-muted">{card.value}</div>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />

      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-center mb-8">Напишите нам</h2>
          </AnimateOnScroll>
          <ContactFormClient />
        </div>
      </section>
    </>
  );
}
