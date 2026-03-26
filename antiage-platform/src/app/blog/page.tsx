import type { Metadata } from "next";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Блог",
  description: "Проверенные советы по anti-age: БАДы, питание, движение, мышление. Статьи от эксперта с 30-летним опытом.",
};

const CATEGORIES = ["Все", "БАДы", "Питание", "Движение", "Мышление", "Уход"];

const DEMO_POSTS = [
  { slug: "5-produktov-kotorye-staryat", title: "5 продуктов, которые старят вас на 10 лет", excerpt: "Они есть в каждом холодильнике. Узнайте, какие продукты ускоряют старение и чем их заменить.", category: "Питание", date: "20 марта 2026" },
  { slug: "kak-pobedit-bessonnicu", title: "Как победить бессонницу без таблеток", excerpt: "15 лет я мучилась бессонницей. Делюсь методом, который помог мне и тысячам женщин.", category: "Здоровье", date: "15 марта 2026" },
  { slug: "kollagen-pit-ili-kolot", title: "Коллаген: пить или колоть? Разбор за 30 лет опыта", excerpt: "Мезотерапия vs питьевой коллаген. Что эффективнее, безопаснее и выгоднее в долгосрочной перспективе.", category: "БАДы", date: "10 марта 2026" },
  { slug: "utrennyaya-gimnastika-10-minut", title: "Утренняя гимнастика за 10 минут: комплекс для 40+", excerpt: "Простые упражнения, которые запускают лимфосистему и дают энергию на весь день. Делаю каждое утро.", category: "Движение", date: "5 марта 2026" },
  { slug: "mysl-kotoraya-starit", title: "Одна мысль, которая старит быстрее морщин", excerpt: "«Мне уже поздно» — самая опасная фраза для вашего здоровья. Разбираем, почему и что с этим делать.", category: "Мышление", date: "1 марта 2026" },
  { slug: "voda-skolko-pit", title: "Сколько воды пить после 50: формула и мифы", excerpt: "30 мл на кг — базовая формула. Но есть нюансы, которые многие упускают.", category: "Питание", date: "25 февраля 2026" },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-teal-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
            <span className="mx-2">›</span>
            <span className="text-text">Блог</span>
          </nav>
          <AnimateOnScroll>
            <h1 className="text-teal mb-4">Полезные статьи</h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Проверенные советы по anti-age от эксперта с 30-летним опытом.
            </p>
          </AnimateOnScroll>

          {/* Фильтры */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-teal-mid text-white"
                    : "bg-white text-text-muted hover:bg-teal-mid/10 hover:text-teal-mid"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {DEMO_POSTS.map((post, i) => (
              <AnimateOnScroll key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="aspect-16/10 bg-brand-soft/30" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block text-xs font-medium text-teal-mid bg-teal-bg px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-text-muted">{post.date}</span>
                      </div>
                      <h3 className="text-lg mb-2 group-hover:text-teal-mid transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-text-muted text-sm flex-1">{post.excerpt}</p>
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
