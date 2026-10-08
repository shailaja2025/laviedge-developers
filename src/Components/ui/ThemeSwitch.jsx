import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitch({ className = '', quiet = false }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${quiet ? 'header-icon' : 'theme-acute'} ${className}`}
      aria-label={isLight ? t('theme.toDark') : t('theme.toLight')}
      aria-pressed={!isLight}
      title={isLight ? t('theme.dark') : t('theme.light')}
    >
      <span className="sr-only">{isLight ? t('theme.dark') : t('theme.light')}</span>
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.7 5.7l1.5 1.5M16.8 16.8l1.5 1.5M5.7 18.3l1.5-1.5M16.8 7.2l1.5-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.6 3.8A8.4 8.4 0 1 0 20.2 14 6.6 6.6 0 0 1 15.6 3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
