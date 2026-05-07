import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns true if the user has requested reduced motion at the OS level.
 * Re-evaluates on system preference change.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
