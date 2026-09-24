// src/components/layout/Footer.tsx
// Site footer - 08 §5. Dark band: itdark bg, itsilver text, link-dark links.
// Carries the NAP, hours, reg/VAT numbers, founding year and service area,
// which is what makes the sitewide Organization and LocalBusiness schema
// visible on every page. All values come from company.ts (D20).
// Internal links are react-router <Link> (D31).
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import {
  company,
  branches,
  hours,
  serviceArea,
  formatAddress,
} from '../../data/company';
import { footerColumns } from '../../data/navigation';
import { trackEvent } from '../../analytics';
import Container from '../ui/Container';

const areaLine = `${serviceArea.slice(0, -1).join(', ')} and ${serviceArea[serviceArea.length -1]}`;

export default function Footer() {
  return (
    <footer className="bg-itdark text-itsilver">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="IT Legends home">
              <img
                src="/logo-itlegends.webp"
                alt=""
                width={40}
                height={43}
                className="h-11 w-auto"
              />
              <span className="text-h3 font-bold leading-none">IT Legends</span>
            </Link>

            <p className="mt-4 max-w-prose">
              Managed IT services for small and medium businesses in Gauteng. Since{' '}
              {company.foundedDisplay}.
            </p>

            <p className="mt-3 text-small">Serving {areaLine}.</p>

            <div className="mt-4 flex gap-3">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-itgray2 hover:border-itsilver"
              >
                <Facebook aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">IT Legends on Facebook</span>
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-itgray2 hover:border-itsilver"
              >
                <Instagram aria-hidden="true" className="h-5 w-5" />
                <span className="sr-only">IT Legends on Instagram</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.id} aria-label={col.heading}>
              <h2 className="text-h3 font-bold">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-link-dark">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* NAP row - both branches, exactly as on Google Business Profile */}
        <div className="mt-12 grid gap-8 border-t border-itgray2 pt-8 sm:grid-cols-2">
          {branches.map((branch) => (
            <div key={branch.id}>
              <h2 className="text-h3 font-bold">{branch.gbpName}</h2>
              <address className="mt-3 space-y-2 not-italic">
                <span className="flex gap-2">
                  <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
                  <a
                    href={branch.gbpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-link-dark"
                  >
                    {formatAddress(branch)}
                  </a>
                </span>
                <span className="flex gap-2">
                  <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
                  <a
                    href={company.phone.tel}
                    onClick={() => trackEvent('click_tel', { location: 'footer' })}
                    className="hover:text-link-dark"
                  >
                    {company.phone.display}
                  </a>
                </span>
                <span className="flex gap-2">
                  <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
                  <a href={`mailto:${company.email}`} className="hover:text-link-dark">
                    {company.email}
                  </a>
                </span>
              </address>

              <ul className="mt-3 space-y-1 text-small">
                {hours.schedule.map((slot) => (
                  <li key={slot.display}>{slot.display}</li>
                ))}
                <li>{hours.closedDisplay}</li>
                <li>{hours.publicHolidaysDisplay}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Legal line */}
        <p className="mt-10 border-t border-itgray2 pt-6 text-small">
          © {new Date().getFullYear()} {company.legalName} · Reg. no{' '}
          {company.registrationNumber} · VAT no {company.vatNumber}
        </p>
      </Container>
    </footer>
  );
}