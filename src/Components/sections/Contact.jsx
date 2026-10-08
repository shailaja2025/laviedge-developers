import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { site } from '../../data/siteData';
import { paths, whatsappHref } from '../../data/routes';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact({ hideHeader = false }) {
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'nri', note: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const onChange = (event) => setForm((p) => ({ ...p, [event.target.name]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'contact.errName';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'contact.errEmail';
    if (form.phone.replace(/\D/g, '').length < 8) next.phone = 'contact.errPhone';
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = encodeURIComponent(`Laviedge contact — ${form.interest}`);
    const body = encodeURIComponent(
      `${form.name}\n${form.email}\n${form.phone}\nInterest: ${form.interest}\n\n${form.note}`,
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setDone(true);
  };

  return (
    <section id="contact" className="bg-ivory-50 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-10 md:gap-14">
        <Reveal className="min-w-0 lg:col-span-5">
          {hideHeader ? null : (
            <SectionHeader
              index="13"
              eyebrow={t('contact.eyebrow')}
              title={t('contact.title')}
              lede={t('contact.lede')}
            />
          )}
          <dl className="mt-10 space-y-4">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('contact.email')}</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.contact.email}`} className="desk-plate text-base sm:text-lg break-all hover:text-gold-700">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('contact.phone')}</dt>
              <dd className="mt-2 grid gap-3">
                {site.contact.phones.map((phone) => (
                  <div key={phone.tel} className="flex flex-wrap items-center gap-3">
                    <a href={`tel:${phone.tel}`} className="desk-plate text-lg hover:text-gold-700">
                      {phone.display}
                    </a>
                    <a
                      href={whatsappHref(phone.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.62rem] uppercase tracking-luxury text-gold-700 hover:text-gold-800"
                    >
                      {t('cta.whatsapp')}
                    </a>
                  </div>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('contact.instagram')}</dt>
              <dd className="mt-2 grid gap-2">
                {site.contact.social.instagram.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="desk-plate keep-case text-base sm:text-lg break-all hover:text-gold-700"
                    aria-label={t(item.id === 'nri' ? 'footer.instagramNri' : 'footer.instagramLaviedge')}
                  >
                    {item.handle}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('contact.facebook')}</dt>
              <dd className="mt-2">
                <a
                  href={site.contact.social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="desk-plate keep-case text-base sm:text-lg hover:text-gold-700"
                  aria-label={t('footer.facebookLaviedge')}
                >
                  {t('contact.facebook')}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-luxury text-gold-700">{t('contact.office')}</dt>
              <dd className="mt-2 text-charcoal-800 leading-relaxed">{t('contact.officeValue')}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => openEnquiry('brochure')}
              className="text-left text-[0.68rem] uppercase tracking-luxury text-gold-700"
            >
              {t('contact.brochure')}
            </button>
            <button
              type="button"
              onClick={() => openEnquiry('visit')}
              className="text-left text-[0.68rem] uppercase tracking-luxury text-gold-700"
            >
              {t('contact.visit')}
            </button>
            <Link
              to={paths.nri}
              className="text-left text-[0.68rem] uppercase tracking-luxury text-gold-700"
            >
              {t('journey.nri')} →
            </Link>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1} className="min-w-0 lg:col-span-7 border border-forest-900/10 border-t-gold-500 p-5 sm:p-6 md:p-10 bg-ivory-100 shadow-glass">
          {done ? (
            <p className="font-display text-3xl">
              {t('contact.done', { email: site.contact.email })}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <Field name="name" label={t('contact.name')} value={form.name} onChange={onChange} error={errors.name} />
              <Field name="email" type="email" label={t('contact.email')} value={form.email} onChange={onChange} error={errors.email} />
              <Field name="phone" type="tel" label={t('contact.phoneField')} value={form.phone} onChange={onChange} error={errors.phone} />
              <div className="lux-field">
                <label htmlFor="interest" className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
                  {t('contact.interest')}
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={form.interest}
                  onChange={onChange}
                  className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2"
                >
                  <option value="nri">{t('contact.interests.nri')}</option>
                  <option value="visit">{t('contact.interests.visit')}</option>
                  <option value="brochure">{t('contact.interests.brochure')}</option>
                  <option value="general">{t('contact.interests.general')}</option>
                </select>
              </div>
              <div className="lux-field">
                <label htmlFor="note" className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
                  {t('contact.note')}
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows="4"
                  value={form.note}
                  onChange={onChange}
                  className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2"
                />
              </div>
              <button
                type="submit"
                className="btn-acute btn-shine btn-mark btn-grad w-full text-white text-[0.68rem] uppercase tracking-luxury px-8 py-3.5 sm:w-auto"
              >
                {t('cta.send')}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ name, label, type = 'text', value, onChange, error }) {
  const { t } = useLanguage();
  return (
    <div className="lux-field">
      <label htmlFor={name} className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2"
      />
      {error && <p className="mt-1 text-xs text-red-800">{t(error)}</p>}
    </div>
  );
}
