import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { serviceIcons } from '@/lib/service-icons';
import { ArrowUpRight } from 'lucide-react';

export const ServicesPreview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-24 border-t border-white/[0.08] bg-[#06070A]">
      <div className="container min-w-0">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">
                {t.home.servicesKicker}
              </p>
              <h2 className="mt-2 font-heading font-bold text-2xl xs:text-3xl md:text-4xl tracking-tight text-[#F4F5F7] max-w-2xl leading-tight">
                {t.services.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#8B8F98] max-w-xl leading-relaxed">
                {t.home.servicesLead}
              </p>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#8B8F98] hover:text-[#F4F5F7] transition-colors group"
            >
              {t.services.title}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {t.services.items.slice(0, 3).map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#0D0F13] p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.18] flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="size-5 text-[#F4F5F7]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-heading font-bold text-lg text-[#F4F5F7]">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#8B8F98] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <span className="text-xs font-medium text-[#8B8F98]">0{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 md:hidden flex justify-start">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#8B8F98] hover:text-[#F4F5F7] transition-colors group"
          >
            {t.services.title}
            <ArrowUpRight className="size-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
