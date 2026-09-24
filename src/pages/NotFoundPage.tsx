// src/pages/NotFoundPage.tsx
// 404 - noindex, short message, links out (08 §7).
// The real 404 STATUS comes from _redirects (`/* /index.html 404`), because
// a SPA route alone would return 200 (D23).
import SeoHead from '../components/seo/SeoHead';
import { isLive } from '../data/navigation';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const SUGGESTED = [
  { label: 'Home', to: '/' },
  { label: 'Managed IT support', to: '/services/managed-it-support' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Frequently asked questions', to: '/faq' },
].filter((link) => isLive(link.to) || link.to === '/');

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page not found | IT Legends"
        description="The page you were looking for is not on the IT Legends website."
        noindex
      />

      <Section id="not-found">
        <article>
          <h1 className="text-h1 lg:text-h1-lg">Page not found</h1>

          <p className="mt-4 max-w-prose">
            The page you were looking for has moved or no longer exists. Try one of the links
            below, or call us on the number in the header and we will point you in the right
            direction.
          </p>

          <SectionHeading id="not-found" as="h3" className="mt-10">
            Where to next
          </SectionHeading>

          <ul className="max-w-prose space-y-2.5">
            {SUGGESTED.map((link) => (
              <li key={link.to}>
                <a href={link.to}
                className="text-link underline underline-offset-2 hover:no-underline"
              >
                {link.label}
              </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/" fullWidth>
              Back to home
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}