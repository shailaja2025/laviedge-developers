import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { heroSlides } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const INTERVAL = 6500;

export function useHeroCarousel() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const touch = useRef({ x: 0, y: 0 });
  pausedRef.current = paused;

  const go = useCallback((dir) => {
    setIndex((current) => (current + dir + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setIndex((current) => (current + 1) % heroSlides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const onTouchStart = (event) => {
    if (event.target.closest('a, button')) return;
    touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };

  const onTouchEnd = (event) => {
    if (event.target.closest('a, button')) return;
    const dx = event.changedTouches[0].clientX - touch.current.x;
    const dy = event.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return {
    index,
    setIndex,
    go,
    paused,
    setPaused,
    reduced,
    slide: heroSlides[index],
    total: heroSlides.length,
    onTouchStart,
    onTouchEnd,
  };
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M14.5 6.5 9 12l5.5 5.5' : 'M9.5 6.5 15 12l-5.5 5.5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function HeroCarouselChrome({ carousel }) {
  const { t } = useLanguage();
  const { index, setIndex, go, slide, total, paused, reduced, setPaused } = carousel;

  return (
    <div
      className="relative z-20 hero-carousel-chrome flex flex-col-reverse gap-2 px-4 pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-6 sm:pb-3 md:px-8 lg:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(document.hidden)}
    >
      <div className="min-w-0 max-w-full text-center sm:max-w-sm sm:text-left">
        <p className="text-[0.56rem] uppercase tracking-luxury text-[#F0E3B8] keep-case">
          {t(`gallery.kind.${slide.kind}`)}
        </p>
        <p className="mt-1 truncate font-display text-base italic text-white sm:text-lg keep-case" aria-live="polite">
          {t(`gallery.items.${slide.id}.title`)}
        </p>
      </div>
      <div className="flex shrink-0 items-center justify-center gap-2 sm:justify-end sm:gap-3">
        <button
          type="button"
          className="hero-carousel-btn pointer-events-auto"
          aria-label={t('hero.prev')}
          onClick={() => go(-1)}
        >
          <Chevron dir="prev" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label={t('hero.carousel')}>
          {heroSlides.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={t('hero.slide', { n: itemIndex + 1, total })}
                className={`hero-dot ${active ? 'is-active' : ''}`}
                data-paused={paused || reduced ? 'true' : 'false'}
                onClick={() => setIndex(itemIndex)}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="hero-carousel-btn pointer-events-auto"
          aria-label={t('hero.next')}
          onClick={() => go(1)}
        >
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  );
}

export default function HeroCarousel({ carousel }) {
  const { slide, index } = carousel;

  return (
    <div className="hero-carousel absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.id}
          src={slide.src}
          alt=""
          fetchPriority={index === 0 ? 'high' : 'low'}
          className="hero-carousel__media absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.94, scale: carousel.reduced ? 1 : 1.08 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{
            opacity: { duration: carousel.reduced ? 0.2 : 1.15, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: carousel.reduced ? 0.2 : 7.2, ease: 'linear' },
          }}
        />
      </AnimatePresence>
    </div>
  );
}
