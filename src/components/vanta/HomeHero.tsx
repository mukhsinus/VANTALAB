import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Gem, Rocket, Send, Target, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import CountUp from '@/components/ui/countUp';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const langCopy = {
  ru: {
    kicker: 'DIGITAL STUDIO / PERFORMANCE DESIGN',
    desktopHeadline: 'Сайты, которые превращают внимание в клиентов',
    mobileHeadline: ['Сайты,', 'которые', 'продают', 'дороже'],
    subline:
      'Стратегия, премиальный дизайн и инженерная разработка для брендов, которым нужен рост.',
    viewCases: 'Смотреть кейсы',
    telegram: 'Написать в Telegram',
    avgUplift: 'средний рост',
    premiumFirst: 'Премиум',
    premiumCaption: 'подход',
    strategyLed: 'Стратегия',
    strategyCaption: 'решения',
    fast: 'Быстро',
    fastCaption: 'реализация',
    dashboardTitle: 'LIVE PROJECT OVERVIEW',
    leads: 'Заявки за месяц',
    conversion: 'Конверсия',
    avgCheck: 'Средний чек',
    currentStage: 'Статус проекта',
    inProgress: 'В разработке',
    results: 'РЕЗУЛЬТАТЫ КЛИЕНТОВ',
  },
  en: {
    kicker: 'DIGITAL STUDIO / PERFORMANCE DESIGN',
    desktopHeadline: 'Websites that turn attention into clients',
    mobileHeadline: ['Websites', 'that', 'sell', 'premium'],
    subline:
      'Strategy, premium design, and engineering execution for brands that need measurable growth.',
    viewCases: 'View case studies',
    telegram: 'Message on Telegram',
    avgUplift: 'average uplift',
    premiumFirst: 'Premium',
    premiumCaption: 'approach',
    strategyLed: 'Strategy',
    strategyCaption: 'solutions',
    fast: 'Fast',
    fastCaption: 'execution',
    dashboardTitle: 'LIVE PROJECT OVERVIEW',
    leads: 'Monthly leads',
    conversion: 'Conversion',
    avgCheck: 'Average order value',
    currentStage: 'Project status',
    inProgress: 'In progress',
    results: 'CLIENT OUTCOMES',
  },
  uz: {
    kicker: 'DIGITAL STUDIO / PERFORMANCE DESIGN',
    desktopHeadline: "E'tiborni mijozga aylantiradigan saytlar",
    mobileHeadline: ['Saytlar', 'ko\'proq', 'qimmatroq', 'sotadi'],
    subline:
      "Strategiya, premium dizayn va muhandislik ishlab chiqish - o'sishga muhtoj brendlar uchun.",
    viewCases: 'Case ko\'rish',
    telegram: 'Telegramda yozish',
    avgUplift: "o'rtacha o'sish",
    premiumFirst: 'Premium',
    premiumCaption: 'yondashuv',
    strategyLed: 'Strategiya',
    strategyCaption: 'yechimlar',
    fast: 'Tez',
    fastCaption: 'ijro',
    dashboardTitle: 'LIVE PROJECT OVERVIEW',
    leads: 'Oy bo\'yicha leadlar',
    conversion: 'Konversiya',
    avgCheck: "O'rtacha chek",
    currentStage: 'Loyiha holati',
    inProgress: 'Jarayonda',
    results: 'MIJOZ NATIJALARI',
  },
} as const;

