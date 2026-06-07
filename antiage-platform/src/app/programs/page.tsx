import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart, Zap, Brain, Flame, Bone, Bug, Apple, Shield, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { PROGRAMS } from "@/content/programs";
import { HEALTH_PROGRAMS, type HealthProgram } from "@/content/health-programs";

export const metadata: Metadata = {
  title: "Программы",
  description: "Программы поддержки организма по системам: сердце и сосуды, сон и энергия, нервы, гормоны, суставы, иммунитет и другие. Составы, этапы по месяцам, тон Галины.",
};

const ICONS: Record<HealthProgram["icon"], LucideIcon> = {
  Heart, Zap, Brain, Flame, Bone, Bug, Apple, Shield,
};

export default function ProgramsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <span className="text-text">Программы</span>
          </nav>
          <AnimateOnScroll>
            <h1 className="text-text mb-6 max-w-2xl">Программы поддержки организма</h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl">
              Комплексы по системам организма — с составами, этапами по месяцам и понятными
              шагами. Я собрала их по-дружески, как делилась бы с близким человеком.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-teal-bg)" variant={1} />

      {/* 8 ПРОГРАММ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_PROGRAMS.map((prog, i) => {
              const Icon = ICONS[prog.icon];
              return (
                <AnimateOnScroll key={prog.slug} delay={(i % 3) * 0.1}>
                  <Link href={`/programs/${prog.slug}`} className="group block h-full">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-b-[3px] border-teal-soft hover:-translate-y-1 hover:shadow-md transition-all h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-teal-bg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-teal-mid" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg mb-2">{prog.title}</h3>
                      <p className="text-text-muted text-sm flex-1 leading-relaxed">{prog.description}</p>
                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs font-semibold text-teal bg-teal-bg rounded-full px-3 py-1">
                          {prog.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 text-teal-mid font-medium text-sm group-hover:gap-2 transition-all">
                          Подробнее <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <Disclaimer />
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />

      {/* ПОДХОД: ТРИ КИТА */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-center text-text mb-3">Мой подход: три кита здоровья</h2>
            <p className="text-text-muted text-center max-w-2xl mx-auto mb-12">
              За всеми программами стоит одна философия — комплексный подход из трёх направлений.
              Последовательность важнее скорости.
            </p>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {PROGRAMS.map((prog, i) => (
              <AnimateOnScroll key={prog.slug} delay={i * 0.15}>
                <Link href={`/programs/${prog.slug}`} className="group block h-full">
                  <div className={`${prog.color.bg} rounded-2xl p-8 ${prog.color.border} border-b-[3px] hover:-translate-y-1 hover:shadow-md transition-all h-full flex flex-col`}>
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5">
                      <prog.Icon className={`w-7 h-7 ${prog.color.text}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl mb-3">{prog.title}</h3>
                    <p className="text-text-muted flex-1">{prog.description}</p>
                    <div className={`mt-5 inline-flex items-center gap-2 ${prog.color.text} font-medium group-hover:gap-3 transition-all`}>
                      Подробнее <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
