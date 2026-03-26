"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { trackEvent } from "@/lib/analytics";

export function PartnershipCTA() {
  return (
    <section className="bg-brand py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll>
          <h2 className="text-white mb-4">
            Хотите строить бизнес в anti-age?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Anti-age рынок растёт на 10-12% ежегодно. Более 150 млрд рублей
            и 39 стран присутствия. Присоединяйтесь к команде.
          </p>
          <Link
            href="/partnership"
            onClick={() => trackEvent("partnership_cta_clicked")}
            className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 text-brand font-semibold text-lg hover:bg-brand-cream hover:scale-[1.02] transition-all"
          >
            Узнать подробности
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
