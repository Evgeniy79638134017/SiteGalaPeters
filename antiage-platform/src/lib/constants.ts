export const SITE_NAME = "AntiAge";
export const SITE_TAGLINE = "Молодость доступна каждому";
export const SITE_DESCRIPTION =
  "Эксперт по anti-age с 30-летним опытом. Три кита здоровья: биохимия, биомеханика, биоэнергетика.";

export const TELEGRAM_CHANNEL_URL = "https://t.me/antiage_channel";
export const TELEGRAM_BOT_URL = "https://t.me/antiage_quiz_bot";
export const YOUTUBE_URL = "https://youtube.com/@antiage";
export const INSTAGRAM_URL = "https://instagram.com/antiage";
export const EMAIL_CONTACT = "hello@antiage.ru";

export const NAV_LINKS = [
  { href: "/programs", label: "Программы" },
  { href: "/partnership", label: "Партнёрство" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "Обо мне" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const TRUST_BADGES = [
  { value: "30+", label: "лет опыта" },
  { value: "1000+", label: "благодарных людей" },
  { value: "62", label: "года — без очков" },
] as const;

export const THREE_PILLARS = [
  {
    slug: "biochemistry",
    title: "Биохимия тела",
    description: "БАДы, питание, вода — фундамент здоровья и молодости",
    color: "teal-mid" as const,
    icon: "FlaskConical" as const,
  },
  {
    slug: "biomechanics",
    title: "Биомеханика",
    description: "Движение, гимнастики — тело создано для движения",
    color: "brand" as const,
    icon: "Activity" as const,
  },
  {
    slug: "bioenergy",
    title: "Биоэнергетика",
    description: "Мысли — ваш главный anti-age крем",
    color: "teal-light" as const,
    icon: "Brain" as const,
  },
] as const;
