import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import AnimatedCounter from '../ui/AnimatedCounter';
import Masterplan from '../project/Masterplan';
import PlotExplorer from '../project/PlotExplorer';
import HoverCard from '../ui/HoverCard';
import { galleryItems, images } from '../../data/siteData';
import { nriTownship } from '../../data/projectData';
import { paths } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage, useLocalizedProject } from '../../context/LanguageContext';

const tabIds = ['masterplan', 'plots', 'location', 'amenities', 'gallery'];
const locKeys = ['place', 'corridor', 'phase', 'plots', 'map'];

export default function NRITownship({ standalone = false }) {
  const [tab, setTab] = useState('masterplan');
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const project = useLocalizedProject(nriTownship);

  return (
    <section id="nri-township" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {standalone ? (
          <div className="mb-10">
            <p className="editorial-num text-4xl text-gold-500">10</p>
            <p className="mt-4 text-[0.62rem] uppercase tracking-luxury text-gold-600">
              {t('nri.story.chapters.register')}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,4.2vw,2.85rem)] text-forest-700">{t('nri.registerTitle')}</h2>
            <p className="mt-5 max-w-2xl text-charcoal-800">{t('nri.masterCopy')}</p>
          </div>
        ) : (
          <>
            <p className="text-[0.62rem] uppercase tracking-brand text-gold-600">{t('nri.kicker')}</p>
            <SectionHeader
              index="06"
              eyebrow={t('nri.eyebrow')}
              title={t('nri.title')}
              lede={t('nri.lede')}
            />
          </>
        )}

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: t('nri.corridor'), v: project.highway },
            { k: t('nri.place'), v: project.verified.place },
            { k: t('nri.rera'), v: project.verified.rera },
            { k: t('nri.plots'), v: project.verified.plots, count: true },
          ].map((item, index) => (
            <Reveal key={item.k} delay={index * 0.07} className="lux-card border border-gold-500/20 border-t-gold-500 px-5 py-6">
              <p className="text-[0.58rem] uppercase tracking-luxury text-gold-400">{item.k}</p>
              <p className="mt-3 break-words font-display text-2xl md:text-3xl">
                {item.count ? <AnimatedCounter value={item.v} /> : item.v}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label={t('nri.tabs.aria')}>
          {tabIds.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`nri-tab-${id}`}
              aria-controls="nri-register-panel"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className="btn-tab btn-grad keep-case relative z-10 px-4 py-2.5 text-[0.62rem] tracking-luxury border w-full sm:w-auto text-center"
            >
              {t(`nri.tabs.${id}`)}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[20rem]" role="tabpanel" id="nri-register-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
            >
              {tab === 'masterplan' && <Masterplan />}
              {tab === 'plots' && <PlotExplorer />}
              {tab === 'location' && <LocationPanel />}
              {tab === 'amenities' && <AmenitiesPanel items={project.proposed} />}
              {tab === 'gallery' && <MiniGallery />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          {standalone ? (
            <Button onClick={() => openEnquiry('nri')} variant="acute">
              {t('cta.nriEnquiry')}
            </Button>
          ) : (
            <Button to={paths.nri} variant="acute">
              {t('cta.openProject')}
            </Button>
          )}
          <Button onClick={() => openEnquiry('visit')} variant="line">
            {t('cta.visit')}
          </Button>
          {standalone ? (
            <Button to={paths.contact} variant="line">
              {t('nav.contact')}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LocationPanel() {
  const { t } = useLanguage();
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <ul className="space-y-4">
        {locKeys.map((key) => (
          <li key={key} className="flex justify-between gap-6 border-b border-gold-500/15 pb-3">
            <span className="text-[0.62rem] uppercase tracking-luxury text-gold-400">{t(`nri.loc.${key}`)}</span>
            <span className="text-right">{t(`nri.locValues.${key}`)}</span>
          </li>
        ))}
      </ul>
      <div className="relative aspect-[16/10] overflow-hidden border border-gold-500/20">
        <img src={images.entrance} alt={t('gallery.items.g17.caption')} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-950/35" />
        <p className="absolute bottom-4 left-4 text-[0.62rem] uppercase tracking-luxury text-ivory-100">
          {t('nri.mapNote')}
        </p>
      </div>
    </div>
  );
}

function AmenitiesPanel({ items }) {
  const { t } = useLanguage();
  return (
    <div>
      <div className="inline-flex items-center gap-2 border border-gold-500/40 px-3 py-1 text-[0.58rem] uppercase tracking-luxury text-gold-700">
        {t('nri.proposedBadge')}
      </div>
      <ul className="mt-6 grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <li key={item} className="lux-card border border-gold-500/20 px-5 py-4 text-forest-900">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-charcoal-800 max-w-2xl">
        {t('nri.amenitiesNote')}
      </p>
    </div>
  );
}

function MiniGallery() {
  const { t } = useLanguage();
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {galleryItems.slice(0, 4).map((item) => (
          <HoverCard
            key={item.id}
            to={paths.gallery}
            src={item.src}
            alt={t(`gallery.items.${item.id}.caption`)}
            kind={t(`gallery.kind.${item.kind}`)}
            title={t(`gallery.items.${item.id}.title`)}
            caption={t(`gallery.items.${item.id}.caption`)}
            imgClassName="aspect-[4/5] h-full min-h-[12rem] object-cover"
          />
        ))}
      </div>
      <div className="mt-6">
        <Button to={paths.gallery} variant="line">
          {t('journey.gallery')}
        </Button>
      </div>
    </div>
  );
}
