// src/components/layout/MobileNav.tsx
// Full-screen modal menu below lg. Mounted only while open (desktop panels already
// carry every link in the prerendered HTML).
import { useEffect, useRef, type MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Mail, Phone, X } from 'lucide-react';
import { company } from '../../data/company';
import { primaryCta, primaryNav } from '../../data/navigation';
import { Button, Container } from '../ui';
import { Logo } from './Logo';

interface MobileNavProps {
  id: string;
  /** Close and return focus to the menu button (Escape, close button) */
  onClose: () => void;
  /** Close without moving focus (a link was followed) */
  onNavigate: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

const topLinkClass =
  'block py-4 text-lg font-medium text-fg transition-colors hover:text-white aria-[current=page]:text-itblue-soft';

const subLinkClass =
  '-mx-3 block rounded-control px-3 py-2.5 text-base text-fg-muted transition-colors ' +
  'hover:bg-white/5 hover:text-white aria-[current=page]:text-itblue-soft';

const summaryClass =
  'flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-fg ' +
  'transition-colors hover:text-white [&::-webkit-details-marker]:hidden';

export function MobileNav({ id, onClose, onNavigate }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock, initial focus, Escape, focus trap
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    // offsetParent is null for elements hidden inside closed <details>
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Any link closes the menu, including links to the current page
  const onPanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) onNavigate();
  };

  return (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      onClick={onPanelClick}
      className="fixed inset-0 z-overlay flex flex-col bg-ink-950 lg:hidden"
    >
      <Container className="flex h-header shrink-0 items-center justify-between border-b border-white/5">
        <Logo />
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/5"
        >
          <X aria-hidden="true" className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </button>
      </Container>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain">
        <Container className="py-4">
          <ul className="divide-y divide-white/5">
            {primaryNav.map((item) => (
              <li key={item.label}>
                {item.kind === 'link' && (
                  <NavLink to={item.href} className={topLinkClass}>
                    {item.label}
                  </NavLink>
                )}

                {item.kind === 'mega' && (
                  <details className="group">
                    <summary className={summaryClass}>
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 text-fg-subtle transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="pb-5">
                      <NavLink to={item.href} end className={subLinkClass}>
                        All services
                      </NavLink>
                      {item.groups.map((group) => (
                        <div key={group.label} className="mt-5">
                          <p className="text-sm font-semibold text-white">{group.label}</p>
                          <ul className="mt-1">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <NavLink to={link.href} className={subLinkClass}>
                                  {link.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {item.kind === 'dropdown' && (
                  <details className="group">
                    <summary className={summaryClass}>
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 text-fg-subtle transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <ul className="pb-5">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <NavLink to={link.href} className={subLinkClass}>
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 pb-8">
            <Button href={primaryCta.href} size="lg" className="w-full">
              {primaryCta.label}
            </Button>
            <Button href={company.phone.href} variant="secondary" size="lg" className="w-full">
              <Phone aria-hidden="true" className="h-5 w-5" />
              {company.phone.display}
            </Button>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 inline-flex items-center justify-center gap-2 py-2 text-sm text-fg-muted transition-colors hover:text-white"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {company.email}
            </a>
          </div>
        </Container>
      </nav>
    </div>
  );
}