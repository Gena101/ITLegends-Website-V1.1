// src/pages/LegalPage.tsx
// One template for every legal document (privacy, cookies, terms, PAIA). Content: src/data/legal/.
// The document is found from the pathname (same pattern as LocationPage).
import { Fragment, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout';
import { breadcrumbSchema, normalizePath, SeoHead } from '../components/seo';
import { Breadcrumbs, Container, Section } from '../components/ui';
import { getLegalDoc } from '../data/legal';
import type { LegalBlock, LegalDoc } from '../data/legal/types';
import { formatDate } from '../lib/text';
import NotFound from './NotFound';

export default function LegalPage() {
  const path = normalizePath(useLocation().pathname);
  const doc = getLegalDoc(path);
  if (!doc) return <NotFound />;
  return <LegalView doc={doc} path={path} />;
}

const linkClass = 'font-medium text-itblue-soft underline-offset-4 hover:text-white hover:underline';
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Plain text with [label](href) links */
function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    parts.push(text.slice(last, start));
    if (href.startsWith('/')) {
      parts.push(
        <Link key={start} to={href} className={linkClass}>
          {label}
        </Link>,
      );
    } else {
      const external = href.startsWith('http');
      parts.push(
        <a
          key={start}
          href={href}
          className={linkClass}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>,
      );
    }
    last = start + whole.length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="mt-4 leading-relaxed text-fg-muted">
          <RichText text={block.text} />
        </p>
      );
    case 'list':
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted marker:text-itblue-soft">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="mt-6 overflow-x-auto rounded-card border border-white/10">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold text-white">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-3 align-top text-fg-muted">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function LegalView({ doc, path }: { doc: LegalDoc; path: string }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: doc.title, path },
  ];

  return (
    <Layout>
      <SeoHead title={doc.metaTitle} description={doc.metaDescription} path={path} schema={breadcrumbSchema(crumbs)} />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="legal-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="legal-title" className="text-h1">
              {doc.title}
            </h1>
            <p className="mt-6 text-lead text-fg-muted">{doc.intro}</p>
            <p className="mt-6 text-sm text-fg-subtle">
              Last updated <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
            </p>
          </div>
        </Container>
      </section>

      <Section tone="raised" divider>
        <div className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold text-white">On this page</p>
              <ol className="mt-4 space-y-2 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-fg-muted transition-colors hover:text-white">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl lg:col-span-9">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="mt-12 first:mt-0">
                <h2 id={`${section.id}-title`} className="text-h3">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Fragment key={i}>
                    <Block block={block} />
                  </Fragment>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </Layout>
  );
}