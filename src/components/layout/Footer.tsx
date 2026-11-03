// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { branches, company, formatHours, mapsUrl, openingHours } from '../../data/company';
import { footerNav, type NavGroup } from '../../data/navigation';
import { openCookieSettings } from '../../consent';
import { Container } from '../ui';
import { Logo } from './Logo';

const linkClass = 'text-sm text-fg-muted transition-colors hover:text-white';

const socials = [
  { label: 'Facebook', href: company.social.facebook, Icon: Facebook },
  { label: 'Instagram', href: company.social.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: company.social.linkedin, Icon: Linkedin },
].filter((s): s is typeof s & { href: string } => Boolean(s.href));

function LinkColumn({ group }: { group: NavGroup }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{group.label}</h2>
      <ul className="mt-4 space-y-2.5">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-900">
      <Container className="py-16 lg:py-20">
        {/* Brand, contact, branches */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-fg-muted">
              Managed IT, infrastructure and digital services for businesses across Gauteng.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={company.phone.href} className="inline-flex items-center gap-2.5 text-fg transition-colors hover:text-white">
                  <Phone aria-hidden="true" className="h-4 w-4 text-itblue" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 text-fg transition-colors hover:text-white">
                  <Mail aria-hidden="true" className="h-4 w-4 text-itblue" />
                  {company.email}
                </a>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${company.name} on ${label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-white/10 text-fg-muted transition-colors hover:border-itblue/50 hover:text-white"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            {branches.map((branch) => {
              const a = branch.address;
              return (
                <div key={branch.id}>
                  <h2 className="text-sm font-semibold text-white">{branch.name}</h2>
                  <address className="mt-4 text-sm not-italic leading-relaxed text-fg-muted">
                    {a.streetAddress}, {a.suburb}
                    <br />
                    {a.locality}, {a.postalCode}
                    <br />
                    {a.region}, {a.country}
                  </address>
                  <a
                    href={mapsUrl(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-itblue-soft transition-colors hover:text-white"
                  >
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                    Get directions
                  </a>
                  <dl className="mt-5 grid max-w-[16rem] grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                    {openingHours.map((h) => (
                      <div key={h.label} className="contents">
                        <dt className="text-fg-subtle">{h.label}</dt>
                        <dd className="tabular-nums text-fg-muted">{formatHours(h)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/5 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {footerNav.services.map((group) => (
            <LinkColumn key={group.label} group={group} />
          ))}
          <LinkColumn group={footerNav.company} />
          <LinkColumn group={footerNav.areas} />
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <Container className="flex flex-col gap-4 py-6 text-xs text-fg-subtle lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {company.legalName}. Reg. no. {company.registrationNumber}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.legal.links.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={openCookieSettings} className="transition-colors hover:text-white">
                Cookie settings
              </button>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}