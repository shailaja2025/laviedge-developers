import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { useEnquiry } from '../../context/EnquiryContext';

export default function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const { open } = useEnquiry();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    window.__laviedgeLenis = lenis;
    if (open) lenis.stop();
    else lenis.start();

    return () => {
      cancelAnimationFrame(frame);
      if (window.__laviedgeLenis === lenis) delete window.__laviedgeLenis;
      lenis.destroy();
    };
  }, [reduced, open]);

  useEffect(() => {
    if (hash) return undefined;
    const reset = () => {
      const lenis = window.__laviedgeLenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    reset();
    const later = window.setTimeout(reset, 80);
    return () => window.clearTimeout(later);
  }, [pathname, hash]);

  return null;
}
