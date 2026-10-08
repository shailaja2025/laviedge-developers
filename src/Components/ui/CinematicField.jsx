export default function CinematicField({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="hero-grid absolute inset-0 opacity-[0.07]" />
      <div className="lux-aurora" />
      <div className="lux-ribbon" />
      <div className="lux-dust" />
      <div className="lux-scan" />
      <div className="lux-vignette" />
    </div>
  );
}
