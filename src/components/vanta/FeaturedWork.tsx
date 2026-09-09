import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { caseDetails } from '@/data/caseDetails';
import FadeIn from '@/components/FadeIn';

export const FeaturedWork = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const display = Object.entries(caseDetails)
    .map(([id, c]) => ({ id, ...c }))
    .filter(c => c.image)
    .slice(0, 3);

  const leadCase = display[0];
  const secondaryCases = display.slice(1);

  return (
    <section className="py-16 sm:py-20 md:py-24 border-t border-white/[0.08] bg-[#06070A]">
      <div className="container min-w-0">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">
                {t.nav.portfolio}
              </p>
              <h2 className="mt-2 font-heading font-bold text-2xl xs:text-3xl md:text-4xl tracking-tight text-[#F4F5F7] max-w-2xl leading-tight">
                {t.home.featuredTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#8B8F98] max-w-xl leading-relaxed">
                {t.home.featuredSubtitle}
              </p>
            </div>
            <Link
              to="/portfolio"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#8B8F98] hover:text-[#F4F5F7] transition-colors group"
            >
              {t.home.viewPortfolio}
              <ArrowUpRight className="size-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-10 sm:mt-12 md:mt-14 space-y-6">
          {/* Lead flagship project with prominent layout hierarchy */}
          {leadCase && (
            <button
              type="button"
              onClick={() => navigate(`/portfolio/${leadCase.id}`)}
              className="w-full text-left rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0D0F13] overflow-hidden group transition-all duration-300 hover:border-white/[0.18] focus-visible:ring-2 focus-visible:ring-white/40 focus:outline-none grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[360px] relative overflow-hidden bg-black/40">
                <img
                  src={leadCase.image}
                  alt={leadCase.name}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F13] via-transparent to-transparent lg:hidden" />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-[#9f1239]/40 bg-[#881337]/15 px-3 py-1 text-[11px] font-medium text-[#fecdd3]">
                      {leadCase.results[lang]?.[1] ?? leadCase.results[lang]?.[0] ?? ''}
                    </span>
                    <span className="text-xs font-medium text-[#8B8F98] flex items-center gap-1 group-hover:text-[#F4F5F7] transition-colors">
                      {t.cases.viewCase}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading font-bold text-xl sm:text-2xl text-[#F4F5F7]">
                    {leadCase.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#8B8F98]">
                    {leadCase.features[lang]?.[0] ?? ''}
                  </p>
                  <p className="mt-4 text-sm text-[#8B8F98] leading-relaxed">
                    {leadCase.results[lang]?.[0] ?? ''}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#8B8F98]">
                  <span>{leadCase.stack.slice(0, 3).join(' / ')}</span>
                  <span>{leadCase.timeline}</span>
                </div>
              </div>
            </button>
          )}

          {/* Secondary projects in clean 2-column hierarchy */}
          {secondaryCases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryCases.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(`/portfolio/${c.id}`)}
                  className="w-full text-left rounded-2xl border border-white/[0.08] bg-[#0D0F13] overflow-hidden group transition-all duration-300 hover:border-white/[0.18] focus-visible:ring-2 focus-visible:ring-white/40 focus:outline-none flex flex-col"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-black/40">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-[#F4F5F7]">
                          {c.results[lang]?.[1] ?? c.results[lang]?.[0] ?? ''}
                        </span>
                        <span className="text-xs font-medium text-[#8B8F98] flex items-center gap-1 group-hover:text-[#F4F5F7] transition-colors">
                          {t.cases.viewCase}
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </div>
                      <h3 className="mt-4 font-heading font-bold text-lg text-[#F4F5F7]">
                        {c.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#8B8F98] leading-relaxed">
                        {c.results[lang]?.[0] ?? ''}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 md:hidden flex justify-start">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#8B8F98] hover:text-[#F4F5F7] transition-colors group"
          >
            {t.home.viewPortfolio}
            <ArrowUpRight className="size-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
