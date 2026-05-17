import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** `wrap` ≈ 1280px (default). `shell` ≈ 1320px. */
  size?: 'shell' | 'wrap';
  children: ReactNode;
}

const SIZES: Record<NonNullable<Props['size']>, string> = {
  shell: 'var(--container-shell)',
  wrap: 'var(--container-wrap)',
};

export default function Container({
  size = 'wrap',
  className = '',
  style,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={`wrap ${className}`.trim()}
      style={{ maxWidth: SIZES[size], ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
