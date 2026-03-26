import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { PROGRAMS } from "@/content/programs";

export const metadata: Metadata = {
  title: "Программы",
  description: "Три кита здоровья и молодости: биохимия, биомеханика, биоэнергетика. Комплексный подход к anti-age.",
};

const SEQUENCE = [
  { label: "БАДы", sub: "фундамент" },
  { label: "Питание", sub: "осознанность" },
  { label: "Привычки", sub: "режим" },
  { label: "Движение", sub: "тело" },
  { label: "Практики", sub: "мышление" },
];

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
            <h1 className="text-text mb-6 max-w-2xl">Три кита здоровья и молодости</h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl">
              Комплексный подход — не что-то одно, а совокупность трёх направлений.
              Последовательность важнее скорости.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-teal-bg)" variant={1} />

      {/* ИНФОГРАФИКА ПОСЛЕДОВАТЕЛЬНОСТИ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-center text-teal mb-10">Последовательность — ключ к успеху</h2>
          </AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-4 md:gap-2">
            {SEQUENCE.map((item, i) => (
              <AnimateOnScroll key={item.label} delay={i * 0.1} className="flex items-center">
                <div className="text-center px-4 py-3">
                  <div className="font-heading text-lg md:text-xl font-bold text-teal">{item.label}</div>
                  <div className="text-xs text-text-muted mt-1">{item.sub}</div>
                </div>
                {i < SEQUENCE.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-teal-soft hidden md:block" />
                )}
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />

      {/* 3 КАРТОЧКИ ПРОГРАММ */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
