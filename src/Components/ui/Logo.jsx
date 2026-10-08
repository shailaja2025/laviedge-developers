import { brandImages } from '../../data/brand';

export default function Logo({ compact = false }) {
  return (
    <span
      className={`header-mark relative inline-flex items-center overflow-hidden bg-ivory-50 transition-[height,transform] duration-500 ease-luxe hover:scale-[1.02] ${
        compact ? 'h-10 px-1.5' : 'h-11 sm:h-12 md:h-[3.65rem] px-1.5 sm:px-2'
      }`}
    >
      <img
        src={brandImages.laviedge}
        alt="Laviedge Developers"
        className={`w-auto max-w-[7.5rem] sm:max-w-none object-contain ${compact ? 'h-8' : 'h-9 sm:h-10 md:h-12'}`}
      />
    </span>
  );
}
