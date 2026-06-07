import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export function AboutPreview() {
  return (
    <section className="bg-brand-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Портрет Галины */}
          <AnimateOnScroll direction="left">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-soft/30">
              <Image
                src="/images/expert-preview.jpg"
                alt="Галина — эксперт по anti-age"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </AnimateOnScroll>
          {/* Текст */}
          <AnimateOnScroll delay={0.15} className="space-y-6">
            <h2>Обо мне</h2>
            <blockquote className="font-handwritten text-2xl md:text-3xl text-brand-dark leading-snug italic">
              &ldquo;Я говорю только о том, что проверила на себе.
              Моё тело — моё доказательство.&rdquo;
            </blockquote>
            <p className="text-text-muted text-lg leading-relaxed">
              30 лет опыта в anti-age. Начала с БАДов, победила 15-летнюю
              бессонницу, в 63 года — зрение без очков, энергии больше чем
              в 40. Создала систему из трёх направлений, которая работает.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-teal-mid font-semibold text-lg hover:text-teal transition-colors group"
            >
              Читать полную историю
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
