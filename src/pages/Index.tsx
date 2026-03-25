import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { HomeHero } from '@/components/vanta/HomeHero';
import { FeaturedWork } from '@/components/vanta/FeaturedWork';
import { ServicesPreview } from '@/components/vanta/ServicesPreview';
import { FinalCtaBand } from '@/components/vanta/FinalCtaBand';

const Index = () => {
  const { t } = useLanguage();

  return (
    <>
      <HomeHero />
      <motion.section
        className="border-t border-white/[0.06] py-10 md:py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container min-w-0">
          <p className="text-center text-xs sm:text-[13px] md:text-sm text-white/35 tracking-wide max-w-2xl mx-auto leading-relaxed px-1">
            {t.home.trusted}
          </p>
        </div>
      </motion.section>
      <FeaturedWork />
      <ServicesPreview />
      <FinalCtaBand />
    </>
  );
};

export default Index;
