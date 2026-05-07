import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useKineticWords } from '@/hooks/useKineticWords';
import { useMergedRefs } from '@/hooks/useMergedRefs';

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Heading that splits its text content into per-word spans on mount and reveals
 * them one by one once the heading scrolls into view.
 */
export default function KineticHeading({ as: As = 'h2', className = '', children }: Props) {
  const revealRef = useReveal<HTMLElement>(0.18);
  const wordsRef = useKineticWords<HTMLElement>();
  const ref = useMergedRefs(revealRef, wordsRef);
  return (
    <As ref={ref} className={`kinetic ${className}`.trim()}>
      {children}
    </As>
  );
}
