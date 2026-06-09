export const SITE_NAME = "AntiAge";
export const SITE_TAGLINE = "Молодость доступна каждому";
export const SITE_DESCRIPTION =
  "Эксперт по anti-age с 30-летним опытом. Три кита здоровья: биохимия, биомеханика, биоэнергетика.";

export const TELEGRAM_CHANNEL_URL = "https://t.me/GalaProMolodost";
export const TELEGRAM_BOT_URL = "https://t.me/antiage_quiz_bot";
export const YOUTUBE_URL = "https://youtube.com/@galinapeters";
export const INSTAGRAM_URL = "https://www.instagram.com/galina.peters";
export const TIKTOK_URL = "https://www.tiktok.com/@gala_lucky";
// Реферальная ссылка agenyz Галины — кнопки «Заказать комплексы» на страницах программ.
export const ORDER_URL = "https://agenyz.ru/registration?bonus=001-078135&language=ru";
export const EMAIL_CONTACT = "gpeters@mail.ru";

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
  { value: "63", label: "года — без очков" },
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
