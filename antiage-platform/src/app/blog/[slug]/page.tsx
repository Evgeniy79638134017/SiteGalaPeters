import type { Metadata } from "next";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  return { title, description: `Статья: ${title}` };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-warm-bg py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-teal-mid transition-colors">Блог</Link>
          <span className="mx-2">›</span>
          <span className="text-text capitalize">{title}</span>
        </nav>

        {/* Обложка */}
        <div className="aspect-video rounded-2xl bg-brand-soft/30 mb-8" />

        <h1 className="text-text capitalize mb-4">{title}</h1>
        <div className="text-sm text-text-muted mb-8">Март 2026 · 5 мин чтения</div>

        {/* Контент-заглушка */}
        <div className="prose prose-lg max-w-none space-y-5">
          <p className="text-text-muted text-lg leading-relaxed">
            Это демонстрационная статья. Контент будет добавлен позже через систему управления блогом (Prisma + ISR).
          </p>
          <p className="text-text-muted text-lg leading-relaxed">
            Каждая статья будет содержать проверенные советы по anti-age, основанные на 30-летнем опыте эксперта.
            Все рекомендации — только то, что проверено на себе.
          </p>
        </div>

        {/* Шеринг */}
        <div className="mt-10 pt-6 border-t border-brand-soft/30">
          <p className="text-sm text-text-muted mb-3">Поделиться:</p>
          <div className="flex gap-3">
            {["Telegram", "VK", "WhatsApp"].map((platform) => (
              <span
                key={platform}
                className="inline-flex h-10 items-center px-4 rounded-lg bg-teal-bg text-teal-mid text-sm font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-teal-bg rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-teal mb-3">Хотите больше советов?</h3>
          <p className="text-text-muted mb-5">
            Подпишитесь на Telegram-канал — ежедневные советы по anti-age
          </p>
          <a
            href="https://t.me/antiage_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-teal-mid px-6 text-white font-semibold hover:bg-teal transition-colors"
          >
            Подписаться в Telegram
          </a>
        </div>
      </article>
    </div>
  );
}
