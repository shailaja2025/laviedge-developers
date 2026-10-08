import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { directions, luxeTransition } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  once = true,
  direction = 'up',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-72px 0px' });
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] || motion.div;
  const variants = directions[direction] || directions.up;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduced ? 'visible' : 'hidden'}
      animate={reduced || inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={luxeTransition(delay, direction === 'clip' ? 1 : 0.85)}
      style={{ pointerEvents: reduced || inView ? 'auto' : 'none' }}
    >
      {children}
    </Tag>
  );
}
