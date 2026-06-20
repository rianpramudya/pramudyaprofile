import { dictionary, type Lang } from './dictionary';
import { langStore } from '@/stores/langStore';

const STORAGE_KEY = 'pramudya-lang';

export function getLang(): Lang {
  if (typeof window === 'undefined') return 'id';
  
  const url = new URL(window.location.href);
  const q = url.searchParams.get('lang') as Lang | null;
  if (q === 'en' || q === 'id') return q;
  
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === 'en' || stored === 'id') return stored;
  
  const browser = navigator.language.slice(0, 2);
  return browser === 'id' ? 'id' : 'en';
}

export function setLang(lang: Lang) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEY, lang);
  
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  
  // ── RELOAD PAGE agar Astro re-render dengan bahasa baru ──
  window.location.assign(url.toString());
}

export function t(key: string): string {
  const lang = getLang();
  const obj = dictionary[lang] as any;
  
  if (obj[key] !== undefined) {
    if (Array.isArray(obj[key])) return obj[key] as unknown as string;
    return typeof obj[key] === 'string' ? obj[key] : key;
  }
  
  return key;
}

export function tArray(key: string): string[] {
  const lang = getLang();
  const obj = dictionary[lang] as any;
  
  if (obj[key] !== undefined) {
    return Array.isArray(obj[key]) ? obj[key] : [];
  }
  
  return [];
}

// ── FIX: Update SEMUA element yang punya data-i18n ATAU data-i18n-html ──
export function updatePageText() {
  // 1. Update element dengan data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    
    const value = t(key);
    el.textContent = value;
  });
  
  // 2. Update element dengan data-i18n-html (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    
    const value = t(key);
    el.innerHTML = value;
  });
  
  // 3. Update element dengan data-i18n-placeholder (placeholder attribute)
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    
    const value = t(key);
    (el as HTMLInputElement).placeholder = value;
  });
}

export function initLang() {
  const lang = getLang();
  document.documentElement.lang = lang;
  langStore.set(lang);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePageText);
  } else {
    updatePageText();
  }
}

// ═══════════════════════════════════════════════════════════
// GLOBAL WINDOW.I18N — agar script inline bisa akses
// ═══════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
  (window as any).i18n = {
    t,
    getLang,
    setLang,
    onLangChange: (cb: () => void) => {
      window.addEventListener('pramudya-lang-change', cb);
    }
  };
}