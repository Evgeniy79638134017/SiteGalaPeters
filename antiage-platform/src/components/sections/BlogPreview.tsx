import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { BLOG_POSTS } from "@/content/blog-posts";

const PREVIEW_POSTS = BLOG_POSTS.slice(0, 3);

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
          {PREVIEW_POSTS.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={i * 0.12}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all h-full flex flex-col">
                  <div className="aspect-16/10 bg-brand-soft/30" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block text-xs font-medium text-teal-mid bg-teal-bg px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted">{post.readTime}</span>
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
