// src/components/layout/Logo.tsx
import { Link } from 'react-router-dom';
import { company } from '../../data/company';
import { cn } from '../ui';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label={`${company.name} home`}
      className={cn('inline-flex shrink-0 items.center gap-2.5 rounded-control', className)}
    >
      {/* Mark is 343x464; explicit size prevents layout shift */}
      <img src={company.mark} alt="" width={27} height={36} decoding="async" className="h-9 w-auto" />
      <span className="font-display text-lg font-semibold tracking-tight text-white">{company.name}</span>
    </Link>
  );
}