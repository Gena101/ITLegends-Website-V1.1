// src/data/blog.ts
// Blog posts: the ONE source for /blog, /blog/:slug, the Article schema, sitemap and llms.txt.
// Blog pages only (kept out of the shared bundle). Post bodies are plain text; the template renders the HTML.
// The checks at the bottom fail the build on bad dates, long meta tags or duplicate slugs.
import { getPlan } from './pricing';
import type { ServiceSlug } from './services';

const managedCare = getPlan('managed');
const completeCare = getPlan('complete');

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
    title: 'Moving Your Business to the Cloud: A Practical Guide for South African SMEs',
    metaTitle: 'Moving to the Cloud: A Guide for SA SMEs | IT Legends',
    metaDescription:
      'What to move to the cloud first, what to keep on-site, how to control costs and where your data lives, written for South African small businesses.',
    excerpt:
      'Most small businesses should move email, files and backup to the cloud first, keep anything that needs local speed or special hardware on-site, ' +
      'and manage both as one environment. With the major cloud providers now running data centres in South Africa, local options are better than ever.',
    category: 'Cloud',
    datePublished: '2025-11-03',
    dateModified: '2026-11-06',
    related: ['cloud-backup', 'managed-it-support', 'business-connectivity'],
    ctaTitle: 'Plan your move to the cloud with us',
    sections: [
      {
        heading: 'Start with email, files and backup',
        paragraphs: [
          'A single server in a storeroom is a single point of failure: hardware faults, theft, power problems and missed maintenance all put your data at risk. ' +
            'The easiest wins are the services with mature cloud versions, which most businesses can move with little disruption.',
        ],
        list: [
          'Move email, calendars and file sharing to Microsoft 365 or Google Workspace.',
          'Keep a backup copy of your data off-site, separate from your office network.',
          'Use the cloud version of your business software where your software vendor offers one.',
          'Give staff secure access from anywhere, protected by multi-factor authentication.',
        ],
      },
      {
        heading: 'Keep some things on-site, and manage everything as one',
        paragraphs: [
          'Not everything belongs in the cloud. Software that needs a local server, very large files on a slow connection and specialised equipment often work better on-site. ' +
            'For most small businesses the answer is a mix of the two.',
          'What matters is managing the mix as one environment: the same monitoring, the same security settings and the same backup plan, whether a system runs in the office or in the cloud.',
        ],
      },
      {
        heading: 'Your data can stay in South Africa',
        paragraphs: [
          'The major cloud providers now run data centres locally. Microsoft opened its South African Azure regions in 2019, Amazon Web Services opened a region in Cape Town in 2020, ' +
            'and Google opened its first African cloud region, in Johannesburg, in 2024.',
          'Local regions mean faster response times, and they can make POPIA compliance simpler, because the Act restricts sending personal information outside South Africa ' +
            'unless certain conditions are met. Ask where your data will be stored before you sign up for a service.',
        ],
      },
      {
        heading: 'Keep cloud costs under control',
        paragraphs: ['Cloud services save money when they are planned and reviewed. Without a plan, monthly bills creep up.'],
        list: [
          'Remove licences for staff who have left, and match each licence to what the person actually uses.',
          'Size cloud servers to their real workload, and switch off non-critical ones outside business hours.',
          'Review cloud bills monthly, so a surprise costs one month, not a year.',
        ],
      },
      {
        heading: 'Power and internet still matter',
        paragraphs: [
          'Eskom reports that there has been no load shedding since 16 May 2025, but local outages, cable theft and line faults still happen. ' +
            'Cloud services only help if you can reach them, so a backup internet connection and a UPS on your network equipment keep the office working when the main line or power drops.',
        ],
      },
      {
        heading: 'How IT Legends helps',
        paragraphs: [
          'We migrate email and files to Microsoft 365 or Google Workspace and manage user accounts and mailboxes on every managed IT plan. ' +
            'We back up Microsoft 365, Google Workspace, servers and PCs, test restores every quarter, and supply backup internet connections and UPS units, ' +
            'so your cloud setup keeps working when something fails.',
        ],
      },
    ],
    sources: [
      {
        label: 'DatacenterDynamics: Google launches its first African cloud region in Johannesburg',
        url: 'https://datacenterdynamics.com/en/news/google-launches-first-african-cloud-region-in-johannesburg-south-africa',
      },
      {
        label: 'SAnews: No load shedding in over 500 days, says Eskom (October 2026)',
        url: 'https://www.sanews.gov.za/south-africa/no-load-shedding-over-500-days-says-eskom',
      },
    ],
  },
  {
    slug: 'ai-integration-guide',
    title: 'AI for Business Owners: A Practical Guide to Getting Started',
    metaTitle: 'AI for Business Owners: A Practical Guide | IT Legends',
    metaDescription:
      'How small businesses can use AI safely: start with real problems, keep a person in charge, protect client data and know when custom software makes sense.',
    excerpt:
      'Start with a task that wastes your team’s time, try the AI features in tools you already pay for, keep a person responsible for every result, ' +
      'and never paste client data into tools you have not checked. Build something custom only when off-the-shelf tools cannot do the job.',
    category: 'AI',
    datePublished: '2025-11-10',
    dateModified: '2026-11-06',
    related: ['custom-software', 'managed-it-support'],
    ctaTitle: 'Have a process that should be easier? Talk to us',
    sections: [
      {
        heading: 'Start with the problem, not the tool',
        paragraphs: [
          'The worst way to adopt AI is to buy a tool and then look for something for it to do. Start with the tasks that are repetitive, slow or error-prone, and ask whether AI could help.',
        ],
        list: [
          'Emails and messages that answer the same questions every week.',
          'Information typed in by hand from documents such as invoices, quotes, job cards or claim forms.',
          'Long documents that someone has to read and summarise.',
          'Reports that take hours to put together every month.',
        ],
      },
      {
        heading: 'Use what you already pay for first',
        paragraphs: [
          'Microsoft and Google now build AI assistants into Microsoft 365 and Google Workspace, and many accounting and industry systems are adding AI features of their own. ' +
            'Check what your current subscriptions include before paying for another tool.',
        ],
      },
      {
        heading: 'Keep a person in charge',
        paragraphs: [
          'AI can be confidently wrong. The safe pattern for most businesses is that AI drafts and a person approves: it suggests the reply, summary or figures, and someone on your team checks them before anything goes to a client.',
          'Take extra care with numbers, names, prices and anything legal or financial.',
        ],
      },
      {
        heading: 'Protect client and staff data',
        list: [
          'Do not paste personal information about clients or staff into free AI tools unless you have checked how they use and store it.',
          'Use business accounts with admin controls rather than personal sign-ups, so you decide who can use which tools.',
          'Tidy up file and folder permissions first: assistants built into your office suite can usually see whatever the user can see.',
          'Remember that POPIA applies to personal information you process with AI tools, including where that information is sent and stored.',
        ],
      },
      {
        heading: 'When custom software makes sense',
        paragraphs: [
          'Off-the-shelf tools work well for general tasks. When your process is specific to your business, such as job cards, claims, site visits or asset tracking, ' +
            'a system built around how you work can capture information properly from the start.',
          'Once your information is structured, AI features such as summarising notes or reading data from documents can be added where they genuinely save time, with a person still approving the result.',
        ],
      },
      {
        heading: 'How IT Legends helps',
        paragraphs: [
          'We build custom web apps, client portals and internal business systems at a fixed price agreed after scoping, and where AI features make sense, they can be part of the system we build. ' +
            'For managed IT clients, we set up and secure Microsoft 365 and Google Workspace, including the user accounts and permissions that AI assistants rely on.',
        ],
      },
    ],
  },
  {
    slug: 'cybersecurity-checklist-smes',
    title: 'Cybersecurity Checklist for Small Businesses: What Actually Stops Attacks',
    metaTitle: 'Cybersecurity Checklist for Small Businesses | IT Legends',
    metaDescription:
      'The security basics that stop most attacks on small businesses: patching, MFA, email filtering, staff awareness and tested backups, with current breach data.',
    excerpt:
      'Most attacks on small businesses exploit basic gaps: software that has not been patched, accounts without multi-factor authentication, and staff tricked by convincing emails. ' +
      'Closing those gaps and keeping backups you have tested stops most attacks. This checklist covers what matters most, in order.',
    category: 'Security',
    datePublished: '2025-11-17',
    dateModified: '2026-11-06',
    related: ['cybersecurity', 'cloud-backup', 'managed-it-support'],
    ctaTitle: 'Want to know where your gaps are?',
    sections: [
      {
        heading: 'What attackers are exploiting now',
        paragraphs: [
          'Verizon’s 2026 Data Breach Investigations Report, which analysed more than 22,000 confirmed breaches, found that exploiting software vulnerabilities has overtaken stolen passwords ' +
            'as the most common way attackers get in, for the first time in the report’s 19-year history. Vulnerabilities were the entry point in 31% of breaches.',
          'Stolen passwords and phishing remain close behind, and ransomware featured in nearly half of all breaches. Small businesses are not too small to be targeted: ' +
            'most attacks are automated and go wherever the defences are weakest.',
        ],
      },
      {
        heading: '1. Patch everything, quickly',
        list: [
          'Install Windows and macOS updates automatically, and check that they actually installed.',
          'Update browsers, PDF readers and other third-party software, not just the operating system.',
          'Update the firmware on firewalls, routers and storage devices.',
          'Replace systems that no longer get security updates. Windows 10 support ended on 14 October 2025.',
        ],
      },
      {
        heading: '2. Turn on multi-factor authentication',
        paragraphs: [
          'A Microsoft research study found that multi-factor authentication reduced the risk of account compromise by 99.22%, and authenticator apps performed better than SMS codes.',
        ],
        list: [
          'Start with email: Microsoft 365 or Google Workspace accounts for every user.',
          'Then admin accounts, remote access, banking and accounting software.',
          'Use a password manager so every account has a unique password.',
        ],
      },
      {
        heading: '3. Filter email and train your team',
        list: [
          'Filter incoming email for phishing, spoofing and malware before it reaches inboxes.',
          'Train staff regularly to recognise suspicious emails, messages and calls.',
          'Make it easy and blame-free to report a suspicious email or a wrong click.',
          'Confirm any change to a supplier’s banking details by phone, using a number you already have.',
        ],
      },
      {
        heading: '4. Protect every device',
        list: [
          'Run endpoint protection on every PC, laptop and server, and make sure someone watches the alerts.',
          'Put a properly configured firewall between your office network and the internet.',
          'Give staff normal user accounts for daily work, and keep admin rights for IT tasks only.',
        ],
      },
      {
        heading: '5. Keep backups you have tested',
        list: [
          'Keep at least one backup copy off-site and separate from your network, where ransomware cannot reach it.',
          'Back up Microsoft 365 or Google Workspace too: deleted data only stays in their recycle bins for a limited time.',
          'Test restores regularly, and know how long it takes to get each key system running again.',
        ],
      },
      {
        heading: '6. Know what to do when something goes wrong',
        paragraphs: [
          'Disconnect affected devices from the network, but do not switch them off or delete anything. Change passwords from a device you know is clean, and call your IT provider. ' +
            'If personal information may have been accessed, POPIA requires you to notify the Information Regulator and the people affected.',
        ],
      },
      {
        heading: 'How IT Legends helps',
        paragraphs: [
          'Every managed IT plan includes operating system and third-party patching, Microsoft Defender set up and monitored, multi-factor authentication and staff awareness training. ' +
            `${managedCare.name} adds Webroot, email filtering and firewall management, and ${completeCare.name} adds quarterly security reviews. ` +
            'We help with the technical safeguards POPIA expects; we do not give legal advice.',
        ],
      },
    ],
    sources: [
      {
        label: 'Verizon: 2026 Data Breach Investigations Report',
        url: 'https://www.verizon.com/business/resources/reports/dbir/',
      },
      {
        label: 'Microsoft Research: How effective is multifactor authentication at deterring cyberattacks?',
        url: 'https://www.microsoft.com/en-us/research/publication/how-effective-is-multifactor-authentication-at-deterring-cyberattacks/',
      },
    ],
  },
    {
    slug: 'it-equipment-price-increase-sa',
    title: 'Why IT Hardware Prices Are Rising in South Africa, and How to Plan for It',
    metaTitle: 'Why IT Hardware Prices Are Rising in SA | IT Legends',
    metaDescription:
      'AI data centres are buying up memory chips, pushing PC and laptop prices up in 2026. What is behind it, and how SA businesses can plan their hardware spend.',
    excerpt:
      'Computers and laptops cost more in 2026 mainly because memory is scarce. Chipmakers are selling more of their output to AI data centres, ' +
      'and Gartner expects memory and SSD prices to more than double this year, lifting average PC prices by about 17%. ' +
      'Planning replacements early is the best defence.',
    category: 'IT Costs',
    datePublished: '2026-01-14',
    dateModified: '2026-11-06',
    related: ['hardware-network', 'managed-it-support'],
    ctaTitle: 'Plan your next hardware refresh with us',
    sections: [
      {
        heading: 'Memory is the main reason prices are rising',
        paragraphs: [
          'The biggest cost driver in 2026 is memory: the RAM and SSD storage inside every PC and laptop. Demand from AI systems and data centres is keeping memory supply tight, ' +
            'and manufacturers are moving production towards higher-margin server memory, which leaves less for business and consumer devices.',
          'Gartner estimates that combined DRAM and SSD prices will rise by about 130% by the end of 2026, pushing average PC prices up 17% compared with 2025. ' +
            'Memory is expected to make up 23% of the cost of building a PC, up from 16% in 2025.',
          'The increases are slowing but have not stopped. TrendForce expected DRAM contract prices to rise another 13% to 18% in the third quarter of 2026, ' +
            'after jumps of around 60% in the second quarter, and its outlook suggests real relief is still some way off.',
        ],
      },
      {
        heading: 'The rand is not the cause this time',
        paragraphs: [
          'Most IT hardware is imported and priced in US dollars, so a weaker rand normally means higher prices. This time the rand has helped slightly: ' +
            'it averaged about R17.23 to the dollar in November 2025 and was around R16.53 in early October 2026, according to US Federal Reserve data.',
          'A firmer rand takes a little off the landed cost of hardware, but nowhere near enough to offset memory prices rising this steeply. ' +
            'The rand can also move several percent in a month, which is why hardware quotes are only valid for a short time.',
        ],
      },
      {
        heading: 'Windows 10 support has ended',
        paragraphs: [
          'Microsoft stopped releasing free security updates for Windows 10 on 14 October 2025. Businesses can buy Extended Security Updates, ' +
            'starting at US$61 per device for the first year and doubling each year, for up to three years. Microsoft describes them as a temporary bridge, not a long-term solution.',
          'Older PCs that cannot run Windows 11 now have to be replaced or paid for every year, at the same time as new machines cost more.',
        ],
      },
      {
        heading: 'What this means for your business',
        paragraphs: [
          'If you only replace computers when they fail, you pay 2026 prices in a hurry, often for whatever is in stock. ' +
            'Businesses that plan replacements choose when to buy, spread the cost and avoid emergency purchases.',
        ],
      },
      {
        heading: 'What you can do to reduce the impact',
        list: [
          'Keep an up-to-date list of your computers with their age, specifications and warranty dates, so you can see what is due for replacement.',
          'Budget for replacements a year ahead instead of buying when a machine dies.',
          'Plan to replace Windows 10 PCs that cannot run Windows 11, rather than relying on paid extended updates that double in price each year.',
          'Buy enough memory at the start: many business laptops have memory soldered to the board, so it cannot be upgraded later.',
          'Look after the machines you keep. Patching, health checks and monitoring help them last their full working life.',
          'Standardise on a few models, so setup, spares and support stay simple.',
          'Accept hardware quotes promptly. When component prices move week to week, quotes are only valid for a short time.',
        ],
      },
      {
        heading: 'How IT Legends helps',
        paragraphs: [
          'We supply Dell, HP and Lenovo computers and laptops, set up ready to work. Every managed IT plan includes an asset register, ' +
            `so you can see what you have and what is due for replacement, and ${completeCare.name} adds quarterly IT planning, ` +
            'where we work out together what to replace and when.',
        ],
      },
    ],
    sources: [
      {
        label: 'Gartner: surging memory costs will reduce global PC and smartphone shipments in 2026 (February 2026)',
        url: 'https://www.gartner.com/en/newsroom/press-releases/2026-02-26-gartner-says-surging-memory-costs-will-reduce-global-pc-and-smartphone-shipments-in-2026',
      },
      {
        label: 'Tom’s Hardware: TrendForce memory price forecast for Q3 2026',
        url: 'https://www.tomshardware.com/pc-components/ram/memory-price-surge-begins-to-cool-as-consumers-hit-affordability-limit-ai-demand-still-keeps-dram-and-nand-prices-climbing-through-q3-2026',
      },
      {
        label: 'Federal Reserve Bank of St. Louis (FRED): South African rand to US dollar exchange rate',
        url: 'https://fred.stlouisfed.org/series/DEXSFUS',
      },
      {
        label: 'Microsoft: When to use Windows 10 Extended Security Updates',
        url: 'https://techcommunity.microsoft.com/t5/windows-it-pro-blog/when-to-use-windows-10-extended-security-updates/ba-p/4102628',
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