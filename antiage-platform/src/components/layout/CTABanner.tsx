"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { TELEGRAM_CHANNEL_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function CTABanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function onScroll() {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      setVisible(footerTop > window.innerHeight + 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 md:hidden">
      <div className="flex gap-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-2 border border-brand-soft/30">
        <Link
          href="/quiz"
          onClick={() => trackEvent("cta_banner_quiz_clicked")}
          className="flex-1 h-12 rounded-xl bg-brand text-white font-semibold text-sm flex items-center justify-center hover:bg-brand-light transition-colors"
        >
          Пройти тест
        </Link>
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("cta_banner_telegram_clicked")}
          className="flex-1 h-12 rounded-xl bg-teal-mid text-white font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-teal transition-colors"
        >
          <Send className="w-4 h-4" /> Telegram
        </a>
      </div>
    </div>
  );
}
