import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function PageSweep() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      key={location.pathname}
      className="page-sweep"
      initial={{ x: '-8%', opacity: 0 }}
      animate={{ x: ['-8%', '108%'], opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}
