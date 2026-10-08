import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import { site } from '../../data/siteData';
import { whatsappHref } from '../../data/routes';

const cell =
  'cta-cell flex min-w-0 flex-1 items-center justify-center gap-1.5 px-1.5 py-3 text-[0.55rem] uppercase tracking-label sm:gap-2 sm:px-3 sm:text-[0.62rem]';

export default function PersistentCTA() {
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const phone = site.contact.phoneTel;
  const whatsapp = site.contact.whatsapp;

  return (
    <>
      {phone ? (
        <a href={`tel:${phone}`} className={`cta-call btn-grad ${cell}`}>
          <PhoneIcon />
          <span className="hidden min-[380px]:inline truncate">{t('cta.call')}</span>
        </a>
      ) : (
        <button type="button" onClick={() => openEnquiry('call')} className={`cta-call btn-grad ${cell}`}>
          <PhoneIcon />
          <span className="hidden min-[380px]:inline truncate">{t('cta.call')}</span>
        </button>
      )}
      {whatsapp ? (
        <a
          href={whatsappHref(whatsapp)}
          target="_blank"
          rel="noreferrer"
          className={`cta-whats btn-grad ${cell}`}
        >
          <WhatsIcon />
          <span className="hidden min-[380px]:inline truncate">{t('cta.whatsapp')}</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => openEnquiry('whatsapp')}
          className={`cta-whats btn-grad ${cell}`}
        >
          <WhatsIcon />
          <span className="hidden min-[380px]:inline truncate">{t('cta.whatsapp')}</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => openEnquiry('general')}
        className={`cta-enquire btn-grad ${cell}`}
      >
        <MailIcon />
        <span className="hidden min-[380px]:inline truncate">{t('cta.enquire')}</span>
      </button>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9 19.5 4.5 15 4.5 5.5c0-1 1-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function WhatsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.1 4.9A9.9 9.9 0 0 0 3.7 17.4L3 21l3.7-.7A9.9 9.9 0 1 0 19.1 4.9Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8.6 9.6c.3 2 2.6 4.2 4.6 4.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
