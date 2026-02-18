import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.pricing.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.pricing.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {t.pricing.items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className={`relative p-7 rounded-2xl border h-full flex flex-col ${
                  'popular' in item && item.popular
                    ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10'
                    : 'border-border bg-card'
                }`}
              >
                {'popular' in item && item.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                    TOP
                  </span>
                )}
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 text-2xl md:text-3xl font-bold text-accent">{item.price}</p>
                <ul className="mt-6 space-y-3 flex-1">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-6 w-full" asChild>
                  <a href="/contacts">{t.hero.cta2}</a>
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
