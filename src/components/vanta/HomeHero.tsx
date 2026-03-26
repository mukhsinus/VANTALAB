import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import CountUp from '@/components/ui/countUp';
import { AnimatedWireframeBg } from './AnimatedWireframeBgV2';

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
    <section className="relative min-h-[calc(100vh-4.25rem)] flex flex-col items-center justify-center pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      {/* Animated 3D Background */}
      <AnimatedWireframeBg />

      {/* Gradient Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_115%,rgba(108,92,231,0.14),transparent)]"
        animate={reduceMotion ? { opacity: 1 } : { opacity: [0.82, 1, 0.82] }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Content overlay */}
      <motion.div
        className="container relative z-10 min-w-0 flex flex-col items-center text-center px-4"
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
          className="mt-3 sm:mt-4 w-full max-w-[min(100%,42rem)] text-[1.5rem] xs:text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1] sm:leading-[1.05] text-balance"
          variants={itemFadeUp}
        >
          {t.home.headline}
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-5 w-full max-w-xl text-[14px] sm:text-base md:text-lg text-white/50 leading-relaxed text-balance"
          variants={itemFadeUp}
        >
          {t.home.subline}
        </motion.p>

        <motion.div
          className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-lg"
          variants={itemFadeUp}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <Button
              variant="vanta"
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 rounded-full text-[13px] sm:text-[14px] w-full xs:w-auto min-w-[200px] justify-center"
              asChild
            >
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
            <Button
              variant="vanta-ghost"
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 rounded-full text-[13px] sm:text-[14px] w-full xs:w-auto min-w-[200px] justify-center"
              asChild
            >
              <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                {t.hero.cta1}
                <ArrowRight className="size-4 opacity-70" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-8 md:gap-x-8 w-full max-w-3xl md:max-w-4xl justify-items-center">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white">
              <CountUp end={10} suffix="+" />
            </p>
            <p className="text-[11px] md:text-sm text-white/50 mt-1">
              {t.stats.projects}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white">
              <CountUp end={6} suffix="+" />
            </p>
            <p className="text-[11px] md:text-sm text-white/50 mt-1">
              {t.stats.clients}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white">
              <CountUp end={1} suffix="+" />
            </p>
            <p className="text-[11px] md:text-sm text-white/50 mt-1">
              {t.stats.years}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white">
              <CountUp end={40} suffix="%" />
            </p>
            <p className="text-[11px] md:text-sm text-white/50 mt-1">
              {t.stats.conversion}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
