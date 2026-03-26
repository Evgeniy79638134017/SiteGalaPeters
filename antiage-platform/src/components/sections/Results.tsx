import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { CountUp } from "@/components/shared/CountUp";

const METRICS = [
  { end: 30, suffix: "+", label: "лет опыта" },
  { end: 1000, suffix: "+", label: "благодарных людей" },
  { end: 62, suffix: "", label: "года — без очков" },
];

export function Results() {
  return (
    <section className="bg-teal-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading title="Результаты, которые говорят сами за себя" />
        </AnimateOnScroll>
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
          {METRICS.map((metric, i) => (
            <AnimateOnScroll key={metric.label} delay={i * 0.2} className="text-center">
              <CountUp
                end={metric.end}
                suffix={metric.suffix}
                className="font-heading text-5xl md:text-6xl font-bold text-teal"
              />
              <div className="text-text-muted text-sm mt-2">{metric.label}</div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
