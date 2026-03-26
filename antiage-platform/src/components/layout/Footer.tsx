import Link from "next/link";
import { Send, Video, Camera, Mail } from "lucide-react";
import {
  NAV_LINKS,
  TELEGRAM_CHANNEL_URL,
  YOUTUBE_URL,
  INSTAGRAM_URL,
  EMAIL_CONTACT,
  SITE_NAME,
} from "@/lib/constants";
import { WaveDivider } from "@/components/shared/WaveDivider";

const SOCIAL_LINKS = [
  { href: TELEGRAM_CHANNEL_URL, icon: Send, label: "Telegram" },
  { href: YOUTUBE_URL, icon: Video, label: "YouTube" },
  { href: INSTAGRAM_URL, icon: Camera, label: "Instagram" },
  { href: `mailto:${EMAIL_CONTACT}`, icon: Mail, label: "Email" },
];

const PROGRAM_LINKS = [
  { href: "/programs/biochemistry", label: "Биохимия" },
  { href: "/programs/biomechanics", label: "Биомеханика" },
  { href: "/programs/bioenergy", label: "Биоэнергетика" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <WaveDivider
        fromColor="var(--color-warm-bg)"
        toColor="var(--color-text)"
        variant={4}
      />
      <div className="bg-text text-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Колонка 1: Бренд */}
            <div className="space-y-4">
              <Link href="/" className="block">
                <span className="font-heading text-2xl font-bold text-brand-soft">
                  {SITE_NAME}
                </span>
                <span className="block font-handwritten text-sm text-brand-light mt-1">
                  молодость доступна каждому
                </span>
              </Link>
              <p className="text-brand-soft/70 text-sm leading-relaxed">
                Эксперт по anti-age с 30-летним опытом. Три кита здоровья:
                биохимия, биомеханика, биоэнергетика.
              </p>
            </div>

            {/* Колонка 2: Навигация */}
            <div>
              <h3 className="text-base font-semibold text-brand-soft mb-4">
                Навигация
              </h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-soft/70 hover:text-brand-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Колонка 3: Программы */}
            <div>
              <h3 className="text-base font-semibold text-brand-soft mb-4">
                Программы
              </h3>
              <ul className="space-y-2.5">
                {PROGRAM_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-soft/70 hover:text-brand-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/quiz"
                    className="text-sm text-brand-light font-medium hover:text-brand transition-colors"
                  >
                    Пройти тест →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Колонка 4: Соцсети */}
            <div>
              <h3 className="text-base font-semibold text-brand-soft mb-4">
                Мы в соцсетях
              </h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft/10 text-brand-soft/70 hover:bg-brand/20 hover:text-brand-light transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href={TELEGRAM_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand text-white font-medium hover:bg-brand-light transition-colors text-sm"
                >
                  <Send className="h-4 w-4" />
                  Подписаться в Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Нижняя строка */}
          <div className="mt-12 pt-6 border-t border-brand-soft/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-brand-soft/50">
              &copy; {year} {SITE_NAME}. Все права защищены.
            </p>
            <Link
              href="/privacy"
              className="text-sm text-brand-soft/50 hover:text-brand-soft/80 transition-colors"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
