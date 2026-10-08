import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import CinematicField from '../ui/CinematicField';
import HudFrame from '../fx/HudFrame';
import Reveal from '../ui/Reveal';
import { images, site } from '../../data/siteData';
import { paths } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function FinalCTA() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-10%', '10%']);

  return (
    <section ref={ref} className="keep-dark relative min-h-[82vh] overflow-hidden bg-forest-950 text-ivory-100">
      <div className="absolute inset-0 hero-canvas" />
      <motion.img
        style={{ y }}
        src={images.cta}
        alt=""
        className="image-kenburns absolute inset-0 h-[120%] w-full object-cover opacity-70"
      />
      <div className="brand-veil" />
      <CinematicField />
      <HudFrame className="inset-4 sm:inset-6 md:inset-10" />
      <div className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-10 border border-gold-500/20" />
      <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-4xl flex-col items-center justify-center px-4 pb-[calc(var(--float-bar-h)+2.5rem)] pt-16 text-center sm:px-6">
        <Reveal className="flex flex-col items-center">
        <span className="gold-rule mx-auto" />
        <p className="mt-6 text-[0.62rem] uppercase tracking-luxury text-gold-300">
          {t('facts.founded')} {site.founded}
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.7rem,5.4vw,3.35rem)] leading-[1.1] tracking-[-0.02em] text-balance shimmer-gold">
          {t('final.title')}
        </h2>
        <p className="mt-6 max-w-xl text-ivory-50 text-lg leading-relaxed">{t('final.body')}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button onClick={() => openEnquiry('visit')} variant="gold">
            {t('cta.arrangeVisit')}
          </Button>
          <Button to={paths.nri} variant="acute">
            {t('cta.enterFlagship')}
          </Button>
        </div>
        <p className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[0.7rem] tracking-luxury uppercase text-gold-400">
          {site.contact.phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`} className="hover:text-gold-200">
              {phone.display}
            </a>
          ))}
        </p>
        </Reveal>
      </div>
    </section>
  );
}
