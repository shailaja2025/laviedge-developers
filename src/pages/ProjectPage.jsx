import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../Components/layout/SEO';
import PageJourney from '../Components/layout/PageJourney';
import Button from '../Components/ui/Button';
import CinematicField from '../Components/ui/CinematicField';
import Masterplan from '../Components/project/Masterplan';
import PlotExplorer from '../Components/project/PlotExplorer';
import { FLAGSHIP_SLUG, getProjectBySlug } from '../data/projectData';
import { paths, projectPath } from '../data/routes';
import { useEnquiry } from '../context/EnquiryContext';
import { useLanguage, useLocalizedProject } from '../context/LanguageContext';

export default function ProjectPage() {
  const { slug } = useParams();
  const raw = getProjectBySlug(slug);
  const project = useLocalizedProject(raw);
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();

  if (slug === FLAGSHIP_SLUG) {
    return <Navigate to={paths.nri} replace />;
  }

  if (!project) {
    return (
      <>
        <SEO title={t('project.missing')} description={t('pages.projects.description')} path={projectPath(slug)} />
        <div className="keep-dark min-h-screen bg-forest-950 text-ivory-100 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="font-display text-4xl">{t('project.missing')}</p>
            <Link to={paths.projects} className="mt-6 inline-block text-gold-300 tracking-luxury uppercase text-[0.66rem]">
              {t('project.back')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="keep-dark bg-forest-950 text-ivory-100">
      <SEO
        title={project.name}
        description={project.short}
        path={projectPath(project.slug)}
      />
      <section className="relative min-h-[70vh] overflow-hidden">
        <img src={project.image} alt="" className="image-kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/25 to-forest-950/10" />
        <CinematicField />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-5 md:px-8 pb-16 pt-36">
          <p className="text-[0.62rem] uppercase tracking-luxury text-gold-300">
            {project.location} · {project.status}
          </p>
          <h1 className="mt-4 font-display text-[clamp(1.75rem,6vw,3.5rem)]">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-ivory-200/85">{project.description}</p>
        </div>
      </section>

      {project.verified ? (
        <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid md:grid-cols-4 gap-4">
          <Fact label={t('project.highway')} value={project.verified.highway} />
          <Fact label={t('project.place')} value={project.verified.place} />
          <Fact label={t('project.rera')} value={project.verified.rera} />
          <Fact label={t('project.plots')} value={String(project.verified.plots)} />
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-5 py-20 text-ivory-200/80">
          <p>
            {t('project.unpublished')}
          </p>
        </section>
      )}

      {project.flagship && (
        <section className="mx-auto max-w-7xl px-5 md:px-8 pb-20 space-y-16">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,1.85rem)]">{t('project.master')}</h2>
            <div className="mt-6">
              <Masterplan />
            </div>
          </div>
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,1.85rem)]">{t('project.explorer')}</h2>
            <div className="mt-6">
              <PlotExplorer />
            </div>
          </div>
          {project.proposed.length > 0 && (
            <div>
              <h2 className="font-display text-[clamp(1.5rem,3vw,1.85rem)]">{t('project.proposed')}</h2>
              <p className="mt-3 text-sm text-gold-300 uppercase tracking-luxury">
                {t('project.notApproved')}
              </p>
              <ul className="mt-6 grid md:grid-cols-2 gap-3">
                {project.proposed.map((item) => (
                  <li key={item} className="border border-gold-500/15 px-5 py-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="border-t border-gold-500/15 px-5 py-16 flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => openEnquiry('visit')} variant="gold">
          {t('project.visit')}
        </Button>
        <Button onClick={() => openEnquiry('brochure')} variant="line">
          {t('project.brochure')}
        </Button>
        <Button to={paths.projects} variant="line">
          {t('project.back')}
        </Button>
      </section>
      <PageJourney
        links={[
          { to: paths.nri, labelKey: 'journey.nri' },
          { to: paths.projects, labelKey: 'journey.projects' },
          { to: paths.contact, labelKey: 'journey.contact' },
          { to: paths.home, labelKey: 'journey.home' },
        ]}
      />
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="border border-gold-500/20 px-5 py-6">
      <p className="text-[0.58rem] uppercase tracking-luxury text-gold-400">{label}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
    </div>
  );
}
