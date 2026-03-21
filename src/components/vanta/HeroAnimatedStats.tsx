import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

type StatItem = { value: number; suffix: string; label: string };

const STAT_DEFS = [
  { value: 10, suffix: '+', key: 'projects' },
  { value: 6, suffix: '+', key: 'clients' },
  { value: 1, suffix: '+', key: 'years' },
  { value: 40, suffix: '%', key: 'conversion' },
] as const;

type StatKey = (typeof STAT_DEFS)[number]['key'];

function AnimatedStat({
  value,
  suffix,
  label,
  stagger,
}: StatItem & { stagger: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.75,
      delay: 0.15 + stagger,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, stagger, reduceMotion]);

  return (
    <div ref={ref} className="text-left min-w-0">
      <p className="text-2xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white tabular-nums">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-[11px] xs:text-xs md:text-sm text-white/40 leading-snug">{label}</p>
    </div>
  );
}

export function HeroAnimatedStats({
  labels,
}: {
  labels: Record<StatKey, string>;
}) {
  return (
    <div className="mt-14 sm:mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8 md:gap-10 max-w-3xl border-t border-white/[0.06] pt-8 sm:pt-10">
      {STAT_DEFS.map((s, i) => (
        <AnimatedStat
          key={s.key}
          value={s.value}
          suffix={s.suffix}
          label={labels[s.key]}
          stagger={i * 0.11}
        />
      ))}
    </div>
  );
}
