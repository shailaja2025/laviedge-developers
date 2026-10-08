import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import HudFrame from '../fx/HudFrame';
import HeroCarousel, { HeroCarouselChrome, useHeroCarousel } from './HeroCarousel';
import HeroStats from './HeroStats';
import { paths } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function Hero() {
  const { t } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const carousel = useHeroCarousel();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '16%']);

  return (
    <section
      ref={ref}
      id="home"
      className="keep-dark relative flex min-h-[100svh] flex-col bg-forest-950 text-ivory-100"
      aria-label={t('hero.aria')}
      onTouchStart={carousel.onTouchStart}
      onTouchEnd={carousel.onTouchEnd}
    >
      <div className="absolute inset-0 overflow-hidden hero-canvas">
        <motion.div style={{ y }} className="absolute inset-0">
          <HeroCarousel carousel={carousel} />
        </motion.div>
        <div className="brand-veil" />
        <div className="lux-scan" aria-hidden="true" />
        <HudFrame />
      </div>

      <div className="hero-shell relative z-10">
        <div className="hero-copy flex flex-col items-center justify-center px-4 text-center sm:px-8 md:px-10">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[20rem] px-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#5BB8E8] sm:max-w-none sm:text-[0.7rem] sm:tracking-[0.32em]"
          >
            {t('nri.placeLine')}
          </motion.p>
          <div className="mt-5 w-full max-w-5xl sm:mt-6">
            <span className="mx-auto mb-5 block h-px w-24 bg-gold-400 gold-rule md:hidden" />
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hero-gold-line hidden h-px flex-1 origin-left bg-gold-400/80 md:block" />
              <h1 className="casa-headline headline-rise text-[clamp(1.35rem,5.8vw,3.05rem)] leading-[1.18]">
                {t('hero.tagline')}
              </h1>
              <span className="hero-gold-line hidden h-px flex-1 origin-right bg-gold-400/80 md:block" />
            </div>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="keep-case mt-4 font-display italic font-semibold text-[1.05rem] text-[#B8F5C8] sm:mt-5 sm:text-[1.65rem] [text-shadow:0_1px_2px_rgba(7,24,51,0.75)]"
          >
            live life with an edge
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-7 relative z-10 flex w-full max-w-xl flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Button to={paths.nri} variant="gold" className="sm:min-w-[12rem] sm:flex-1">
              {t('cta.enterFlagship')}
            </Button>
            <Button
              variant="acute"
              className="sm:min-w-[12rem] sm:flex-1"
              onClick={() => openEnquiry('visit')}
            >
              {t('cta.arrangeVisit')}
            </Button>
          </motion.div>
        </div>

          <HeroCarouselChrome carousel={carousel} />
          <HeroStats />
      </div>
    </section>
  );
}
