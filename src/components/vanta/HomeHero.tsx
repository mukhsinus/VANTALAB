import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

const fade = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export const HomeHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[min(92vh,880px)] flex flex-col justify-end pb-16 md:pb-24 pt-28 md:pt-32 overflow-hidden mesh-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_120%,rgba(108,92,231,0.12),transparent)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.p
          className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#6C5CE7]"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.kicker}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-[14ch] sm:max-w-none text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-tight text-white leading-[1.05]"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.headline}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base md:text-lg text-white/50 leading-relaxed"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.subline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button variant="vanta" size="lg" className="h-12 px-8 rounded-2xl text-[15px]" asChild>
            <Link to="/contact">{t.nav.startProject}</Link>
          </Button>
          <Button variant="vanta-ghost" size="lg" className="h-12 px-8 rounded-2xl text-[15px]" asChild>
            <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
              {t.hero.cta1}
              <ArrowRight className="size-4 opacity-70" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-3xl border-t border-white/[0.06] pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {[
            { n: '10+', l: t.stats.projects },
            { n: '6+', l: t.stats.clients },
            { n: '1+', l: t.stats.years },
            { n: '40%', l: t.stats.conversion },
          ].map((s, i) => (
            <div key={i} className="text-left">
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white tabular-nums">{s.n}</p>
              <p className="mt-1 text-xs md:text-sm text-white/40 leading-snug">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
