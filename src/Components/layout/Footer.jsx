import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { site, verifiedFacts } from '../../data/siteData';
import { projectHref, projects } from '../../data/projectData';
import { paths, whatsappHref } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage, useLocalizedProject } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function Footer() {
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['14%', '-10%']);
  const ghostX = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-3%', '3%']);

  const ticker = [
    `EST. ${verifiedFacts.companyFounded}`,
    `${t('facts.rera')} ${verifiedFacts.phase1Rera}`,
    `${verifiedFacts.phase1Plots} ${t('facts.plots')}`,
    verifiedFacts.highway,
    verifiedFacts.location,
    verifiedFacts.village,
    t('hero.tagline'),
  ];

  const chips = [
    { k: t('facts.founded'), v: String(verifiedFacts.companyFounded) },
    { k: t('facts.rera'), v: verifiedFacts.phase1Rera },
    { k: t('facts.plots'), v: String(verifiedFacts.phase1Plots) },
    { k: t('facts.road'), v: verifiedFacts.highway },
    { k: t('facts.place'), v: verifiedFacts.location.split(',')[0] },
  ];

  const ascend = () => {
    const lenis = window.__laviedgeLenis;
    if (lenis) lenis.scrollTo(0, { duration: reduced ? 0 : 1.35 });
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="keep-dark footer-stage pb-[var(--float-bar-h)] text-white"
      aria-label={t('footer.aria')}
    >
      <div className="footer-aurora" aria-hidden="true" />
      <div className="footer-grid" aria-hidden="true" />
      <div className="footer-dust" aria-hidden="true" />
      <FooterCircuit />
      <div className="footer-orbs" aria-hidden="true">
        <span className="footer-orb footer-orb--cyan" />
        <span className="footer-orb footer-orb--gold" />
        <span className="footer-orb footer-orb--navy" />
      </div>
      <motion.p
        aria-hidden="true"
        style={{ y: ghostY, x: ghostX }}
        className="footer-ghost keep-case"
      >
        LAVIEDGE
      </motion.p>
      <div className="footer-beam" aria-hidden="true" />
      <div className="footer-scan" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-28 md:pt-32 pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <Link to={paths.home} aria-label={t('brand.home')} className="footer-logo-halo inline-block">
              <Logo />
            </Link>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="keep-case font-sans text-xl font-semibold tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.16em]">
                {t('brand.name').toUpperCase()}
              </span>
              <span className="keep-case font-sans text-base font-medium tracking-[0.16em] text-gold-400 sm:text-xl sm:tracking-[0.18em]">
                {t('brand.developers').toUpperCase()}
              </span>
            </p>
            <p className="keep-case mt-3 font-display italic text-xl font-semibold text-[#B8F5C8]">
              live life with an edge
            </p>
            <p className="mt-4 max-w-md font-display italic text-[1.65rem] font-medium leading-snug text-ivory-50 md:text-3xl">
              {t('hero.tagline')}
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-ivory-50">{t('footer.blurb')}</p>
            <p className="mt-5 flex flex-wrap items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#9FD4F0]">
              <span className="footer-pulse" aria-hidden="true" />
              <span className="keep-case">Est. {site.founded}</span>
              <span className="h-px w-6 bg-gold-400/50" aria-hidden="true" />
              <span>{site.region}</span>
            </p>
          </Reveal>

          <div className="lg:col-span-5 lg:pt-2">
            <div className="flex flex-col gap-3 sm:items-end">
              <Button onClick={() => openEnquiry('visit')} variant="gold" className="sm:w-auto">
                {t('cta.arrangeVisit')}
              </Button>
              <Button to={paths.nri} variant="acute" className="sm:w-auto">
                {t('cta.enterFlagship')}
              </Button>
              <button
                type="button"
                onClick={() => openEnquiry('brochure')}
                className="footer-ghost-link mt-1"
              >
                {t('cta.brochure')}
              </button>
            </div>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2.5" aria-label={t('footer.legal')}>
          {chips.map((chip) => (
            <li key={chip.k} className="footer-chip keep-case">
              <span>{chip.k}</span>
              <strong>{chip.v}</strong>
            </li>
          ))}
        </ul>

        <div className="footer-split mt-14 grid gap-10 pt-12 md:grid-cols-12">
          <Reveal delay={0.04} className="md:col-span-3">
            <p className="footer-kicker">{t('footer.navigate')}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to={paths.home} className="footer-link">
                  {t('nav.home')}
                </Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="footer-link">
                    {t(`nav.${item.id}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={paths.login} className="footer-link">
                  {t('nav.login')}
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4">
            <p className="footer-kicker">{t('footer.projects')}</p>
            <ul className="mt-5 space-y-3">
              {projects.map((project) => (
                <FooterProjectLink key={project.id} project={project} />
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-5">
            <p className="footer-kicker">{t('footer.desk')}</p>
            <a href={`mailto:${site.contact.email}`} className="footer-plate mt-5 block">
              <span className="footer-plate__label">{t('footer.desk')}</span>
              <span className="footer-plate__value break-all">{site.contact.email}</span>
            </a>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {site.contact.phones.map((phone) => (
                <li key={phone.tel} className="footer-plate">
                  <a href={`tel:${phone.tel}`} className="footer-plate__value keep-case">
                    {phone.display}
                  </a>
                  <span className="mt-3 flex flex-wrap gap-3">
                    <a href={`tel:${phone.tel}`} className="footer-mini">
                      {t('cta.call')}
                    </a>
                    <a
                      href={whatsappHref(phone.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-mini footer-mini--gold"
                    >
                      {t('cta.whatsapp')}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            <p className="footer-kicker mt-8">{t('footer.instagram')}</p>
            <ul className="mt-4 space-y-3">
              {site.contact.social.instagram.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link keep-case"
                    aria-label={t(item.id === 'nri' ? 'footer.instagramNri' : 'footer.instagramLaviedge')}
                  >
                    {item.handle}
                  </a>
                </li>
              ))}
            </ul>
            <p className="footer-kicker mt-8">{t('footer.facebook')}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.contact.social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link keep-case"
                  aria-label={t('footer.facebookLaviedge')}
                >
                  {t('footer.facebook')}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="footer-ticker" aria-hidden="true">
        <div className="footer-ticker__track">
          {[0, 1].map((copy) => (
            <p key={copy} className="footer-ticker__line keep-case">
              {ticker.map((item) => (
                <span key={`${copy}-${item}`}>
                  {item}
                  <span className="footer-ticker__sep">◆</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-xs text-ivory-100">{t('footer.rights', { year })}</p>
        <p className="keep-case text-xs text-ivory-100">{t('footer.legal')}</p>
        <div className="flex items-center gap-4">
          <p className="hidden text-xs uppercase tracking-[0.16em] text-gold-400 sm:block">{t('footer.tag')}</p>
          <button type="button" onClick={ascend} className="footer-ascend relative z-10" aria-label={t('footer.ascend')}>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterProjectLink({ project }) {
  const localized = useLocalizedProject(project);
  const { t } = useLanguage();
  return (
    <li>
      <Link to={projectHref(project)} className="footer-link">
        {localized.name}
        {project.flagship ? t('footer.flagshipSuffix') : ''}
      </Link>
    </li>
  );
}

function FooterCircuit() {
  return (
    <svg className="footer-circuit" viewBox="0 0 1440 720" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="footerTrace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3AA0D8" stopOpacity="0" />
          <stop offset="0.45" stopColor="#5BB8E8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D4B44A" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        className="footer-trace"
        d="M-20 110 H280 L320 150 H620 L670 100 H980 L1040 160 H1460"
        fill="none"
        stroke="url(#footerTrace)"
        strokeWidth="1.15"
      />
      <path
        className="footer-trace footer-trace--slow"
        d="M1460 280 H1080 L1030 330 H720 L660 280 H240 L180 340 H-20"
        fill="none"
        stroke="url(#footerTrace)"
        strokeWidth="1.05"
      />
      <path
        className="footer-trace"
        d="M-20 520 H200 L250 470 H520 L560 510 H860 L920 450 H1460"
        fill="none"
        stroke="url(#footerTrace)"
        strokeWidth="1.05"
      />
      <circle cx="320" cy="150" r="3.5" fill="#5BB8E8" className="footer-node" />
      <circle cx="670" cy="100" r="3.5" fill="#D4B44A" className="footer-node" />
      <circle cx="1030" cy="330" r="3.5" fill="#5BB8E8" className="footer-node" />
      <circle cx="560" cy="510" r="3.5" fill="#D4B44A" className="footer-node" />
    </svg>
  );
}
