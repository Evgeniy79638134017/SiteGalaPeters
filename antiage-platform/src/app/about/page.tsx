import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, Moon, Activity, Apple, Brain } from "lucide-react";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "Мой путь к молодости длиной в 30 лет. История эксперта по anti-age: от первых БАДов до системы трёх китов.",
};

const TIMELINE = [
  { year: "1995", title: "Начало пути", text: "Первые БАДы. Начала воспринимать добавки как «внутреннюю косметику» — то, что работает изнутри." },
  { year: "2000", title: "«Вы молодеете!»", text: "Окружающие стали замечать: «Ты выглядишь моложе, чем 5 лет назад». Это стало мотивацией продолжать." },
  { year: "2005", title: "Победа над бессонницей", text: "15 лет мучилась бессонницей. Нашла решение через комплексный подход: БАДы + режим + мышление." },
  { year: "2010", title: "12 лет без алкоголя", text: "Осознанный выбор. Отказ от алкоголя — один из ключевых факторов сохранения молодости." },
  { year: "2013", title: "Косметолог в 45", text: "«Видно, что вы ухаживаете за собой» — сказал косметолог. Мне было 45, а кожа выглядела лучше, чем в 30." },
  { year: "2016", title: "Круиз по Карибам", text: "Шок: молодые американки 25-30 лет выглядели хуже, чем я в 50. Поняла силу образа жизни и питания." },
  { year: "2020", title: "Гимнастики и практики", text: "Добавила биомеханику и биоэнергетику. Система «Три кита» стала полной: биохимия + биомеханика + биоэнергетика." },
  { year: "2025", title: "62 года — без очков", text: "Зрение без очков. Энергии больше, чем в 40. Волос вдвое больше, чем в 30. Живое доказательство системы." },
];

const PRINCIPLES = [
  { Icon: Droplets, title: "Вода", text: "30 мл на кг веса ежедневно. Основа биохимии тела." },
  { Icon: Moon, title: "Сон", text: "До 23:00. Мелатонин — главный антиоксидант организма." },
  { Icon: Activity, title: "Движение", text: "Тело создано для движения. Гимнастика, прогулки, растяжка." },
  { Icon: Apple, title: "Питание + БАДы", text: "Осознанное питание и проверенные добавки — фундамент." },
  { Icon: Brain, title: "Мышление", text: "Мысли «мне поздно» старят. Позитивный настрой — anti-age крем." },
];

const QUOTES = [
  "Я говорю только о том, что проверила на себе. Моё тело — моё доказательство.",
  "Тело — самовосстанавливающаяся система. Просто помогите ему: накормите, очистите, двигайте.",
  "Неважно, сколько вам лет. Важно, зачем вы просыпаетесь утром.",
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-teal-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <span className="text-text">Обо мне</span>
          </nav>
          <AnimateOnScroll>
            <h1 className="text-teal max-w-2xl">
              Мой путь к молодости длиной в 30 лет
            </h1>
          </AnimateOnScroll>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-cream)" variant={1} />

      {/* TIMELINE */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Вертикальная линия */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal-soft/40 -translate-x-1/2" />

            <div className="space-y-10 md:space-y-12">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <AnimateOnScroll
                    key={item.year}
                    delay={i * 0.08}
                    direction={isLeft ? "left" : "right"}
                  >
                    <div className={`relative flex items-start gap-6 pl-12 md:pl-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Точка на линии */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-teal-mid border-4 border-brand-cream -translate-x-1/2 mt-1.5 z-10" />

                      {/* Контент */}
                      <div className={`flex-1 ${isLeft ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                        <span className="inline-block text-sm font-semibold text-teal-mid bg-teal-bg px-3 py-1 rounded-full mb-2">
                          {item.year}
                        </span>
                        <h3 className="text-lg mb-1">{item.title}</h3>
                        <p className="text-text-muted">{item.text}</p>
                      </div>

                      {/* Spacer для правильного выравнивания */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-cream)" toColor="var(--color-teal-bg)" variant={2} />

      {/* ТОП-5 ПРИНЦИПОВ */}
      <section className="bg-teal-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading title="5 принципов молодости" />
          </AnimateOnScroll>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PRINCIPLES.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-teal-soft/30 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-bg flex items-center justify-center mx-auto mb-3">
                    <p.Icon className="w-6 h-6 text-teal-mid" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base mb-2">{p.title}</h3>
                  <p className="text-text-muted text-sm">{p.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="var(--color-teal-bg)" toColor="var(--color-brand-bg)" variant={3} />

      {/* ЦИТАТЫ */}
      <section className="bg-brand-bg py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          {QUOTES.map((quote, i) => (
            <AnimateOnScroll key={i} delay={i * 0.12}>
              <blockquote className="font-handwritten text-2xl md:text-3xl text-brand-dark leading-snug italic text-center">
                &ldquo;{quote}&rdquo;
              </blockquote>
              {i < QUOTES.length - 1 && (
                <div className="w-16 h-0.5 bg-brand-soft mx-auto mt-8" />
              )}
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <WaveDivider fromColor="var(--color-brand-bg)" toColor="var(--color-brand-cream)" variant={4} />

      {/* CTA */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll>
            <h2 className="mb-8">Готовы начать свой путь?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quiz"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-brand px-8 text-white font-semibold text-lg hover:bg-brand-light hover:scale-[1.02] transition-all"
              >
                Пройти тест — 2 минуты
              </Link>
              <Link
                href="/partnership"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-teal-mid px-8 text-teal-mid font-semibold text-lg hover:bg-teal-bg transition-all"
              >
                Стать партнёром
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
