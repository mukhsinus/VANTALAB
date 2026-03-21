import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { HeroAnimatedStats } from '@/components/vanta/HeroAnimatedStats';

const fade = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export const HomeHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[min(88dvh,860px)] sm:min-h-[min(92dvh,880px)] flex flex-col justify-end pb-12 sm:pb-16 md:pb-24 pt-[max(6.5rem,calc(env(safe-area-inset-top)+5.5rem))] md:pt-32 overflow-hidden mesh-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_115%,rgba(108,92,231,0.14),transparent)]" />

      <div className="container relative z-10 min-w-0">
        <motion.p
          className="text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#6C5CE7]"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.kicker}
        </motion.p>

        <motion.h1
          className="mt-4 sm:mt-5 max-w-[18ch] xs:max-w-none text-[1.65rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-semibold tracking-tight text-white leading-[1.08] sm:leading-[1.05]"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.headline}
        </motion.h1>

        <motion.p
          className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-base md:text-lg text-white/50 leading-relaxed"
          initial={fade.initial}
          animate={fade.animate}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {t.home.subline}
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col xs:flex-row gap-3 sm:gap-4 w-full xs:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button
            variant="vanta"
            size="lg"
            className="h-12 sm:h-[3.25rem] px-6 sm:px-8 rounded-2xl text-[14px] sm:text-[15px] w-full xs:w-auto justify-center"
            asChild
          >
            <Link to="/contact">{t.nav.startProject}</Link>
          </Button>
          <Button
            variant="vanta-ghost"
            size="lg"
            className="h-12 sm:h-[3.25rem] px-6 sm:px-8 rounded-2xl text-[14px] sm:text-[15px] w-full xs:w-auto justify-center"
            asChild
          >
            <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
              {t.hero.cta1}
              <ArrowRight className="size-4 opacity-70" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <HeroAnimatedStats labels={t.stats} />
        </motion.div>
      </div>
    </section>
  );
};
