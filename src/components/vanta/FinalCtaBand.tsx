import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export const FinalCtaBand = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="container min-w-0">
        <motion.div
          className="vanta-cta-slab px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-14 lg:px-16 lg:py-16 text-center md:text-left md:flex md:items-center md:justify-between gap-8 md:gap-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
              {t.home.finalCtaTitle}
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/45 leading-relaxed">{t.home.finalCtaSub}</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-3 shrink-0 justify-center md:justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <Button variant="vanta" size="lg" className="h-12 px-8 rounded-full" asChild>
                <Link to="/contact">{t.nav.startProject}</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <Button variant="vanta-ghost" size="lg" className="h-12 px-8 rounded-full" asChild>
                <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                  {t.hero.cta1}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
