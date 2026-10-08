import { useRef } from 'react';
import { useInView } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function MediaReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={`media-reveal ${inView || reduced ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
