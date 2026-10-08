import SEO from '../Components/layout/SEO';
import PageBanner from '../Components/layout/PageBanner';
import PageJourney from '../Components/layout/PageJourney';
import FAQ from '../Components/sections/FAQ';
import Contact from '../Components/sections/Contact';
import { images } from '../data/siteData';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.contact.title')} description={t('pages.contact.description')} path="/contact" />
      <PageBanner
        kicker={t('nav.contact')}
        title={t('contact.title')}
        lede={t('contact.lede')}
        image={images.highway}
      />
      <Contact hideHeader />
      <FAQ />
      <PageJourney
        links={[
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.about, labelKey: 'journey.about' },
          { to: paths.home, labelKey: 'journey.home' },
        ]}
      />
    </>
  );
}
