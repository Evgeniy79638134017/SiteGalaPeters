"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const Container = shouldReduceMotion ? "div" : motion.div;
  const Item = shouldReduceMotion ? "div" : motion.div;

  return (
    <section className="relative bg-brand-cream overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex items-center">
      {/* Декоративные blob-формы */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-soft/20 blur-3xl" />
      <div className="absolute bottom-20 left-5 w-56 h-56 rounded-full bg-teal-soft/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Текст */}
          <Container
            {...(!shouldReduceMotion && {
              variants: stagger,
              initial: "hidden",
              animate: "visible",
            })}
            className="space-y-6 md:space-y-8"
          >
            <Item {...(!shouldReduceMotion && { variants: fadeUp })}>
              <span className="inline-block font-handwritten text-xl md:text-2xl text-brand bg-brand-soft/40 px-4 py-1.5 rounded-full">
                Продукт своего продукта
              </span>
            </Item>

            <Item {...(!shouldReduceMotion && { variants: fadeUp })}>
              <h1 className="text-text">Молодость доступна каждому</h1>
            </Item>

            <Item {...(!shouldReduceMotion && { variants: fadeUp })}>
              <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-xl">
                Мне 62 года. Зрение без очков. Энергии больше, чем в 40.
                За 30 лет я создала систему, которая работает.
                Три кита здоровья: биохимия, биомеханика, биоэнергетика.
              </p>
            </Item>

            <Item
              {...(!shouldReduceMotion && { variants: fadeUp })}
              className="flex flex-col sm:flex-row gap-4"
            >
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
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-teal-mid px-8 text-teal-mid font-semibold text-lg hover:bg-teal-bg hover:scale-[1.02] transition-all"
              >
                Подписаться в Telegram
              </a>
            </Item>
          </Container>

          {/* Фото-placeholder */}
          <div className="relative hidden lg:block">
            <div className="aspect-3/4 rounded-3xl bg-linear-to-br from-brand-soft to-teal-soft/30 flex items-center justify-center">
              <div className="text-center space-y-3 text-text-muted/50">
                <div className="w-24 h-24 rounded-full bg-brand-soft/60 mx-auto" />
                <p className="text-sm">Фото эксперта</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-teal-bg/60 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
