import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { verifiedFacts } from '../../data/siteData';
import { paths } from '../../data/routes';
import { useLanguage } from '../../context/LanguageContext';

export default function Trust() {
  const { t, get } = useLanguage();
  const columns = [
    { title: t('trust.verifiedTitle'), items: get('trust.verified') || [] },
    { title: t('trust.notTitle'), items: get('trust.not') || [] },
  ];
  return (
    <section id="trust" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="11"
          eyebrow={t('trust.eyebrow')}
          title={t('trust.title')}
          lede={t('trust.lede')}
        />

        <Reveal>
          <div className="mt-12 lux-card border border-gold-500/25 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[0.62rem] uppercase tracking-luxury text-gold-600">{t('trust.reraLabel')}</p>
              <p className="font-display text-3xl md:text-4xl mt-2 text-forest-700">{verifiedFacts.phase1Rera}</p>
            </div>
            <p className="max-w-md text-charcoal-800">
              {t('trust.reraNote')}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {columns.map((col) => (
            <Reveal key={col.title} className="lux-card border border-gold-500/20 p-8 hover:border-gold-500/50">
              <h3 className="font-display text-3xl text-forest-700">{col.title}</h3>
              <ul className="mt-6 space-y-3 text-charcoal-800">
                {col.items.map((item) => (
                  <li key={item} className="pl-4 border-l border-gold-500/30">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16} className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button to={paths.nri} variant="acute">
            {t('cta.enterFlagship')}
          </Button>
          <Button to={paths.contact} variant="line">
            {t('nav.contact')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
