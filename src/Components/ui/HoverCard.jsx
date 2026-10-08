import { Link } from 'react-router-dom';
import { useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function HoverCard({
  as,
  to,
  onClick,
  src,
  alt = '',
  kind,
  title,
  caption,
  className = '',
  imgClassName = 'aspect-[4/3] min-h-[13rem]',
  fit = 'cover',
  type = 'button',
}) {
  const cardRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)');

  const onMove = (event) => {
    const el = cardRef.current;
    if (!el || reduced || !fine) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 7}deg) translateY(-6px)`;
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  const inner = (
    <>
      <img
        src={src}
        alt={alt}
        className={`hover-card__media w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
        loading="lazy"
      />
      <span className="hover-card__veil" aria-hidden="true" />
      <span className="hover-card__scan" aria-hidden="true" />
      <span className="hover-card__panel keep-dark">
        {kind ? <span className="hover-card__kind keep-case">{kind}</span> : null}
        <span className="hover-card__rule" aria-hidden="true" />
        {title ? <span className="hover-card__title keep-case">{title}</span> : null}
        {caption ? <span className="hover-card__caption keep-case">{caption}</span> : null}
      </span>
    </>
  );

  const cls = `hover-card hover-card--photo lux-card group relative block overflow-hidden ${
    fit === 'contain' ? 'hover-card--contain' : ''
  } ${className}`;
  const tilt = { ref: cardRef, onMouseMove: onMove, onMouseLeave: onLeave };

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={[kind, title].filter(Boolean).join(' — ')} {...tilt}>
        {inner}
      </Link>
    );
  }

  if (as === 'button' || onClick) {
    return (
      <button type={type} onClick={onClick} className={`${cls} w-full text-left`} aria-label={title} {...tilt}>
        {inner}
      </button>
    );
  }

  return (
    <article className={cls} {...tilt}>
      {inner}
    </article>
  );
}
