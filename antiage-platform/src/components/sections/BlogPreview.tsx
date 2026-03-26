import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

const DEMO_POSTS = [
  { title: "5 продуктов, которые старят вас на 10 лет", category: "Питание" },
  { title: "Как победить бессонницу без таблеток", category: "Здоровье" },
  { title: "Коллаген: пить или колоть?", category: "БАДы" },
];

export function BlogPreview() {
  return (
    <section className="bg-warm-bg py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Полезные статьи"
            subtitle="Проверенные советы по anti-age от эксперта с 30-летним опытом"
          />
        </AnimateOnScroll>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEMO_POSTS.map((post, i) => (
            <AnimateOnScroll key={post.title} delay={i * 0.12}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all group h-full">
                <div className="aspect-16/10 bg-brand-soft/30" />
                <div className="p-6">
                  <span className="inline-block text-xs font-medium text-teal-mid bg-teal-bg px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg group-hover:text-teal-mid transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-teal-mid font-semibold text-lg hover:text-teal transition-colors group"
          >
            Все статьи
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
