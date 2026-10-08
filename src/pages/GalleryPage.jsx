import SEO from '../Components/layout/SEO';
import PageBanner from '../Components/layout/PageBanner';
import PageJourney from '../Components/layout/PageJourney';
import Gallery from '../Components/sections/Gallery';
import InstagramFeed from '../Components/sections/InstagramFeed';
import { images } from '../data/siteData';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.gallery.title')} description={t('pages.gallery.description')} path="/gallery" />
      <PageBanner
        kicker={t('nav.gallery')}
        title={t('gallery.title')}
        lede={t('gallery.lede')}
        image={images.hero}
      />
      <Gallery hideHeader />
      <InstagramFeed />
      <PageJourney
        links={[
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.contact, labelKey: 'journey.contact' },
          { to: paths.home, labelKey: 'journey.home' },
        ]}
      />
    </>
  );
}
