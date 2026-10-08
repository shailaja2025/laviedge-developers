import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../ui/Reveal';
import ImageFrame from '../ui/ImageFrame';
import HoverCard from '../ui/HoverCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { amenityVisuals, greenVisuals, images, site } from '../../data/siteData';
import { brandImages } from '../../data/brand';
import VisualMosaic from '../ui/VisualMosaic';
import {
  amenityIds,
  chainIds,
  greenIds,
  infraIds,
  nriChapters,
  ownIds,
  phase1AreaTotal,
  phase1Record,
  regionNames,
  roadConcepts,
} from '../../data/nriFacts';
import { useLanguage } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function NRIStory() {
  return (
    <>
      <NRIMark />
      <ChapterNav />
      <Thesis />
      <Record />
      <Place />
      <Roads />
      <Infra />
      <Landscape />
      <Amenities />
      <Future />
      <Ownership />
    </>
  );
}

function NRIMark() {
  const { t } = useLanguage();
  const facts = [
    [t('nri.rera'), phase1Record.rera],
    [t('nri.plots'), String(phase1Record.plots)],
    [t('nri.corridor'), 'NH-544D'],
    [t('nri.place'), phase1Record.place],
  ];

  return (
    <section id="nri-mark" className="bg-ivory-50 text-forest-900" aria-label={t('nri.logoAlt')}>
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 md:gap-12 md:py-20 lg:grid-cols-2 lg:gap-14">
        <Reveal className="min-w-0 w-full">
          <figure className="nri-page-mark">
            <span className="nri-page-mark__corner nri-page-mark__corner--tl" aria-hidden="true" />
            <span className="nri-page-mark__corner nri-page-mark__corner--tr" aria-hidden="true" />
            <span className="nri-page-mark__corner nri-page-mark__corner--bl" aria-hidden="true" />
            <span className="nri-page-mark__corner nri-page-mark__corner--br" aria-hidden="true" />
            <img
              src={brandImages.nri}
              alt={t('nri.logoAlt')}
              className="nri-page-mark__img"
            />
          </figure>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0 w-full">
          <p className="text-[0.58rem] uppercase tracking-[0.14em] text-gold-700 sm:text-[0.62rem] sm:tracking-luxury">
            {t('nri.kicker')}
          </p>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.14em] text-gold-700 sm:text-[0.62rem] sm:tracking-luxury">
            {t('nri.byline')}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.65rem)] font-medium leading-[1.14] tracking-[-0.02em] text-balance">
            {t('nri.eyebrow')}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-800 md:text-lg">
            {t('nri.intro')}
          </p>
          <p className="mt-3 max-w-xl text-sm text-gold-800">{t('nri.story.phaseOnly')}</p>
          <dl className="mt-8 grid grid-cols-1 gap-px bg-gold-500/20 sm:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="bg-ivory-50 px-4 py-4">
                <dt className="text-[0.56rem] uppercase tracking-luxury text-gold-700">{label}</dt>
                <dd className="mt-1 break-words font-display text-xl text-forest-900 sm:text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
            {site.contact.social.instagram.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="keep-case text-[0.72rem] text-gold-800 hover:text-gold-700"
                aria-label={t(item.id === 'nri' ? 'footer.instagramNri' : 'footer.instagramLaviedge')}
              >
                Instagram {item.handle}
              </a>
            ))}
            <a
              href={site.contact.social.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="keep-case text-[0.72rem] text-gold-800 hover:text-gold-700"
              aria-label={t('footer.facebookLaviedge')}
            >
              {t('footer.facebook')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChapterNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState(nriChapters[0].id);

  useEffect(() => {
    const nodes = nriChapters
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.__laviedgeLenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="chapter-nav pointer-events-auto fixed left-3 z-20 hidden max-h-[calc(100svh-var(--header-h)-var(--float-bar-h)-2.5rem)] -translate-y-1/2 flex-col gap-2 keep-dark rounded-sm border border-gold-500/20 bg-forest-950/75 px-3 py-4 backdrop-blur-md xl:flex"
      aria-label={t('nri.eyebrow')}
    >
      {nriChapters.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => go(item.id)}
          className={`pointer-events-auto group relative flex items-center justify-start gap-3 ${
            active === item.id ? 'text-gold-300' : 'text-ivory-300/50 hover:text-gold-400'
          }`}
        >
          <span
            className={`block h-px transition-all ${
              active === item.id ? 'w-8 bg-gold-400' : 'w-4 bg-gold-500/35 group-hover:w-6'
            }`}
          />
          <span className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[0.58rem] uppercase tracking-luxury opacity-0 transition group-hover:opacity-100">
            {t(`nri.story.chapters.${item.key}`)}
          </span>
        </button>
      ))}
    </nav>
  );
}

