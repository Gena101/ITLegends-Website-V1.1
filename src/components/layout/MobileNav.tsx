// src/components/layout/MobileNav.tsx
// Full-screen mobile drawer - 08 §5.
// CRAWLER RULE: every link is always in the HTML. The drawer is hidden with
// `invisible` + transform, and closed accordions with h-0 + overflow-hidden.
// Nothing here is conditionally mounted (D07, D14, D40).
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone, X } from 'lucide-react';
import { company } from '../../data/company';
import { headerNav, headerCta } from '../../data/navigation';
import { trackEvent } from '../../analytics';

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes the drawer; background scroll is locked while it is open
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const toggle = (id: string) =>
    setOpenGroups((groups) =>
      groups.includes(id) ? groups.filter((g) => g !== id) : [...groups, id],
    );

  return (
    <div
      id="mobile-nav"
      {...(open ? {} : { inert: '' })}
      className={`fixed inset-0 z-50 flex flex-col bg-surface transition-opacity lg:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
        <span className="text-h3 font-bold text-itdark">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-border text-itdark"
        >
          <X aria-hidden="true" className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="divide-y divide-border">
          {headerNav.map((item) =>
            item.kind === 'link' ? (
              <li key={item.link.to}>
                <Link
                  to={item.link.to}
                  className="flex min-h-[52px] items-center font-bold text-itdark"
                >
                  {item.link.label}
                </Link>
              </li>
            ) : (
              <li key={item.group.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.group.id)}
                  aria-expanded={openGroups.includes(item.group.id)}
                  aria-controls={`drawer-${item.group.id}`}
                  className="flex min-h-[52px] w-full items-center justify-between font-bold text-itdark"
                >
                  {item.group.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 transition-transform ${
                      openGroups.includes(item.group.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Always in the HTML; collapsed, not unmounted */}
                <ul
                  id={`drawer-${item.group.id}`}
                  {...(openGroups.includes(item.group.id) ? {} : { inert: '' })}
                  className={`overflow-hidden ${
                    openGroups.includes(item.group.id) ? 'visible pb-2' : 'invisible h-0'
                  }`}
                >
                  {item.group.items.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex min-h-[48px] items-center pl-4 text-itdark"
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

      <div
        className="shrink-0 border-t border-border px-5 py-4"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
      >
        {headerCta ? (
          <Link to={headerCta.to} className="btn-primary w-full">
            {headerCta.label}
          </Link>
        ) : (
          <a
            href={company.phone.tel}
            onClick={() => trackEvent('click_tel', { location: 'monile_drawer' })}
            className="btn-primary w-full"
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
            {company.phone.display}
          </a>
        )}
      </div>
    </div>
  );
}