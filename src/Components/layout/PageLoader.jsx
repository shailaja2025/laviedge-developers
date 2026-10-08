import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '../ui/Logo';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function PageLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('laviedge-arrived');
  });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!visible) return undefined;
    sessionStorage.setItem('laviedge-arrived', '1');
    const timer = setTimeout(() => setVisible(false), reduced ? 120 : 900);
    return () => clearTimeout(timer);
  }, [reduced, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="keep-dark fixed inset-0 z-[90] flex flex-col items-center justify-center hero-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Laviedge Developers"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-[0.62rem] tracking-brand uppercase text-gold-400 mb-6">Est. 2017</p>
            <Logo />
            <p className="keep-case mt-5 font-display italic text-xl font-medium text-life-400">live life with an edge</p>
            <div className="mx-auto mt-8 h-px w-36 overflow-hidden bg-ivory-200/20">
              <motion.div
                className="h-full bg-gold-400"
                initial={{ x: '-100%' }}
                animate={{ x: '120%' }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], repeat: 1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
