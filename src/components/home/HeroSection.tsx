import { useLanguage } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  // Разделяем title по \n
  const [titleLine1, titleLine2] = t.hero.title.split('\n');

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#18191c] to-[#232325]">
      <div className="w-full flex flex-col items-center justify-center px-4 py-24">

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white text-center">
          <span>{titleLine1}</span><br />
          <span className="block text-[hsl(42,100%,50%)]">
            {titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 text-center max-w-2xl">
          {t.hero.subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/LLC_VANTALAB"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-[hsl(42,100%,50%)] text-black font-bold text-lg shadow-lg hover:bg-yellow-400 transition"
          >
            📨 {t.hero.cta1}
          </a>

          <a
            href="/contacts"
            className="px-8 py-4 rounded-2xl border border-gray-400 text-white font-bold text-lg shadow-lg hover:bg-gray-800 transition flex items-center gap-2 justify-center"
          >
            {t.hero.cta2} <ArrowRight size={20} />
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl w-full">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">10+</p>
            <p className="text-sm text-gray-300 mt-1">{t.stats.projects}</p>
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">6+</p>
            <p className="text-sm text-gray-300 mt-1">{t.stats.clients}</p>
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">1+</p>
            <p className="text-sm text-gray-300 mt-1">{t.stats.years}</p>
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">40%</p>
            <p className="text-sm text-gray-300 mt-1">{t.stats.conversion}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;