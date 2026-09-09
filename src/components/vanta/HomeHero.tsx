import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { AnimatedWireframeBg } from './AnimatedWireframeBgV2';

const langCopy = {
  ru: {
    kicker: 'Цифровая студия',
    headline: 'Сайты, которые превращают внимание в клиентов',
    subline:
      'Стратегия, премиальный дизайн и инженерная разработка для брендов, которым нужен измеримый рост.',
    viewCases: 'Смотреть кейсы',
    telegram: 'Написать в Telegram',
    metrics: [
      { value: '+40%', label: 'средний рост конверсии' },
      { value: 'Премиум', label: 'внимание к деталям' },
      { value: 'Инженерия', label: 'быстрая архитектура' },
      { value: 'Под ключ', label: 'от стратегии до запуска' },
    ],
  },
  en: {
    kicker: 'Digital studio',
    headline: 'Websites that turn attention into clients',
    subline:
      'Strategy, premium design, and engineering execution for brands focused on measurable growth.',
    viewCases: 'View case studies',
    telegram: 'Message on Telegram',
    metrics: [
      { value: '+40%', label: 'average conversion uplift' },
      { value: 'Premium', label: 'craft and polish' },
      { value: 'Engineering', label: 'fast scalable architecture' },
      { value: 'Turnkey', label: 'from strategy to launch' },
    ],
  },
  uz: {
    kicker: 'Raqamli studiya',
    headline: "E'tiborni mijozga aylantiradigan saytlar",
    subline:
      "Strategiya, premium dizayn va muhandislik ishlab chiqish — o'sishga muhtoj brendlar uchun.",
    viewCases: 'Keyslarni ko‘rish',
    telegram: 'Telegramda yozish',
    metrics: [
      { value: '+40%', label: "o'rtacha konversiya o'sishi" },
      { value: 'Premium', label: 'detallarga e’tibor' },
      { value: 'Muhandislik', label: 'tezkor arxitektura' },
      { value: 'To‘liq tsikl', label: 'strategiyadan ishga tushirishgacha' },
    ],
  },
} as const;

export const HomeHero = () => {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const copy = langCopy[lang];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-var(--vanta-header-h))] flex flex-col justify-between overflow-hidden pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-12"
    >
      {/* Background Three.js wireframe ribbon strand — single deliberate motion anchor */}
      <div className="absolute inset-0 z-0">
        <AnimatedWireframeBg />
        {/* Apple Burgundy ambient focal layer on the right visual field */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_78%_38%,rgba(136,19,55,0.2),transparent_65%)]" />
        {/* Asymmetric vignette mask keeping left content calm and ultra-readable */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_50%,#06070A_30%,rgba(6,7,10,0.85)_65%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06070A] to-transparent" />
      </div>

      <div className="container relative z-10 min-w-0">
        <div className="max-w-3xl text-left">
          {/* Sentence case kicker */}
          <p className="text-xs sm:text-sm font-medium text-[#8B8F98] tracking-normal">
            {copy.kicker}
          </p>

          {/* Manrope headline, tight tracking, sentence case, no gimmicky colored word span */}
          <h1 className="mt-4 font-heading font-extrabold text-[clamp(2.25rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.035em] text-[#F4F5F7] text-balance">
            {copy.headline}
          </h1>

          {/* Restrained body subline */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[#8B8F98] max-w-2xl leading-relaxed font-normal">
            {copy.subline || t.home.subline}
          </p>

          {/* Action buttons: high contrast off-white primary + hairline ghost */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 max-w-md">
            <Button
              variant="vanta"
              size="lg"
              className="h-12 px-7 text-sm font-semibold rounded-full shadow-sm"
              asChild
            >
              <Link to="/contact">
                {t.nav.startProject}
              </Link>
            </Button>

            <Button
              variant="vanta-ghost"
              size="lg"
              className="h-12 px-6 text-sm font-medium rounded-full"
              asChild
            >
              <Link to="/portfolio" className="inline-flex items-center gap-2">
                {copy.viewCases}
                <ArrowRight className="size-4 opacity-70" />
              </Link>
            </Button>

            <Button
              variant="vanta-ghost"
              size="lg"
              className="h-12 px-5 text-sm font-medium rounded-full sm:hidden"
              asChild
            >
              <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Send className="size-4 opacity-70" />
                {copy.telegram}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Grounded trust metric strip along hairline border */}
      <div className="relative z-10 border-t border-white/[0.08] mt-16 sm:mt-20 pt-6 sm:pt-8 bg-[#06070A]/50 backdrop-blur-sm">
        <div className="container min-w-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {copy.metrics.map((m, i) => (
              <div key={i} className="min-w-0">
                <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#F4F5F7]">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-[#8B8F98] leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
