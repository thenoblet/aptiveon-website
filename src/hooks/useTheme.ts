import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'aptv:mode';
const QUERY = '(prefers-color-scheme: dark)';

function readInitial(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  // The no-FOUC script in index.html already set <html data-mode="…">
  // before any CSS or React loaded. Trust that as the source of truth so
  // the hook's state matches what the user actually sees.
  const attr = document.documentElement.getAttribute('data-mode');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage unavailable */
  }
  return window.matchMedia?.(QUERY).matches ? 'dark' : 'light';
}

/**
 * Theme controller. Reads initial state from <html data-mode> (set
 * synchronously by the no-FOUC script in index.html), syncs the
 * attribute on every change, and persists to localStorage.
 *
 * If the user has not made an explicit choice yet, follows OS preference
 * changes; once they toggle, their choice wins until they clear storage.
 */
export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(readInitial);

  // Apply to <html> + persist on every change.
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* localStorage unavailable */
    }
  }, [mode]);

  // Track OS preference changes only when the user hasn't pinned a choice.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      setModeState(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const setMode = useCallback((next: ThemeMode) => setModeState(next), []);
  const toggle = useCallback(
    () => setModeState((m) => (m === 'dark' ? 'light' : 'dark')),
    [],
  );

  return { mode, setMode, toggle };
}
