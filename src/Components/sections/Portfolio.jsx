import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import ProjectCard from '../project/ProjectCard';
import { projects } from '../../data/projectData';
import { useLanguage } from '../../context/LanguageContext';

export default function Portfolio({ hideHeader = false }) {
  const { t } = useLanguage();
  return (
    <section id="portfolio" className="bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {hideHeader ? null : (
          <SectionHeader
            index="07"
            eyebrow={t('portfolio.eyebrow')}
            title={t('portfolio.title')}
            lede={t('portfolio.lede')}
          />
        )}
        <div className={`${hideHeader ? 'mt-0' : 'mt-14'} grid md:grid-cols-2 gap-5`}>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
