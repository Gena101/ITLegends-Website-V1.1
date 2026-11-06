// src/data/blog.ts
// Blog posts: the ONE source for /blog, /blog/:slug, the Article schema, sitemap and llms.txt.
// Blog pages only (kept out of the shared bundle). Post bodies are plain text; the template renders the HTML.
// The checks at the bottom fail the build on bad dates, long meta tags or duplicate slugs.
import type { ServiceSlug } from './services';

export interface BlogSection {
  /** Rendered as an H2 */
  heading: string;
  paragraphs?: string[];
  /** Rendered as a bulleted list after the paragraphs */
  list?: string[];
}

export interface BlogSource {
  label: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  /** H1 and Article headline (max 110 characters) */
  title: string;
  /** <title> (max 60 characters) */
  metaTitle: string;
  /** Meta description (max 160 characters) */
  metaDescription: string;
  /** Direct answer under the H1, also the summary on the blog index */
  excerpt: string;
  category: string;
  /** "YYYY-MM-DD" */
  datePublished: string;
  /** "YYYY-MM-DD"; same as datePublished until the post is revised */
  dateModified: string;
  sections: BlogSection[];
  /** Service pages linked at the end of the post */
  related: ServiceSlug[];
  /** Sources for facts and figures, listed at the end of the post */
  sources?: BlogSource[];
  /** Heading of the call-to-action band at the end of the post */
  ctaTitle: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cloud-future',
    title: 'The Future of Cloud Computing in 2025 (and Beyond) for South African Businesses',
    metaTitle: 'Cloud Computing for South African Businesses | IT Legends',
    metaDescription: 'How South African SMEs can move to the cloud safely: cloud-first thinking, hybrid setups and keeping cloud costs under control.',
    excerpt: 'Cloud is no longer a "nice to have". It is the backbone of modern, always-on business - especially for SMEs that need flexibility, resilience, and predictable costs.',
    category: 'Cloud',
    datePublished: '2025-11-03',
    dateModified: '2025-11-03',
    related: ['cloud-backup', 'managed-it-support'],
    ctaTitle: 'Chat to us about your cloud plan',
    sections: [
      {
        heading: 'From Servers in the Corner to "Cloud-First" Thinking',
        paragraphs: [
          'Many South African businesses still run critical systems on a single on-premise server sitting in a storeroom. It works... until it doesn\'t. Load shedding, hardware failures, theft, and lack of maintenance all put your data and uptime at risk.',
          'A cloud-first mindset means asking: "Can this safely and sensibly live in the cloud?" instead of defaulting to on-premises every time. You don\'t have to move everything at once, but you need a roadmap.',
        ],
        list: [
          'Move email and collaboration to Microsoft 365 or Google Workspace.',
          'Create off-site backup copies into secure cloud storage.',
          'Migrate line-of-business applications to hosted servers or SaaS.',
          'Provide secure remote access or VPN for staff working remotely.',
        ],
      },
      {
        heading: 'Hybrid Cloud Will Be the Default',
        paragraphs: [
          'For most SMEs, a hybrid setup is the sweet spot: some services in the cloud, some kept on-site for performance, regulation or cost reasons. The key is that everything is managed as a single environment, not as two separate worlds.',
        ],
        list: [
          'Centralised monitoring for both cloud and on-premises servers.',
          'Standardised security policies across all locations.',
          'Documented failover and recovery plans.',
        ],
      },
      {
        heading: 'Cost Management: Avoid Cloud Bill Shock',
        paragraphs: [
          'Cloud can save money, but only if it is designed properly. Spinning up random servers with no plan is a quick way to overspend.',
        ],
        list: [
          'Right-size servers based on actual utilisation.',
          'Shut down non-critical workloads outside business hours.',
          'Review cloud usage and costs monthly.',
        ],
      },
      {
        heading: 'Where IT Legends Fits In',
        paragraphs: [
          'At IT Legends, we help South African businesses move to the cloud in a controlled, low-risk way. We assess your environment, design a realistic roadmap, and then migrate, secure and maintain your cloud and hybrid environment.',
        ],
      },
    ],
  },
  {
    slug: 'ai-integration-guide',
    title: 'AI Integration: A Practical Guide for Business Owners (Not Data Scientists)',
    metaTitle: 'AI for Business Owners: A Practical Guide | IT Legends',
    metaDescription: 'A practical guide to AI for business owners: start with pain points, pick low-risk use cases, keep a human in the loop and protect your data.',
    excerpt: 'Artificial intelligence does not have to be confusing, expensive or risky. Used correctly, it quietly makes your team faster, your decisions better, and your customers happier.',
    category: 'AI',
    datePublished: '2025-11-10',
    dateModified: '2025-11-10',
    related: ['custom-software'],
    ctaTitle: 'Talk to us about AI in your business',
    sections: [
      {
        heading: 'Start with Pain Points, Not Tools',
        paragraphs: [
          'The worst way to adopt AI is to start with a shiny tool and then go hunting for problems. Instead, list the repetitive, time-consuming or error-prone tasks in your business and ask, "Can AI help here?".',
        ],
        list: [
          'Support tickets or emails that ask the same question.',
          'Manual data capture into spreadsheets or systems.',
          'Simple reports that take staff hours every month.',
        ],
      },
      {
        heading: 'Great Early Use Cases for SMEs',
        paragraphs: [
          'Here are some low-risk starting points that work well in real businesses.',
        ],
        list: [
          'Support assistants that suggest answers to technicians based on past tickets.',
          'Document assistants that summarise long PDFs, proposals or contracts.',
          'Internal chatbots that answer common HR or IT questions.',
          'Data cleanup and enrichment for CRM or asset lists.',
        ],
      },
      {
        heading: 'Keep a Human in the Loop',
        paragraphs: [
          'For most SMEs, the right pattern is "AI suggests, humans approve." AI drafts the answer, email or summary - your team clicks send or takes the final decision.',
        ],
      },
      {
        heading: 'Data Security and Privacy',
        paragraphs: [
          'When you plug AI into your environment, it must be done with proper controls. Use tools that allow you to restrict what data the AI can see, protect logs and restrict access to prompts and outputs.',
        ],
      },
      {
        heading: 'Where IT Legends Fits In',
        paragraphs: [
          'We help businesses design and implement practical AI automation - from IT support chatbots and admin assistants to reporting and internal tools. No hype, just workflows that actually work.',
        ],
      },
    ],
  },
  {
    slug: 'cybersecurity-best-practices-2025',
    title: 'Cybersecurity Best Practices for 2025: A Practical Checklist for SMEs',
    metaTitle: 'Cybersecurity Checklist for SMEs | IT Legends',
    metaDescription: 'A practical cybersecurity checklist for SMEs: passwords and MFA, patching, email security, staff awareness and tested backups.',
    excerpt: 'Most breaches do not start with elite hackers. They start with a simple password, a fake email, or an unpatched system. The good news: disciplined basics make you a much harder target.',
    category: 'Security',
    datePublished: '2025-11-17',
    dateModified: '2025-11-17',
    related: ['cybersecurity', 'cloud-backup'],
    ctaTitle: 'Book a cybersecurity review',
    sections: [
      {
        heading: 'Strong identity: Passwords and MFA',
        paragraphs: [
          'Identity is the new perimeter. Weak or reused passwords are still one of the biggest risks for SMEs.',
        ],
        list: [
          'Use a password manager instead of spreadsheets or notes.',
          'Enforce strong, unique passwords for email, VPN and admin accounts.',
          'Enable multi-factor authentication (MFA) everywhere you can.',
        ],
      },
      {
        heading: 'Patch and Update Regularly',
        paragraphs: [
          'Unpatched systems are one of the easiest ways attackers get in. You need a disciplined approach to updates.',
        ],
        list: [
          'Automatic updates for workstations and laptops.',
          'Regular patching cycles for servers and network devices.',
          'Plans for replacing unsupported operating systems.',
        ],
      },
      {
        heading: 'Email Security and User Awareness',
        paragraphs: [
          'Phishing is still the number one way attackers reach your users. Technology and training must work together.',
        ],
        list: [
          'Modern email filtering with spoofing and malware protection.',
          'Regular phishing awareness training.',
          'Clear internal process if someone clicks a suspicious link.',
        ],
      },
      {
        heading: 'Backups and Recovery',
        paragraphs: [
          'Backups are your last line of defence against ransomware and accidental deletion. They must be tested, not just configured.',
        ],
        list: [
          'Multiple backup copies, including off-site or cloud.',
          'Regular restore tests to prove backups work.',
          'Documented recovery time objectives (RTOs) for key systems.',
        ],
      },
      {
        heading: 'Where IT Legends Fits In',
        paragraphs: [
          'We help design layered security for SMEs - from firewalls and endpoint protection to backup, MFA and staff awareness - so you can focus on running your business.',
        ],
      },
    ],
  },
  {
    slug: 'it-equipment=price-increase-sa',
    title: 'Why IT Equipment Prices in South Africa Are Set to Increase (And What You Can Do About It)',
    metaTitle: 'Why IT Equipment Prices Are Rising in SA | IT Legends',
    metaDescription: 'Why IT hardware prices in South Africa keep rising, from supply pressure and the rand to shipping costs, and how businesses can plan for it.',
    excerpt: 'IT hardware prices in South Africa are rising due to global supply pressure, a weaker rand, and higher logistics costs. Businesses that plan ahead can reduce the impact and avoid costly surprises.',
    category: 'IT Costs',
    datePublished: '2026-01-14',
    dateModified: '2026-01-14',
    related: ['hardware-network', 'managed-it-support'],
    ctaTitle: 'Chat to us about your strategy',
    sections: [
      {
        heading: 'Global Supply Chain Pressure Isn’t Over',
        paragraphs: [
          'Although the worst of the global chip shortage has eased, supply chains have not returned to pre-2020 stability.',
          'Key components such as CPUs, memory, SSDs, and networking chips are still affected by limited manufacturing capacity, higher production costs, and ongoing geopolitical uncertainty.',
          'When global suppliers increase prices, South African importers feel it immediately - and those costs are passed down to businesses.',
        ],
      },
      {
        heading: 'The Weak Rand Makes Imported Technology More Expensive',
        paragraphs: [
          'Most IT hardware sold in South Africa is imported and priced in US dollars or euros.',
          'A weaker rand increases landed costs for laptops, servers, firewalls, and networking equipment. Even if international prices stay flat, local prices can rise purely due to exchange rate movement.',
        ],
      },
      {
        heading: 'Rising Shipping, Insurance, and Compliance Costs',
        paragraphs: [
          'The cost of getting hardware into the country has increased significantly.',
          'Higher fuel prices, shipping fees, insurance premiums, and regulatory overhead all contribute to higher final prices, even if these costs are not visible as separate line items on invoices.',
        ],
      },
      {
        heading: 'Modern IT Equipment Is More Powerful - and More Expensive',
        paragraphs: [
          'Modern business hardware includes advanced security chips, faster storage, AI acceleration features, and higher-grade components.',
          'While these improvements deliver better performance and security, they also increase manufacturing and replacement costs compared to older systems.',
        ],
      },
      {
        heading: 'Shorter Upgrade Cycles Increase Replacement Pressure',
        paragraphs: [
          'Software vendors now enforce faster upgrade and end-of-support cycles.',
          'This often forces businesses to replace equipment earlier than expected to remain secure and compliant, rather than upgrading gradually over time.',
        ],
      },
      {
        heading: 'What This Means for South African Businesses',
        paragraphs: [
          'Without proper planning, rising IT costs can result in unexpected capital expenses, delayed upgrades, increased security risks, and reduced productivity.',
          'Businesses that react only when equipment fails are usually the ones hit hardest.',
        ],
      },
      {
        heading: 'What You Can Do to Reduce the Impact',
        list: [
          'Plan hardware upgrades in advance to avoid emergency purchases.',
          'Extend equipment lifespan safely through maintenance and monitoring.',
          'Standardise hardware models to reduce support and replacement costs.',
          'Consider leasing or lifecycle-based procurement to smooth cash flow.',
          'Work with an IT partner who proactively monitors pricing and end-of-life risks.',
        ],
      },
      {
        heading: 'Where IT Legends Fits In',
        paragraphs: [
          'At IT Legends, we help South African businesses plan realistic hardware refresh cycles, extend the life of existing equipment, and avoid unnecessary emergency replacements.',
          'Smart IT planning reduces downtime, security risk, and long-term costs - without panic buying.',
        ],
      },
    ],
  },
];

