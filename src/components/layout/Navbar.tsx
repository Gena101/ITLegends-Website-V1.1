// src/components/layout/Navbar.tsx
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { primaryCta, primaryNav, type PrimaryNavItem } from '../../data/navigation';
import { Button, Container, cn } from '../ui';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';

type MegaItem = Extract<PrimaryNavItem, { kind: 'mega' }>;
type DropdownItem = Extract<PrimaryNavItem, { kind: 'dropdown' }>;

const CLOSE_DELAY_MS = 200;
const DESKTOP_QUERY = '(min-width: 1024px)';
const MOBILE_NAV_ID = 'mobile-nav';

const triggerId = (label: string) => `nav-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
const panelId = (label: string) => `${triggerId(label)}-panel`;

const topLinkClass =
  'inline-flex items-center gap-1 rounded-control px-3 py-2 text-sm font-medium text-fg-muted ' +
  'transition-colors hover:text-white aria-[current=page]:text-white';

const panelLinkClass =
  '-mx-3 block rounded-control px-3 py-2 text-sm text-fg-muted transition-colors ' +
  'hover:bg-white/5 hover:text-white aria-[current=page]:text-itblue-soft';

/** Closed panels stay in the DOM (crawlable links) but are invisible and unfocusable */
const panelState = (open: boolean) =>
  open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-1 opacity-0';

const panelTransition = 'transition-[opacity,transform,visibility] duration-200 ease-out-expo';

function isItemActive(item: PrimaryNavItem, pathname: string): boolean {
  switch (item.kind) {
    case 'link':
    case 'mega':
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    case 'dropdown':
      return item.links.some((l) => pathname === l.href);
  }
}

function MegaPanel({ item, open }: { item: MegaItem; open: boolean }) {
  return (
    <div
      id={panelId(item.label)}
      className={cn(
        'absolute inset-x-0 top-full border-b border-white/5 bg-ink-950/95 backdrop-blur-xl',
        panelTransition,
        panelState(open),
      )}
    >
      <Container className="grid gap-10 py-10 lg:grid-cols-3">
        {item.groups.map((group) => (
          <div key={group.label}>
            <p className="font-display text-base font-semibold text-white">{group.label}</p>
            {group.description && <p className="mt-1 text-sm text-fg-subtle">{group.description}</p>}
            <ul className="mt-5 space-y-0.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <NavLink to={link.href} className={panelLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/5">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4 text-sm">
          <Link to={item.href} className="font-semibold text-itblue-soft transition-colors hover:text-white">
            All services
          </Link>
          <a href={company.phone.href} className="text-fg-muted transition-colors hover:text-white">
            Not sure which service you need? Call {company.phone.display}
          </a>
        </Container>
      </div>
    </div>
  );
}

function DropdownPanel({ item, open }: { item: DropdownItem; open: boolean }) {
  return (
    <div
      id={panelId(item.label)}
      className={cn('absolute left-0 top-full pt-3', panelTransition, panelState(open))}
    >
      <ul className="min-w-[14rem] rounded-card border border-white/10 bg-ink-900/95 p-3 backdrop-blur-xl">
        {item.links.map((link) => (
          <li key={link.href}>
            <NavLink to={link.href} className={cn(panelLinkClass, 'mx-0')}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();
  const openedByHover = useRef(false);

  // Glass header once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation (including back/forward)
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close the mobile menu if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Desktop menus: Escape (focus back to trigger) and click outside
  useEffect(() => {
    if (!openMenu) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      document.getElementById(triggerId(openMenu))?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openMenu]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onItemPointerEnter = (e: ReactPointerEvent, label: string) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    if (openMenu !== label) openedByHover.current = true;
    setOpenMenu(label);
  };

  const onItemPointerLeave = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  };

  // A click right after hover-open keeps the menu open instead of toggling it shut
  const onTriggerClick = (label: string) => {
    const keepOpen = openedByHover.current;
    openedByHover.current = false;
    setOpenMenu((current) => (current === label && !keepOpen ? null : label));
  };

  // Tabbing out of the nav closes menus (relatedTarget is null for mouse clicks; those use click-outside)
  const onNavBlur = (e: FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setOpenMenu(null);
  };

  // Any link click closes menus, even when it points at the current page
  const onNavClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a')) setOpenMenu(null);
  };

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const dismissMobile = useCallback(() => setMobileOpen(false), []);

  const solid = scrolled || openMenu !== null;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-header border-b transition-colors duration-300',
          solid ? 'border-white/5 bg-ink-950/85 backdrop-blur-lg' : 'border-transparent bg-transparent',
        )}
      >
        <nav ref={navRef} aria-label="Main" onBlur={onNavBlur} onClick={onNavClick}>
          <Container className="flex h-header items-center justify-between gap-6">
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => {
                if (item.kind === 'link') {
                  return (
                    <li key={item.label}>
                      <NavLink to={item.href} className={topLinkClass}>
                        {item.label}
                      </NavLink>
                    </li>
                  );
                }

                const open = openMenu === item.label;
                const active = isItemActive(item, pathname);

                return (
                  <li
                    key={item.label}
                    className={item.kind === 'dropdown' ? 'relative' : undefined}
                    onPointerEnter={(e) => onItemPointerEnter(e, item.label)}
                    onPointerLeave={onItemPointerLeave}
                  >
                    <button
                      id={triggerId(item.label)}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId(item.label)}
                      onClick={() => onTriggerClick(item.label)}
                      className={cn(topLinkClass, active && 'text-white')}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
                      />
                    </button>
                    {item.kind === 'mega' ? (
                      <MegaPanel item={item} open={open} />
                    ) : (
                      <DropdownPanel item={item} open={open} />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={company.phone.href}
                className="hidden items-center gap-2 rounded-control px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-white xl:inline-flex"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {company.phone.display}
              </a>

              <a
                href={company.phone.href}
                aria-label={`Call ${company.phone.display}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/5 sm:hidden"
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
              </a>

              <Button href={primaryCta.href} className="hidden sm:inline-flex">
                {primaryCta.label}
              </Button>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls={MOBILE_NAV_ID}
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/5 lg:hidden"
              >
                <Menu aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </Container>
        </nav>
      </header>

      {/* Rendered OUTSIDE <header>: the header's backdrop-filter would otherwise
          become the containing block and trap this fixed overlay inside it. */}
      {mobileOpen && <MobileNav id={MOBILE_NAV_ID} onClose={closeMobile} onNavigate={dismissMobile} />}
    </>
  );
}