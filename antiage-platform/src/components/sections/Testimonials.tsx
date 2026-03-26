import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const TESTIMONIALS = [
  { name: "Елена, 54 года", quote: "За 3 месяца вернулась энергия, которой не было 10 лет. Сплю как младенец!" },
  { name: "Марина, 48 лет", quote: "Похудела на 8 кг без диет. Просто начала следовать системе трёх китов." },
  { name: "Татьяна, 61 год", quote: "Коллеги спрашивают, что я делаю — выгляжу на 10 лет моложе." },
  { name: "Ольга, 57 лет", quote: "Перестала пить таблетки от бессонницы. Природный подход работает." },
];

export function Testimonials() {
  return (
    <section className="bg-teal-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading title="Истории трансформаций" />
        </AnimateOnScroll>
        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TESTIMONIALS.map((item, i) => (
            <AnimateOnScroll
              key={item.name}
              delay={i * 0.1}
              className="shrink-0 w-75 sm:w-85 snap-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-soft/40" />
                  <span className="font-semibold text-text">{item.name}</span>
                </div>
                <p className="text-text-muted leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
