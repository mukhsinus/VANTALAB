import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="relative rounded-3xl hero-gradient p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/60 max-w-lg mx-auto">
                {t.cta.subtitle}
              </p>
              <Button variant="hero" size="xl" className="mt-8" asChild>
                <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                  <Send size={18} />
                  {t.cta.button}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CTASection;
