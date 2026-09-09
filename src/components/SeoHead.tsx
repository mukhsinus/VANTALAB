import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage, Lang } from '@/lib/i18n';
import { SITE_ORIGIN } from '@/lib/site';
import { caseDetails } from '@/pages/CaseDetail';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureHreflangLink(hreflang: string, href: string) {
  const id = `hreflang-${hreflang}`;
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'alternate';
    link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

function setJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

const routeMetadata: Record<string, Record<Lang, { title: string; description: string }>> = {
  '/': {
    ru: {
      title: 'VANTA LAB — премиальная цифровая студия | сайты, e‑commerce и веб‑приложения',
      description:
        'Стратегия, премиальный дизайн и разработка сайтов, интернет‑магазинов и веб‑продуктов. Фокус на доверие и конверсию. VANTA LAB, Узбекистан.',
    },
    en: {
      title: 'VANTA LAB — Premium Digital Studio | Websites, E-Commerce & Web Apps',
      description:
        'Strategy, high-end design, and custom software development for ambitious brands. Measurable conversion and scale. Tashkent, Uzbekistan.',
    },
    uz: {
      title: "VANTA LAB — premium raqamli studiya | saytlar, e‑commerce va veb‑ilovalar",
      description:
        "Strategiya, zamonaviy dizayn va saytlar, onlayn do'konlar hamda veb‑mahsulotlarni ishlab chiqish. Ishonch va konversiya. VANTA LAB, O'zbekiston.",
    },
  },
  '/services': {
    ru: {
      title: 'Услуги разработки сайтов, интернет-магазинов и веб-сервисов | VANTA LAB',
      description:
        'Разработка продающих лендингов, корпоративных сайтов, e-commerce и масштабируемых веб-приложений под ключ. Чистая архитектура и высокая конверсия.',
    },
    en: {
      title: 'Web Development, UI/UX Design & E-Commerce Services | VANTA LAB',
      description:
        'Turnkey landing pages, corporate websites, scalable e-commerce, and custom SaaS web applications. Fast architecture and polished design.',
    },
    uz: {
      title: "Veb-ishlab chiqish, dizayn va e-commerce xizmatlari | VANTA LAB",
      description:
        "Lendinglar, korporativ veb-saytlar, internet-do'konlar va veb-servislarni noldan yaratish. Tezkor arxitektura va yuqori konversiya.",
    },
  },
  '/portfolio': {
    ru: {
      title: 'Портфолио и кейсы веб-разработки с измеримыми результатами | VANTA LAB',
      description:
        'Реальные кейсы цифровой студии VANTA LAB: рост конверсии, продаж и вовлеченности для медицины, ритейла, производства и сервисов.',
    },
    en: {
      title: 'Portfolio & Case Studies with Proven Metrics | VANTA LAB',
      description:
        'Real results and web development case studies: conversion uplift, revenue growth, and high-performance digital products by VANTA LAB.',
    },
    uz: {
      title: "Portfolio va veb-ishlab chiqish keyslari | VANTA LAB",
      description:
        "VANTA LAB raqamli studiyasining real keyslari: tibbiyot, ishlab chiqarish, savdo va xizmatlar sohasidagi muvaffaqiyatli loyihalar.",
    },
  },
  '/contact': {
    ru: {
      title: 'Контакты — заказать разработку сайта или веб-продукта | VANTA LAB',
      description:
        'Обсудите ваш проект с командой VANTA LAB. Быстрый ответ в Telegram и по почте. Оценка бюджета и сроков в течение одного рабочего дня.',
    },
    en: {
      title: 'Contact Us — Start Your Digital Project | VANTA LAB',
      description:
        'Get in touch with VANTA LAB studio. Fast response via Telegram and email. Budget and timeline estimation within one business day.',
    },
    uz: {
      title: "Biz bilan bog'lanish — Loyihani boshlash | VANTA LAB",
      description:
        "VANTA LAB jamoasi bilan loyihangizni muhokama qiling. Telegram va email orqali tezkor aloqa. 1 ish kuni ichida smeta va rejani taqdim etamiz.",
    },
  },
};

/**
 * Route-aware multilingual SEO manager.
 * Dynamically synchronizes document title, meta descriptions, canonical URLs,
 * Open Graph, Twitter Cards, hreflang alternates, and JSON-LD Breadcrumb schemas.
 */
export function SeoHead() {
  const { lang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const rawPath = location.pathname.replace(/\/$/, '') || '/';
    const htmlLang = lang === 'ru' ? 'ru' : lang === 'uz' ? 'uz' : 'en';
    document.documentElement.lang = htmlLang;

    let pageTitle: string = t.seo.title;
    let pageDesc: string = t.seo.description;

    // 1. Check direct route match
    if (routeMetadata[rawPath]) {
      pageTitle = routeMetadata[rawPath][lang].title;
      pageDesc = routeMetadata[rawPath][lang].description;
    }
    // 2. Check dynamic case study route /portfolio/:id
    else if (rawPath.startsWith('/portfolio/')) {
      const slug = rawPath.replace('/portfolio/', '');
      const caseItem = caseDetails[slug];
      if (caseItem) {
        const goal = caseItem.goal?.[lang] || caseItem.built?.[lang] || '';
        if (lang === 'en') {
          pageTitle = `${caseItem.name} — Web Development Case Study | VANTA LAB`;
          pageDesc = goal || `Case study for ${caseItem.name} developed by VANTA LAB digital studio.`;
        } else if (lang === 'uz') {
          pageTitle = `${caseItem.name} — Veb-ishlab chiqish keysi | VANTA LAB`;
          pageDesc = goal || `${caseItem.name} uchun VANTA LAB studiyasi tomonidan ishlab chiqilgan keys.`;
        } else {
          pageTitle = `${caseItem.name} — Кейс веб-разработки | VANTA LAB`;
          pageDesc = goal || `Кейс разработки веб-проекта ${caseItem.name} цифровой студией VANTA LAB.`;
        }
      }
    }

    document.title = pageTitle;

    // Standard meta tags
    setMeta('name', 'description', pageDesc);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDesc);
    setMeta('property', 'og:locale', t.seo.ogLocale);

    // Exact Canonical & Open Graph URL per route
    const currentUrl = `${SITE_ORIGIN}${rawPath === '/' ? '/' : rawPath}`;
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', rawPath === '/' ? 'website' : 'article');
    setMeta('property', 'og:image', `${SITE_ORIGIN}/og.png`);
    setMeta('property', 'og:image:secure_url', `${SITE_ORIGIN}/og.png`);

    // Twitter card
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDesc);
    setMeta('name', 'twitter:image', `${SITE_ORIGIN}/og.png`);

    // Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Multilingual hreflang alternates
    ensureHreflangLink('ru', currentUrl);
    ensureHreflangLink('en', currentUrl);
    ensureHreflangLink('uz', currentUrl);
    ensureHreflangLink('x-default', currentUrl);

    // Dynamic JSON-LD BreadcrumbList for rich Google Search results
    if (rawPath !== '/') {
      const segments = rawPath.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'en' ? 'Home' : lang === 'uz' ? 'Bosh sahifa' : 'Главная',
          item: `${SITE_ORIGIN}/`,
        },
      ];

      let accumulated = '';
      segments.forEach((seg, idx) => {
        accumulated += `/${seg}`;
        let name = seg;
        if (seg === 'services') name = lang === 'en' ? 'Services' : lang === 'uz' ? 'Xizmatlar' : 'Услуги';
        else if (seg === 'portfolio') name = lang === 'en' ? 'Portfolio' : lang === 'uz' ? 'Portfolio' : 'Портфолио';
        else if (seg === 'contact') name = lang === 'en' ? 'Contact' : lang === 'uz' ? 'Aloqa' : 'Контакты';
        else if (caseDetails[seg]) name = caseDetails[seg].name;

        breadcrumbItems.push({
          '@type': 'ListItem',
          position: idx + 2,
          name,
          item: `${SITE_ORIGIN}${accumulated}`,
        });
      });

      setJsonLd('schema-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      });
    } else {
      const existingBreadcrumb = document.getElementById('schema-breadcrumb');
      if (existingBreadcrumb) existingBreadcrumb.remove();
    }
  }, [location.pathname, lang, t.seo.title, t.seo.description, t.seo.ogLocale]);

  return null;
}
