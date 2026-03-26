"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl text-text hover:bg-brand-soft/50 transition-colors md:hidden"
            aria-label="Открыть меню"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-75 bg-brand-cream p-0">
        <SheetTitle className="sr-only">Навигация</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Лого */}
          <div className="p-6 border-b border-brand-soft">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block"
            >
              <span className="font-heading text-2xl font-bold text-teal">
                AntiAge
              </span>
              <span className="block font-handwritten text-sm text-brand mt-0.5">
                молодость доступна каждому
              </span>
            </Link>
          </div>

          {/* Навигация */}
          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center h-12 px-4 rounded-xl text-lg text-text hover:bg-teal-bg hover:text-teal-mid transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="p-6 border-t border-brand-soft space-y-3">
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="flex h-14 items-center justify-center rounded-xl bg-brand text-white font-semibold hover:bg-brand-light transition-colors"
            >
              Пройти тест — 2 минуты
            </Link>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-xl border-2 border-teal-mid text-teal-mid font-semibold hover:bg-teal-bg transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
