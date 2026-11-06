// src/pages/BlogPost.tsx
// Data-driven template for every post (/blog/:slug). Content: src/data/blog.ts.
// Unknown slugs render <NotFound /> (real 404, same markup as dist/404.html).
import { ArrowLeft, Calendar, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ServiceIcon } from '../components/icons';
import { Layout } from '../components/layout';
import { CtaBand } from '../components/sections';
import { articleSchema, breadcrumbSchema, SeoHead } from '../components/seo';
import { Badge, Breadcrumbs, Card, Container, Reveal, Section, SectionHeading, cn } from '../components/ui';
import { blogPath, getBlogPost, readingMinutes, wordCount, type BlogPost as Post } from '../data/blog';
import { getService, servicePath, type Service } from '../data/services';
import { formatDate } from '../lib/text';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);
  if (!post) return <NotFound />;
  return <PostView post={post} />;
}

function PostView({ post }: { post: Post }) {
  const path = blogPath(post.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ];
  const updated = post.dateModified !== post.datePublished;
  const related = post.related.map((s) => getService(s)).filter((s): s is Service => Boolean(s));

  return (
    <Layout>
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={path}
        type="article"
        schema={[
          articleSchema({
            path,
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            section: post.category,
            wordCount: wordCount(post),
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <article aria-labelledby="post-title">
        {/* Hero: never wrapped in Reveal (LCP) */}
        <header className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
          <Container className="relative py-14 sm:py-20 lg:py-24">
            <Breadcrumbs items={crumbs} />
            <div className="mt-10 max-w-3xl">
              <Badge tone="blue">{post.category}</Badge>
              <h1 id="post-title" className="mt-5 text-h1">
                {post.title}
              </h1>
              <p className="mt-6 text-lead text-fg-muted">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar aria-hidden="true" className="h-4 w-4" />
                  Published <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                </span>
                {updated && (
                  <span className="inline-flex items-center gap-1.5">
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {readingMinutes(post)} min read
                </span>
              </div>
            </div>
          </Container>
        </header>

        {/* Body: plain HTML text, never hidden by Reveal */}
        <Section tone="raised" divider width="default">
          <div className="max-w-3xl">
            {post.sections.map((section) => (
              <section key={section.heading} className="mt-12 first:mt-0">
                <h2 className="text-h3">{section.heading}</h2>
                {section.paragraphs?.map((text) => (
                  <p key={text} className="mt-4 leading-relaxed text-fg-muted">
                    {text}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted marker:text-itblue-soft">
                    {section.list.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {post.sources && post.sources.length > 0 && (
              <section className="mt-14 border-t border-white/10 pt-8">
                <h2 className="text-base font-semibold text-white">Sources</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-itblue-soft transition-colors hover:text-white"
                      >
                        {source.label}
                        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link
              to="/blog"
              className="mt-14 inline-flex items-center gap-1.5 text-sm font-medium text-itblue-soft transition-colors hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All posts
            </Link>
          </div>
        </Section>
      </article>

      {related.length > 0 && (
        <Section divider labelledBy="related-title">
          <Reveal>
            <SectionHeading id="related-title" title="How IT Legends can help" />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Card key={s.slug} as="li" interactive>
                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-control',
                    s.pillar === 'digital' ? 'bg-itred/10 text-itred-soft' : 'bg-itblue/10 text-itblue-soft',
                  )}
                >
                  <ServiceIcon slug={s.slug} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  <Link
                    to={servicePath(s.slug)}
                    className="after:absolute after:inset-0 after:rounded-card after:content-['']"
                  >
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{s.summary}</p>
              </Card>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand title={post.ctaTitle} />
    </Layout>
  );
}