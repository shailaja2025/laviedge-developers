import MediaReveal from './MediaReveal';

export default function ImageFrame({ children, className = '' }) {
  return (
    <div className={`image-frame relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 border border-gold-500/25 sm:-inset-2 md:-inset-3 lg:-inset-4" />
      <div className="gold-corner gold-corner-tl" aria-hidden="true" />
      <div className="gold-corner gold-corner-tr" aria-hidden="true" />
      <div className="gold-corner gold-corner-bl" aria-hidden="true" />
      <div className="gold-corner gold-corner-br" aria-hidden="true" />
      <MediaReveal className="h-full w-full">{children}</MediaReveal>
    </div>
  );
}
