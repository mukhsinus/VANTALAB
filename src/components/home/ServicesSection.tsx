import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Layout, Building2, ShoppingCart, Code2, Bot } from 'lucide-react';

const serviceIcons = [Layout, Building2, ShoppingCart, Code2, Bot];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.services.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.services.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all hover:shadow-lg group h-[240px]">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-muted-foreground">{service.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Process */}
        <div className="mt-32">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.process.title}</h2>
          </FadeIn>

          <div className="mt-16 grid md:grid-cols-5 gap-4">
            {t.process.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl border border-border bg-card group hover:border-accent/30 transition-colors">
                  <span className="text-4xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
