import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';

export default function PageJourney({ links }) {
  const { t } = useLanguage();
  if (!links?.length) return null;

  return (
    <nav
      className="border-t border-gold-500/20 bg-ivory-100 text-forest-900"
      aria-label={t('journey.continue')}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">{t('journey.continue')}</p>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {links.map((item, index) => (
            <Reveal key={item.to} as="li" delay={index * 0.07}>
              <Link
                to={item.to}
                className="lux-card group flex h-full min-h-[9.5rem] flex-col justify-between border border-gold-500/20 px-5 py-6 hover:border-gold-500/50"
              >
                <span className="font-display text-2xl text-forest-700 group-hover:text-gold-600 transition-colors duration-500">
                  {t(item.labelKey)}
                </span>
                <span className="mt-6 flex items-center justify-between text-[0.58rem] uppercase tracking-luxury text-gold-400">
                  <span className="opacity-0 -translate-x-2 transition duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    {t('journey.open')}
                  </span>
                  <span aria-hidden="true" className="link-arrow">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </nav>
  );
}