export function blogPath(slug: string): string {
  return `/blog/${slug}`;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Newest first (ISO dates sort as strings) */
export const blogPostsByDate: BlogPost[] = [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

/** Words in the post, for the reading time and the Article schema */
export function wordCount(post: BlogPost): number {
  const text = [
    post.title,
    post.excerpt,
    ...post.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.list ?? [])]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes at about 200 words a minute, at least 1 */
export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 200));
}

// ---------- Build-time checks ----------
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugs = new Set<string>();

for (const p of blogPosts) {
  const where = `blog post "${p.slug}"`;
  if (!SLUG.test(p.slug)) console.warn(`[blog] ${where}: slug should be lowercase words joined by hyphens`);
  if (slugs.has(p.slug)) throw new Error(`[blog] Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  if (!ISO_DATE.test(p.datePublished) || !ISO_DATE.test(p.dateModified)) {
    throw new Error(`[blog] ${where}: dates must be YYYY-MM-DD`);
  }
  if (p.dateModified < p.datePublished) throw new Error(`[blog] ${where}: dateModified is before datePublished`);
  if (p.title.length > 110) throw new Error(`[blog] ${where}: title is ${p.title.length} chars (max 110)`);
  if (p.metaTitle.length > 60) throw new Error(`[blog] ${where}: metaTitle is ${p.metaTitle.length} chars (max 60)`);
  if (p.metaDescription.length > 160) {
    throw new Error(`[blog] ${where}: metaDescription is ${p.metaDescription.length} chars (max 160)`);
  }
}