export const HomeHero = () => {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const copy = langCopy[lang];

  const trustMetrics = [
    { value: <CountUp end={40} suffix="%" />, label: copy.avgUplift },
    { value: copy.premiumFirst, label: copy.premiumCaption },
    { value: copy.strategyLed, label: copy.strategyCaption },
    { value: copy.fast, label: copy.fastCaption },
  ];

  const mobileTrustCards = [
    { icon: TrendingUp, value: trustMetrics[0].value, label: copy.avgUplift },
    { icon: Gem, value: copy.premiumFirst, label: copy.premiumCaption },
    { icon: Target, value: copy.strategyLed, label: copy.strategyCaption },
    { icon: Zap, value: copy.fast, label: copy.fastCaption },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-var(--vanta-header-h))] overflow-hidden pt-10 pb-10 sm:pb-14 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#06060a_0%,#07070d_45%,#08080f_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_17%_24%,rgba(108,92,231,0.2),transparent_36%),radial-gradient(circle_at_78%_58%,rgba(108,92,231,0.18),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(108,92,231,0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_42%_at_50%_105%,rgba(108,92,231,0.35),transparent_66%)]" />

      <motion.div
        className="container relative z-10 px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemFadeUp}
          className="sm:hidden relative mx-auto max-w-[27rem] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_38%,rgba(16,16,26,0.5)_100%)] p-4 shadow-[0_32px_90px_-38px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_84px_-34px_rgba(108,92,231,0.85)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute inset-0 opacity-65 [background:radial-gradient(85%_60%_at_16%_10%,rgba(108,92,231,0.35),transparent_68%),radial-gradient(70%_54%_at_82%_18%,rgba(75,59,165,0.28),transparent_72%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          <div className="pointer-events-none absolute right-[18%] top-[22%] h-48 w-[1px] bg-gradient-to-b from-transparent via-[#9d90ff]/90 to-transparent blur-[0.5px]" />

          <div className="relative z-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9d92ff]">DIGITAL STUDIO</p>
            <h1 className="mt-3 text-[clamp(1.65rem,8.2vw,2.35rem)] leading-snug font-semibold tracking-[-0.03em] text-white text-balance">
              {copy.mobileHeadline.map((word, idx) => (
                <Fragment key={`${idx}-${word}`}>
                  {idx > 0 ? ' ' : null}
                  <span
                    className={
                      idx === 2
                        ? 'bg-gradient-to-b from-[#b4abff] via-[#8d80ff] to-[#6654ff] bg-clip-text text-transparent'
                        : ''
                    }
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </h1>
            <p className="mt-4 max-w-[23rem] text-[13px] leading-snug text-white/62">
              {copy.subline || t.home.subline}
            </p>
          </div>

          <motion.div
            className="pointer-events-none absolute -right-6 bottom-[11.5rem] h-[14rem] w-[13rem]"
            animate={reduceMotion ? undefined : { y: [-4, 6, -4], rotate: [-1.4, 1.8, -1.4] }}
            transition={reduceMotion ? undefined : { duration: 9.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-x-[8%] bottom-0 h-20 rounded-[48%] bg-[radial-gradient(closest-side,rgba(108,92,231,0.42),rgba(108,92,231,0.08)_72%,transparent)] blur-2xl" />
            <div
              className="absolute right-0 bottom-3 h-[10.2rem] w-[9.2rem] rounded-[34%] border border-white/8 bg-[linear-gradient(155deg,#111122_12%,#1f1740_48%,#33265f_100%)] shadow-[0_18px_45px_-24px_rgba(0,0,0,0.95)]"
              style={{ clipPath: 'polygon(52% 0%,100% 56%,74% 100%,24% 100%,0% 56%)' }}
            />
            <div
              className="absolute left-0 bottom-1 h-[8rem] w-[6.6rem] rounded-[34%] border border-white/6 bg-[linear-gradient(165deg,#0e0d18,#171632_54%,#251f49)] opacity-88"
              style={{ clipPath: 'polygon(52% 0%,100% 54%,74% 100%,24% 100%,0% 54%)' }}
            />
          </motion.div>

          <div className="relative z-20 mt-7 space-y-3">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            >
              <Button
                variant="vanta"
                size="lg"
                className="h-12 w-full rounded-[0.95rem] text-[15px] shadow-[0_14px_42px_-14px_rgba(108,92,231,0.86)]"
                asChild
              >
                <Link to="/contact">
                  <Rocket className="size-4" />
                  {t.nav.startProject}
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.012 }}
              whileTap={reduceMotion ? undefined : { scale: 0.986 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            >
              <Button
                variant="vanta-ghost"
                size="lg"
                className="h-12 w-full rounded-[0.95rem] border-white/14 bg-white/[0.03] text-[15px]"
                asChild
              >
                <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                  <Send className="size-4 opacity-80" />
                  {copy.telegram}
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="relative z-20 mt-10 rounded-[1.05rem] border border-white/12 bg-black/32 p-3.5 backdrop-blur-xl">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/58">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f82ff] shadow-[0_0_8px_rgba(143,130,255,0.85)]" />
                LIVE
              </span>
              <span className="text-[#9f94ff]">+</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
                <p className="text-[11px] text-white/45">{copy.leads}</p>
                <p className="mt-1 text-[1.65rem] leading-none font-semibold text-white">1250</p>
                <p className="mt-1 text-xs font-medium text-[#9f94ff]">+41%</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
                <p className="text-[11px] text-white/45">{copy.conversion}</p>
                <p className="mt-1 text-[1.65rem] leading-none font-semibold text-white">3.8%</p>
                <p className="mt-1 text-xs font-medium text-[#9f94ff]">+24%</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span>{copy.currentStage}</span>
                <span>75%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#978cff]"
                  initial={{ width: '0%' }}
                  animate={{ width: '75%' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="relative z-20 mt-3.5 grid grid-cols-4 gap-2 rounded-[1rem] border border-white/10 bg-white/[0.025] p-2.5">
            {mobileTrustCards.map(metric => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="min-w-0 text-center">
                  <Icon className="mx-auto size-3.5 text-[#8f82ff]" />
                  <p className="mt-1.5 truncate text-[12px] leading-none font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 truncate text-[9px] leading-tight text-white/45">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="hidden sm:grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 xl:gap-14 items-start lg:items-center min-h-[calc(100svh-var(--vanta-header-h)-4.25rem)]">
          <div className="max-w-[44rem]">
            <motion.p
              variants={itemFadeUp}
              className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] text-[#9084ff] uppercase"
            >
              {copy.kicker}
            </motion.p>

            <motion.h1
              variants={itemFadeUp}
              className="hidden sm:block mt-4 text-[clamp(2.25rem,5vw,4.4rem)] leading-[0.98] font-semibold text-white tracking-[-0.02em] text-balance"
            >
              {copy.desktopHeadline}
            </motion.h1>

            <motion.h1
              variants={itemFadeUp}
              className="sm:hidden mt-4 text-[clamp(2rem,11vw,3rem)] leading-snug font-semibold text-white tracking-[-0.02em] text-balance"
            >
              {copy.mobileHeadline.map((word, idx) => (
                <Fragment key={`${idx}-${word}`}>
                  {idx > 0 ? ' ' : null}
                  <span
                    className={
                      idx === 2
                        ? 'bg-gradient-to-b from-[#b4abff] via-[#8d80ff] to-[#6654ff] bg-clip-text text-transparent'
                        : ''
                    }
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </motion.h1>

            <motion.p
              variants={itemFadeUp}
              className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-white/62"
            >
              {copy.subline || t.home.subline}
            </motion.p>

            <motion.div
              variants={itemFadeUp}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-[32rem]"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="vanta"
                  size="lg"
                  className="w-full h-12 px-7 rounded-xl text-[14px] sm:min-w-[214px] shadow-[0_10px_42px_-12px_rgba(108,92,231,0.7)]"
                  asChild
                >
                  <Link to="/contact">
                    <Rocket className="size-4" />
                    {t.nav.startProject}
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="hidden sm:block w-full sm:w-auto"
              >
                <Button
                  variant="vanta-ghost"
                  size="lg"
                  className="w-full h-12 px-7 rounded-xl border-white/15 bg-white/[0.02] text-[14px] sm:min-w-[214px]"
                  asChild
                >
                  <Link to="/portfolio">
                    {copy.viewCases}
                    <ArrowRight className="size-4 opacity-75" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="sm:hidden w-full"
              >
                <Button
                  variant="vanta-ghost"
                  size="lg"
                  className="w-full h-12 px-6 rounded-xl border-white/15 bg-white/[0.02] text-[14px]"
                  asChild
                >
                  <a href="https://t.me/LLC_VANTALAB" target="_blank" rel="noopener noreferrer">
                    <Send className="size-4 opacity-80" />
                    {copy.telegram}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemFadeUp}
              className="hidden lg:grid mt-10 grid-cols-4 gap-2.5 xl:gap-3.5 border-t border-white/[0.08] pt-5"
            >
              {trustMetrics.map(metric => (
                <div key={metric.label} className="min-w-0">
                  <p className="text-base xl:text-lg font-semibold text-white truncate">{metric.value}</p>
                  <p className="text-[11px] xl:text-xs text-white/45 mt-1">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemFadeUp}
            className="hidden lg:block relative min-h-[31rem]"
            animate={reduceMotion ? undefined : { y: [-4, 6, -4] }}
            transition={reduceMotion ? undefined : { duration: 7.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-x-[6%] bottom-4 h-64 rounded-[48%] bg-[radial-gradient(closest-side,rgba(108,92,231,0.32),rgba(108,92,231,0.02)_70%,transparent)] blur-2xl" />
            <div className="absolute right-0 bottom-8 h-[19rem] w-[16rem] rounded-[42%] bg-gradient-to-tr from-[#171229] via-[#1b1434] to-[#302061] opacity-80 blur-[3px]" />
            <div className="absolute left-8 bottom-14 h-[14rem] w-[11rem] rounded-[42%] bg-gradient-to-br from-[#140f20] via-[#201743] to-[#372667] opacity-60 blur-[2px]" />

            <div className="relative z-10 ml-auto max-w-[35rem] rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-5 xl:p-6 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_34px_96px_-36px_rgba(0,0,0,0.95),0_0_100px_-34px_rgba(108,92,231,0.75)]">
              <div className="rounded-[20px] border border-white/10 bg-[#0f0f16]/75 p-4 xl:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] tracking-[0.15em] text-white/55">{copy.dashboardTitle}</p>
                  <span className="text-[11px] text-[#9f94ff]">+41%</span>
                </div>
                <p className="mt-4 text-[11px] text-white/45">{copy.leads}</p>
                <p className="mt-1 text-[2rem] leading-none font-semibold text-white">1250</p>
                <p className="mt-1 text-sm font-medium text-[#9f94ff]">+41%</p>

                <div className="relative mt-4 h-[6.5rem] rounded-xl border border-white/8 bg-black/25 p-2.5">
                  <svg viewBox="0 0 300 100" className="h-full w-full">
                    <defs>
                      <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6f63ef" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8d80ff" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 76 C 32 72, 50 58, 74 62 C 102 66, 126 50, 146 52 C 169 55, 184 34, 210 38 C 236 42, 255 20, 300 24"
                      stroke="url(#hero-line)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="300" cy="24" r="4.5" fill="#948aff">
                      {!reduceMotion && (
                        <animate
                          attributeName="r"
                          values="4.5;6.2;4.5"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                  </svg>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3">
                  <p className="text-[11px] text-white/50">{copy.conversion}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">3.8%</p>
                  <p className="mt-1 text-xs text-[#9f94ff]">+24%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3">
                  <p className="text-[11px] text-white/50">{copy.avgCheck}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">126 000 ₽</p>
                  <p className="mt-1 text-xs text-[#9f94ff]">+32%</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-white/10 bg-black/28 px-4 py-3">
                  <div className="flex items-center justify-between text-[11px] text-white/55">
                    <span>{copy.currentStage}</span>
                    <span>75%</span>
                  </div>
                  <p className="mt-1 text-sm text-white/80">{copy.inProgress}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#978cff]"
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemFadeUp}
          className="hidden sm:block mt-8 lg:hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-[0_18px_48px_-24px_rgba(108,92,231,0.7)]"
        >
          <div className="flex items-center justify-between text-[10px] tracking-[0.12em] text-white/50">
            <span>{copy.results}</span>
            <span className="text-[#9f94ff]">LIVE</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
              <p className="text-[11px] text-white/50">{copy.leads}</p>
              <p className="mt-1 text-xl font-semibold text-white">1250</p>
              <p className="text-xs text-[#9f94ff]">+41%</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
              <p className="text-[11px] text-white/50">{copy.conversion}</p>
              <p className="mt-1 text-xl font-semibold text-white">3.8%</p>
              <p className="text-xs text-[#9f94ff]">+24%</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
            <div className="flex items-center justify-between text-[11px] text-white/55">
              <span>{copy.currentStage}</span>
              <span>75%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#978cff]"
                initial={{ width: '0%' }}
                animate={{ width: '75%' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemFadeUp}
          className="hidden sm:grid mt-6 lg:hidden grid-cols-4 gap-1.5 rounded-xl border border-white/8 bg-white/[0.02] px-2 py-3"
        >
          {trustMetrics.map(metric => (
            <div key={metric.label} className="text-center min-w-0">
              <p className="text-[13px] leading-none font-semibold text-white truncate">{metric.value}</p>
              <p className="mt-1 text-[9px] leading-tight text-white/45">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
