import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { serviceIcons } from '@/lib/service-icons';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16 md:pt-20 pb-24 md:pb-32">
      <div className="container mx-auto px-6">
        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7]">{t.nav.services}</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.08]">
            {t.services.title}
          </h1>
          <p className="mt-5 text-lg text-white/45 max-w-2xl leading-relaxed">{t.services.subtitle}</p>
        </FadeIn>

        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5 md:gap-6">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i] ?? serviceIcons[0];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 glow-border-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#6C5CE7]/20 bg-[#6C5CE7]/[0.08] transition-colors group-hover:border-[#6C5CE7]/35">
                  <Icon className="size-6 text-[#B4A9F7]" strokeWidth={1.5} />
                </div>
                <h2 className="mt-8 text-xl font-semibold text-white">{service.name}</h2>
                <p className="mt-3 text-sm md:text-base text-white/45 leading-relaxed max-w-md">{service.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-24 md:mt-32">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{t.process.title}</h2>
          </FadeIn>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="rounded-[1.25rem] border border-white/[0.08] bg-[#0A0A0A] p-6 min-h-[160px] flex flex-col"
              >
                <span className="text-sm font-semibold tabular-nums text-[#6C5CE7]/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{step.name}</h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed flex-1">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <FadeIn className="mt-20 flex justify-center">
          <Button variant="vanta" size="lg" className="h-12 px-10 rounded-2xl" asChild>
            <Link to="/contact">{t.nav.startProject}</Link>
          </Button>
        </FadeIn>
      </div>
    </div>
  );
};

export default Services;
