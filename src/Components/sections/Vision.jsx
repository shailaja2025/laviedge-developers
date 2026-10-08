import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';

export default function Vision() {
  const { t, get } = useLanguage();
  const items = get('vision.items') || [];

  return (
    <section id="vision" className="bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="03"
          eyebrow={t('vision.eyebrow')}
          title={t('vision.title')}
          lede={t('vision.lede')}
        />

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-forest-900/10">
          {items.map((item, index) => (
            <Reveal key={item.roman} delay={index * 0.1} className="lux-card text-card flex min-h-[22rem] flex-col bg-ivory-100 p-8 md:p-10 hover:bg-ivory-50">
              <p className="editorial-num text-5xl">{item.roman}</p>
              <h3 className="mt-8 font-display text-3xl text-forest-950">{item.title}</h3>
              <span className="text-card__hint">{t('why.hoverHint')}</span>
              <p className="text-card__copy mt-4 text-forest-950">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
