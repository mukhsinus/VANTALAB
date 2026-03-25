/** Canonical site origin for hreflang and OG URLs. Override with VITE_SITE_ORIGIN in .env */
export const SITE_ORIGIN = (import.meta.env.VITE_SITE_ORIGIN as string | undefined)?.replace(/\/$/, '') || 'https://vantalab.uz';
