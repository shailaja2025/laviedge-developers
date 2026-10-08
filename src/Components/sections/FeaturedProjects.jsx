import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import CinematicField from '../ui/CinematicField';
import HudFrame from '../fx/HudFrame';
import Reveal from '../ui/Reveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { featuredProjects, nriTownship, projectHref } from '../../data/projectData';
import { paths } from '../../data/routes';
import { useLanguage, useLocalizedProject } from '../../context/LanguageContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const project = useLocalizedProject(featuredProjects[0] || nriTownship);
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%']);

  if (!project) return null;

  return (
    <section
      ref={ref}
      id="projects"
      className="keep-dark relative min-h-[88vh] overflow-hidden bg-forest-950 text-ivory-100"
    >
      <div className="absolute inset-0 hero-canvas" />
      <motion.img
        style={{ y }}
        src={project.image}
        alt=""
        className="image-kenburns absolute inset-0 h-[120%] w-full object-cover opacity-50"
      />
      <div className="brand-veil" />
      <CinematicField />
      <HudFrame className="inset-5 md:inset-8" />
      <div className="pointer-events-none absolute inset-5 md:inset-8 border border-[#5BB8E8]/28" />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pt-24 pb-[calc(6rem+var(--float-bar-h))] sm:px-5 md:px-8 md:pt-28 md:pb-[calc(7rem+var(--float-bar-h))]">
        <Reveal>
          <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">
            {t('featured.eyebrow')}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-luxury text-gold-300">
            <span>{project.location}</span>
            <span className="h-px w-8 bg-gold-500" />
            <span>{project.status}</span>
            <span className="border border-gold-500/50 px-2 py-1">{t('portfolio.flagship')}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} direction="clip">
          <h2 className="mt-5 font-display text-[clamp(1.7rem,5.4vw,3.35rem)] leading-[1.1] tracking-[-0.02em] max-w-3xl">
            {project.name}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg text-ivory-50 leading-relaxed">{project.short}</p>
        </Reveal>

        {project.verified ? (
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px bg-gold-500/20 lg:grid-cols-4">
            <Plaque k={t('facts.road')} v={project.verified.highway} delay={0.18} />
            <Plaque k={t('facts.place')} v={project.verified.place} delay={0.24} />
            <Plaque k={t('facts.rera')} v={project.verified.rera} delay={0.3} />
            <Plaque k={t('facts.plots')} v={String(project.verified.plots)} delay={0.36} count={project.verified.plots} />
          </div>
        ) : null}

        <Reveal delay={0.28} className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button to={projectHref(project)} variant="acute">
            {t('cta.enterFlagship')}
          </Button>
          <Button to={paths.projects} variant="ghost">
            {t('cta.explore')}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Plaque({ k, v, delay = 0, count }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="bg-forest-950/80 px-3 sm:px-4 py-5 min-w-0">
        <p className="text-[0.56rem] uppercase tracking-luxury text-gold-400">{k}</p>
        {count != null ? (
          <AnimatedCounter value={count} className="mt-2 block font-display text-lg sm:text-xl md:text-2xl text-ivory-50" />
        ) : (
          <p className="mt-2 font-display text-lg sm:text-xl md:text-2xl text-ivory-50 break-words">{v}</p>
        )}
      </div>
    </Reveal>
  );
}
