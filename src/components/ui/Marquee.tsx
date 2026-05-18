import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Props {
  items: string[];
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Render with simple mono labels (homepage band) instead of pill items. */
  variant?: 'band' | 'logos';
  /** Optional render override for each item (used by logo rows). */
  renderItem?: (item: string, index: number) => React.ReactNode;
}

/**
 * Infinite horizontal scroller used as a token strip below the hero and as
 * a logo marquee in the Integrations section.
 *
 * Items are duplicated 3× so the translate animation can wrap seamlessly.
 * Respects prefers-reduced-motion (the static row stays legible).
 */
export default function Marquee({
  items,
  reverse = false,
  variant = 'band',
  renderItem,
}: Props) {
  const reduce = usePrefersReducedMotion();
  const doubled = reduce ? items : [...items, ...items, ...items];
  const cls = ['marquee-track', reverse ? 'reverse' : '', reduce ? 'static' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`marquee marquee-${variant}`}>
      <div className={cls}>
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {renderItem ? renderItem(item, i) : item}
          </span>
        ))}
      </div>
    </div>
  );
}
