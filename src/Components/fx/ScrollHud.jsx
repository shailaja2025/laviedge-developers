import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { paths } from '../../data/routes';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function ScrollHud() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery('(min-width: 768px)');
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const nodeTop = useTransform(scaleY, (value) => `${value * 100}%`);

  if (reduced || !desktop) return null;
  if (location.pathname === paths.nri || location.pathname === paths.login) return null;

  return (
    <div className="scroll-hud" aria-hidden="true">
      <motion.span className="scroll-hud__fill" style={{ scaleY, transformOrigin: 'top' }} />
      <motion.span className="scroll-hud__node" style={{ top: nodeTop }} />
    </div>
  );
}
