import Reveal from './Reveal';
import { verifiedFacts } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export default function FactRail({ tone = 'dark' }) {
  const { t } = useLanguage();
  const items = [
    { k: t('facts.place'), v: verifiedFacts.location.split(',')[0] },
    { k: t('facts.road'), v: verifiedFacts.highway },
    { k: t('facts.rera'), v: verifiedFacts.phase1Rera },
    { k: t('facts.plots'), v: String(verifiedFacts.phase1Plots) },
  ];
  const onDark = tone === 'dark';

  return (
    <dl
      className={`grid grid-cols-2 lg:grid-cols-4 border-t ${
        onDark ? 'border-gold-500/20' : 'border-forest-900/10'
      }`}
    >
      {items.map((item, index) => (
        <Reveal
          key={item.k}
          delay={index * 0.08}
          className={`px-3 sm:px-4 md:px-6 py-4 md:py-5 border-r even:border-r-0 lg:even:border-r last:border-r-0 border-b lg:border-b-0 ${
            onDark ? 'border-gold-500/15' : 'border-forest-900/10'
          }`}
        >
          <dt
            className={`text-[0.56rem] uppercase tracking-luxury ${
              onDark ? 'text-gold-400' : 'text-gold-700'
            }`}
          >
            {item.k}
          </dt>
          <dd
            className={`mt-2 font-display text-lg sm:text-xl md:text-2xl break-words ${
              onDark ? 'text-ivory-50' : 'text-forest-900'
            }`}
          >
            {item.v}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
