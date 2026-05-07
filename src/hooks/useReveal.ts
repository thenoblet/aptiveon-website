import { useEffect, useRef } from 'react';

/**
 * Adds the `in` class once the element enters the viewport. Mirrors the
 * IntersectionObserver pattern used across the legacy pages.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
