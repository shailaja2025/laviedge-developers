import { useLanguage } from '../../context/LanguageContext';

export default function Masterplan() {
  const { t } = useLanguage();
  return (
    <div>
      <p className="text-sm text-forest-950 max-w-2xl">
        {t('nri.masterCopy')}
      </p>

      <div className="mt-6 relative overflow-hidden border border-gold-500/20 bg-forest-950 aspect-[16/10]">
        <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label={t('nri.masterAria')}>
          <rect width="800" height="500" fill="#070B16" />
          <path d="M0 430 C 160 400 240 460 400 440 C 560 420 640 380 800 400 L 800 500 L 0 500 Z" fill="#0C1224" />
          <path d="M40 300 C 180 280 220 180 360 170 C 520 158 560 240 760 220" fill="none" stroke="#B08E47" strokeWidth="2" opacity="0.7" />
          <text x="70" y="250" fill="#B08E47" fontSize="11" letterSpacing="2">NH-544D corridor</text>

          <rect x="210" y="150" width="260" height="190" fill="#1B3A8A" stroke="#B08E47" strokeWidth="1.2" />
          <text x="230" y="180" fill="#F7F4EC" fontSize="16" fontFamily="Georgia">PHASE-1</text>
          <text x="230" y="204" fill="#B08E47" fontSize="11">RERA P07430077089</text>
          <text x="230" y="224" fill="#EDE6D6" fontSize="11">233 registered plots</text>
          <text x="230" y="248" fill="#C9BBA0" fontSize="10">Verified</text>

          <rect x="490" y="120" width="170" height="130" fill="none" stroke="#B08E47" strokeDasharray="5 5" opacity="0.7" />
          <text x="508" y="150" fill="#D4BC7A" fontSize="12">PROPOSED</text>
          <text x="508" y="170" fill="#C8C4BB" fontSize="10">Future structure</text>
          <text x="508" y="188" fill="#C8C4BB" fontSize="10">Subject to release</text>

          <rect x="490" y="270" width="170" height="90" fill="none" stroke="#B08E47" strokeDasharray="5 5" opacity="0.5" />
          <text x="508" y="305" fill="#D4BC7A" fontSize="12">PROPOSED</text>
          <text x="508" y="325" fill="#C8C4BB" fontSize="10">Landscape / civic</text>

          <circle cx="340" cy="245" r="18" fill="none" stroke="#F6F1E7" />
          <text x="332" y="249" fill="#F6F1E7" fontSize="10">P1</text>
        </svg>
      </div>
      <p className="mt-4 text-xs text-charcoal-800">
        {t('nri.masterNote')}
      </p>
    </div>
  );
}
