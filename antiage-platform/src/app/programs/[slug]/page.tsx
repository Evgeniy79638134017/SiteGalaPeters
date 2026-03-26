import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PROGRAMS } from "@/content/programs";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      {/* HERO */}
      <section className={`bg-linear-to-b ${program.color.heroGradient} py-16 md:py-24`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <Link href="/programs" className="hover:text-teal-mid transition-colors">Программы</Link>
            <span className="mx-2">›</span>
            <span className="text-text">{program.shortTitle}</span>
          </nav>
          <AnimateOnScroll className="flex items-center gap-5 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center`}>
              <program.Icon className={`w-8 h-8 ${program.color.text}`} strokeWidth={1.5} />
            </div>
            <h1 className="text-text">{program.title}</h1>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-warm-bg)" variant={1} />

      {/* ОПИСАНИЕ */}
      <section className="bg-warm-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-5">
          {program.longDescription.map((para, i) => (
            <AnimateOnScroll key={i} delay={i * 0.1}>
              <p className="text-text-muted text-lg leading-relaxed">{para}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-teal-bg)" variant={2} />

      {/* ЧТО ВХОДИТ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Что входит в программу" />
          </AnimateOnScroll>
          <div className="mt-10 space-y-3">
            {program.includes.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm">
                  <Check className={`w-5 h-5 mt-0.5 shrink-0 ${program.color.text}`} strokeWidth={2.5} />
                  <span className="text-text">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-bg)" variant={3} />

      {/* ДЛЯ КОГО */}
      <section className="bg-brand-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Для кого эта программа" />
          </AnimateOnScroll>
          <div className="mt-10 space-y-4">
            {program.forWhom.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white/70 rounded-xl px-6 py-5 shadow-sm">
                  <p className="text-text">{item}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-bg)" toColor="var(--color-warm-bg)" variant={4} />

      {/* FAQ */}
      <section className="bg-warm-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Частые вопросы" />
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.15} className="mt-10">
            <Accordion className="space-y-3">
              {program.faq.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white rounded-xl px-6 border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-text hover:text-teal-mid py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-muted text-base leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-brand-cream)" variant={1} />

      {/* CTA */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="mb-8">Начните свой путь</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quiz"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
              >
                Пройти тест — 2 минуты
              </Link>
              <Link
                href="/contacts"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-teal-mid px-8 text-teal-mid font-semibold text-lg hover:bg-teal-bg transition-all"
              >
                Записаться на консультацию
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
