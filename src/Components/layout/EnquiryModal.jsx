import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import { site } from '../../data/siteData';
import Logo from '../ui/Logo';

const intentIds = ['general', 'brochure', 'visit', 'nri', 'call', 'whatsapp', 'plot'];

export default function EnquiryModal() {
  const { open, closeEnquiry, intent, plotRef, setIntent } = useEnquiry();
  const { t } = useLanguage();
  const titleId = useId();
  const firstField = useRef(null);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });

  useEffect(() => {
    if (open) {
      setSent(false);
      setErrors({});
      const t = setTimeout(() => firstField.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') closeEnquiry();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeEnquiry]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'form.errName';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'form.errEmail';
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 8) {
      next.phone = 'form.errPhone';
    }
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Laviedge enquiry — ${intent}${plotRef ? ` — ${plotRef}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry / city: ${form.country || '—'}\nIntent: ${intent}\nPlot reference: ${plotRef || '—'}\n\n${form.message}`,
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            aria-label={t('cta.closeEnquiry')}
            onClick={closeEnquiry}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl max-h-[min(92vh,100svh)] overflow-y-auto bg-ivory-50 text-forest-900 shadow-glass px-0 pb-[env(safe-area-inset-bottom)]"
          >
            <div className="flex items-start justify-between px-4 sm:px-6 md:px-8 pt-7 pb-4 border-b border-forest-900/10">
              <div>
                <Logo compact />
                <p className="mt-4 text-[0.62rem] uppercase tracking-luxury text-gold-600">{t('form.desk')}</p>
                <h2 id={titleId} className="font-display text-[clamp(1.45rem,3vw,1.75rem)] mt-1">
                  {t('form.title')}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeEnquiry}
                className="relative z-10 text-[0.62rem] uppercase tracking-label"
                aria-label={t('cta.close')}
              >
                {t('cta.close')}
              </button>
            </div>

            {sent ? (
              <div className="px-4 sm:px-6 md:px-8 py-10">
                <p className="font-display text-2xl">{t('form.sentTitle')}</p>
                <p className="mt-4 text-charcoal-600">
                  {t('form.sentBody', { email: site.contact.email, phones: site.contact.phoneDisplay })}
                </p>
                <button
                  type="button"
                  onClick={closeEnquiry}
                  className="mt-8 text-[0.68rem] uppercase tracking-luxury border border-forest-900 px-6 py-3"
                >
                  {t('cta.return')}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="px-4 sm:px-6 md:px-8 py-7 space-y-5" noValidate>
                <div>
                  <label htmlFor="intent" className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
                    {t('form.interest')}
                  </label>
                  <select
                    id="intent"
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2"
                  >
                    {intentIds.map((id) => (
                      <option key={id} value={id}>
                        {t(`form.intents.${id}`)}
                      </option>
                    ))}
                  </select>
                  {plotRef && (
                    <p className="mt-2 text-sm text-gold-700">{t('form.plotRef', { ref: plotRef })}</p>
                  )}
                </div>

                <Field
                  ref={firstField}
                  label={t('form.name')}
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label={t('form.email')}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  label={t('form.phone')}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <Field
                  label={t('form.country')}
                  name="country"
                  value={form.country}
                  onChange={onChange}
                  autoComplete="country-name"
                />
                <div>
                  <label htmlFor="message" className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={onChange}
                    className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2 resize-y"
                    placeholder={t('form.placeholder')}
                  />
                </div>

                <p className="text-xs text-charcoal-400">
                  {t('form.disclaimer', { email: site.contact.email })}
                </p>

                <button
                  type="submit"
                  className="btn-acute btn-shine btn-mark btn-grad w-full text-white text-[0.68rem] uppercase tracking-luxury py-3.5"
                >
                  {t('cta.send')}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Field = forwardRef(function Field(
  { label, name, type = 'text', value, onChange, error, autoComplete },
  ref,
) {
  const { t } = useLanguage();
  const id = `field-${name}`;
  return (
    <div className="lux-field">
      <label htmlFor={id} className="text-[0.62rem] uppercase tracking-label text-charcoal-400">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full bg-transparent border-b border-forest-900/20 py-2"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-800">
          {t(error)}
        </p>
      )}
    </div>
  );
});
