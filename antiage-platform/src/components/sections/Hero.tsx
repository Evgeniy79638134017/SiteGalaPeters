"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TELEGRAM_CHANNEL_URL, VIDEO_CDN_URL, VIDEO_ORIGIN_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

// Сколько ждём готовности видео с Vercel, прежде чем фолбэкнуть на Москву (TASK-075).
const VERCEL_TIMEOUT_MS = 2500;

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
  // Источник видео: начинаем с Vercel (CDN), при ошибке/таймауте → Москва (origin).
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const switchedRef = useRef(false); // гард от повторного переключения

  const fallbackToMoscow = useCallback(() => {
    if (switchedRef.current) return; // уже на Москве или уже переключились
    switchedRef.current = true;
    setVideoSrc(VIDEO_ORIGIN_URL);
  }, []);

  // Таймаут: если Vercel-видео не готово за VERCEL_TIMEOUT_MS — фолбэк на Москву.
  useEffect(() => {
    if (videoSrc !== VIDEO_CDN_URL) return;
    const t = setTimeout(() => {
      const v = videoRef.current;
      // readyState < HAVE_FUTURE_DATA(3) → ещё не заиграло → берём Москву.
      if (!v || v.readyState < 3) fallbackToMoscow();
    }, VERCEL_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [videoSrc, fallbackToMoscow]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const evaluate = () => {
      if (shouldReduceMotion) {
        setShowVideo(false);
        setVideoSrc(null);
        switchedRef.current = false;
        return;
      }
      const conn = getConnection();
      // Узкий экран (мобайл), экономия трафика или реально медленная сеть → только постер.
      // 3g НЕ блокируем: Chrome/VPN часто пессимистично рапортует "3g" на нормальных каналах
      // (TASK-076). Постер-only — только saveData или slow-2g/2g.
      const slowNet =
        !!conn &&
        (conn.saveData === true ||
          ["slow-2g", "2g"].includes(conn.effectiveType ?? ""));
      const show = mql.matches && !slowNet;
      setShowVideo(show);
      if (show) {
        // Стартуем с Vercel; если уже фолбэкнули на Москву — источник не сбрасываем.
        if (!switchedRef.current) setVideoSrc(VIDEO_CDN_URL);
      } else {
        setVideoSrc(null);
        switchedRef.current = false;
      }
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
          рендера (не грузится зря на мобильных/медленных). Кадр совпадает с постером → без «прыжка».
          Источник: Vercel (быстро за рубежом) → при ошибке/таймауте Москва (TASK-075).
          key={videoSrc} перемонтирует <video> при смене источника (чистый load+autoplay).
          Без crossOrigin: cross-origin воспроизведение CORS не требует, пиксели не читаем. */}
      {showVideo && videoSrc && (
        <video
          key={videoSrc}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={videoSrc}
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={fallbackToMoscow}
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
