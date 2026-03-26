import Link from "next/link";
import { FlaskConical, Activity, Brain } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const PILLARS = [
  {
    slug: "biochemistry",
    title: "Биохимия тела",
    description: "БАДы, питание, вода — фундамент здоровья и молодости. Начните с биохимии, и всё остальное приложится.",
    Icon: FlaskConical,
    borderColor: "border-teal-mid",
    iconBg: "bg-teal-bg",
    iconColor: "text-teal-mid",
    hoverColor: "group-hover:text-teal-mid",
  },
  {
    slug: "biomechanics",
    title: "Биомеханика",
    description: "Движение, гимнастики, упражнения — тело создано для движения. Гибкость позвоночника = молодость тела.",
    Icon: Activity,
    borderColor: "border-brand",
    iconBg: "bg-brand-bg",
    iconColor: "text-brand",
    hoverColor: "group-hover:text-brand",
  },
  {
    slug: "bioenergy",
    title: "Биоэнергетика",
    description: "Мысли — ваш главный anti-age крем. Мышление, медитация, психосоматика и духовные практики.",
    Icon: Brain,
    borderColor: "border-teal-light",
    iconBg: "bg-teal-bg",
    iconColor: "text-teal-light",
    hoverColor: "group-hover:text-teal-light",
  },
] as const;

export function ThreePillars() {
  return (
    <section className="bg-brand-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Три кита здоровья и молодости"
            subtitle="Комплексный подход — не что-то одно, а совокупность трёх направлений"
          />
        </AnimateOnScroll>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, i) => (
            <AnimateOnScroll key={pillar.slug} delay={i * 0.15}>
              <Link href={`/programs/${pillar.slug}`} className="group block h-full">
                <div className={`bg-white rounded-2xl p-8 shadow-sm border-b-[3px] ${pillar.borderColor} hover:-translate-y-1 hover:shadow-md transition-all h-full`}>
                  <div className={`w-14 h-14 rounded-xl ${pillar.iconBg} flex items-center justify-center mb-5`}>
                    <pillar.Icon className={`w-7 h-7 ${pillar.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`text-xl mb-3 ${pillar.hoverColor} transition-colors`}>
                    {pillar.title}
                  </h3>
                  <p className="text-text-muted">{pillar.description}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
