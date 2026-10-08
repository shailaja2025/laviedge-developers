import { Link } from 'react-router-dom';
import { projectHref } from '../../data/projectData';
import { useLanguage, useLocalizedProject } from '../../context/LanguageContext';

export default function ProjectCard({ project, featured = false }) {
  const { t } = useLanguage();
  const item = useLocalizedProject(project);
  const href = projectHref(project);
  const label = project.flagship ? t('cta.enterFlagship') : t('cta.viewProject');

  return (
    <article
      className={`keep-dark lux-card hover-card text-card group relative overflow-hidden bg-forest-900 ${
        featured ? 'md:col-span-2 min-h-[32rem]' : 'min-h-[26rem]'
      }`}
    >
      <Link to={href} className="absolute inset-0 z-20" aria-label={`${item.name} — ${label}`}>
        <span className="sr-only">{label}</span>
      </Link>
      <img
        src={project.image}
        alt=""
        className="hover-card__media absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
      <div className="absolute inset-4 border border-gold-500/0 group-hover:border-gold-500/35 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-10 pointer-events-none">
        <div className="flex flex-wrap items-center gap-3 text-[0.6rem] uppercase tracking-luxury text-gold-300">
          <span>{item.location}</span>
          <span className="h-px w-6 bg-gold-500" />
          <span>{item.status}</span>
          {project.flagship && (
            <span className="border border-gold-500/50 px-2 py-1">{t('portfolio.flagship')}</span>
          )}
        </div>
        <h3 className="mt-4 font-display text-2xl md:text-[2.75rem] font-medium leading-tight tracking-[-0.02em] text-ivory-50">{item.name}</h3>
        <span className="text-card__hint text-gold-300">{t('why.hoverHint')}</span>
        <p className="text-card__copy mt-3 max-w-lg text-ivory-100/90 leading-relaxed">{item.short}</p>
        <p className="mt-6 inline-flex items-center gap-3 text-[0.66rem] uppercase tracking-luxury text-gold-300">
          {label}
          <span aria-hidden="true" className="link-arrow">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
