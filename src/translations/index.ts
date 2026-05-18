import { useApp } from '../store/AppContext';
import { en } from './en';
import { id } from './id';

const translations: Record<string, Record<string, string>> = { en, id };

export type Lang = 'en' | 'id';

export function useTranslation() {
  const { settings } = useApp();
  const lang: Lang = (settings.language as Lang) || 'en';

  function t(key: string, params?: Record<string, string | number>): string {
    const text = translations[lang]?.[key] ?? translations.en?.[key] ?? key;
    if (!params) return text;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
      text,
    );
  }

  return { t, lang };
}

export function getTranslation(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const text = translations[lang]?.[key] ?? translations.en?.[key] ?? key;
  if (!params) return text;
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
    text,
  );
}
