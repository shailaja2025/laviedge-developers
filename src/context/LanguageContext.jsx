import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../i18n/en';
import te from '../i18n/te';

const dictionaries = { en, te };
const STORAGE_KEY = 'laviedge-lang';

function detectLocale() {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'te') return saved;
  const nav = (window.navigator.language || '').toLowerCase();
  return nav.startsWith('te') ? 'te' : 'en';
}

function readPath(source, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), source);
}

function interpolate(value, params) {
  if (typeof value !== 'string' || !params) return value;
  return value.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] == null ? `{${key}}` : String(params[key]),
  );
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    if (next === 'en' || next === 'te') setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'te' : 'en'));
  }, []);

  const get = useCallback((key) => {
    const fromActive = readPath(dictionaries[locale], key);
    return fromActive == null ? readPath(dictionaries.en, key) : fromActive;
  }, [locale]);

  const t = useCallback(
    (key, params) => {
      const value = get(key);
      if (value == null) return key;
      return interpolate(value, params);
    },
    [get],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t, get, isTe: locale === 'te' }),
    [locale, setLocale, toggleLocale, t, get],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useLocalizedProject(project) {
  const { get } = useLanguage();
  return useMemo(() => {
    if (!project) return null;
    const copy = get(`project.items.${project.id}`) || {};
    return {
      ...project,
      name: copy.name || project.name,
      location: copy.location || project.location,
      status: copy.status || project.status,
      short: copy.short || project.short,
      description: copy.description || project.description,
      proposed: Array.isArray(copy.proposed) && copy.proposed.length ? copy.proposed : project.proposed,
    };
  }, [get, project]);
}
