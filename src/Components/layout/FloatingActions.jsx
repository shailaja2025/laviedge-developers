import { useId, useState } from 'react';
import ChatWidget, { ChatLauncher } from '../chat/ChatWidget';
import PersistentCTA from './PersistentCTA';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingActions({ showDock = true }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (!showDock) return null;

  return (
    <div className="keep-dark pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex flex-col items-stretch">
      <div className="flex w-full justify-end px-3 pb-2 sm:px-4">
        <ChatWidget
          open={open}
          onOpenChange={setOpen}
          showLauncher={false}
          panelId={panelId}
        />
      </div>
      <nav
        className="cta-dock pointer-events-auto relative z-10 keep-dark flex w-full overflow-hidden shadow-glass"
        aria-label={`${t('cta.call')} · ${t('cta.whatsapp')} · ${t('cta.enquire')}`}
      >
        <ChatLauncher
          open={open}
          onClick={() => setOpen((value) => !value)}
          panelId={panelId}
        />
        <PersistentCTA />
      </nav>
    </div>
  );
}
