import { motion } from 'framer-motion';
import CinematicField from '../ui/CinematicField';
import HudFrame from '../fx/HudFrame';
import MediaReveal from '../ui/MediaReveal';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function PageBanner({ kicker, title, lede, image }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="keep-dark relative min-h-[58vh] overflow-hidden bg-forest-950 text-ivory-100 sm:min-h-[68vh]">
      <div className="absolute inset-0 hero-canvas" />
      {image ? (
        <MediaReveal className="absolute inset-0">
          <div className="h-full w-full">
            <img
              src={image}
              alt=""
              className="image-kenburns h-full w-full object-cover opacity-55"
            />
          </div>
        </MediaReveal>
      ) : null}
      <div className="brand-veil" />
      <CinematicField />
      <HudFrame className="inset-3 sm:inset-5 md:inset-8" />
      <div className="pointer-events-none absolute inset-3 sm:inset-5 md:inset-8 border border-gold-500/20" />
      <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-4 pt-24 pb-[calc(4.5rem+var(--float-bar-h))] sm:min-h-[68vh] sm:px-5 sm:pt-36 sm:pb-16 md:px-8">
        {kicker ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="gold-rule" />
            <p className="text-[0.64rem] uppercase tracking-luxury text-[#F0E3B8]">{kicker}</p>
          </motion.div>
        ) : null}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="headline-rise mt-5 font-display text-[clamp(1.6rem,6.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.02em] text-balance max-w-4xl hero-ink"
        >
          {title}
        </motion.h1>
        {lede ? (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.8 }}
            className="mt-6 max-w-2xl hero-ink text-lg leading-relaxed"
          >
            {lede}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
