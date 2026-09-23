// src/components/ui/Button.tsx
// The only CTA component. `to` = internal react-router Link (never <a href>
// internally, D31); `href` = external anchor; neither = <button>.
// Styles come from .btn-primary / .btn-secondary in index.css.
// 44px minimum tap target; colour-only transitions (08 §8 MOTION).
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'secondary-dark';

const VARIANTS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  // Secondary action on an itdark band: itsilver border and text
  'secondary-dark':
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn border border-itsilver bg-transparent px-6 py-3 font-bold text-itsilver transition-colors hover:bg-itgray',
};

type Common = {
  variant?: Variant;
  /** Full width on mobile, auto from sm up (08 §2 KEEP). */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { to: string; href?: never; type?: never; onClick?: never; disabled?: never };
type AsAnchor = Common & { href: string; to?: never; type?: never; onClick?: never; disabled?: never };
type AsButton = Common & {
  to?: never;
  href?: never;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

export type ButtonProps = AsLink | AsAnchor | AsButton;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', fullWidth = false, className = '', children } = props;
  const classes = `${VARIANTS[variant]} ${fullWidth ? 'w-full sm:w-auto' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim();

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const isExternal = /^https?:\/\//i.test(props.href);
    return (
      <a
        href={props.href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}