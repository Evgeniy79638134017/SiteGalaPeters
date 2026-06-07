import Link from "next/link";
import {
  Heart, Zap, Brain, Flame, Bone, Bug, Apple, Shield,
  Check, Clock, ShoppingCart, Send, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { ProducerInfo } from "@/components/programs/ProducerInfo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ORDER_URL, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { PROGRAM_SAFETY_NOTE, type HealthProgram } from "@/content/health-programs";

const ICONS: Record<HealthProgram["icon"], LucideIcon> = {
  Heart, Zap, Brain, Flame, Bone, Bug, Apple, Shield,
};

function OrderButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
      >
        <ShoppingCart className="w-5 h-5" />
        Заказать комплексы
      </a>
      <a
        href={TELEGRAM_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border-2 border-teal-mid px-8 text-teal-mid font-semibold text-lg hover:bg-teal-bg transition-all"
      >
        <Send className="w-5 h-5" />
        Написать в Telegram
      </a>
    </div>
  );
}

export function HealthProgramPage({ program }: { program: HealthProgram }) {
  const Icon = ICONS[program.icon];

  return (
    <>
      {/* HERO */}
      <section className="bg-linear-to-b from-teal-bg to-brand-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <Link href="/programs" className="hover:text-teal-mid transition-colors">Программы</Link>
            <span className="mx-2">›</span>
            <span className="text-text">{program.shortTitle}</span>
          </nav>
          <AnimateOnScroll>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Icon className="w-8 h-8 text-teal-mid" strokeWidth={1.5} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-mid/10 px-4 py-1.5 text-sm font-semibold text-teal">
                <Clock className="w-4 h-4" /> {program.duration}
              </span>
            </div>
            <h1 className="text-text mb-4">{program.title}</h1>
            <p className="font-handwritten text-2xl md:text-3xl text-brand-dark mb-6">{program.subtitle}</p>
            <div className="space-y-4 max-w-2xl">
              {program.intro.map((para, i) => (
                <p key={i} className="text-text-muted text-lg leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm font-semibold text-teal">
              <span>30+ лет опыта</span>
              <span>1000+ благодарных людей</span>
              <span>Продукт своего продукта</span>
            </div>
            <div className="mt-8"><OrderButtons /></div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ГЛАВНЫЙ ЗАКОН */}
      {program.mainLaw && (
        <>
          <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-brand-bg)" variant={1} />
          <section className="bg-brand-bg py-14 md:py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
              <AnimateOnScroll>
                <blockquote className="font-handwritten text-2xl md:text-3xl text-brand-dark leading-snug italic">
                  &ldquo;{program.mainLaw}&rdquo;
                </blockquote>
              </AnimateOnScroll>
            </div>
          </section>
        </>
      )}

      {/* ПОДОЙДЁТ, ЕСЛИ */}
      <WaveDivider fromColor="var(--color-brand-bg)" toColor="var(--color-teal-bg)" variant={2} />
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll><SectionHeading title="Программа подойдёт, если вас беспокоит" /></AnimateOnScroll>
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {program.forWhom.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm h-full">
                  <Check className="w-5 h-5 mt-0.5 shrink-0 text-teal-mid" strokeWidth={2.5} />
                  <span className="text-text">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ПРИЧИНЫ */}
      {program.causes.length > 0 && (
        <>
          <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={3} />
          <section className="bg-brand-cream py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll><SectionHeading title="Почему это происходит" /></AnimateOnScroll>
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {program.causes.map((c, i) => (
                  <AnimateOnScroll key={i} delay={i * 0.06}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm h-full border-b-[3px] border-teal-soft">
                      <h3 className="text-base font-bold text-text mb-2">{c.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{c.description}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ОБРАЗ ЖИЗНИ */}
      {program.recommendations.length > 0 && (
        <>
          <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-warm-bg)" variant={4} />
          <section className="bg-warm-bg py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll><SectionHeading title="Образ жизни — фундамент результата" /></AnimateOnScroll>
              <div className="mt-10 space-y-4">
                {program.recommendations.map((r, i) => (
                  <AnimateOnScroll key={i} delay={i * 0.05}>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                        <span className="font-bold text-text">{r.title}</span>
                        {r.value && (
                          <span className="text-sm font-semibold text-teal-mid bg-teal-bg rounded-full px-3 py-0.5">{r.value}</span>
                        )}
                      </div>
                      <p className="text-text-muted text-[15px] leading-relaxed">{r.description}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ПОЧЕМУ ОТ 4 МЕСЯЦЕВ */}
      {program.whyDuration.length > 0 && (
        <>
          <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-teal-bg)" variant={1} />
          <section className="bg-teal-bg py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll><SectionHeading title="Почему программа от 4 месяцев" /></AnimateOnScroll>
              <div className="mt-10 space-y-3">
                {program.whyDuration.map((item, i) => (
                  <AnimateOnScroll key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 shadow-sm">
                      <Clock className="w-5 h-5 mt-0.5 shrink-0 text-teal-mid" strokeWidth={2} />
                      <span className="text-text">{item}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ПРОГРАММА ПО МЕСЯЦАМ */}
      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll><SectionHeading title="Программа по месяцам" /></AnimateOnScroll>
          <div className="mt-10 space-y-8">
            {program.stages.map((stage, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full bg-brand text-white text-sm font-bold px-4 py-1.5">
                      {stage.month}
                    </span>
                    <h3 className="text-lg font-bold text-text">{stage.title}</h3>
                  </div>
                  <p className="text-text-muted text-sm mb-5">{stage.goal}</p>

                  {/* Комплексы с дозировками */}
                  <div className="space-y-2.5 mb-5">
                    {stage.supplements.map((s, j) => (
                      <div key={j} className="rounded-xl bg-teal-bg/50 px-4 py-3">
                        <div className="font-semibold text-text">{s.name}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-text-muted mt-0.5">
                          {s.dosage && <span>{s.dosage}</span>}
                          {s.duration && <span className="text-teal-mid">· {s.duration}</span>}
                        </div>
                      </div>
                    ))}
                  </div>

                  {stage.results.length > 0 && (
                    <ul className="space-y-1.5">
                      {stage.results.map((r, k) => (
                        <li key={k} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-teal-mid" strokeWidth={2.5} />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ДЛИТЕЛЬНАЯ ПОДДЕРЖКА */}
      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-teal-bg)" variant={3} />
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll><SectionHeading title="Длительная поддержка" /></AnimateOnScroll>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            <AnimateOnScroll>
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <h3 className="text-base font-bold text-text mb-4">Постоянный приём</h3>
                <ul className="space-y-2">
                  {program.longTermSupport.permanent.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-muted">
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-teal-mid" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <h3 className="text-base font-bold text-text mb-4">Курсами</h3>
                <ul className="space-y-2 mb-4">
                  {program.longTermSupport.courses.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-muted">
                      <ArrowRight className="w-5 h-5 mt-0.5 shrink-0 text-brand" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {program.longTermSupport.courses.duration && (
                  <p className="text-sm text-text-muted/80">{program.longTermSupport.courses.duration}</p>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ */}
      {program.expectedResults.length > 0 && (
        <>
          <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-warm-bg)" variant={4} />
          <section className="bg-warm-bg py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll><SectionHeading title="Чего ожидать" /></AnimateOnScroll>
              <div className="mt-10 space-y-4">
                {program.expectedResults.map((r, i) => (
                  <AnimateOnScroll key={i} delay={i * 0.06}>
                    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-5">
                      <div className="shrink-0 sm:w-32">
                        <span className="inline-block text-sm font-bold text-teal bg-teal-bg rounded-full px-3 py-1">{r.period}</span>
                      </div>
                      <p className="text-text-muted leading-relaxed flex-1">{r.results}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* О ПРОИЗВОДИТЕЛЕ */}
      <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-brand-cream)" variant={1} />
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll><SectionHeading title="О производителе" /></AnimateOnScroll>
          <AnimateOnScroll delay={0.1} className="mt-10"><ProducerInfo /></AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      {program.faq.length > 0 && (
        <>
          <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-warm-bg)" variant={2} />
          <section className="bg-warm-bg py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll><SectionHeading title="Частые вопросы" /></AnimateOnScroll>
              <AnimateOnScroll delay={0.1} className="mt-10">
                <Accordion className="space-y-3">
                  {program.faq.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl px-6 border-none shadow-sm">
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
        </>
      )}

      {/* CTA */}
      <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-brand-cream)" variant={3} />
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="mb-3">Готовы поддержать свой организм?</h2>
            <p className="text-text-muted mb-8">
              Закажите комплексы программы или напишите мне — помогу подобрать схему под вас.
            </p>
            <div className="flex justify-center"><OrderButtons /></div>
          </AnimateOnScroll>

          <div className="mt-12 max-w-2xl mx-auto space-y-3 text-left">
            <Disclaimer />
            <p className="text-sm text-text-muted/80">{PROGRAM_SAFETY_NOTE}</p>
          </div>
        </div>
      </section>
    </>
  );
}