function ChapterHead({ roman, eyebrow, title, lede, light = false }) {
  return (
    <Reveal className="max-w-3xl">
      <p className={`editorial-num text-4xl ${light ? 'text-gold-400' : ''}`}>{roman}</p>
      <p className={`mt-4 text-[0.62rem] uppercase tracking-luxury ${light ? 'text-gold-400' : 'text-gold-700'}`}>
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.7rem,5vw,3.15rem)] font-medium leading-[1.14] tracking-[-0.02em] text-balance">{title}</h2>
      {lede ? (
        <p className={`mt-6 text-lg leading-relaxed ${light ? 'text-white' : 'text-charcoal-900'}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}

function Badge({ children, tone = 'gold' }) {
  return (
    <span
      className={`inline-flex items-center border px-3 py-1 text-[0.58rem] uppercase tracking-luxury ${
        tone === 'ivory'
          ? 'border-gold-500/40 text-gold-300'
          : 'border-gold-600/40 text-gold-800'
      }`}
    >
      {children}
    </span>
  );
}

function Thesis() {
  const { t, get } = useLanguage();
  const items = get('nri.story.thesis.items') || [];
  return (
    <section id="nri-thesis" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-6">
          <ChapterHead
            roman={t('nri.story.thesis.roman')}
            eyebrow={t('nri.story.thesis.eyebrow')}
            title={t('nri.story.thesis.title')}
            lede={t('nri.story.thesis.lede')}
          />
        </Reveal>
        <div className="lg:col-span-6">
          <ImageFrame>
            <img
              src={images.layout}
              alt={t('gallery.items.g19.caption')}
              className="aspect-[16/10] w-full object-cover"
            />
          </ImageFrame>
          <p className="mt-3 text-sm font-normal text-charcoal-800">{t('gallery.items.g19.caption')}</p>
        </div>
        <ul className="lg:col-span-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, index) => (
            <Reveal key={item} delay={index * 0.04} className="border border-forest-900/10 bg-ivory-100 px-5 py-4">
              <span className="text-[0.58rem] uppercase tracking-luxury text-gold-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-2 font-display text-2xl">{item}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Record() {
  const { t } = useLanguage();
  const fields = [
    ['project', t('nri.story.record.values.project')],
    ['promoter', t('nri.story.record.values.promoter')],
    ['type', t('nri.story.record.values.type')],
    ['rera', phase1Record.rera],
    ['plots', String(phase1Record.plots)],
    ['location', t('nri.story.record.values.location')],
    ['start', phase1Record.start],
    ['completion', phase1Record.completion],
  ];

  return (
    <section id="nri-record" className="keep-dark footer-mark text-ivory-100 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge tone="ivory">{t('nri.story.verified')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.record.roman')}
              eyebrow={t('nri.story.record.eyebrow')}
              title={t('nri.story.record.title')}
              lede={t('nri.story.record.lede')}
              light
            />
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-gold-500/20">
          {fields.map(([key, value], index) => (
            <Reveal key={key} delay={index * 0.04} className="min-w-0 bg-forest-800/60 px-4 py-5 sm:px-6 sm:py-6">
              <p className="text-[0.58rem] uppercase tracking-luxury text-gold-400">
                {t(`nri.story.record.fields.${key}`)}
              </p>
              <p className="mt-2 break-words font-display text-2xl md:text-3xl">{value}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">
            {t('nri.story.record.areaTitle')}
          </p>
          <p className="mt-3 max-w-2xl text-ivory-200/80">{t('nri.story.record.areaNote')}</p>
          <p className="mt-2 text-sm text-gold-300">{t('nri.story.phaseOnly')}</p>
        </Reveal>

        <div className="mt-10 space-y-5">
          {phase1Record.areas.map((item) => (
            <AreaBar key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AreaBar({ item }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = usePrefersReducedMotion();
  const pct = Math.round((item.sqm / phase1AreaTotal) * 100);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
        <span className="min-w-0 uppercase tracking-luxury text-[0.62rem] text-gold-400">
          {t(`nri.story.record.areas.${item.id}`)}
        </span>
        <span className="shrink-0 text-ivory-100">
          <AnimatedCounter value={item.sqm} /> {t('nri.story.record.unit')} · {pct}%
        </span>
      </div>
      <div className="mt-2 h-px bg-gold-500/15 overflow-visible">
        <motion.div
          className="h-[3px] bg-gold-400 origin-left"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: inView || reduced ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Place() {
  const { t } = useLanguage();
  return (
    <section id="nri-place" className="bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <ChapterHead
            roman={t('nri.story.place.roman')}
            eyebrow={t('nri.story.place.eyebrow')}
            title={t('nri.story.place.title')}
            lede={t('nri.story.place.lede')}
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <ImageFrame>
              <img
                src={images.entrance}
                alt={t('gallery.items.g17.caption')}
                className="aspect-[16/10] w-full object-cover"
              />
            </ImageFrame>
            <p className="mt-3 text-sm font-normal text-charcoal-800">{t('gallery.items.g17.caption')}</p>
          </div>
          <div>
            <p className="text-[0.62rem] uppercase tracking-luxury text-gold-700">
              {t('nri.story.place.highwayTitle')}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-700">{t('nri.story.place.highway')}</p>
            <Chain />
          </div>
        </div>

        <Reveal className="mt-16">
          <p className="text-[0.62rem] uppercase tracking-luxury text-gold-700">
            {t('nri.story.place.regionTitle')}
          </p>
          <p className="mt-4 max-w-3xl text-charcoal-700">{t('nri.story.place.region')}</p>
          <p className="mt-3 text-sm text-gold-800">{t('nri.story.noDistance')}</p>
        </Reveal>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {regionNames.map((id, index) => (
            <Reveal key={id} delay={index * 0.04} className="border border-forest-900/10 px-5 py-5 bg-ivory-50">
              <p className="font-display text-2xl">{t(`nri.story.place.destinations.${id}`)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Chain() {
  const { t } = useLanguage();
  return (
    <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
      {chainIds.map((id, index) => (
        <li key={id} className="flex items-center gap-3">
          <motion.span
            className="text-[0.68rem] uppercase tracking-luxury text-forest-900 border-b border-gold-500 pb-1"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
          >
            {t(`nri.story.chain.${id}`)}
          </motion.span>
          {index < chainIds.length - 1 ? (
            <span className="text-gold-600" aria-hidden="true">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Roads() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();

  return (
    <section id="nri-roads" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge>{t('nri.story.concept')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.roads.roman')}
              eyebrow={t('nri.story.roads.eyebrow')}
              title={t('nri.story.roads.title')}
              lede={t('nri.story.roads.lede')}
            />
          </div>
        </Reveal>
        <Reveal className="mt-12">
          <ImageFrame>
            <img
              src={images.layout}
              alt={t('gallery.items.g19.caption')}
              className="aspect-[21/9] w-full object-cover"
            />
          </ImageFrame>
          <p className="mt-3 text-sm font-normal text-charcoal-800">{t('gallery.items.g19.caption')}</p>
        </Reveal>
        <div ref={ref} className="mt-16 space-y-8">
          {roadConcepts.map((road, index) => (
            <div key={road.id}>
              <div className="flex min-w-0 flex-wrap justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-2xl text-forest-700 sm:text-3xl">{t(`nri.story.roads.items.${road.id}.title`)}</p>
                  <p className="mt-2 text-charcoal-800">{t(`nri.story.roads.items.${road.id}.copy`)}</p>
                </div>
                <p className="editorial-num text-4xl">{road.feet}′</p>
              </div>
              <div className="mt-4 h-3 bg-ivory-200 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                  initial={{ width: reduced ? road.width : 0 }}
                  animate={{ width: inView || reduced ? road.width : 0 }}
                  transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infra() {
  const { t } = useLanguage();
  return (
    <section id="nri-infra" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge>{t('nri.story.concept')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.infra.roman')}
              eyebrow={t('nri.story.infra.eyebrow')}
              title={t('nri.story.infra.title')}
              lede={t('nri.story.infra.lede')}
            />
          </div>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <ImageFrame>
            <img src={images.security} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
          </ImageFrame>
          <ImageFrame>
            <img src={images.plantingHands} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
          </ImageFrame>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infraIds.map((id, index) => (
            <Reveal
              key={id}
              delay={index * 0.06}
              className="group border border-forest-900/10 p-8 hover:border-gold-500/50 transition-colors"
            >
              <p className="editorial-num text-3xl">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-3xl group-hover:text-gold-700 transition-colors">
                {t(`nri.story.infra.items.${id}.title`)}
              </h3>
              <p className="mt-3 text-charcoal-600">{t(`nri.story.infra.items.${id}.copy`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Landscape() {
  const { t } = useLanguage();
  return (
    <section id="nri-green" className="relative overflow-hidden bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge>{t('nri.story.concept')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.green.roman')}
              eyebrow={t('nri.story.green.eyebrow')}
              title={t('nri.story.green.title')}
              lede={t('nri.story.green.lede')}
            />
          </div>
        </Reveal>
        <Reveal className="mt-12">
          <ImageFrame>
            <img
              src={images.acres}
              alt={t('gallery.items.g18.caption')}
              className="aspect-[16/10] w-full object-cover"
            />
          </ImageFrame>
          <p className="mt-3 text-sm font-normal text-charcoal-800">{t('gallery.items.g18.caption')}</p>
        </Reveal>
        <Reveal className="mt-12 lux-card border border-gold-500/25 px-6 py-8 max-w-xl">
          <p className="text-[0.62rem] uppercase tracking-luxury text-life-700">{t('nri.story.green.fruit')}</p>
          <p className="mt-3 font-display text-5xl text-forest-700">17</p>
          <p className="mt-3 text-charcoal-800">{t('nri.story.green.fruitNote')}</p>
        </Reveal>
        <VisualMosaic
          className="mt-12"
          items={greenVisuals.map((src, index) => ({
            src,
            alt: t('nri.story.proposed'),
            kind: t('nri.story.proposed'),
            title: t(`nri.story.green.items.${greenIds[index]}`),
          }))}
        />
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {greenIds.map((id, index) => (
            <Reveal key={id} delay={index * 0.04} className="lux-card border border-gold-500/20 px-5 py-5">
              {t(`nri.story.green.items.${id}`)}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Amenities() {
  const { t } = useLanguage();
  return (
    <section id="nri-amenities" className="bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge>{t('nri.story.proposed')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.amenity.roman')}
              eyebrow={t('nri.story.amenity.eyebrow')}
              title={t('nri.story.amenity.title')}
              lede={t('nri.story.amenity.lede')}
            />
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {amenityIds.map((id, index) => (
            <Reveal key={id} delay={index * 0.05} className="h-full min-h-[18rem]">
              <HoverCard
                src={amenityVisuals[id]}
                alt={`${t(`nri.story.amenity.items.${id}.title`)} — ${t('nri.story.proposed')}`}
                kind={t('nri.story.proposed')}
                title={t(`nri.story.amenity.items.${id}.title`)}
                caption={t(`nri.story.amenity.items.${id}.copy`)}
                className="hover-card--amenity h-full min-h-[18rem]"
                imgClassName="aspect-[16/10] h-full min-h-[18rem] object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Future() {
  const { t } = useLanguage();
  return (
    <section id="nri-future" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Badge>{t('nri.story.proposed')}</Badge>
          <div className="mt-6">
            <ChapterHead
              roman={t('nri.story.future.roman')}
              eyebrow={t('nri.story.future.eyebrow')}
              title={t('nri.story.future.title')}
              lede={t('nri.story.future.lede')}
            />
          </div>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <Reveal className="border border-gold-500/20 p-8 md:p-12">
            <p className="text-[0.58rem] uppercase tracking-luxury text-gold-400">{t('nri.story.proposed')}</p>
            <h3 className="mt-4 font-display text-4xl">{t('nri.story.future.schoolTitle')}</h3>
            <p className="mt-3 editorial-num text-3xl">{t('nri.story.future.schoolArea')}</p>
            <p className="mt-5 text-ivory-200/85">{t('nri.story.future.schoolCopy')}</p>
          </Reveal>
          <Reveal delay={0.1} className="border border-gold-500/20 p-8 md:p-12">
            <p className="text-[0.58rem] uppercase tracking-luxury text-gold-400">{t('nri.story.proposed')}</p>
            <h3 className="mt-4 font-display text-4xl">{t('nri.story.future.templeTitle')}</h3>
            <p className="mt-3 editorial-num text-3xl">{t('nri.story.future.templeArea')}</p>
            <p className="mt-5 text-ivory-200/85">{t('nri.story.future.templeCopy')}</p>
          </Reveal>
        </div>
        <Reveal className="mt-8 border border-gold-500/15 px-8 py-8">
          <h3 className="font-display text-3xl">{t('nri.story.gated.title')}</h3>
          <p className="mt-4 max-w-3xl text-ivory-200/85">{t('nri.story.gated.copy')}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Ownership() {
  const { t } = useLanguage();
  return (
    <section id="nri-own" className="relative overflow-hidden bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <Reveal className="lg:col-span-7">
            <ChapterHead
              roman={t('nri.story.own.roman')}
              eyebrow={t('nri.story.own.eyebrow')}
              title={t('nri.story.own.title')}
              lede={t('nri.story.own.lede')}
            />
            <p className="mt-4 text-sm text-gold-800">{t('nri.story.noReturns')}</p>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <ImageFrame>
              <img src={images.family} alt="" className="aspect-[4/5] w-full object-cover" />
            </ImageFrame>
          </Reveal>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {ownIds.map((id, index) => (
            <Reveal key={id} delay={index * 0.05} className="border border-forest-900/10 p-6 bg-ivory-100">
              <h3 className="font-display text-2xl">{t(`nri.story.own.items.${id}.title`)}</h3>
              <p className="mt-3 text-sm text-charcoal-600">{t(`nri.story.own.items.${id}.copy`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
