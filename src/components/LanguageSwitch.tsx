import { motion, LayoutGroup } from 'framer-motion';
import { useLanguage, type Lang } from '@/lib/i18n';

const ORDER: Lang[] = ['ru', 'en', 'uz'];

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`relative flex items-center rounded-full border border-white/[0.08] bg-[#0D0F13] p-1 gap-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      <LayoutGroup id="lang-switcher-group">
        {ORDER.map(code => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className="relative flex h-7 min-w-[32px] sm:min-w-[36px] items-center justify-center rounded-full px-2 text-[11px] font-medium tracking-normal text-[#8B8F98] outline-none transition-colors hover:text-[#F4F5F7] focus-visible:ring-2 focus-visible:ring-white/40 data-[active=true]:text-[#F4F5F7]"
            data-active={lang === code}
          >
            {lang === code && (
              <motion.span
                layoutId="vanta-lang-pill"
                className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/15"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                style={{ pointerEvents: 'none' }}
              />
            )}
            <span className="relative z-10 uppercase">{code}</span>
          </button>
        ))}
      </LayoutGroup>
    </div>
  );
}
