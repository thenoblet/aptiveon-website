import type { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** `shell` ≈ 1320px (default). `wrap` ≈ 1240px (used on landing). */
  size?: 'shell' | 'wrap';
  children: ReactNode;
}

const SIZES: Record<NonNullable<Props['size']>, string> = {
  shell: 'var(--container-shell)',
  wrap: 'var(--container-wrap)',
};

export default function Container({
  size = 'shell',
  className = '',
  style,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={`mx-auto px-7 ${className}`.trim()}
      style={{ maxWidth: SIZES[size], ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
