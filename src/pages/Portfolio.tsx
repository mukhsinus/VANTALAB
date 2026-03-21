import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import FadeIn from '@/components/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { portfolioCases } from '@/data/portfolio-cases';

const Portfolio = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28 lg:pb-32">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7]">
            {t.nav.portfolio}
          </p>
          <h1 className="mt-3 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-3xl leading-[1.08]">
            {t.cases.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/45 max-w-2xl leading-relaxed">
            {t.cases.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {portfolioCases.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => navigate(`/portfolio/${c.id}`)}
              className="group text-left rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden glow-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7]/50"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="aspect-video relative overflow-hidden bg-white/[0.04]">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30 text-sm">—</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent" />
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white/90 hover:border-[#6C5CE7]/40 transition-colors"
                  >
                    Live
                    <ArrowUpRight className="size-3.5 opacity-80" />
                  </a>
                ) : null}
              </div>
              <div className="p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 min-w-0">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-white">{c.name}</h2>
                  <p className="mt-1 text-xs sm:text-sm text-white/40">{c.type[lang]}</p>
                  <p className="mt-3 sm:mt-4 text-sm text-white/50 leading-relaxed max-w-md">{c.highlight[lang]}</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 w-full sm:w-auto pt-3 border-t border-white/[0.06] sm:border-0 sm:pt-0">
                  <span className="rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/25 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-[#B4A9F7] whitespace-nowrap">
                    {c.metric[lang]}
                  </span>
                  <span className="text-xs font-medium text-[#6C5CE7]/90 flex items-center gap-1">
                    {t.cases.viewCase}
                    <ArrowUpRight className="size-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
