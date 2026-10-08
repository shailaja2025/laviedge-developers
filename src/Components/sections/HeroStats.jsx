import { motion } from 'framer-motion';
import { verifiedFacts } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedCounter from '../ui/AnimatedCounter';
import { luxeEase } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const icons = {
  rera: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="18" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11h10M11 16h10M11 21h6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  plots: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M6 6h8v8H6zM18 6h8v8h-8zM6 18h8v8H6zM18 18h8v8h-8z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  road: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M12 4 8 28M20 4l4 24M16 8v3M16 15v3M16 22v3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  place: (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M16 28s-8-8.2-8-13a8 8 0 1 1 16 0c0 4.8-8 13-8 13z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

export default function HeroStats() {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const items = [
    { icon: 'rera', value: verifiedFacts.phase1Rera, label: t('facts.rera'), count: null },
    { icon: 'plots', value: String(verifiedFacts.phase1Plots), label: t('facts.plots'), count: verifiedFacts.phase1Plots },
    { icon: 'road', value: verifiedFacts.highway, label: t('facts.road'), count: null },
    { icon: 'place', value: verifiedFacts.location.split(',')[0], label: t('facts.place'), count: null },
  ];

  return (
    <div className="hero-stats relative z-10 mx-auto grid w-full max-w-6xl grid-cols-2 gap-2 px-4 md:grid-cols-4 md:gap-3 sm:px-6 lg:px-8">
      {items.map((item, index) => (
        <motion.article
          key={item.label}
          className="float-stat keep-dark"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 + index * 0.1, duration: 0.75, ease: luxeEase }}
        >
          <div className="mx-auto mb-1 hidden h-8 w-8 items-center justify-center text-[#5BB8E8] lg:mb-3 lg:flex lg:h-12 lg:w-12">
            {icons[item.icon]}
          </div>
          {item.count != null ? (
            <AnimatedCounter value={item.count} className="float-stat__value keep-case" />
          ) : (
            <p className="float-stat__value keep-case">{item.value}</p>
          )}
          <p className="float-stat__label">{item.label}</p>
        </motion.article>
      ))}
    </div>
  );
}
