import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { chatCopy } from '../../data/chatCopy';
import { paths, whatsappHref } from '../../data/routes';
import { site } from '../../data/siteData';
import { intentActions, matchChatIntent } from '../../lib/chatEngine';
import { useEnquiry } from '../../context/EnquiryContext';
import { useLanguage } from '../../context/LanguageContext';
import Logo from '../ui/Logo';

function useCopy() {
  const { locale } = useLanguage();
  return chatCopy[locale] || chatCopy.en;
}

export default function ChatWidget({
  open: openProp,
  onOpenChange,
  showLauncher = true,
  panelId: panelIdProp,
} = {}) {
  const copy = useCopy();
  const { openEnquiry } = useEnquiry();
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = typeof openProp === 'boolean';
  const open = controlled ? openProp : internalOpen;
  const setOpen = (value) => {
    const next = typeof value === 'function' ? value(open) : value;
    if (!controlled) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [lastIntent, setLastIntent] = useState('greet');
  const [messages, setMessages] = useState(() => [
    { id: 'welcome', role: 'desk', intent: 'greet', text: copy.welcome },
  ]);
  const listRef = useRef(null);
  const fieldId = useId();
  const generatedPanelId = useId();
  const panelId = panelIdProp || generatedPanelId;

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ ...prev[0], text: copy.welcome }];
      }
      return prev;
    });
  }, [copy.welcome]);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking, open]);

  const reply = (intentId) => {
    const text = copy.answers[intentId] || copy.answers.fallback;
    const actions = intentActions(intentId);
    setLastIntent(intentId);
    setThinking(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-desk`, role: 'desk', intent: intentId, text, actions },
      ]);
      setThinking(false);
    }, 420);
  };

  const ask = (raw, forcedId) => {
    const text = String(raw || '').trim();
    if (!text && !forcedId) return;
    if (text) {
      setMessages((prev) => [...prev, { id: `${Date.now()}-you`, role: 'you', text }]);
    }
    setInput('');
    const intentId = forcedId || matchChatIntent(text, lastIntent).id;
    reply(intentId);
  };

  const runAction = (action) => {
    if (action === 'nri') navigate(paths.nri);
    if (action === 'contact') navigate(paths.contact);
    if (action === 'founder') navigate(paths.founder);
    if (action === 'projects') navigate(paths.projects);
    if (action === 'gallery') navigate(paths.gallery);
    if (action === 'enquire' || action === 'visit') openEnquiry(action === 'visit' ? 'visit' : 'nri');
    if (action === 'call') window.location.href = `tel:${site.contact.phoneTel}`;
    if (action === 'whatsapp') {
      window.open(whatsappHref(site.contact.whatsapp), '_blank', 'noopener,noreferrer');
    }
    setOpen(false);
  };

  return (
    <div className="keep-dark pointer-events-none flex w-full max-w-[min(24.5rem,calc(100vw-1.5rem))] flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.section
            id={panelId}
            role="dialog"
            aria-label={copy.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex h-[min(32rem,calc(100dvh-var(--float-bar-h)-6.5rem))] w-full flex-col overflow-hidden border border-gold-500/25 bg-forest-950 text-ivory-100 shadow-glass"
          >
            <header className="flex items-start justify-between gap-3 border-b border-gold-500/15 px-4 py-3">
              <div>
                <Logo compact />
                <p className="mt-2 font-display text-xl text-ivory-50">{copy.title}</p>
                <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">{copy.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setMessages([{ id: 'welcome', role: 'desk', intent: 'greet', text: copy.welcome }])
                  }
                  className="text-[0.58rem] uppercase tracking-luxury text-gold-400 hover:text-gold-200"
                >
                  {copy.clear}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[0.58rem] uppercase tracking-luxury text-ivory-100 hover:text-gold-300"
                  aria-label={copy.close}
                >
                  {copy.close}
                </button>
              </div>
            </header>

            <div ref={listRef} className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((item) => (
                <article key={item.id} className={item.role === 'you' ? 'text-right' : ''}>
                  <p className="text-[0.56rem] uppercase tracking-luxury text-gold-400">
                    {item.role === 'you' ? copy.you : copy.desk}
                  </p>
                  <p
                    className={`mt-1 inline-block max-w-[92%] text-left text-sm leading-relaxed ${
                      item.role === 'you'
                        ? 'bg-gold-500/15 border border-gold-500/25 px-3 py-2 text-ivory-50'
                        : 'text-ivory-100/95'
                    }`}
                  >
                    {item.text}
                  </p>
                  {item.actions?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.actions.map((action) => (
                        <button
                          key={action}
                          type="button"
                          onClick={() => runAction(action)}
                          className="border border-gold-500/30 px-2.5 py-1 text-[0.58rem] uppercase tracking-luxury text-gold-300 hover:border-gold-400 hover:text-gold-200"
                        >
                          {copy.actions[action] || action}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
              {thinking ? (
                <p className="text-[0.62rem] uppercase tracking-luxury text-gold-400">{copy.thinking}</p>
              ) : null}
            </div>

            <div className="border-t border-gold-500/15 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {copy.suggestions.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => ask(chip.label, chip.id)}
                    className="btn-chip btn-grad border px-2.5 py-1 text-[0.58rem] uppercase tracking-luxury"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <form
                className="flex items-end gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  ask(input);
                }}
              >
                <label htmlFor={fieldId} className="sr-only">
                  {copy.placeholder}
                </label>
                <textarea
                  id={fieldId}
                  rows={2}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={copy.placeholder}
                  className="max-h-24 flex-1 resize-none bg-transparent border-b border-gold-500/30 py-2 text-sm text-ivory-50 placeholder:text-ivory-300/50"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      ask(input);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="btn-acute btn-gold btn-shine btn-grad px-4 py-2.5 text-[0.62rem] uppercase tracking-luxury"
                >
                  {copy.send}
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {showLauncher ? (
        <ChatLauncher open={open} onClick={() => setOpen((value) => !value)} panelId={panelId} />
      ) : null}
    </div>
  );
}

export function ChatLauncher({ open, onClick, panelId, className = '' }) {
  const copy = useCopy();
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      aria-label={open ? copy.close : copy.open}
      onClick={onClick}
      className={`cta-desk btn-grad flex min-w-0 flex-1 items-center justify-center gap-1.5 px-1.5 py-3 text-[0.55rem] uppercase tracking-label sm:gap-2 sm:px-3 sm:text-[0.62rem] ${className}`}
    >
      <ChatIcon />
      <span className="hidden min-[380px]:inline truncate">{open ? copy.close : copy.desk}</span>
    </button>
  );
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 6h14v10H8l-3 3V6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
