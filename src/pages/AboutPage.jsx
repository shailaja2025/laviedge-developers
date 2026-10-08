import SEO from '../Components/layout/SEO';
import PageBanner from '../Components/layout/PageBanner';
import PageJourney from '../Components/layout/PageJourney';
import About from '../Components/sections/About';
import Vision from '../Components/sections/Vision';
import WhyLaviedge from '../Components/sections/WhyLaviedge';
import Approach from '../Components/sections/Approach';
import Trust from '../Components/sections/Trust';
import { images, site } from '../data/siteData';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.about.title')} description={t('pages.about.description')} path="/about" />
      <PageBanner
        kicker={t('nav.about')}
        title={t('about.title')}
        lede={t('about.lede', { year: site.founded })}
        image={images.about}
      />
      <About hideHeader />
      <Vision />
      <WhyLaviedge />
      <Approach />
      <Trust />
      <PageJourney
        links={[
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.founder, labelKey: 'journey.founder' },
          { to: paths.contact, labelKey: 'journey.contact' },
        ]}
      />
    </>
  );
}
