import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-32 border-t border-white/[0.06]">
      <div className="container min-w-0">
        <FadeIn>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6C5CE7]">
            {t.nav.portfolio}
          </p>
          <h2 className="mt-3 text-2xl xs:text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl leading-tight">
            {t.home.featuredTitle}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/45 max-w-xl leading-relaxed">
            {t.home.featuredSubtitle}
          </p>
        </FadeIn>

        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {display.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => navigate(`/portfolio/${c.id}`)}
              className="group text-left rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] overflow-hidden glow-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7]/50"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
              whileTap={{ scale: 0.992 }}
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-white/[0.04]">
                {c.image && (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent" />
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white/90 hover:border-[#6C5CE7]/40 transition-colors"
                >
                  {t.cases.liveDemo}
                  <ArrowUpRight className="size-3.5 opacity-80" />
                </a>
              </div>
              <div className="p-5 sm:p-6 md:p-7">
                <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-3 xs:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-white transition-colors">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/40">{c.features[lang]?.[0] ?? ''}</p>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/25 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#B4A9F7] tabular-nums">
                    {c.results[lang]?.[1] ?? c.results[lang]?.[0] ?? ''}
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/50 leading-relaxed">{c.results[lang]?.[0] ?? ''}</p>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#6C5CE7]/90">
                  {t.home.metricLabel}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <FadeIn className="mt-12 flex justify-center md:justify-start">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/55 hover:text-white transition-colors group"
          >
            {t.home.viewPortfolio}
            <ArrowUpRight className="size-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};
