import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const STAT_DEFS = [
  { value: 10, suffix: '+', key: 'projects' },
  { value: 6, suffix: '+', key: 'clients' },
  { value: 1, suffix: '+', key: 'years' },
  { value: 40, suffix: '%', key: 'conversion' },
] as const;

export type StatKey = (typeof STAT_DEFS)[number]['key'];

/** Same duration for every stat → different “speeds” but all finish together */
const COUNT_DURATION = 1.85;

function AnimatedStat({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: COUNT_DURATION,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, value, reduceMotion]);

  return (
    <div className="flex flex-col items-center text-center min-w-0 max-w-[9.5rem] xs:max-w-none">
      <p className="text-2xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white tabular-nums">
        {display}
        {suffix}
      </p>
      <p className="mt-1.5 text-[11px] xs:text-xs md:text-sm text-white/40 leading-snug px-0.5">{label}</p>
    </div>
  );
}

export function HeroAnimatedStats({
  labels,
}: {
  labels: Record<StatKey, string>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-12% 0px -8% 0px' });

  return (
    <div
      ref={containerRef}
      className="mt-14 sm:mt-16 md:mt-24 w-full max-w-3xl md:max-w-4xl"
    >
      <div
        className="h-px w-[min(100%,12rem)] sm:w-[min(100%,16rem)] mx-auto bg-gradient-to-r from-transparent via-white/[0.12] to-transparent mb-8 sm:mb-10"
        aria-hidden
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-9 sm:gap-x-8 sm:gap-y-10 md:gap-x-10 justify-items-center justify-center">
        {STAT_DEFS.map(s => (
          <AnimatedStat
            key={s.key}
            value={s.value}
            suffix={s.suffix}
            label={labels[s.key]}
            start={isInView}
          />
        ))}
      </div>
    </div>
  );
}
