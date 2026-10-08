import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { luxeEase } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function RouteProgress() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#0B3D91] via-[#5BB8E8] to-[#D4B44A]"
      initial={reduced ? false : { scaleX: 0, opacity: 1 }}
      animate={reduced ? { scaleX: 1, opacity: 0 } : { scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.05, times: [0, 0.72, 1], ease: luxeEase }
      }
      aria-hidden="true"
    />
  );
}
