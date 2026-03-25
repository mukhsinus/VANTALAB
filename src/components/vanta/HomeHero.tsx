import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { HeroAnimatedStats } from '@/components/vanta/HeroAnimatedStats';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const HomeHero = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[min(88dvh,860px)] sm:min-h-[min(92dvh,880px)] flex flex-col items-center justify-end pb-12 sm:pb-16 md:pb-24 pt-[max(6.5rem,calc(env(safe-area-inset-top)+5.5rem))] md:pt-32 overflow-hidden mesh-bg">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_115%,rgba(108,92,231,0.14),transparent)]"
        animate={reduceMotion ? { opacity: 1 } : { opacity: [0.82, 1, 0.82] }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      <motion.div
        className="container relative z-10 min-w-0 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#6C5CE7] max-w-2xl"
          variants={itemFadeUp}
        >
          {t.home.kicker}
        </motion.p>

        <motion.h1
          className="mt-4 sm:mt-5 w-full max-w-[min(100%,42rem)] text-[1.65rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-semibold tracking-tight text-white leading-[1.08] sm:leading-[1.05] text-balance"
          variants={itemFadeUp}
        >
          {t.home.headline}
        </motion.h1>

        <motion.p
          className="mt-5 sm:mt-6 w-full max-w-xl text-[15px] sm:text-base md:text-lg text-white/50 leading-relaxed text-balance"
          variants={itemFadeUp}
        >
          {t.home.subline}
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-lg"
          variants={itemFadeUp}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <Button
              variant="vanta"
              size="lg"
              className="h-12 sm:h-[3.25rem] px-6 sm:px-8 rounded-2xl text-[14px] sm:text-[15px] w-full xs:w-auto min-w-[200px] justify-center"
              asChild
            >
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <Button
              variant="vanta-ghost"
              size="lg"
              className="h-12 sm:h-[3.25rem] px-6 sm:px-8 rounded-2xl text-[14px] sm:text-[15px] w-full xs:w-auto min-w-[200px] justify-center"
              asChild
            >
              <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                {t.hero.cta1}
                <ArrowRight className="size-4 opacity-70" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroAnimatedStats labels={t.stats} />
        </motion.div>
      </motion.div>
    </section>
  );
};
