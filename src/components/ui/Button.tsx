import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost' | 'accent' | 'line';

interface CommonProps {
  variant?: Variant;
  /** Append a → arrow that animates on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type AsLink = CommonProps & {
  to: string;
  href?: never;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className' | 'children'>;

type AsAnchor = CommonProps & {
  href: string;
  to?: never;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;

type AsButton = CommonProps & {
  to?: never;
  href?: never;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type ButtonProps = AsLink | AsAnchor | AsButton;

function classFor(variant: Variant) {
  if (variant === 'line') return 'btn-line';
  return `btn btn-${variant}`;
}

const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const { variant = 'primary', arrow = false, className = '', children, ...rest } = props;
  const cls = `${classFor(variant)} ${className}`.trim();
  const content = (
    <>
      {children}
      {arrow && <span className="arr">→</span>}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link
        to={rest.to}
        className={cls}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(rest as Omit<AsLink, 'to' | 'variant' | 'arrow' | 'className' | 'children'>)}
      >
        {content}
      </Link>
    );
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        className={cls}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(rest as Omit<AsAnchor, 'href' | 'variant' | 'arrow' | 'className' | 'children'>)}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      className={cls}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(rest as Omit<AsButton, 'variant' | 'arrow' | 'className' | 'children'>)}
    >
      {content}
    </button>
  );
});

export default Button;
