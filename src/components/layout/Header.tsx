// src/components/layout/Header.tsx
// Sticky header - 08 §5.
// CRAWLER RULE: every nav link is rendered in the HTML at all times and only
// visually hidden. Naver mount a menu on hover or click, or the prerendered
// HTML loses the internal-link mesh (D07, D14, D40).
// Menus come from navigation.ts, which filters to live routes, so a page
// appears in the nav in the phase that builds it.
// Logo: /logo-mark.webp (88px, 2 kb). /logo-png is the 512px schema logo and
// must never be used here.
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { company } from '../../data/company';
import { headerNav, headerCta } from '../../data/navigation';
import { trackEvent } from '../../analytics';
import Container from '../ui/Container';
import MobileNav from './MobileNav';

export default function Header() {
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close everything on navigation
  useEffect(() => {
    setOpenGroup(null);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes an open dropdown; outside click does the same
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenGroup(null);
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const phone = (
    <a
      href={company.phone.tel}
      onClick={() => trackEvent('click_tel', { location: 'header' })}
      className="inline-flex min-h-[44px] items-center gap-2 font-bold text-itdark hover:text-link"
    >
      <Phone aria-hidden="true" className="h-5 w-5" />
      <span className="hidden lg:inline">{company.phone.display}</span>
      <span className="sr-only lg:hidden">Call {company.phone.display}</span>
    </a>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Logo: square tile (unaltered logo) + live wordmark */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="IT Legends home">
          <img
            src="/logo-mark.webp"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-card"
          />
          <span className="text-h3 font-bold leading-none text-itdark">IT Legends</span>
        </Link>

        {/* Desktop navigation */}
        <div ref={navRef} className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Main">
            <ul className="flex items-center gap-6">
              {headerNav.map((item) =>
                item.kind === 'link' ? (
                  <li key={item.link.to}>
                    <Link to={item.link.to} className="font-bold text-itdark hover:text-link">
                      {item.link.label}
                    </Link>
                  </li>
                ) : (
                  <li
                    key={item.group.id}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(item.group.id)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={openGroup === item.group.id}
                      aria-controls={`menu-${item.group.id}`}
                      onClick={() =>
                        setOpenGroup(openGroup === item.group.id ? null : item.group.id)
                      }
                      className="inline-flex items-center gap-1 font-bold text-itdark hover:text-link"
                    >
                      {item.group.label}
                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </button>

                    {/* Always in the HTML; only visually hidden */}
                    <ul
                      id={`menu-${item.group.id}`}
                      className={`absolute left-0 top-full z-50 min-w-[16rem] rounded-card border border-border bg-surface py-2 transition-opacity ${
                        openGroup === item.group.id ? 'visible opacity-100' : 'invisible opacity-0'
                      }`}
                    >
                      {item.group.items.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className="block px-4 py-2.5 text-itdark hover:bg-surface-alt hover:text-link"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {phone}

          {headerCta && (
            <Link to={headerCta.to} className="btn-primary">
              {headerCta.label}
            </Link>
          )}
        </div>

        {/* Mobile: phone + menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          {phone}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-border text-itdark"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </Container>

      <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}