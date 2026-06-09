"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

// Минимальный тип Network Information API (нет в стандартных lib.dom типах).
interface NetworkInformationLite {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}
function getConnection(): NetworkInformationLite | undefined {
  return (navigator as Navigator & { connection?: NetworkInformationLite }).connection;
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  // Видео монтируется ТОЛЬКО на клиенте после первого рендера → не блокирует LCP.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const evaluate = () => {
      if (shouldReduceMotion) {
        setShowVideo(false);
        return;
      }
      const conn = getConnection();
      // Узкий экран (мобайл), экономия трафика или медленная сеть → только постер, без <video>.
      const slowNet =
        !!conn &&
        (conn.saveData === true ||
          ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? ""));
      setShowVideo(mql.matches && !slowNet);
    };

    // Первая оценка — после первого кадра (rAF), а не синхронно в эффекте: видео не блокирует LCP.
    const raf = requestAnimationFrame(evaluate);
    mql.addEventListener("change", evaluate);
    const conn = getConnection();
    conn?.addEventListener?.("change", evaluate);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", evaluate);
      conn?.removeEventListener?.("change", evaluate);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center bg-text">
      {/* База — статичный постер (мгновенно, это и есть LCP-кадр). Декоративный → aria-hidden. */}
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Видео поверх постера — только десктоп + нормальная сеть, монтируется после первого
          рендера (не грузится зря на мобильных/медленных). Кадр совпадает с постером → без «прыжка». */}
      {showVideo && (
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
            Мне 63 года. Зрение без очков. Энергии больше, чем в 40.
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
