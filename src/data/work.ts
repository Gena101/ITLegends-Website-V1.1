// src/data/work.ts
// /work portfolio. Work page only (kept out of the shared bundle).
// Only projects Eugene has approved; client projects named only with permission (T&Cs clause 11.5).
// No screenshots for now. `results` only ever holds measured numbers.
import type { ServiceSlug } from './services';

export interface Project {
  /** Anchor on /work, e.g. /work#sitenexus */
  id: string;
  name: string;
  /** What was built (badge, and the schema type) */
  kind: 'Software' | 'Website';
  /** Status badge, e.g. "In daily use" */
  status: string;
  /** One line under the name */
  summary: string;
  description: string[];
  highlights: string[];
  stack?: string[];
  /** Public link, only where the client or IT Legends has agreed */
  url?: string;
  /** e.g. "April 2026" */
  launched?: string;
  /** Service page this project is proof for */
  service: ServiceSlug;
  /** Measured results only (e.g. PageSpeed scores from the live site) */
  results?: string[];
}

export const projects: Project[] = [
  {
    id: 'sitenexus',
    name: 'SiteNexus',
    kind: 'Software',
    status: 'In daily use',
    summary: 'Field and asset management for IT teams. Built by IT Legends and used by our technicians every day.',
    description: [
      'SiteNexus is our own field and asset management app, built around the way an IT support team works on site.',
      'Job timers record the time spent at each client site, so every invoice is backed by an itemised, timed record the client can check. ' +
        'Each client gets an IT asset register: every computer, server and network device, labelled with a QR code, with warranty dates tracked and alerts before cover expires. ' +
        'After each visit, a PDF site report shows what was done and how long it took.',
    ],
    highlights: [
      'Client and site records in one place',
      'Live job timers for on-site work',
      'QR asset labels and an asset register per client',
      'Warranty tracking with alerts before cover expires',
      'PDF site reports after every visit',
    ],
    stack: ['React', 'TypeScript', 'Supabase'],
    launched: 'July 2026',
    service: 'custom-software',
  },
  {
    id: 'itlegends-website',
    name: 'itlegends.co.za',
    kind: 'Website',
    status: 'This website',
    summary: 'Our own website, rebuilt from scratch to load fast, rank in search and be easy for AI assistants to read.',
    description: [
      'We rebuilt itlegends.co.za as a hand-coded React and TypeScript site. Every page is built ahead of time as plain HTML, ' +
        'so it loads quickly and search engines and AI assistants can read it without running any code.',
      'Content lives in one place. Service, industry and location pages are generated from shared data, ' +
        'so prices, hours and contact details are the same everywhere they appear.',
    ],
    highlights: [
      'Every page pre-rendered as HTML, with its own title, description and structured data',
      'Templates for services, industries, locations, blog posts and FAQs, all driven by one set of data',
      'Animated 3D network on capable devices, with a lightweight static version on phones',
      'Self-hosted fonts and per-page code loading for speed',
      'An llms.txt file that summarises the site for AI assistants',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'three.js'],
    service: 'website-design',
  },
  {
    id: 'audio-canvas',
    name: 'Audio Canvas',
    kind: 'Website',
    status: 'Live',
    summary: 'Website for a professional audio, lighting and AV production company.',
    description: [
      'We designed and built the Audio Canvas website and launched it in April 2026: a one-page site that presents their services and turns visitors into event enquiries.',
      'The client supplied the text; we handled the design, the build and the launch on their hosting.',
    ],
    highlights: [
      'One-page layout covering services, events, why choose them and contact',
      'Event enquiry form that captures the event type, date, time and venue',
      'WhatsApp button and click-to-call',
      'Mobile-friendly design',
    ],
    url: 'https://audiocanvas.co.za',
    launched: 'April 2026',
    service: 'website-design',
  },
  {
    id: 'workshop-system',
    name: 'Workshop management system',
    kind: 'Software',
    status: 'In development',
    summary: 'A management system for mechanical workshops, built so one platform can serve many workshops.',
    description: [
      'Our own product for mechanical workshops, designed so that one platform can serve many independent workshops, each with its own data.',
      'It is still in development. The core features are already in daily use for testing, so real workshop work shapes what we build next.',
    ],
    highlights: [
      'Built for mechanical workshops',
      'One platform for many workshops, each with its own data',
      'Core features in daily use for testing',
    ],
    service: 'custom-software',
  },
];