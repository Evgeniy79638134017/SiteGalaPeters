import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/content/blog-posts";
import type { BlogSection } from "@/content/blog-posts";
import { articleJsonLd } from "@/lib/jsonld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p key={index} className="text-text-muted text-lg leading-relaxed">
          {section.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={index} className="text-xl md:text-2xl font-bold text-text mt-8 mb-3">
          {section.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-brand pl-5 my-6 font-handwritten text-xl md:text-2xl text-brand-dark italic leading-snug"
        >
          &ldquo;{section.text}&rdquo;
        </blockquote>
      );
    case "list":
      return (
        <ul key={index} className="space-y-2.5 my-4">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-text-muted text-lg leading-relaxed">
              <span className="mt-2 shrink-0 w-2 h-2 rounded-full bg-teal-mid" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const styles = {
        tip: "bg-teal-bg border-teal-mid/30 text-teal",
        warning: "bg-brand-bg border-brand/30 text-brand-dark",
        story: "bg-brand-cream border-brand-soft text-brand-dark",
        science: "bg-indigo-50 border-indigo-200 text-indigo-900",
      };
      const icons = { tip: "💡", warning: "⚠️", story: "📖", science: "🔬" };
      const variant = section.variant ?? "tip";
      return (
        <div
          key={index}
          className={`rounded-xl border px-5 py-4 my-6 ${styles[variant]}`}
        >
          <span className="mr-2">{icons[variant]}</span>
          <span className="text-base leading-relaxed">{section.text}</span>
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antiage.ru";
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  const shareLinks = [
    { label: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}` },
    { label: "VK", href: `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${shareText}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div className="min-h-screen bg-warm-bg py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              slug: post.slug,
              date: "2026-03-01",
              category: post.category,
            })
          ),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-teal-mid transition-colors">Главная</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-teal-mid transition-colors">Блог</Link>
          <span className="mx-2">›</span>
          <span className="text-text">{post.title}</span>
        </nav>

        {/* Обложка */}
        <div className="aspect-video rounded-2xl bg-brand-soft/30 mb-8" />

        {/* Мета */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block text-xs font-medium text-teal-mid bg-teal-bg px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-text-muted">{post.date}</span>
          <span className="text-sm text-text-muted">· {post.readTime} чтения</span>
        </div>

        <h1 className="text-text mb-8">{post.title}</h1>

        {/* Контент */}
        <div className="space-y-4">
          {post.content.map((section, i) => renderSection(section, i))}
        </div>

        {/* Источники (PubMed) */}
        {post.sources && post.sources.length > 0 && (
          <div className="mt-12 pt-6 border-t border-brand-soft/30">
            <h3 className="text-lg font-bold text-text mb-4">
              Научные источники
            </h3>
            <ol className="space-y-3 list-decimal list-inside">
              {post.sources.map((source, i) => (
                <li key={i} className="text-sm text-text-muted leading-relaxed">
                  {source.title} ({source.year}).{" "}
                  <a
                    href={source.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-mid underline hover:text-teal transition-colors break-all"
                  >
                    {source.doi}
                  </a>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted/60 mt-4">
              Источники получены из базы данных PubMed (National Library of Medicine).
            </p>
          </div>
        )}

        {/* Шеринг */}
        <div className="mt-12 pt-6 border-t border-brand-soft/30">
          <p className="text-sm text-text-muted mb-3">Поделиться:</p>
          <div className="flex gap-3">
            {shareLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center px-4 rounded-lg bg-teal-bg text-teal-mid text-sm font-medium hover:bg-teal-mid hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-teal-bg rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-teal mb-3">Хотите больше советов?</h3>
          <p className="text-text-muted mb-5">
            Подпишитесь на Telegram-канал — ежедневные советы по anti-age
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/antiage_channel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-teal-mid px-6 text-white font-semibold hover:bg-teal transition-colors"
            >
              Подписаться в Telegram
            </a>
            <Link
              href="/quiz"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-brand px-6 text-brand font-semibold hover:bg-brand-bg transition-colors"
            >
              Пройти тест
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
