interface Props {
  values: number[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Inline SVG sparkline used inside Platform Pulse cells. Stroke colour is
 * controlled by the parent through currentColor.
 */
export default function Sparkbar({
  values,
  width = 140,
  height = 22,
  className,
}: Props) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1)) * width},${
          height - ((v - min) / range) * (height - 4) - 2
        }`,
    )
    .join(' ');
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}
