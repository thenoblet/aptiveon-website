import { useEffect, useRef } from 'react';

/**
 * Cursor-tracked gradient orbs for the dark stats panel. Sets four CSS custom
 * properties on the host element (--mx, --my, --mx2, --my2) that the panel's
 * ::before reads.
 */
export function useStatsOrbs<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mx = 20,
      my = 30,
      tx = 20,
      ty = 30;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const onLeave = () => {
      tx = 20;
      ty = 30;
    };

    const tick = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      const mx2 = 100 - mx;
      const my2 = 100 - my;
      el.style.setProperty('--mx', `${mx.toFixed(2)}%`);
      el.style.setProperty('--my', `${my.toFixed(2)}%`);
      el.style.setProperty('--mx2', `${mx2.toFixed(2)}%`);
      el.style.setProperty('--my2', `${my2.toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
