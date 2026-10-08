import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import HoverCard from '../ui/HoverCard';
import { galleryItems } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

export default function Gallery({ hideHeader = false }) {
  const [active, setActive] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (active == null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((i) => (i + 1) % galleryItems.length);
      if (event.key === 'ArrowLeft') {
        setActive((i) => (i - 1 + galleryItems.length) % galleryItems.length);
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section
      id="gallery"
      className={`bg-ivory-50 text-forest-900 ${hideHeader ? 'pt-20 pb-4 md:pt-28 md:pb-6' : 'py-24 md:py-36'}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {hideHeader ? null : (
          <SectionHeader
            index="09"
            eyebrow={t('gallery.eyebrow')}
            title={t('gallery.title')}
            lede={t('gallery.lede')}
          />
        )}

        <div className={`${hideHeader ? 'mt-0' : 'mt-14'} columns-1 sm:columns-2 lg:columns-3 gap-4`}>
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.05}
              className="mb-4 break-inside-avoid"
            >
            <HoverCard
              as="button"
              onClick={() => setActive(index)}
              src={item.src}
              alt={t(`gallery.items.${item.id}.caption`)}
              kind={t(`gallery.kind.${item.kind}`)}
              title={t(`gallery.items.${item.id}.title`)}
              caption={t(`gallery.items.${item.id}.caption`)}
              imgClassName="w-full min-h-[13rem] object-cover"
            />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active != null && (
          <motion.div
            className="fixed inset-0 z-[75] bg-forest-950/92 backdrop-blur-md flex items-center justify-center p-4 pb-[calc(1rem+var(--float-bar-h))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(`gallery.items.${galleryItems[active].id}.title`)}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label={t('gallery.close')}
              onClick={() => setActive(null)}
            />
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative z-20 max-w-5xl w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={galleryItems[active].src}
                alt={t(`gallery.items.${galleryItems[active].id}.caption`)}
                className="max-h-[min(78vh,calc(100dvh-var(--float-bar-h)-7rem))] w-full object-contain"
              />
              <figcaption className="mt-4 flex flex-col gap-2 text-sm text-ivory-200/80 sm:flex-row sm:justify-between sm:gap-4">
                <span className="min-w-0">
                  <span className="text-gold-300">{t(`gallery.kind.${galleryItems[active].kind}`)}</span>
                  {' · '}
                  {t(`gallery.items.${galleryItems[active].id}.title`)} — {t(`gallery.items.${galleryItems[active].id}.caption`)}
                </span>
                <span className="shrink-0">
                  {active + 1} / {galleryItems.length}
                </span>
              </figcaption>
            </motion.figure>
            <button
              type="button"
              className="absolute bottom-16 left-4 z-20 text-[0.62rem] uppercase tracking-luxury md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                setActive((i) => (i - 1 + galleryItems.length) % galleryItems.length);
              }}
            >
              {t('gallery.prev')}
            </button>
            <button
              type="button"
              className="absolute bottom-16 right-4 z-20 text-[0.62rem] uppercase tracking-luxury md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                setActive((i) => (i + 1) % galleryItems.length);
              }}
            >
              {t('gallery.next')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
