import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSwitch({ className = '', quiet = false }) {
  const { locale, setLocale, t } = useLanguage();

  if (quiet) {
    return (
      <div role="group" aria-label={t('lang.group')} className={`header-lang shrink-0 whitespace-nowrap ${className}`}>
        <LangOption
          quiet
          active={locale === 'en'}
          label="EN"
          onSelect={() => setLocale('en')}
          ariaLabel={t('lang.switchToEn')}
        />
        <span className="header-lang-rule" aria-hidden="true">
          /
        </span>
        <LangOption
          quiet
          active={locale === 'te'}
          label="తె"
          onSelect={() => setLocale('te')}
          ariaLabel={t('lang.switchToTe')}
        />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t('lang.group')}
      className={`lang-switch inline-flex items-stretch border border-gold-500/55 ${className}`}
    >
      <LangOption
        active={locale === 'en'}
        label={t('lang.en')}
        short="EN"
        onSelect={() => setLocale('en')}
        ariaLabel={t('lang.switchToEn')}
      />
      <LangOption
        active={locale === 'te'}
        label={t('lang.te')}
        short="తె"
        onSelect={() => setLocale('te')}
        ariaLabel={t('lang.switchToTe')}
      />
    </div>
  );
}

function LangOption({ active, label, short, onSelect, ariaLabel, quiet = false }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={ariaLabel}
      title={label}
      className={
        quiet
          ? `px-1 py-1 text-[0.62rem] font-medium tracking-[0.14em] transition-colors duration-300 ${
              active ? 'text-[#F0E3B8]' : 'text-white hover:text-gold-200'
            }`
          : `min-w-[2.4rem] px-2.5 py-1.5 text-[0.62rem] tracking-[0.16em] transition-colors duration-300 ${
              active
                ? 'btn-grad text-forest-950'
                : 'text-ivory-200/80 hover:text-gold-300'
            }`
      }
    >
      {quiet ? (
        label
      ) : (
        <>
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{short}</span>
        </>
      )}
    </button>
  );
}
