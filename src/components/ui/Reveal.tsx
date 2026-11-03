// src/components/ui/Reveal.tsx
// Scroll reveal with Motion. Only hides content that starts BELOW the fold, decided before paint:
// prerendered HTML is never hidden, above-the-fold content never flashes, reduced motion = no-op.
// Never wrap the hero / H1 in this.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion, type Variants } from 'motion/react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const variants: Variants = {
  shown: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 24, transition: { duration: 0 } },
};

interface RevealProps {
  children: ReactNode;
  /** Seconds, for light staggering */
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduceMotion]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        className={className}
        initial={false}
        animate={!armed || inView ? 'shown' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}