import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';

export default function Approach() {
  const { t, get } = useLanguage();
  const steps = get('approach.items') || [];
  return (
    <section id="approach" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="08"
          eyebrow={t('approach.eyebrow')}
          title={t('approach.title')}
          lede={t('approach.lede')}
        />
        <ol className="mt-16 space-y-0">
          {steps.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.06}>
              <li className="grid md:grid-cols-12 gap-6 border-t border-forest-900/10 py-8 md:py-10 transition-colors duration-500 hover:border-gold-500/50">
                <p className="md:col-span-2 editorial-num text-4xl">{step.num}</p>
                <h3 className="md:col-span-4 font-display text-3xl">{step.title}</h3>
                <p className="md:col-span-6 text-charcoal-600 max-w-xl">{step.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
