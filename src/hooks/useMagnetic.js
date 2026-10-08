import { useCallback, useRef } from 'react';
import useMediaQuery from './useMediaQuery';
import usePrefersReducedMotion from './usePrefersReducedMotion';

export default function useMagnetic(strength = 10) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)');
  const live = fine && !reduced;

  const onMouseMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!el || !live) return;
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) / (box.width / 2);
      const y = (event.clientY - box.top - box.height / 2) / (box.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    },
    [live, strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  return { ref, onMouseMove: live ? onMouseMove : undefined, onMouseLeave: live ? onMouseLeave : undefined };
}
