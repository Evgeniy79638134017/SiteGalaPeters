"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { NAV_LINKS, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { MobileMenu } from "./MobileMenu";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-brand-cream/90 backdrop-blur-md shadow-sm"
          : "bg-brand-cream"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Лого */}
          <Link href="/" className="flex-shrink-0 group">
            <span className="font-heading text-xl md:text-2xl font-bold text-teal group-hover:text-teal-mid transition-colors">
              AntiAge
            </span>
            <span className="hidden sm:block font-handwritten text-xs text-brand leading-tight">
              молодость доступна каждому
            </span>
          </Link>

          {/* Desktop навигация */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-4 py-2 text-[15px] lg:text-base text-text rounded-lg hover:text-teal-mid hover:bg-teal-bg/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Trust badge — только на desktop */}
            <div className="hidden lg:block">
              <TrustBadges variant="compact" />
            </div>

            {/* Telegram — desktop */}
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-teal-mid text-white text-sm font-medium hover:bg-teal transition-colors"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
