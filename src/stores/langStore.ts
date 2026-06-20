import type { Lang } from '@/i18n/dictionary';

let current: Lang = 'id';
const listeners = new Set<(lang: Lang) => void>();

export const langStore = {
  get: () => current,
  set: (lang: Lang) => {
    current = lang;
    listeners.forEach((fn) => fn(lang));
  },
  subscribe: (fn: (lang: Lang) => void) => {
    listeners.add(fn);
    fn(current);
    return () => listeners.delete(fn);
  },
};