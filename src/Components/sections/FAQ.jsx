import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { useLanguage } from '../../context/LanguageContext';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const { t, get } = useLanguage();
  const items = get('faq.items') || [];

  return (
    <section id="faq" className="bg-ivory-100 text-forest-900 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          index="12"
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
        />
        <div className="mt-14 divide-y divide-forest-900/10 border-y border-forest-900/10">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-3 sm:gap-6 py-5 sm:py-6 text-left transition-colors hover:text-gold-700"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span className="min-w-0 font-display text-xl font-medium leading-snug tracking-[-0.015em] sm:text-2xl md:text-[1.85rem]">{item.q}</span>
                    <motion.span
                      className="text-gold-600 text-2xl leading-none"
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 max-w-3xl text-charcoal-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
