import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { Globe, Shield, Clock, Swords } from 'lucide-react';

const icons = [Globe, Shield, Clock, Swords];

const WhySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t.why.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.why.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center overflow-x-auto md:overflow-x-visible w-full md:w-auto px-2 md:px-0">
          {t.why.points.map((point, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-accent/30 transition-colors group w-[290px] h-[230px] flex flex-col justify-start mx-auto">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">{point.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
