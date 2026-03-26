import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { serviceIcons } from '@/lib/service-icons';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServicesPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-26 border-t border-white/[0.06] bg-white/[0.015]">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7]">
            {t.home.servicesKicker}
          </p>
          <h2 className="mt-3 text-2xl xs:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl leading-tight">
            {t.services.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/45 max-w-xl leading-relaxed">{t.home.servicesLead}</p>
        </FadeIn>

        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.services.items.slice(0, 3).map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-[1.25rem] border border-white/[0.08] bg-[#0A0A0A]/80 p-6 sm:p-8 glow-border-hover min-h-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6C5CE7]/20 bg-[#6C5CE7]/10">
                  <Icon className="size-5 text-[#B4A9F7]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <FadeIn className="mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/55 hover:text-white transition-colors group"
          >
            {t.services.title}
            <ArrowUpRight className="size-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};
