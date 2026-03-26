import type { Metadata } from "next";
import Link from "next/link";
import { Users, GraduationCap, Package, Heart, ArrowDown } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { CountUp } from "@/components/shared/CountUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PartnerForm } from "@/components/forms/PartnerForm";

export const metadata: Metadata = {
  title: "Партнёрство",
  description:
    "Постройте бизнес в самой быстрорастущей индустрии здоровья. Anti-age рынок — 150+ млрд рублей, 39 стран.",
};

const MARKET_DATA = [
  { end: 150, suffix: "+ млрд ₽", label: "объём рынка" },
  { end: 58, suffix: "%", label: "рост аудитории" },
  { end: 12, suffix: "%", label: "ежегодный рост" },
  { end: 39, suffix: "", label: "стран присутствия" },
];

const BENEFITS = [
  {
    Icon: Users,
    title: "Опытный наставник",
    description: "Персональное сопровождение от эксперта с 30-летним опытом. Не останетесь один на один с вопросами.",
  },
  {
    Icon: GraduationCap,
    title: "Система обучения",
    description: "Пошаговая программа: от первых шагов до построения своей команды. Обучающие материалы и вебинары.",
  },
  {
    Icon: Package,
    title: "Проверенные продукты",
    description: "Линейка premium-продуктов с доказанной эффективностью. Вы будете рекомендовать то, что работает.",
  },
  {
    Icon: Heart,
    title: "Поддержка команды",
    description: "Сообщество единомышленников. Еженедельные созвоны, чат поддержки, обмен опытом и мотивация.",
  },
];

const STEPS = [
  { num: "01", title: "Заявка", description: "Заполните форму и расскажите о себе" },
  { num: "02", title: "Знакомство", description: "Созвон для обсуждения ваших целей" },
  { num: "03", title: "Обучение", description: "Пошаговый старт с наставником" },
  { num: "04", title: "Рост", description: "Развитие бизнеса и своей команды" },
];

const FOR_WHOM = [
  {
    title: "Женщины, ищущие дополнительный доход",
    description: "Гибкий график, работа из любой точки мира. Идеально совмещается с основной деятельностью.",
  },
  {
    title: "Те, кто увлечён темой здоровья",
    description: "Если вы уже живёте по принципам anti-age — почему бы не помогать другим и зарабатывать на этом?",
  },
  {
    title: "Предприниматели в поисках нового рынка",
    description: "Anti-age — один из самых быстрорастущих рынков. Раннее присоединение даёт максимальное преимущество.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Нужен ли опыт в бизнесе?",
    a: "Нет, мы обучаем с нуля. Главное — желание помогать людям и готовность учиться. Все материалы и поддержка предоставляются.",
  },
  {
    q: "Сколько нужно вложить на старте?",
    a: "Стартовый набор продуктов — минимальная инвестиция, которая окупается в первый месяц. Точную сумму обсудим на созвоне.",
  },
  {
    q: "Это сетевой маркетинг?",
    a: "Мы работаем по модели партнёрского бизнеса. Вы рекомендуете продукты, которые используете сами, и строите команду единомышленников. Никакого агрессивного рекрутинга — только attraction-маркетинг: люди приходят, потому что видят ваш результат.",
  },
  {
    q: "Сколько можно заработать?",
    a: "Доход зависит от вашей активности. От дополнительных 30-50 тысяч в месяц до полноценного дохода, заменяющего основную работу. Мы покажем реальные примеры.",
  },
  {
    q: "Могу ли я работать из другой страны?",
    a: "Да, бизнес работает в 39 странах. Многие партнёры живут за рубежом и работают с русскоязычной аудиторией по всему миру.",
  },
  {
    q: "Как быстро можно увидеть результат?",
    a: "Первые результаты — через 2-4 недели активной работы. Стабильный доход формируется за 3-6 месяцев при регулярной работе.",
  },
];

export default function PartnershipPage() {
  return (
    <>
      {/* HERO — тёплый градиент */}
      <section className="bg-linear-to-b from-brand-soft/40 to-brand-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <span className="text-text">Партнёрство</span>
          </nav>
          <AnimateOnScroll className="max-w-3xl">
            <h1 className="text-text mb-6">
              Построй бизнес в индустрии здоровья
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Anti-age рынок — один из самых быстрорастущих в мире.
              Присоединяйтесь к команде эксперта с 30-летним опытом
              и стройте свой бизнес в сфере здоровья и молодости.
            </p>
            <a
              href="#apply"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
            >
              Заполнить заявку <ArrowDown className="w-5 h-5" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-teal-bg)" variant={1} />

      {/* РЫНОЧНЫЕ ДАННЫЕ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Рынок, который растёт каждый год" />
          </AnimateOnScroll>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {MARKET_DATA.map((item, i) => (
              <AnimateOnScroll key={item.label} delay={i * 0.15} className="text-center">
                <CountUp
                  end={item.end}
                  suffix={item.suffix}
                  className="font-heading text-3xl md:text-5xl font-bold text-teal"
                />
                <div className="text-text-muted text-sm mt-2">{item.label}</div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />

      {/* ЧТО ВЫ ПОЛУЧАЕТЕ */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Что вы получаете" />
          </AnimateOnScroll>
          <div className="mt-12 grid sm:grid-cols-2 gap-6 md:gap-8">
            {BENEFITS.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-b-[3px] border-brand hover:-translate-y-1 hover:shadow-md transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center mb-4">
                    <item.Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-warm-bg)" variant={3} />

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="bg-warm-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Как это работает" />
          </AnimateOnScroll>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={i * 0.12}>
                <div className="relative text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-brand-soft/40 flex items-center justify-center mx-auto">
                    <span className="font-heading text-xl font-bold text-brand">{step.num}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-brand-soft/40" />
                  )}
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="text-text-muted text-sm">{step.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-warm-bg)" toColor="var(--color-brand-bg)" variant={4} />

      {/* ДЛЯ КОГО */}
      <section className="bg-brand-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Для кого это подходит" />
          </AnimateOnScroll>
          <div className="mt-12 grid md:grid-cols-3 gap-6 md:gap-8">
            {FOR_WHOM.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 0.12}>
                <div className="bg-white/70 rounded-2xl p-6 shadow-sm h-full">
                  <h3 className="text-lg mb-3">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-bg)" toColor="var(--color-teal-bg)" variant={1} />

      {/* FAQ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="Частые вопросы" />
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.15} className="mt-10">
            <Accordion className="space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
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

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={2} />

      {/* ФОРМА ЗАЯВКИ */}
      <section id="apply" className="bg-brand-cream py-16 md:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading
              title="Оставьте заявку"
              subtitle="Заполните форму, и мы свяжемся с вами в течение 24 часов"
            />
          </AnimateOnScroll>
          <div className="mt-10">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
