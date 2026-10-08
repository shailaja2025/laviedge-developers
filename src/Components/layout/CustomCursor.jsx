import { useEffect, useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!fine || reduced) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let frame;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
    };

    const onOver = (event) => {
      const hot = event.target.closest('a, button, [role="button"], input, textarea, select');
      ring.current?.classList.toggle('is-hot', Boolean(hot));
      dot.current?.classList.toggle('is-hot', Boolean(hot));
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full border border-gold-400/70 mix-blend-difference"
        aria-hidden="true"
      />
      <div
        ref={dot}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-gold-400"
        aria-hidden="true"
      />
    </>
  );
}
