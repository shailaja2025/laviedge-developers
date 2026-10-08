import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { paths } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';

export default function NRIExperience() {
  const { openEnquiry } = useEnquiry();
  const { t, get } = useLanguage();
  const items = get('nriExp.items') || [];

  return (
    <section id="nri-experience" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="editorial-num text-4xl">11</p>
        <SectionHeader
          index=""
          eyebrow={t('nriExp.eyebrow')}
          title={t('nriExp.title')}
          lede={t('nriExp.lede')}
        />
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className="lux-card text-card group flex min-h-[20rem] flex-col border border-forest-900/10 p-8 md:p-10 hover:border-gold-500/40"
            >
              <p className="text-[0.58rem] uppercase tracking-luxury text-gold-700">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl text-forest-950 group-hover:text-gold-700 transition-colors">
                {item.title}
              </h3>
              <span className="text-card__hint">{t('why.hoverHint')}</span>
              <p className="text-card__copy mt-4 text-forest-950 leading-relaxed">{item.copy}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button onClick={() => openEnquiry('nri')} variant="dark">
            {t('cta.nriEnquiry')}
          </Button>
          <Button onClick={() => openEnquiry('visit')} variant="line">
            {t('cta.arrangeVisit')}
          </Button>
          <Button to={paths.contact} variant="line">
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </section>
  );
}
