import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULTS, STORAGE_KEY, type ImageryState } from '@/lib/imagery';
import { ImageryContext } from '@/lib/imageryStore';

function load(): ImageryState {
  if (typeof window === 'undefined') return { ...DEFAULTS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<ImageryState>) };
  } catch {
    return { ...DEFAULTS };
  }
}

function save(state: ImageryState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / disabled storage */
  }
}

export default function ImageryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ImageryState>(load);

  // Sync to body data-attributes so global CSS selectors stay in sync
  useEffect(() => {
    const body = document.body;
    body.dataset.imgEnabled = state.enabled ? 'true' : 'false';
    body.dataset.imgTreatment = state.treatment;
    body.dataset.imgDensity = state.density;
    body.dataset.imgGrain = state.grain ? 'true' : 'false';
  }, [state]);

  const set = useCallback(<K extends keyof ImageryState>(key: K, value: ImageryState[K]) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(DEFAULTS);
    setState({ ...DEFAULTS });
  }, []);

  const value = useMemo(() => ({ state, set, reset }), [state, set, reset]);
  return <ImageryContext.Provider value={value}>{children}</ImageryContext.Provider>;
}
