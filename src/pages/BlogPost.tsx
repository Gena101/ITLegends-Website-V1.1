import { useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Footer from '../components/Footer';
import blogCardCloud from '../assets/blog-card-cloud.webp';
import blogCardAI from '../assets/blog-card-ai.webp';
import blogCardSecurity from '../assets/blog-card-security.webp';
import blogHero from '../assets/blog-hero.webp';
import headerImg from '../assets/header-img.webp';
import { useEffect } from 'react';
import SeoHead from '../components/SeoHead';

type Section = {
  heading: string;
  paragraphs?: string[];
  listItems?: string[];
};

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  sections: Section[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

// Central blog data - add new posts by pushing into this array
const blogPosts: BlogPost[] = [
  {
    slug: 'cloud-future',
    title: 'The Future of Cloud Computing in 2025 (and Beyond) for South African Businesses',
    date: 'Nov 3, 2025',
    readTime: '7 min read',
    category: 'Cloud',
    excerpt: 'Cloud is no longer a "nice to have". It is the backbone of modern, always-on businesses - especially for SMEs that need flexibility, resilience, and predictable costs.',
    image: blogCardCloud,
    sections: [
      {
        heading: '1. From Servers in the Corner to "Cloud-First" Thinking',
        paragraphs: [
          'Many South African businesses still run critical systems on a single on-premise server sitting in a storeroom. It works... until it doesn`t. Load shedding, hardware failures, theft, and lack of maintenance all put your data and uptime at risk.',
          'A cloud-first mindset means asking: "Can this safely and sensibly live in the cloud?" instead of defaulting to on-premises every time. You don`t have to move everything at once, but you need a roadmap.',
        ],
        listItems: [
          'Move email and collaboration to Microsoft 365 or Google Workspace.',
          'Create off-site backup copies into secure cloud storage.',
          'Migrate line-of-business applications to hosted servers or SaaS.',
          'Provide secure remote access or VPN for staff working remotely.',
        ],
      },
      {
        heading: '2. Hybrid Cloud Will Be the Default',
        paragraphs: [
          'For most SMEs, a hybrid setup is the sweet spot: some services in the cloud, some kept on-site for performance, regulation or cost reasons. The key is that everything is managed as a single environment, not as two separate worlds.',
        ],
        listItems: [
          'Centralised monitoring for both cloud and on-premises servers.',
          'Standardised security policies across all locations.',
          'Documented failover and recovery plans.',
        ],
      },
      {
        heading: '3. Cost Management: Avoid Cloud Bill Shock',
        paragraphs: [
          'Cloud can save money, but only if it is designed properly. Spinning up random servers with no plan is a quick way to overspend.'
        ],
        listItems: [
          'Right-size servers based on actual utilisation.',
          'Shut down non-critical workloads outside business hours.',
          'Review cloud usage and costs monthly.',
        ],
      },
      {
        heading: '4. Where IT Legends Fits In',
        paragraphs: [
          'At IT Legends, we help South African businesses move to the cloud in a controlled, low-risk way. We assess your environment, design a realistic roadmap, and then migrate, secure and maintain your cloud and hybrid environment.',
        ],
      },
    ],
    ctaLabel: 'Chat to us about your cloud plan',
    ctaHref: '/#contact',
  },
  {
    slug: 'ai-integration-guide',
    title: 'AI Integration: A Practical Guide for Business Owners (Not Data Scientists)',
    date: 'Nov 10, 2025',
    readTime: '8 min read',
    category: 'AI',
    excerpt: 'Artificial intelligence does not have to be confusing, expensive or risky. Used correctly, it quietly makes your team faster, your decisions better, and your customers happier.',
    image: blogCardAI,
    sections: [
      {
        heading: '1. Start with Pain Points, Not Tools',
        paragraphs: [
          'The worst way to adopt AI is to start with a shiny tool and then go hunting for problems. Instead, list the repetitive, time-consuming or error-prone tasks in your business and ask, "Can AI help here?".',
        ],
        listItems: [
          'Support tickets or emails that ask the same question.',
          'Manual data capture into spreadsheets or systems.',
          'Simple reports that take staff hours every month.',
        ],
      },
      {
        heading: '2. Great Early Use Cases for SMEs',
        paragraphs: [
          'Here are some low-risk starting points that work well in real businesses.',
        ],
        listItems: [
          'Support assistants that suggest answers to technicians based on past tickets.',
          'Document assistants that summarise long PDFs, proposals or contracts.',
          'Internal chatbots that answer common HR or IT questions.',
          'Data cleanup and enrichment for CRM or asset lists.',
        ],
      },
      {
        heading: '3. Keep a Human in the Loop',
        paragraphs: [
          'For most SMEs, the right pattern is "AI suggests, humans approve." AI drafts the answer, email or summary - your team clicks send or takes the final decision.',
        ],
      },
      {
        heading: '4. Data Security and Privacy',
        paragraphs: [
          'When you plug AI into your environment, it must be done with proper controls. Use tools that allow you to restrict what data the AI can see, protect logs and restrict access to prompts and outputs.',
        ],
      },
      {
        heading: '5. Where IT Legends Fits In',
        paragraphs: [
          'We help businesses design and implement practical AI automation - from IT support chatbots and admin assistants to reporting and internal tools. No hype, just workflows that actually work.',
        ],
      },
    ],
    ctaLabel: 'Talk to us about AI in your business',
    ctaHref: '/#contact',
  },
  {
    slug: 'cybersecurity-best-practices-2025',
    title: 'Cybersecurity Best Practices for 2025: A Practical Checklist for SMEs',
    date: 'Nov 17, 2025',
    readTime: '6 min read',
    category: 'Security',
    excerpt: 'Most breaches do not start with elite hackers. They start with a simple password, a fake email, or an unpatched system. The good news: disciplined basics make you a much harder target.',
    image: blogCardSecurity,
    sections: [
      {
        heading: '1. Strong identity: Passwords and MFA',
        paragraphs: [
          'Identity is the new perimeter. Weak or reused passwords are still one of the biggest risks for SMEs.',
        ],
        listItems: [
          'Use a password manager instead of spreadsheets or notes.',
          'Enforce strong, unique passwords for email, VPN and admin accounts.',
          'Enable multi-factor authentication (MFA) everywhere you can.',
        ],
      },
      {
        heading: '2. Patch and Update Regularly',
        paragraphs: [
          'Unpatched systems are one of the easiest ways attackers get in. You need a disciplined approach to updates.',
        ],
        listItems: [
          'Automatic updates for workstations and laptops.',
          'Regular patching cycles for servers and network devices.',
          'Plans for replacing unsupported operating systems.',
        ],
      },
      {
        heading: '3. Email Security and User Awareness',
        paragraphs: [
          'Phishing is still the number one way attackers reach your users. Technology and training must work together.',
        ],
        listItems: [
          'Modern email filtering with spoofing and malware protection.',
          'Regular phishing awareness training.',
          'Clear internal process if someone clicks a suspicious link.',
        ],
      },
      {
        heading: '4. Backups and Recovery',
        paragraphs: [
          'Backups are your last line of defence against ransomware and accidental deletion. They must be tested, not just configured.',
        ],
        listItems: [
          'Multiple backup copies, including off-site or cloud.',
          'Regular restore tests to prove backups work.',
          'Documented recovery time objectives (RTOs) for key systems.',
        ],
      },
      {
        heading: '5. Where IT Legends Fits In',
        paragraphs: [
          'We help design layered security for SMEs - from firewalls and endpoint protection to backup, MFA and staff awareness - so you can focus on running your business.',
        ],
      },
    ],
    ctaLabel: 'Book a cybersecurity review',
    ctaHref: '/#contact',
  },
  {
    slug: 'it-equipment=price-increase-sa',
    title: 'Why IT Equipment Prices in South Africa Are Set to Increase (And What You Can Do About It)',
    date: 'Jan 14, 2026',
    readTime: '6 min read',
    category: 'IT Costs',
    excerpt: 'IT hardware prices in South Africa are rising due to global supply pressure, a weaker rand, and higher logistics costs. Businesses that plan ahead can reduce the impact and avoid costly surprises.',
    image: '/src/assets/blog-card-it-costs.webp',
    sections: [
      {
        heading: '1. Global Supply Chain Pressure Isn`t Over.',
        paragraphs: [
          'Although the worst of the global chip shortage has eased, supply chains have not returned to pre-2020 stability.',
          'Key components such as CPUs, memory, SSDs, and networking chips are still affected by limited manufacturing capacity, higher production costs, and ongoing geopolitical uncertainty.',
          'When global suppliers increase prices, South African importers feel it immediately - and those costs are passed down to businesses.',
        ],
      },
      {
        heading: '2. The Weak Rand Makes Imported Technology More Expensive',
        paragraphs: [
          'Most IT hardware sold in South Africa is imported and priced in US dollars or euros.',
          'A weaker rand increases landed costs for laptops, servers, firewalls, and networking equipment. Even if international prices stays flat, local prices can rise purely due to exchange rate movement.',
        ],
      },
      {
        heading: '3. Rising SHipping, Insurance, and Compliance Costs',
        paragraphs: [
          'The cost of getting hardware into the country has increased significantly.',
          'Higher fuel prices, shipping fees, insurance premiums, and regulatory overhead all contribute to higher final prices, even if these costs are not visible as seperate line items on invoices.'
        ],
      },
      {
        heading: '4. Modern IT Equipment Is More Powerful - and More Expensive',
        paragraphs: [
          'Modern business hardware includes advanced security chips, faster storage, AI acceleration features, and higher-grade components.',
          'While these improvements deliver better performance and security, they also increase manufacturing and replacement costs compared to older systems.',
        ],
      },
      {
        heading: '5. Shorter Upgrade Cycles Increase Replacement Pressure',
        paragraphs: [
          'Software vendors now enforce faster upgrade and end-of-support cycles.',
          'This often forces businesses to replace equipment earlier than expected to remain secure and compliant, rather than upgrading gradually over time.',
        ],
      },
      {
        heading: '6. What This Means for South African Businesses',
        paragraphs: [
          'Without proper planning, rising IT costs can result in unexpected capital expenses, delayed upgrades, increased security risks, and reduced productivity.',
          'Businesses that react only when equipment fails are usually the ones hit hardest.',
        ],
      },
      {
        heading: '7. What You Can Do to Reduce the Impact',
        paragraphs: [
          'Plan hardware upgrades in advance to avoid emergency purchases.',
          'Extend equipment lifespan safely through maintenance and monitoring.',
          'Standardise hardware models to reduce support and replacement costs.',
          'Consider leasing or lifecycle-based procurement to smooth cash flow.',
          'Work with an IT partner who proactively monitors pricing and end-of-life risks.',
        ],
      },
      {
        heading: '8. Where IT Legends Fits In',
        paragraphs: [
          'At IT Legends, we help South African businesses plan realistic hardware refresh cycles, extend the life of existing equipment, and avoid unnecessary emergency replacements.',
          'Smart IT planning reduces downtime, security risk, and long-term costs - without panic buying.',
        ],
      },
    ],
    ctaLabel: 'Chat to us about your strategy',
    ctaHref: '/#contact',
  },
];

function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-0.5 bg-transparent"> 
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"/>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-itdark text-itsilver flex flex-col">
        {/* SEO for 404 state */}
        <SeoHead
          title="Blog post not found"
          description="The blog article you were looking for could not be found on IT Legends."
        />

        <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href='/' className="flex items-center space-x-2">
              <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">IT Legends</span>
            </a>
            <a
              href="/#blog"
              className="inline-flex items-center text-itsilver hover:text-itred transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Insights
            </a>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center pt-20">
          <p className="text-itsilver">Blog post not found.</p>
        </div>

          <Footer />
      </div>
    );
  }

  const baseURL = 'https://www.itlegends.co.za';
  const postURL = `${baseURL}/blog/${post.slug}`;

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headLine: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'IT Legends',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IT Legends',
      logo: {
        '@type': 'ImageObject',
        url: `${baseURL}/logo-itlegends.png`,
      },
    },
    image: `${baseURL}&{post.image.replace('/src', '')}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postURL,
    },
  };

  return (
    <div className="min-h-screen bg-itdark text-itsilver flex flex-col">
      {/* SEO for actual blog post */}
      <SeoHead
        title={post.title + ' | IT Legends'}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        schema={[blogPostSchema]}
      />

      {/* Top nav */}
      <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href='/' className="flex items-center space-x-2">
          <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-white">IT Legends</span>
          </a>
          <a
            href="/#blog"
            className="inline-flex items-center text-itsilver hover:text-itred transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Insights
          </a>
        </div>
      </nav>

      {/* Hero with shared background */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogHero})`
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-itsilver/80 text-sm">
            <span className="inline-flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {post.date}
            </span>
            <span className="inline-flex items-center">
              <Clock className="h-4 w-4 mr-1" /> {post.readTime}
            </span>
            <span className="inline-flex items-center">
              <Tag className="h-4 w-4 mr-1" /> {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-itsilver max-w-2xl">{post.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <SectionDivider />

        <div className="bg-itgray/40 border border-itgray2/60 rounded-2xl p-6 sm:p-8 shadow-lg">
        {/* Card image inside grey content block */}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full rounded-lg mb-8 shadow-md object-cover max-h-96"
        />

        {/* Article content */}
        <article className="prose prose-invert max-w-none prose-p:text-itsilver prose-li:text-itsilver prose-h2:text-white prose-h3:text-white">
          {post.sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="mb-4">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="mb-4">{p}</p>
              ))}

              {section.listItems && (
                <ul className="mb-4">
                  {section.listItems.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* CTA inside the same grey block */}
        <div className="text-center mt-10">
          <a
            href={post.ctaHref}
            className="btn-primary inline-flex items-center justify-center"
          >
            {post.ctaLabel}
          </a>
        </div>
      </div>

      <SectionDivider />
      </main>

      <Footer />
    </div>
  );
}