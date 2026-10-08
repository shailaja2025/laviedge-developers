import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function TextReveal({ text, className = '', delay = 0, as = 'p' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] || motion.p;
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={reduced ? { y: 0 } : { y: '110%' }}
            animate={reduced || inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.7,
              delay: delay + index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
