import { Link } from 'react-router-dom';
import useMagnetic from '../../hooks/useMagnetic';

const styles = {
  gold: 'btn-gold btn-grad',
  acute: 'btn-acute btn-mark btn-grad text-white',
  ghost: 'btn-ghost btn-grad',
  dark: 'btn-acute btn-mark btn-grad text-white',
  line: 'btn-line btn-grad',
};

export default function Button({
  children,
  href,
  to,
  onClick,
  variant = 'acute',
  className = '',
  type = 'button',
  ariaLabel,
  target,
  rel,
}) {
  const magnetic = useMagnetic(8);
  const cls = `btn-shine relative z-10 pointer-events-auto inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden px-7 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] border transition-[color,background,border-color,box-shadow] duration-500 ease-luxe ${styles[variant] || styles.acute} ${className}`;
  const shell = {
    ref: magnetic.ref,
    onMouseMove: magnetic.onMouseMove,
    onMouseLeave: magnetic.onMouseLeave,
    className: 'magnetic pointer-events-auto relative z-10 inline-flex w-full sm:w-auto',
  };

  if (to) {
    return (
      <span {...shell}>
        <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick}>
          {children}
        </Link>
      </span>
    );
  }

  if (href) {
    return (
      <span {...shell}>
        <a href={href} className={cls} aria-label={ariaLabel} onClick={onClick} target={target} rel={rel}>
          {children}
        </a>
      </span>
    );
  }

  return (
    <span {...shell}>
      <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
        {children}
      </button>
    </span>
  );
}
