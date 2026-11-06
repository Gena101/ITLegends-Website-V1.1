// src/pages/BlogIndexPage.tsx
// /blog: every post, newest first. Content: src/data/blog.ts.
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { CtaBand } from '../components/sections';
import { breadcrumbSchema, itemListSchema, SeoHead } from '../components/seo';
import { Badge, Breadcrumbs, Card, Container, Section } from '../components/ui';
import { blogPath, blogPostsByDate, readingMinutes } from '../data/blog';
import { formatDate } from '../lib/text';

const path = '/blog';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path },
];

const title = 'IT Blog: Practical Advice for SA Businesses | IT Legends';
const description =
  'Practical IT advice for South African small businesses: cloud, cybersecurity, backup, hardware costs and using AI sensibly, from the IT Legends team.';

const intro =
  'Practical IT advice for South African businesses from the IT Legends team: cloud, cybersecurity, backup, hardware costs and ' +
  'using new technology sensibly. Every post is written for business owners, not IT specialists, and ends with what you can do next.';

export default function BlogIndexPage() {
  return (
    <Layout>
      <SeoHead
        title={title}
        description={description}
        path={path}
        schema={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            'IT Legends blog',
            blogPostsByDate.map((p) => ({ name: p.title, path: blogPath(p.slug) })),
          ),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="blog-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="blog-title" className="text-h1">
              IT insights for South African businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
          </div>
        </Container>
      </section>

      <Section tone="raised" divider labelledBy="posts-title">
        <h2 id="posts-title" className="sr-only">
          All posts
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {blogPostsByDate.map((post) => (
            <Card key={post.slug} as="li" interactive padding="lg" className="flex h-full flex-col">
              <Badge tone="blue" className="self-start">
                {post.category}
              </Badge>
              <h3 className="mt-5 text-h3">
                {/* Stretched link: whole card is clickable, link text stays the post title */}
                <Link
                  to={blogPath(post.slug)}
                  className="after:absolute after:inset-0 after:rounded-card after:content-['']"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 text-fg-muted">{post.excerpt}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm text-fg-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar aria-hidden="true" className="h-4 w-4" />
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {readingMinutes(post)} min read
                </span>
                <span aria-hidden="true" className="ml-auto inline-flex items-center gap-1 text-itblue-soft">
                  Read
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Have an IT question we haven't covered?"
        text="Ask us directly. We'll give you a straight answer, even if it means you don't need us."
      />
    </Layout>
  );
}