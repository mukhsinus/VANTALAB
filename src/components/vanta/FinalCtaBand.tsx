import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export const FinalCtaBand = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="vanta-cta-slab px-8 py-14 md:px-16 md:py-16 text-center md:text-left md:flex md:items-center md:justify-between gap-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{t.home.finalCtaTitle}</h2>
            <p className="mt-3 text-sm md:text-base text-white/45 leading-relaxed">{t.home.finalCtaSub}</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-3 shrink-0 justify-center md:justify-end">
            <Button variant="vanta" size="lg" className="h-12 px-8 rounded-2xl" asChild>
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>
            <Button variant="vanta-ghost" size="lg" className="h-12 px-8 rounded-2xl" asChild>
              <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                {t.hero.cta1}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
