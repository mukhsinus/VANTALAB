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
      <section className="border-t border-white/[0.08] py-8 sm:py-10 bg-[#06070A]">
        <div className="container min-w-0">
          <p className="text-xs sm:text-sm text-[#8B8F98] max-w-2xl leading-relaxed text-left">
            {t.home.trusted}
          </p>
        </div>
      </section>
      <FeaturedWork />
      <ServicesPreview />
      <FinalCtaBand />
    </>
  );
};

export default Index;
