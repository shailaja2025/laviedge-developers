import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { verifiedFacts } from '../../data/siteData';
import { paths } from '../../data/routes';
import { useLanguage } from '../../context/LanguageContext';

const icons = [
  <svg key="a" viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path d="M6 26V12l10-6 10 6v14H6z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13 26v-8h6v8" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="b" viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path d="M16 28s-8-8.2-8-13a8 8 0 1 1 16 0c0 4.8-8 13-8 13z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="16" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="c" viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <rect x="7" y="5" width="18" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M11 11h10M11 16h10M11 21h6" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="d" viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
    <path d="M8 24c4-8 12-8 16 0M10 14a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
];

export default function WhyLaviedge() {
  const { t, get } = useLanguage();
  const items = get('why.items') || [];
  const extras = [
    { title: String(verifiedFacts.phase1Plots), copy: t('facts.plots') },
    { title: verifiedFacts.highway, copy: t('facts.road') },
  ];
  const highlights = [...items.map((item) => ({ title: item.title, copy: item.copy })), ...extras].slice(0, 6);

  return (
    <section id="why" className="keep-dark lux-mosaic py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal direction="clip">
          <h2 className="text-center font-display text-[clamp(1.55rem,3.5vw,2.4rem)] font-medium text-gold-400">
            {t('why.eyebrow')}
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-y-14">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="text-center">
              <div className="highlight-orb">{icons[index % icons.length]}</div>
              <h3 className="font-display text-lg font-medium text-gold-400 md:text-xl keep-case">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-white">{item.copy}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-16 flex justify-center">
          <Button to={paths.nri} variant="gold">
            {t('cta.enterFlagship')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
