// src/data/blogPosts.ts

import cloudCardImg from '../assets/blog-card-cloud.webp';
import aiCardImg from '../assets/blog-card-ai.webp';
import securityCardImg from '../assets/blog-card-security.webp';

export type Section = {
  heading: string;
  paragraphs?: string[];
  listItems?: string[];
};

export type BlogPost = {
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

export const blogPosts: BlogPost[] = [
  {
    slug: 'cloud-future',
    title: 'The Future of Cloud Computing in 2025 (and Beyond) for South African Businesses',
    date: 'Nov 3, 2025',
    readTime: '7 min read',
    category: 'Cloud',
    excerpt:
      'Cloud is no longer a "nice to have". It is the backbone of modern, always-on business - especially for SMEs that need flexibility, resilience, and predictable costs.',
    image: cloudCardImg,
    sections: [
      {
        heading: '1. From Servers in the Corner to "Cloud-First" Thinking',
        paragraphs: [
          'Many South African businesses still run critical systems on a single on-premise server sitting in a storeroom. It works... until it doesn\'t. Load shedding, hardware failures, theft, and lack of maintenance all put your data and uptime at risk.',
          'A cloud-first mindset means asking: "Can this safely and sensibly live in the cloud?" instead of defaulting to on-premises every time. You don\'t have to move everything at once, but you need a roadmap.',
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
          'Cloud can save money, but only if it is designed properly. Spinning up random servers with no plan is a quick way to overspend.',
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
    excerpt:
      'Artificial intelligence does not have to be confusing, expensive or risky. Used correctly, it quietly makes your team faster, your decisions better, and your customers happier.',
    image: aiCardImg,
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
        paragraphs: ['Here are some low-risk starting points that work well in real businesses.'],
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
    excerpt:
      'Most breaches do not start with elite hackers. They start with a simple password, a fake email, or an unpatched system. The good news: disciplined basics make you a much harder target.',
    image: securityCardImg,
    sections: [
      {
        heading: '1. Strong identity: Passwords and MFA',
        paragraphs: ['Identity is the new perimeter. Weak or reused passwords are still one of the biggest risks for SMEs.'],
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
];
