'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Valeur cible. Si chaîne, on tente le parsing entier (ex: "8") */
  to: number;
  /** Préfixe (ex: "x", "+") */
  prefix?: string;
  /** Suffixe (ex: " min", "/10") */
  suffix?: string;
  /** Durée de l'animation en ms */
  duration?: number;
  /** Décimales */
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Compteur qui s'incrémente jusqu'à `to` quand l'élément entre dans le viewport.
 * Utilise une easing cubic out pour finir doux.
 */
export default function Counter({
  to,
  prefix = '',
  suffix = '',
  duration = 1400,
  decimals = 0,
  className = '',
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let cancelled = false;

    const runAnimation = () => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      runAnimation();
      return () => { cancelled = true; cancelAnimationFrame(raf); };
    }

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      runAnimation();
      return () => { cancelled = true; cancelAnimationFrame(raf); };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [to, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
