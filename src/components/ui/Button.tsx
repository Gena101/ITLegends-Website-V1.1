// src/components/ui/Button.tsx
// Renders <Link> for internal paths, <a> for external/tel/mailto/#, <button> when no href.
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;

type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold ' +
  'transition-[background-color,border-color,color,box-shadow] duration-200 ease-out-expo ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // White on red = 6.0:1. Never white on blue (fails AA).
  primary: 'bg-itred text-white hover:bg-itred-hover hover:shadow-glow-red',
  secondary: 'border border-white/15 bg-white/[0.03] text-white hover:border-itblue/60 hover:bg-itblue/10',
  ghost: 'text-itblue-soft hover:bg-white/5 hover:text-white',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base sm:h-14 sm:px-7',
};

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');
const isExternal = (href: string) => /^https?:\/\//i.test(href);

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in rest) {
    const { href, ...anchorProps } = rest;

    if (isInternal(href)) {
      return (
        <Link to={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    const externalProps = isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}