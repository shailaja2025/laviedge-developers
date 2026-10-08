import SEO from '../Components/layout/SEO';
import PageBanner from '../Components/layout/PageBanner';
import PageJourney from '../Components/layout/PageJourney';
import Portfolio from '../Components/sections/Portfolio';
import { images } from '../data/siteData';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.projects.title')} description={t('pages.projects.description')} path="/projects" />
      <PageBanner
        kicker={t('nav.projects')}
        title={t('portfolio.title')}
        lede={t('portfolio.lede')}
        image={images.aerial}
      />
      <Portfolio hideHeader />
      <PageJourney
        links={[
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.gallery, labelKey: 'journey.gallery' },
          { to: paths.contact, labelKey: 'journey.contact' },
          { to: paths.about, labelKey: 'journey.about' },
        ]}
      />
    </>
  );
}
