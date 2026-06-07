"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center bg-text">
      {/* Фоновый медиа-слой: видео (или статичный постер при prefers-reduced-motion).
          Видео декоративное → aria-hidden; постер виден до загрузки видео. */}
      {shouldReduceMotion ? (
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/media/hero-bg.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* Затемнение для читаемости текста (слева темнее — там контент) */}
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/55 to-black/35" />

      {/* Контент поверх видео */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 w-full">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          <span className="inline-block font-handwritten text-xl md:text-2xl text-white bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full">
            Продукт своего продукта
          </span>

          <h1 className="text-white drop-shadow-sm">Молодость доступна каждому</h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
            Мне 62 года. Зрение без очков. Энергии больше, чем в 40.
            За 30 лет я создала систему, которая работает.
            Три кита здоровья: биохимия, биомеханика, биоэнергетика.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quiz"
              onClick={() => trackEvent("quiz_cta_hero_clicked")}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
            >
              Пройти тест — 2 минуты
            </Link>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("telegram_hero_clicked")}
              className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white px-8 text-white font-semibold text-lg hover:bg-white/10 hover:scale-[1.02] transition-all"
            >
              Подписаться в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
