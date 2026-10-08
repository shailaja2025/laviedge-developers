import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { luxeEase, pageEnter, pageEnterReduced } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const variants = reduced ? pageEnterReduced : pageEnter;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="page-enter"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: reduced ? 0 : 0.55, ease: luxeEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
