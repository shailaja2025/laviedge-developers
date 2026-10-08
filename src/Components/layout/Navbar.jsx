import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo';
import LanguageSwitch from '../ui/LanguageSwitch';
import ThemeSwitch from '../ui/ThemeSwitch';
import { site } from '../../data/siteData';
import { FLAGSHIP_SLUG, paths, projectPath } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import { luxeEase } from '../../lib/motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  const navActive = (item) => {
    const { pathname } = location;
    if (item.id === 'nri') {
      return pathname === paths.nri || pathname === projectPath(FLAGSHIP_SLUG);
    }
    if (item.id === 'projects') {
      return (
        pathname === paths.projects ||
        (pathname.startsWith(`${paths.projects}/`) && pathname !== projectPath(FLAGSHIP_SLUG))
      );
    }
    return pathname === item.path;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const compact = scrolled || open;
  const primaryPhone = site.contact.phones[0];

  return (
    <motion.header
      className={`site-header keep-dark nav-solid fixed inset-x-0 top-0 z-50 text-white ${compact ? 'is-compact' : ''}`}
      initial={reduced ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: luxeEase }}
    >
      <div className="header-sheen" aria-hidden="true" />

      <div className={`header-rail ${compact ? 'header-rail-hide' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
          <p className="flex min-w-0 items-center gap-3 text-[0.56rem] font-medium uppercase tracking-[0.2em] text-gold-300">
            <span className="hidden sm:inline">Est. {site.founded}</span>
            <span className="hidden sm:block h-px w-7 bg-gold-500/45" aria-hidden="true" />
            <span className="truncate">{site.region}</span>
          </p>
          <div className="flex min-w-0 items-center gap-5 text-[0.56rem] font-medium uppercase tracking-[0.14em] text-white">
            {primaryPhone ? (
              <a href={`tel:${primaryPhone.tel}`} className="hidden md:inline hover:text-gold-300 transition-colors">
                {primaryPhone.display}
              </a>
            ) : null}
            <a
              href={`mailto:${site.contact.email}`}
              className="hidden lg:inline truncate hover:text-gold-300 transition-colors"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="header-bar relative mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] min-[1080px]:grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-3 px-2.5 sm:px-5 md:px-8">
        <motion.div
          className="z-10 justify-self-start"
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.65, ease: luxeEase }}
        >
          <Link to={paths.home} aria-label={t('brand.home')} className="header-logo shrink-0">
            <Logo compact={compact} />
          </Link>
        </motion.div>

        <nav
          className="hidden min-[1080px]:flex items-center justify-center gap-0.5"
          aria-label={t('nav.primary')}
        >
          {site.nav.map((item, index) => {
            const active = navActive(item);
            return (
              <motion.div
                key={item.path}
                initial={reduced ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + index * 0.05, duration: 0.55, ease: luxeEase }}
              >
                <Link
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link px-2.5 py-2 text-[0.78rem] font-bold tracking-[0.03em] xl:px-3.5 xl:text-[0.8rem] ${
                    active ? 'is-active text-gold-200' : 'text-white hover:text-gold-200'
                  }`}
                >
                  {t(`nav.${item.id}`)}
                  {active ? (
                    <motion.span
                      layoutId="laviedge-nav-ink"
                      className="nav-ink"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          className="z-10 flex min-w-0 items-center justify-end gap-1 sm:gap-2 xl:gap-3 justify-self-end"
          initial={reduced ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.32, duration: 0.65, ease: luxeEase }}
        >
          {primaryPhone ? (
            <a
              href={`tel:${primaryPhone.tel}`}
              className="header-icon min-[1080px]:hidden"
              aria-label={primaryPhone.display}
            >
              <PhoneGlyph />
            </a>
          ) : null}
          <LanguageSwitch quiet />
          <ThemeSwitch quiet />
          <span className="header-split hidden sm:block" aria-hidden="true" />
          <motion.button
            type="button"
            onClick={() => openEnquiry('visit')}
            className="btn-acute btn-shine btn-mark hidden min-[1280px]:inline-flex text-[0.62rem] font-bold uppercase tracking-[0.16em] px-5 py-2.5 text-white"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: luxeEase }}
          >
            {t('cta.arrangeVisit')}
          </motion.button>
          <motion.button
            type="button"
            onClick={() => openEnquiry('general')}
            className="btn-acute btn-shine header-enquire hidden min-[1080px]:inline-flex text-[0.62rem] font-bold uppercase tracking-[0.16em] px-5 py-2.5"
            whileHover={reduced ? undefined : { y: -1 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: luxeEase }}
          >
            {t('cta.enquire')}
          </motion.button>
          <button
            type="button"
            className="header-icon relative z-10 min-[1080px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`nav-rule block h-px w-4 bg-white transition-transform duration-300 ease-luxe ${open ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`nav-rule block h-px w-4 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`nav-rule block h-px w-4 bg-white transition-transform duration-300 ease-luxe ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: luxeEase }}
            className="min-[1080px]:hidden overflow-hidden border-t border-gold-500/20 bg-[#1A3678]"
            aria-label={t('nav.mobile')}
          >
            <div className="flex flex-col px-6 py-7 pb-[calc(var(--float-bar-h)+1.75rem)]">
              <motion.p
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.4 }}
                className="text-[0.56rem] font-medium uppercase tracking-[0.2em] text-gold-400"
              >
                Est. {site.founded} · {site.region}
              </motion.p>
              <MobileItem
                to={paths.home}
                label={t('nav.home')}
                index={0}
                active={location.pathname === paths.home}
                current={location.pathname === paths.home}
                reduced={reduced}
                onClick={() => setOpen(false)}
              />
              {site.nav.map((item, index) => (
                <MobileItem
                  key={item.path}
                  to={item.path}
                  label={t(`nav.${item.id}`)}
                  index={index + 1}
                  active={navActive(item)}
                  reduced={reduced}
                  current={navActive(item)}
                  onClick={() => setOpen(false)}
                />
              ))}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45, ease: luxeEase }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openEnquiry('general');
                  }}
                  className="btn-acute btn-shine header-enquire px-6 py-3 text-[0.66rem] font-medium uppercase tracking-[0.16em]"
                >
                  {t('cta.enquire')}
                </button>
                {primaryPhone ? (
                  <a
                    href={`tel:${primaryPhone.tel}`}
                    className="text-[0.66rem] font-medium uppercase tracking-[0.14em] text-gold-300"
                  >
                    {primaryPhone.display}
                  </a>
                ) : null}
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileItem({ to, label, index, active, reduced, current, onClick }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.055, duration: 0.45, ease: luxeEase }}
    >
      <Link
        to={to}
        aria-current={current ? 'page' : undefined}
        className={`group flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5 font-display text-[clamp(1.45rem,6.4vw,1.95rem)] transition-colors duration-300 ${
          active ? 'text-gold-400' : 'text-white hover:text-gold-300'
        } ${index === 0 ? 'mt-5' : ''}`}
        onClick={onClick}
      >
        <span>{label}</span>
        <span className="font-sans text-[0.56rem] tracking-[0.16em] text-gold-400 transition-transform duration-300 group-hover:translate-x-1">
          {String(index + 1).padStart(2, '0')}
        </span>
      </Link>
    </motion.div>
  );
}

function PhoneGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9 19.5 4.5 15 4.5 5.5c0-1 1-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
