import { useEffect, useRef } from 'react';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import HudFrame from '../fx/HudFrame';
import CinematicField from '../ui/CinematicField';
import { site } from '../../data/siteData';
import { brandImages } from '../../data/brand';
import { useLanguage } from '../../context/LanguageContext';
import { loadInstagramEmbed, processInstagramEmbeds, fitInstagramEmbed } from '../../lib/instagram';

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.15" cy="6.85" r="0.95" fill="currentColor" />
    </svg>
  );
}

function OfficialProfiles() {
  const { t } = useLanguage();
  const profiles = [
    ...site.contact.social.instagram.map((item) => ({
      id: item.id,
      href: item.href,
      label: item.handle,
      aria: t(item.id === 'nri' ? 'footer.instagramNri' : 'footer.instagramLaviedge'),
    })),
    {
      id: 'facebook',
      href: site.contact.social.facebook.href,
      label: t('footer.facebook'),
      aria: t('footer.facebookLaviedge'),
    },
  ];

  return (
    <div className="relative z-10 min-w-0 flex-1 border-t border-gold-500/20 px-4 py-4 sm:px-5">
      <p className="text-[0.58rem] uppercase tracking-luxury text-gold-300">{t('gallery.feed.officials')}</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {profiles.map((item) => (
          <li key={item.id} className="min-w-0">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.aria}
              className="keep-case block truncate text-sm text-ivory-100 hover:text-gold-300"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InstagramFeed() {
  const { t } = useLanguage();
  const wellRef = useRef(null);
  const account = site.contact.social.instagram.find((item) => item.id === 'nri');
  const permalink = account
    ? account.href.endsWith('/')
      ? account.href
      : `${account.href}/`
    : '';

  useEffect(() => {
    if (!permalink) return undefined;
    let cancelled = false;
    const fit = () => {
      if (!cancelled) fitInstagramEmbed(wellRef.current);
    };
    loadInstagramEmbed()
      .then(() => {
        if (cancelled) return;
        processInstagramEmbeds();
        fit();
        window.setTimeout(() => {
          if (cancelled) return;
          processInstagramEmbeds();
          fit();
        }, 450);
        window.setTimeout(fit, 1200);
      })
      .catch(() => {});
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width) fit();
    });
    const onFrame = (event) => {
      if (event.target?.tagName === 'IFRAME') fit();
    };
    if (wellRef.current) {
      observer.observe(wellRef.current);
      wellRef.current.addEventListener('load', onFrame, true);
    }
    window.addEventListener('resize', fit);
    return () => {
      cancelled = true;
      observer.disconnect();
      wellRef.current?.removeEventListener('load', onFrame, true);
      window.removeEventListener('resize', fit);
    };
  }, [permalink]);

  if (!account) return null;

  return (
    <section
      id="instagram"
      className="keep-dark relative overflow-x-clip bg-forest-950 pt-4 text-ivory-100 pb-[calc(6.5rem+var(--float-bar-h))] md:pt-8"
    >
      <div className="pointer-events-none absolute inset-0 hero-canvas opacity-70" />
      <CinematicField />
      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="10"
          light
          compact
          eyebrow={t('gallery.feed.eyebrow')}
          title={t('gallery.feed.title')}
          lede={t('gallery.feed.lede')}
        />

        <article className="ig-feed__card relative mx-auto mt-4 w-full min-w-0">
          <HudFrame className="inset-0" />
          <div className="relative z-10 flex h-full min-w-0 flex-col border border-gold-500/25 bg-forest-900/40">
            <header className="flex items-center gap-3 border-b border-gold-500/20 px-4 py-4 sm:px-5">
              <img
                src={brandImages.nri}
                alt=""
                className="h-12 w-12 shrink-0 object-contain bg-ivory-50 p-1"
              />
              <div className="min-w-0">
                <p className="text-[0.58rem] uppercase tracking-luxury text-gold-300">{t('footer.instagramNri')}</p>
                <p className="mt-1 truncate font-display text-xl text-ivory-50 keep-case">{t('gallery.feed.nriName')}</p>
                <p className="mt-0.5 truncate text-sm text-ivory-200/80 keep-case">{account.handle}</p>
                {account.official ? (
                  <p className="mt-2 text-[0.58rem] uppercase tracking-luxury text-gold-300">{t('gallery.feed.official')}</p>
                ) : null}
              </div>
            </header>

            <div ref={wellRef} className="ig-feed__well relative z-10 min-w-0">
              <div className="ig-feed__scale">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={permalink}
                  data-instgrm-version="14"
                >
                  <a href={account.href} target="_blank" rel="noopener noreferrer" className="ig-feed__fallback keep-case">
                    {account.handle}
                  </a>
                </blockquote>
              </div>
            </div>

            <div className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
              <OfficialProfiles />
              <div className="relative z-10 shrink-0 border-t border-gold-500/20 p-4 sm:w-56 sm:border-l sm:border-t-0 sm:p-5">
                <Button
                  href={account.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="acute"
                  ariaLabel={t('footer.instagramNri')}
                  className="w-full"
                >
                  <InstagramMark />
                  {t('gallery.feed.open')}
                </Button>
              </div>
            </div>
          </div>
        </article>

        <p className="mt-8 max-w-3xl text-sm text-ivory-200/75">{t('gallery.feed.note')}</p>
      </div>
    </section>
  );
}
