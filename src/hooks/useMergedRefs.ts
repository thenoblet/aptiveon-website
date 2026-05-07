import { useCallback, type Ref } from 'react';

/** Merge multiple refs into one callback ref. */
export function useMergedRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        if (!ref) continue;
        if (typeof ref === 'function') ref(node);
        else (ref as { current: T | null }).current = node;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
