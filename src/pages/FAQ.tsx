import { useState } from 'react';
import { ChevronDown, ChevronUp, Home } from 'lucide-react';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import contactBg from '../assets/contact-bg.webp';
import blogCardAi from '../assets/blog-card-ai.webp';

const faqs = [
  {
    category: 'General IT Support',
    questions: [
      {
        q: 'What IT support services does IT Legends offer?',
        a: 'IT Legends offers managed IT support, cybersecurity, cloud and backup solutions, server maintenance, hardware and network setup, and helpdesk remote assistance for small and medium businesses across Johannesburg, Pretoria and greater Gauteng.',
      },
      {
        q: 'Where does IT Legends provide IT support in Gauteng?',
        a: 'We have offices in Roodepoort (Johannesburg) and Wierdapark (Centurion/Pretoria) and provide both remote and on-site support across Johannesburg, Roodepoort, Sandton, Midrand, Centurion and Pretoria.',
      },
      {
        q: 'How quickly does IT Legends respond to IT problems?',
        a: 'We aim to respond to critical issues within hours. Most common helpdesk issues are resolved remotely within the same business day. On-site visits are available across Gauteng when remote support is not sufficient.',
      },
      {
        q: 'Does IT Legends offer on-site IT support or only remote support?',
        a: 'Both. We resolve most issues remotely for speed and convenience, but our technicians are available for on-site visits across Johannesburg, Roodepoort, Sandton, Midran, Centurion and Pretoria when hands-on support is needed.',
      },
      {
        q: 'Can IT Legends support my remote or hybrid workforce?',
        a: 'Yes. We support remote and hynrid teams through secure VPN setup, Microsoft 365 and Google Workspace management, remote device management, and helpdesk support for staff working from home across South Africa.',
      },
    ],
  },
  {
    category: 'Managed IT Services',
    questions: [
      {
        q: 'What is a managed IT service provider (MSP)?',
        a: 'A managed IT service provider like IT Legends acts as your outsourced IT department. We handle proactive monitoring, maintenance, security, helpdesk support and cloud management for a predictable monthly cost - so you can focus on running your business.',
      },
      {
        q: 'Is managed IT support worth it for a small business in South Africa?',
        a: 'For most SMEs, managed IT support costs far less than hiring a full-time IT person while providing broader expertise and faster response times. It aslo converts unpredictable IT repair bills into a fixed monthly cost you can budget for.',
      },
      {
        q: 'How much does managed IT support cost for a small business in Gauteng?',
        a: 'Costs depend on the number of users, devices and services required. IT Legends offers scalable packages tailored to SME budgets. Contact us for a custom quote - there is no one-size-fits-all answer.',
      },
      {
        q: 'What is included in a managed IT support contract?',
        a: 'IT Legends managed IT support typically includes remote monitoring, helpdesk support, patch management, antivirus management, backup monitoring, and regular IT health reporting. Contracts are tailored to your business size and needs.',
      },
      {
        q: 'How do I get started with IT Legends?',
        a: 'Contact us via our website or call +27 84 634 8144. We start with a free IT health check of your current environment, then recommend a support plan tailored to your business needs and budget.',
      },
    ],
  },
  {
    category: 'Cybersecurity',
    questions: [
      {
        q: 'Is my small business at risk of a cyberattack in South Africa?',
        a: 'Yes. South Africa is one of the most targeted countries for cybercrime in Africa. Small businesses are frequently targeted because they often have weaker security than large corporations. A single ransomware attack or data breach can cost a business hundreds of thousands of rands.',
      },
      {
        q: 'How can I protect my business from cyberattacks?',
        a: 'Key steps include enterprise-grade endpoint protection, multi-factor authentication, regular software patching, offsite backups, and staff phishing awareness training. IT Legends can implement and manage all of these for your business.',
      },
      {
        q: 'What should I do if my business has been hacked?',
        a: 'Immediately isolate affected devices from your network and call IT Legends on +27 84 634 8144 for emergency response. Do not pay any ransom without professional advise. We will contain the breach, assess the damage, and restore your systems from clean backups.',
      },
      {
        q: 'What cybersecurity services does IT Legends offer?',
        a: 'We provide endpoint protection, firewall management, threat detection, security audits, ransomware protection, and staff phising awareness training for businesses across Johannesburg, Pretoria and greater Gauteng.',
      },
    ],
  },
  {
    category: 'Cloud & Backup',
    questions: [
      {
        q: 'How does cloud backup protect my business during load shedding?',
        a: 'Cloud backup stores copies of your critical business data on secure offsite servers. If your local hardware is damaged or powered off during load shedding, your data remains safe and accessible from any device with an internet connection.',
      },
      {
        q: 'What is the difference between cloud backup and cloud storage?',
        a: 'Cloud storage (like Google Drive or Dropbox) is for accessing and sharing files. Cloud backup is an automated, versioned copy of your systems and data designed for disaster recovery - if you suffer data loss, you can restore everything quickly from a backup.',
      },
      {
        q: 'Can IT Legends migrate my business to Microsoft 365 or Google Workspace?',
        a: 'Yes. IT Legends manages the full migration process including email, files, calendars and contacts with minimal distruption to your business. We also provide ongoing support and management of your Microsoft 365 or Google Workspace environment.',
      },
      {
        q: 'How often should a small business back up its data?',
        a: 'Most small businesses should run automated backups at least daily, with critical systems backed up more frequently. IT Legends configures and monitors your backup schedule to ensure recovery points meet your business continuity requirements.',
      },
    ],
  },
  {
    category: 'Hardware & Network',
    questions: [
      {
        q: 'Can IT Legends supply and set up business comuters and laptops?',
        a: 'Yes. IT Legends sources, supplies and configures business workstations and laptops including Windows setup, software installation, domain joining and security configuration - ready for your staff from day one.',
      },
      {
        q: 'How can I improve my office Wi-Fi in Johannesburg?',
        a: 'Poor Wi-Fi is usually caused by outdated access points, incorrect placement or network congestion. IT Legends conducts a Wi-Fi assessment and designs a coverage solution using enterprise-grade access points for reliable connectivity throughout your premises.',
      },
      {
        q: 'Does IT Legends do structured network cabling for offices?',
        a: 'Yes. We provide professional structured cabling installations including Cat6 cabling, patch panels and trunking for offices across Gauteng. Proper cabling is the foundation of a reliable business network.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap(category =>
    category.questions.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
};

function FAQItem({ q, a}: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-itgray-2 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-itgray hover:bg-itgray2 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-itred flex-shrink-0" />
          : <ChevronDown className="h-5 w-5 text-itsilver flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 py-5 bg-itdark text-itsilver leading-relaxed text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <SeoHead
        title="IT Support FAQs | IT Legends Johannesburg & Pretoria"
        description="Answers to the most common questions about managed IT support, cybersecurity, cloud backup and network services for businesses in Johannesburg, Pretoria and greater Gauteng."
        url="/faq"
        type="website"
        schema={[faqSchema]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactBg})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Back to Home Button - top right */}
        <div className="absolute top-10 right-6 z-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-itgray/80 hover:bg-itred transition-colors text-white text-sm font-medium rounded-lg border border-itgray2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <div className="section-divider mb-6"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Everything you need to know about IT support, cybersecurity and cloud services for your Gauteng business.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blogCardAi})` }}
        />
        {/* Dark overlay - slightly heavier so accordion text stays readebl */}
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-14">
          {faqs.map(category => (
            <div key={category.category}>
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b border-itgray2">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactBg})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-itsilver mb-8">
            Talk to one of our technicians - no obligation, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="tel:+27846348144" className="btn-secondary">
              Call +27 84 634 8144
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}