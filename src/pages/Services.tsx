import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { serviceIcons } from '@/lib/service-icons';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">
            {t.nav.services}
          </p>
          <h1 className="mt-2 font-heading font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F4F5F7] max-w-3xl leading-[1.05]">
            {t.services.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B8F98] max-w-2xl leading-relaxed">
            {t.services.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i] ?? serviceIcons[0];
            return (
              <article
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#0D0F13] p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-white/[0.18] flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="size-5 text-[#F4F5F7]" strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-6 font-heading font-bold text-lg sm:text-xl text-[#F4F5F7]">
                    {service.name}
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base text-[#8B8F98] leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8B8F98]">
                  <span>0{i + 1}</span>
                  <span>VANTA LAB</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32">
          <FadeIn>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-[#F4F5F7]">
              {t.process.title}
            </h2>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.process.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-[#0D0F13] p-5 sm:p-6 flex flex-col justify-between transition-all hover:border-white/[0.16]"
              >
                <div>
                  <span className="font-heading text-xs font-semibold tabular-nums text-[#8B8F98]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-heading font-bold text-base text-[#F4F5F7]">{step.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#8B8F98] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 flex justify-center">
          <Button variant="vanta" size="lg" className="h-12 px-8 rounded-full" asChild>
            <Link to="/contact">{t.nav.startProject}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
