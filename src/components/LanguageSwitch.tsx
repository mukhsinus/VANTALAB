import { motion } from 'framer-motion';
import { useLanguage, type Lang } from '@/lib/i18n';

const ORDER: Lang[] = ['ru', 'en', 'uz'];

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`lang-switcher lang-switcher--nav-bar relative flex rounded-full border border-white/10 bg-black/25 p-0.5 gap-0.5 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {ORDER.map(code => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className="relative flex min-h-[36px] min-w-[34px] sm:min-w-[40px] items-center justify-center rounded-full px-2 py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-white/50 outline-none transition-colors hover:text-white/85 focus-visible:ring-2 focus-visible:ring-[#6C5CE7]/50 data-[active=true]:text-white"
          data-active={lang === code}
        >
          {lang === code ? (
            <motion.span
              layoutId="vanta-lang-pill"
              className="absolute inset-0 rounded-full bg-[#6C5CE7]/22 border border-[#6C5CE7]/42 shadow-[0_0_24px_-8px_rgba(108,92,231,0.55)]"
              transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.75 }}
            />
          ) : null}
          <span className="relative z-10">{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
