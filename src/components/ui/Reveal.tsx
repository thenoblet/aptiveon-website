import type { ElementType, HTMLAttributes, ReactNode, Ref } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useMergedRefs } from '@/hooks/useMergedRefs';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Adds `reveal-stagger` so direct children stagger their reveal in. */
  stagger?: boolean;
  /** Use the shorter `.rv` variant (used on Customers). */
  variant?: 'reveal' | 'rv';
  threshold?: number;
  /** Optional external ref — merged with the internal IntersectionObserver ref. */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

export default function Reveal({
  as: As = 'div',
  stagger = false,
  variant = 'reveal',
  threshold,
  className = '',
  ref: externalRef,
  children,
  ...rest
}: Props) {
  const internalRef = useReveal<HTMLElement>(threshold);
  const ref = useMergedRefs(internalRef, externalRef);
  const cls = [
    variant,
    stagger && variant === 'reveal' ? 'reveal-stagger' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <As ref={ref} className={cls} {...rest}>
      {children}
    </As>
  );
}
