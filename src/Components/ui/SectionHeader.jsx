import Reveal from './Reveal';
import TextReveal from './TextReveal';

export default function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  light = false,
  align = 'left',
  compact = false,
  titleClassName = '',
}) {
  const tone = light ? 'text-white' : 'text-forest-950';
  const mute = light ? 'text-white' : 'text-charcoal-900';
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignCls}`}>
      <Reveal>
        <div className={`flex items-center gap-4 ${compact ? 'mb-3' : 'mb-6'}`}>
          {index && (
            <span className="editorial-num text-2xl md:text-3xl leading-none" aria-hidden="true">
              {index}
            </span>
          )}
          <span className="gold-rule w-10" />
          <span
            className={`text-[0.64rem] font-semibold uppercase tracking-[0.18em] ${light ? 'text-gold-400' : 'text-gold-700'}`}
          >
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <TextReveal
        as="h2"
        text={title}
        delay={0.08}
        className={`font-display text-[clamp(1.7rem,4.8vw,3.15rem)] font-medium leading-[1.18] tracking-[-0.018em] ${tone} text-balance ${titleClassName}`}
      />
      {lede && (
        <Reveal delay={0.16} direction="clip">
          <p className={`${compact ? 'mt-3' : 'mt-6'} text-base md:text-lg max-w-2xl ${mute}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
