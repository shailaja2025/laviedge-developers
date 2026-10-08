import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import MediaReveal from '../ui/MediaReveal';
import { images, site } from '../../data/siteData';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';

export default function About({ hideHeader = false }) {
  const { t } = useLanguage();
  const { openEnquiry } = useEnquiry();

  return (
    <section id="about" className="relative bg-ivory-50 text-forest-950 pt-20 md:pt-28 pb-0">
      <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 md:py-24 lg:pr-16">
          {hideHeader ? null : (
            <Reveal>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-700">{t('about.eyebrow')}</p>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.7rem)] font-medium leading-[1.18] text-forest-950">
                {t('about.title')}
              </h2>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-[1.05rem] font-normal leading-[1.8] text-charcoal-900">
              <span className="text-forest-950">{t('about.lede', { year: site.founded })} </span>
              {t('about.body')}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <Button variant="gold" onClick={() => openEnquiry('visit')}>
              {t('cta.arrangeVisit')}
            </Button>
          </Reveal>
        </div>
        <div className="relative min-h-[22rem] overflow-hidden lg:min-h-[36rem]">
          <MediaReveal className="absolute inset-0">
            <img
              src={images.about}
              alt={t('about.imageAlt')}
              className="h-full w-full object-cover"
            />
          </MediaReveal>
        </div>
      </div>
    </section>
  );
}
