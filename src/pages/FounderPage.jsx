import SEO from '../Components/layout/SEO';
import PageBanner from '../Components/layout/PageBanner';
import PageJourney from '../Components/layout/PageJourney';
import Founder from '../Components/sections/Founder';
import { images, site } from '../data/siteData';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function FounderPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.founder.title')} description={t('pages.founder.description')} path="/founder" />
      <PageBanner
        kicker={t('nav.founder')}
        title={site.founder.name}
        lede={t('founder.title')}
        image={images.founder}
      />
      <Founder hideHeader />
      <PageJourney
        links={[
          { to: paths.about, labelKey: 'journey.about' },
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.contact, labelKey: 'journey.contact' },
          { to: paths.home, labelKey: 'journey.home' },
        ]}
      />
    </>
  );
}
