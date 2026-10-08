import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import HudFrame from '../fx/HudFrame';
import { images } from '../../data/siteData';
import { phase1Record } from '../../data/nriFacts';
import { paths } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function NRIHero() {
  const { t, get } = useLanguage();
  const { openEnquiry } = useEnquiry();
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '18%']);
  const lines = get('nri.titleLines') || [];

  return (
    <section
      ref={ref}
      id="nri-hero"
      className="keep-dark relative flex min-h-[100svh] flex-col bg-forest-950 text-ivory-100"
    >
      <div className="absolute inset-0 overflow-hidden hero-canvas">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={images.entrance}
            alt={t('gallery.items.g17.caption')}
            className="image-kenburns h-full w-full object-cover opacity-75"
          />
        </motion.div>
        <div className="nri-hero-veil" />
        <div className="nri-aurora" aria-hidden="true" />
        <div className="nri-dust" aria-hidden="true" />
      </div>

      <HudFrame className="inset-3 sm:inset-5 md:inset-8" />
      <div className="pointer-events-none absolute inset-3 sm:inset-5 md:inset-8 border border-gold-500/20" />

      <div className="nri-hero-stage relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-col justify-end px-4 sm:px-5 md:px-8">
        <div className="nri-hero-copy max-w-3xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-full break-words text-[0.58rem] uppercase tracking-[0.12em] text-[#F0E3B8] sm:text-[0.62rem] sm:tracking-luxury"
          >
            {t('nri.kicker')} · {t('nri.byline')}
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="mt-3 text-[0.68rem] uppercase tracking-label hero-ink"
          >
            {t('nri.placeLine')}
          </motion.p>

          <h1 className="mt-5 font-display font-medium leading-[1.08] tracking-[-0.02em] text-balance">
            {lines.map((line, index) => (
              <motion.span
                key={line}
                className="block text-[clamp(1.75rem,5.4vw,3.25rem)] hero-ink"
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 + index * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {index === 2 ? <span className="shimmer-gold">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="nri-hero-lede mt-5 max-w-2xl text-base md:text-lg hero-ink leading-relaxed"
          >
            {t('nri.lede')}
          </motion.p>

          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="nri-hero-facts mt-8 grid grid-cols-2 gap-px bg-gold-500/20 lg:grid-cols-4"
          >
            <HeroFact k={t('nri.rera')} v={phase1Record.rera} />
            <HeroFact k={t('nri.plots')} v={String(phase1Record.plots)} count={phase1Record.plots} />
            <HeroFact k={t('nri.place')} v={phase1Record.place} />
            <HeroFact k={t('nri.corridor')} v="NH-544D" />
          </motion.dl>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="nri-hero-actions relative z-10 mt-8 flex flex-col gap-3 md:flex-row md:flex-wrap"
          >
            <Button onClick={() => openEnquiry('nri')} variant="acute">
              {t('cta.nriEnquiry')}
            </Button>
            <Button onClick={() => openEnquiry('visit')} variant="ghost">
              {t('cta.visit')}
            </Button>
            <Button to={paths.contact} variant="ghost">
              {t('nav.contact')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroFact({ k, v, count }) {
  return (
    <div className="bg-forest-950/80 px-3 py-4 sm:px-4 sm:py-5">
      <dt className="text-[0.56rem] uppercase tracking-luxury text-[#F0E3B8]">{k}</dt>
      {count != null ? (
        <dd className="mt-2 font-display text-lg text-white sm:text-xl md:text-2xl">
          <AnimatedCounter value={count} />
        </dd>
      ) : (
        <dd className="mt-2 break-words font-display text-lg text-white sm:text-xl md:text-2xl">{v}</dd>
      )}
    </div>
  );
}
