import { useEffect, useRef } from 'react';

/**
 * Splits text content into per-word spans (.w) so the parent's `.in` class can
 * stagger their reveal via CSS transitions.
 *
 * Idempotent — won't re-wrap if already wrapped.
 */
export function useKineticWords<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.kineticDone === '1') return;
    el.dataset.kineticDone = '1';

    const wrap = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent ?? '';
          const frag = document.createDocumentFragment();
          text.split(/(\s+)/).forEach((word) => {
            if (!word) return;
            if (/^\s+$/.test(word)) {
              frag.appendChild(document.createTextNode(word));
              return;
            }
            const s = document.createElement('span');
            s.className = 'w';
            s.textContent = word;
            frag.appendChild(s);
          });
          child.parentNode?.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const inner = child as HTMLElement;
          const cls = inner.className;
          const text = inner.textContent ?? '';
          inner.textContent = '';
          text.split(/(\s+)/).forEach((word) => {
            if (!word) return;
            if (/^\s+$/.test(word)) {
              inner.appendChild(document.createTextNode(word));
              return;
            }
            const s = document.createElement('span');
            s.className = `w ${cls}`.trim();
            s.textContent = word;
            inner.appendChild(s);
          });
        }
      });
    };

    wrap(el);
    el.querySelectorAll<HTMLElement>('.w').forEach((w, i) => {
      w.style.transitionDelay = `${i * 80}ms`;
    });
  }, []);

  return ref;
}
