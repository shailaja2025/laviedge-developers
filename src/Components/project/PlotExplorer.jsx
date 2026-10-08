import { useMemo, useState } from 'react';
import { PHASE1_PLOT_COUNT } from '../../data/projectData';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';

export default function PlotExplorer() {
  const { openEnquiry } = useEnquiry();
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const plots = useMemo(() => Array.from({ length: PHASE1_PLOT_COUNT }, (_, i) => i + 1), []);

  return (
    <div>
      <p className="text-sm text-charcoal-800 max-w-2xl">
        {t('plot.intro', { count: PHASE1_PLOT_COUNT })}
      </p>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-end gap-4">
        <label className="text-[0.62rem] uppercase tracking-luxury text-gold-400">
          {t('plot.choose')}
          <input
            type="number"
            min={1}
            max={PHASE1_PLOT_COUNT}
            value={selected || ''}
            onChange={(event) => {
              const next = Number(event.target.value);
              setSelected(next >= 1 && next <= PHASE1_PLOT_COUNT ? next : null);
            }}
            className="mt-2 block w-full max-w-[12rem] bg-transparent border-b border-gold-500/40 py-2 text-forest-900"
          />
        </label>
      </div>

      <div
        className="mt-6 grid gap-[3px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(14px, 1fr))' }}
      >
        {plots.map((num) => {
          const active = selected === num;
          return (
            <button
              key={num}
              type="button"
              aria-pressed={active}
              aria-label={t('plot.plot', { n: num })}
              className={`plot-cell h-5 md:h-6 ${active ? 'bg-gold-400' : 'bg-forest-600/80'}`}
              onClick={() => setSelected(num)}
            />
          );
        })}
      </div>

      <div className="mt-6 glass-panel p-5 md:p-6">
        {selected ? (
          <>
            <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">
              {t('plot.ref')}
            </p>
            <p className="font-display text-3xl mt-2">{t('plot.plot', { n: selected })}</p>
            <p className="mt-3 text-ivory-200/80">
              {t('plot.detail')}
            </p>
            <button
              type="button"
              onClick={() => openEnquiry('plot', `Explorer plot ${selected}`)}
              className="mt-5 text-[0.66rem] uppercase tracking-luxury text-gold-300 border-b border-gold-500/40 pb-1"
            >
              {t('plot.enquire')}
            </button>
          </>
        ) : (
          <p className="text-ivory-300/80">{t('plot.empty', { count: PHASE1_PLOT_COUNT })}</p>
        )}
      </div>
    </div>
  );
}
