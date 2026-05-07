import { useEffect, useRef, useState } from 'react';

interface Options {
  from?: number;
  to: number;
  decimals?: number;
  duration?: number;
  threshold?: number;
}

function format(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US');
}

/** Count-up driven by IntersectionObserver. Returns the formatted string + a ref to attach. */
export function useCounter({
  from = 0,
  to,
  decimals = 0,
  duration = 1600,
  threshold = 0.4,
}: Options) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [text, setText] = useState(() => format(from, decimals));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const e = 1 - Math.pow(1 - p, 3);
        setText(format(from + (to - from) * e, decimals));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, to, decimals, duration, threshold]);

  return { ref, text };
}
