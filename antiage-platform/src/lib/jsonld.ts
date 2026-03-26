import { SITE_NAME, SITE_DESCRIPTION, TELEGRAM_CHANNEL_URL, YOUTUBE_URL, INSTAGRAM_URL, EMAIL_CONTACT } from "./constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antiage.ru";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "AntiAge Expert",
    description: "Эксперт по anti-age с 30-летним опытом. Продукт своего продукта.",
    url: SITE_URL,
    image: `${SITE_URL}/images/expert.jpg`,
    jobTitle: "Эксперт по anti-age",
    knowsAbout: ["Anti-age", "БАДы", "Биохимия", "Биомеханика", "Биоэнергетика", "Здоровье после 50"],
    sameAs: [TELEGRAM_CHANNEL_URL, YOUTUBE_URL, INSTAGRAM_URL],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: EMAIL_CONTACT,
      contactType: "customer service",
      availableLanguage: "Russian",
    },
    sameAs: [TELEGRAM_CHANNEL_URL, YOUTUBE_URL, INSTAGRAM_URL],
  };
}

export function medicalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: SITE_NAME,
    description: "Консультации и программы по anti-age: биохимия, биомеханика, биоэнергетика",
    url: SITE_URL,
    medicalSpecialty: "Preventive Medicine",
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "Биохимия тела",
        description: "Персональный подбор БАДов, питание, водный баланс",
      },
      {
        "@type": "MedicalTherapy",
        name: "Биомеханика",
        description: "Гимнастика, упражнения, работа с позвоночником",
      },
      {
        "@type": "MedicalTherapy",
        name: "Биоэнергетика",
        description: "Мышление, медитация, психосоматика",
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: article.date,
    author: personJsonLd(),
    publisher: organizationJsonLd(),
    articleSection: article.category,
    inLanguage: "ru",
  };
}
