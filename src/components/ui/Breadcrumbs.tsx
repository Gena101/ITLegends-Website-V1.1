// src/components/ui/Breadcrumbs.tsx
// Visible breadcrumb trail. Pair with breadcrumbSchema(sameItems) in the page's SeoHead.
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from './cn';

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: ReadonlyArray<Crumb>;
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-fg-subtle">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />}
              {last ? (
                <span aria-current="page" className="text-fg-muted">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="transition-colors hover:text-white">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}