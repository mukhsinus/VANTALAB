import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { SITE_ORIGIN } from '@/lib/site';

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

/**
 * Syncs document title, html[lang], meta description, Open Graph, and hreflang
 * with the active UI language (SPA multilingual SEO).
 */
export function SeoHead() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const htmlLang = lang === 'ru' ? 'ru' : lang === 'uz' ? 'uz' : 'en';
    document.documentElement.lang = htmlLang;
    document.title = t.seo.title;

    setMeta('name', 'description', t.seo.description);
    setMeta('property', 'og:title', t.seo.title);
    setMeta('property', 'og:description', t.seo.description);
    setMeta('property', 'og:locale', t.seo.ogLocale);
    setMeta('property', 'og:url', `${SITE_ORIGIN}/`);
    setMeta('property', 'og:type', 'website');

    const canonical = `${SITE_ORIGIN}/`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    ensureHreflangLink('ru', `${SITE_ORIGIN}/`);
    ensureHreflangLink('en', `${SITE_ORIGIN}/`);
    ensureHreflangLink('uz', `${SITE_ORIGIN}/`);
    ensureHreflangLink('x-default', `${SITE_ORIGIN}/`);
  }, [lang, t.seo.title, t.seo.description, t.seo.ogLocale]);

  return null;
}
