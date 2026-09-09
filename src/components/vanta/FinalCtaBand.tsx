import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/FadeIn';

export const FinalCtaBand = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#06070A]">
      <div className="container min-w-0">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0D0F13] px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Apple Burgundy ambient inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(136,19,55,0.14),transparent_65%)]" />
            {/* Subtle top hairline Apple Burgundy highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#be123c]/45 to-transparent" />

            <div className="max-w-xl text-left">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#F4F5F7] leading-tight">
                {t.home.finalCtaTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#8B8F98] leading-relaxed">
                {t.home.finalCtaSub}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Button variant="vanta" size="lg" className="h-12 px-7 text-xs font-semibold rounded-full" asChild>
                <Link to="/contact">{t.nav.startProject}</Link>
              </Button>
              <Button variant="vanta-ghost" size="lg" className="h-12 px-7 text-xs font-medium rounded-full" asChild>
                <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                  {t.hero.cta1}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
