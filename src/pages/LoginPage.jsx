import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { luxeEase } from '../lib/motion';
import SEO from '../Components/layout/SEO';
import CinematicField from '../Components/ui/CinematicField';
import LanguageSwitch from '../Components/ui/LanguageSwitch';
import ThemeSwitch from '../Components/ui/ThemeSwitch';
import Logo from '../Components/ui/Logo';
import { brandImages } from '../data/brand';
import { site } from '../data/siteData';
import { paths, whatsappHref } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'login.errName';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'login.errEmail';
    if (form.phone.replace(/\D/g, '').length < 8) next.phone = 'login.errPhone';
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = encodeURIComponent('Laviedge desk — NRI Township');
    const body = encodeURIComponent(`${form.name}\n${form.email}\n${form.phone}\n\nDesk access / enquiry`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  return (
    <>
      <SEO title={t('pages.login.title')} description={t('pages.login.description')} path={paths.login} />
      <section className="keep-dark relative min-h-[100svh] overflow-x-hidden hero-canvas text-ivory-100">
        <div className="absolute inset-0 hero-canvas" />
        <div className="brand-veil" />
        <CinematicField />
        <div className="pointer-events-none absolute inset-5 md:inset-8 border border-gold-500/20" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8 pt-6">
          <Link to={paths.home} aria-label={t('brand.home')} className="min-w-0 shrink">
            <Logo compact />
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <ThemeSwitch quiet />
            <LanguageSwitch quiet />
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5.5rem)] max-w-lg flex-col justify-center px-4 sm:px-5 py-10 sm:py-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: luxeEase }}
            className="border border-gold-500/25 bg-ivory-50 px-5 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 text-forest-900 shadow-glass"
          >
            <div className="flex justify-center border-b border-forest-900/10 pb-6">
              <img
                src={brandImages.nri}
                alt={t('login.nriAlt')}
                className="h-28 sm:h-36 w-auto max-w-full object-contain"
              />
            </div>

            <p className="mt-7 text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('login.eyebrow')}</p>
            <h1 className="mt-3 font-display text-[clamp(1.55rem,3.4vw,1.85rem)] leading-tight">{t('login.title')}</h1>
            <p className="mt-3 text-charcoal-800 leading-relaxed">{t('login.lede')}</p>

            {done ? (
              <p className="mt-8 font-display text-2xl">{t('login.done', { email: site.contact.email })}</p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
                <Field name="name" label={t('login.name')} value={form.name} onChange={onChange} error={errors.name} />
                <Field
                  name="email"
                  type="email"
                  label={t('login.email')}
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                />
                <Field
                  name="phone"
                  type="tel"
                  label={t('login.phone')}
                  value={form.phone}
                  onChange={onChange}
                  error={errors.phone}
                />
                <button
                  type="submit"
                  className="btn-acute btn-shine btn-mark btn-grad w-full text-white text-[0.68rem] uppercase tracking-luxury px-8 py-3.5"
                >
                  {t('login.submit')}
                </button>
              </form>
            )}

            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[0.7rem] uppercase tracking-luxury text-gold-700">
              {site.contact.phones.map((phone) => (
                <span key={phone.tel} className="flex items-center gap-2">
                  <a href={`tel:${phone.tel}`} className="hover:text-gold-800">
                    {phone.display}
                  </a>
                  <a href={whatsappHref(phone.whatsapp)} target="_blank" rel="noreferrer" className="hover:text-gold-800">
                    {t('cta.whatsapp')}
                  </a>
                </span>
              ))}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-[0.62rem] uppercase tracking-luxury text-gold-700">
              <Link to={paths.nri} className="hover:text-gold-800">
                {t('cta.enterFlagship')} →
              </Link>
              <Link to={paths.contact} className="hover:text-gold-800">
                {t('nav.contact')} →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ name, label, type = 'text', value, onChange, error }) {
  const { t } = useLanguage();
  return (
    <div className="lux-field">
      <label htmlFor={`login-${name}`} className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
        {label}
      </label>
      <input
        id={`login-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2 text-forest-900"
      />
      {error ? <p className="mt-1 text-xs text-red-800">{t(error)}</p> : null}
    </div>
  );
}
