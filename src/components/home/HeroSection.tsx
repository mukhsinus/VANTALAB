// HeroSection.tsx
import { useLanguage } from '@/lib/i18n'
import { ArrowRight } from 'lucide-react'
import heroBg from '@/assets/hero-bg2.webp'
import heroBgMobile from '@/assets/hero-bg-mobile.png'
import CountUp from '../ui/countUp'

const HeroSection = () => {
  const { t } = useLanguage()
  const [titleLine1, titleLine2] = t.hero.title.split('\n')

  return (
    <section
      id="hero"
      className="relative h-[100svh] md:h-screen flex flex-col items-center justify-center"
    >
      {/* Background image */}
      <picture>
        <source srcSet={heroBgMobile} media="(max-width: 767px)" />
        <source srcSet={heroBg} media="(min-width: 768px)" />
        <img
          src={heroBg}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          aria-hidden="true"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 pb-8">

        {/* Title */}
        {/* <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white text-center">
          <span>{titleLine1}</span>
          <br />
          <span className="block text-[hsl(42,100%,50%)]">
            {titleLine2}
          </span>
        </h1> */}

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-300 text-center max-w-5xl leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/LLC_VANTALAB"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-[hsl(42,100%,50%)] text-black font-bold text-base sm:text-lg shadow-lg hover:bg-yellow-400 transition"
          >
             {t.hero.cta1}
          </a>

          <a
            href="/contacts"
            className="px-5 py-3 sm:px-8 sm:py-4 rounded-full border border-gray-400 text-white font-bold text-base sm:text-lg shadow-lg hover:bg-gray-800 transition flex items-center gap-2 justify-center"
          >
            {t.hero.cta2}
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl w-full">

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">
              <CountUp end={10} suffix="+" />
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {t.stats.projects}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">
              <CountUp end={6} suffix="+" />
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {t.stats.clients}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">
              <CountUp end={1} suffix="+" />
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {t.stats.years}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-4xl font-bold text-[hsl(42,100%,50%)]">
              <CountUp end={40} suffix="%" />
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              {t.stats.conversion}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection