import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { caseDetails } from '@/data/caseDetails';

const Portfolio = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const portfolioCases = Object.entries(caseDetails).map(([id, c]) => ({
    id,
    ...c,
  }));

  return (
    <div className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-xs sm:text-sm font-medium text-[#8B8F98]">
            {t.nav.portfolio}
          </p>
          <h1 className="mt-2 font-heading font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F4F5F7] max-w-3xl leading-[1.05]">
            {t.cases.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8B8F98] max-w-2xl leading-relaxed">
            {t.cases.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {portfolioCases.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate(`/portfolio/${c.id}`)}
              className="group text-left rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0D0F13] overflow-hidden transition-all duration-300 hover:border-white/[0.18] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-black/40">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#8B8F98] text-sm">—</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F13]/80 via-transparent to-transparent" />
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#F4F5F7] hover:border-white/30 transition-colors"
                >
                  {t.cases.liveDemo}
                  <ArrowUpRight className="size-3.5 opacity-80" />
                </a>
              </div>
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-1">
                <div className="min-w-0">
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-[#F4F5F7]">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#8B8F98]">{c.features[lang]?.[0] ?? ''}</p>
                  <p className="mt-3 text-sm text-[#8B8F98] leading-relaxed max-w-md">{c.results[lang]?.[0] ?? ''}</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 w-full sm:w-auto pt-3 border-t border-white/[0.06] sm:border-0 sm:pt-0">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-[#F4F5F7] whitespace-nowrap">
                    {c.results[lang]?.[1] ?? c.results[lang]?.[0] ?? ''}
                  </span>
                  <span className="text-xs font-medium text-[#8B8F98] group-hover:text-[#F4F5F7] flex items-center gap-1 transition-colors">
                    {t.cases.viewCase}
                    <ArrowUpRight className="size-3.5 opacity-70" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
