import SEO from '../Components/layout/SEO';
import PageJourney from '../Components/layout/PageJourney';
import CinematicField from '../Components/ui/CinematicField';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.notFound.title')} description={t('pages.notFound.description')} path={paths.notFound} />
      <section className="keep-dark relative min-h-[70vh] overflow-hidden bg-forest-950 text-ivory-100 flex items-center justify-center px-6">
        <CinematicField />
        <div className="relative z-10 text-center max-w-xl">
          <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">404</p>
          <h1 className="mt-4 font-display text-[clamp(1.85rem,5vw,3rem)]">{t('pages.notFound.body')}</h1>
        </div>
      </section>
      <PageJourney
        links={[
          { to: paths.home, labelKey: 'journey.home' },
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.contact, labelKey: 'journey.contact' },
        ]}
      />
    </>
  );
}
