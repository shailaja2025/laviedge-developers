import SEO from '../Components/layout/SEO';
import PageJourney from '../Components/layout/PageJourney';
import NRIHero from '../Components/nri/NRIHero';
import NRIStory from '../Components/nri/NRIStory';
import NRITownship from '../Components/sections/NRITownship';
import NRIExperience from '../Components/sections/NRIExperience';
import { paths } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

export default function NRIPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO title={t('pages.nri.title')} description={t('pages.nri.description')} path={paths.nri} />
      <NRIHero />
      <NRIStory />
      <NRITownship standalone />
      <NRIExperience />
      <PageJourney
        links={[
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.gallery, labelKey: 'journey.gallery' },
          { to: paths.contact, labelKey: 'journey.contact' },
          { to: paths.about, labelKey: 'journey.about' },
        ]}
      />
    </>
  );
}
