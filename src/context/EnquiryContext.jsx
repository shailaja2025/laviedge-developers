import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState('general');
  const [plotRef, setPlotRef] = useState('');

  const openEnquiry = useCallback((nextIntent = 'general', nextPlot = '') => {
    setIntent(nextIntent);
    setPlotRef(nextPlot);
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ open, intent, plotRef, openEnquiry, closeEnquiry, setIntent, setPlotRef }),
    [open, intent, plotRef, openEnquiry, closeEnquiry],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
