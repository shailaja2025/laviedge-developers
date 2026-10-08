import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { site } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export default function Founder({ hideHeader = false }) {
  const { founder } = site;
  const { t } = useLanguage();

  return (
    <section id="founder" className="relative bg-ivory-50 text-forest-900 py-24 md:py-36 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto w-full max-w-md aspect-[4/5] max-h-[32rem] border border-gold-500/40 p-4">
              <div className="h-full w-full bg-forest-700 flex flex-col items-center justify-center text-center px-8">
                <span className="font-display text-6xl md:text-8xl text-gold-400">KK</span>
                <span className="mt-4 h-px w-16 bg-gold-500" />
                <p className="mt-6 text-[0.62rem] uppercase tracking-luxury text-white">
                  {t('founder.portrait')}
                </p>
                <p className="mt-3 text-sm text-white max-w-xs">
                  {t('founder.portraitNote')}
                </p>
              </div>
              <span className="absolute top-2 left-2 h-4 w-4 border-t border-l border-gold-400" />
              <span className="absolute top-2 right-2 h-4 w-4 border-t border-r border-gold-400" />
              <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-gold-400" />
              <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-gold-400" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {hideHeader ? null : (
            <SectionHeader
              index="02"
              eyebrow={t('founder.eyebrow')}
              title={founder.name}
              lede={t('founder.title')}
            />
          )}
          <Reveal delay={0.15}>
            <blockquote className="mt-10 font-display italic text-[1.7rem] md:text-[2.15rem] font-medium leading-[1.35] text-forest-700 max-w-2xl">
              “{t('founder.message')}”
            </blockquote>
            <p className="mt-4 text-[0.62rem] uppercase tracking-luxury text-gold-600">
              {t('founder.pending')}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-charcoal-800">{t('founder.biography')}</p>
            <p className="mt-8 font-display text-2xl text-gold-600">{founder.name}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
