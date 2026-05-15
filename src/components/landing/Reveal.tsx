'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';

type Variant = 'up' | 'fade' | 'scale' | 'stagger';

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** % de l'élément visible avant déclenchement (0..1, défaut 0.15) */
  threshold?: number;
  /** Marge avant le viewport pour anticiper (ex: '0px 0px -80px 0px') */
  rootMargin?: string;
  /** Si vrai, ne se déclenche qu'une fois (défaut). Sinon, rejoue à chaque entrée. */
  once?: boolean;
  /** Délai en ms avant d'ajouter la classe is-visible une fois en vue */
  delay?: number;
  as?: 'div' | 'section' | 'span' | 'ul' | 'header' | 'p';
  className?: string;
  style?: CSSProperties;
};

/**
 * Wrapper client qui ajoute `.is-visible` sur l'élément quand il entre dans
 * le viewport. Les transitions sont définies dans globals.css via les classes
 * `elx-reveal` / `elx-stagger`.
 */
export default function Reveal({
  children,
  variant = 'up',
  threshold = 0.15,
  rootMargin = '0px 0px -80px 0px',
  once = true,
  delay = 0,
  as = 'div',
  className = '',
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Par défaut visible (pour le SSR — aucun flash si JS lent ou désactivé).
  // useLayoutEffect bascule en `false` pour les éléments hors viewport,
  // puis l'observer les re-passe en `true` à l'entrée.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top >= window.innerHeight - 60;
    if (!belowFold) {
      // Déjà visible au chargement : on garde tel quel, pas d'observer
      return;
    }
    // Élément sous le pli : on cache puis on observe
    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  const variantClass =
    variant === 'stagger'
      ? `elx-stagger ${visible ? 'is-visible' : ''}`
      : `elx-reveal ${variant !== 'up' ? `elx-reveal--${variant}` : ''} ${visible ? 'is-visible' : ''}`;

  const Tag = as as 'div';

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${variantClass} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
