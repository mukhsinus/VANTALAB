import { motion, LayoutGroup } from 'framer-motion';
import { useLanguage, type Lang } from '@/lib/i18n';

const ORDER: Lang[] = ['ru', 'en', 'uz'];

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`lang-switcher lang-switcher--nav-bar relative flex rounded-full border border-white/10 bg-black/25 p-1 gap-0.5 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      <LayoutGroup id="lang-switcher-group">
        {ORDER.map(code => (
          <motion.button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className="relative flex min-h-[30px] min-w-[34px] sm:min-w-[40px] items-center justify-center rounded-full px-1  text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] text-white/50 outline-none transition-colors hover:text-white/85 focus-visible:ring-2 focus-visible:ring-[#6C5CE7]/50 data-[active=true]:text-white"
            data-active={lang === code}
            animate={{ scale: lang === code ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {lang === code && (
              <motion.span
                layoutId="vanta-lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#6C5CE7]   border border-[#6C5CE7]/50 shadow-[0_0_20px_rgba(108,92,231,0.4)]"
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                style={{ pointerEvents: 'none' }}
              />
            )}
            <span className="relative z-10">{code.toUpperCase()}</span>
          </motion.button>
        ))}
      </LayoutGroup>
    </div>
  );
}
