import { useState } from 'react';
import { Home, ChevronRight, Shield, Server, Cloud, Cpu, Users, Zap } from 'lucide-react';
import Footer from '../../components/Footer';
import SeoHead from '../../components/SeoHead';
import managedHero from '../../assets/managed-hero.webp';
import servicesBg from '../../assets/services-bg.webp';
import contactBg from '../../assets/contact-bg.webp';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.itlegends.co.za/#it-legends-roodepoort',
    'name': 'IT Legends - Roodepoort',
    'url': 'https://www.itlegends.co.za/it-support-roodepoort',
    'telephone': '+27-84-634-8144',
    'email': 'info@itlegends.co.za',
    'description': 'Managed IT support, cybersecurity, cloud and network solutions for businesses in Roodepoort and greater Johannesburg',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '715 Elm Street, Grobler Park',
      'addressLocality': 'Roodepoort',
      'addressRegion': 'Gauteng',
      'postalCode': '1724',
      'addressCountry': 'ZA',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -26.1436,
      'longitude': 27.8564,
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Roodepoort' },
      { '@type': 'City', 'name': 'Johannesburg' },
      { '@type': 'City', 'name': 'Florida' },
      { '@type': 'City', 'name': 'Krugersdorp' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Who provides IT support in Roodepoort?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends provides managed IT support, cybersecurity, cloud and network solutions for businesses in Roodepoort. Our office is based in Grobler Park, Roodepoort, giving us fast response times across the area.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How quickly can IT Legends respond to IT problems in Roodepoort?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends provides remote support immediately and can be on-site in Roodepoort within hours for critical issues. Our Grobler Park office means we are always close by.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What IT services does IT Legends offer in Roodepoort?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends offers managed IT support, cybersecurity, cloud and backup solutions, server maintenance, hardware and network setup, and helpdesk support for businesses in Roodepoort and the greater West Rand.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How much does IT support cost for a small business in Roodepoort?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends offers scalable managed IT support packages tailored to SME budgets in Roodepoort. Contact us on +27 84 634 8144 for a free assessment and custom quote.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Does IT Legends offer a free IT assessment in Roodepoort?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. IT Legends offers a free IT health check for businesses in Roodepoort. We assess your current IT environment and recommend solutions tailored to your needs and budget.',
        },
      },
    ],
  },
];

const services = [
  { icon: Shield, title: 'Managed IT Support', desc: 'Proactive monitoring, maintenance and remote support - your outsourced IT department in Roodepoort.', color: 'red', href: '/services/managed-it-support', highlight: true },
  { icon: Shield, title: 'Cybersecurity', desc: 'Endpoint protection, firewall management and threat detection to keep your Roodepoort business safe.', color: 'blue', href: '/services/cybersecurity', highlight: false },
  { icon: Cloud, title: 'Cloud & Backup', desc: 'Microsoft 365, cloud migrations and automated offsite backups for business continuity.', color: 'red', href: '/services/cloud-backup', highlight: false },
  { icon: Server, title: 'Server Maintenance', desc: 'Continuous server monitoring and preventative maintenance to prevent costly downtime.', color: 'blue', href: '/services/server-maintenance', highlight: false },
  { icon: Cpu, title: 'Hardware & Network', desc: 'Supply, installation & configuration of routers, switches, cabling and workstations.', color: 'red', href: '/services/hardware-network', highlight: false },
  { icon: Users, title: 'Helpdesk Support', desc: 'Fast remote helpdesk assistance for day-to-day IT problems across your Roodepoort team.', color: 'blue', href: '/services/helpdesk', highlight: false },
];

export default function ITSupportRoodepoort() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <SeoHead
        title="IT Support Roodepoort | Managed IT Services | IT Legends"
        description="IT Legends provides managed IT support, cybersecurity, cloud and network solutions for businesses in Roodepoort. Local technicians, fast response. Call +27 84 634 8144."
        url="/it-support-roodepoort"
        type="website"
        schema={schema}
    />

    {/* Hero */}
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${managedHero})` }} />
      <div className="absolute inset-0 bg-black/65" />

      {/* Back button */}
      <div className="absolute top-20 right-6 z-10">
        <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-itgray/80 hover:bg-itred transition-colors text-white text-sm font-medium rounded-lg border border-itgray2">
          <Home className="h-4 w-4" />
          Back to Home
        </a>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-block bg-itred/20 border border-itred/40 text-itred text-sm font-semibold px-4 py-1 rounded-full mb-6">
          Roodepoort, Gauteng
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          IT Support in <span className="bg-gradient-to-r from-itred to-itblue text-transparent bg-clip-text">Roodepoort</span>
        </h1>
        <p className="text-lg sm:text-xl text-itsilver mb-10 leading-relaxed max-w-2xl mx-auto">
          Local managed IT support, cybersecurity and cloud solutions for Roodepoort businesses. Fast response times. Certified technicians. Fixed monthly costs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#contact" className="btn-primary inline-flex items-center justify-center">
            Get a Free IT Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
          <a href="tel:+27846348144" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-itblue text-white hover:shadow-[0_0_18px_4px_rgba(0,117,255,0.1)] transition-all">
            Call +27 84 634 8144
          </a>
        </div>
      </div>
    </section>

    <div className="w-full flex justify-center py-0.5 bg-transparent">
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"></div>
    </div>

    {/* Why local matters */}
    <section className="relative  py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesBg})` }} />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Roodepoort's Local IT Partner</h2>
        <div className="section-divider mb-8"></div>
        <p className="text-itsilver text-lg leading-relaxed mb-6">
          IT Legends is based in Grobler Park, Roodepoort - giving us faster on-site response times than any Johannesburg CBD-based IT company. When your server goes down or your network fails, you need someone who can be there quickly. We can.
        </p>
        <p className="text-itsilver text-lg leading-relaxed">
          We support small and medium businesses across Roodepoort, Florida, Constantia Kloof, Honeydew and the greater West Rand - acting as your dedicated IT department for a predictable monthly cost.
        </p>
      </div>
    </section>

    <div className="w-full flex justify-center py-0.5 bg-transparent">
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to it-blue"></div>
    </div>

    {/* Services */}
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesBg})` }} />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">IT Services in Roodepoort</h2>
          <div className="section-divider mb-6"></div>
          <p className="text-itsilver max-w-2xl mx-auto">Everything your Roodepoort business needs - from daily helpdesk support to full cybersecurity protection.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((services) => (
            <a
              key={services.title}
              href={services.href}
              className={`card-dark group cursor-pointer block ${
                services.highlight
                  ? 'border-itred/60 glow-red ring-1 ring-itred/30'
                  : services.color === 'red'
                  ? 'border-itred/30 hover:/border-itred/60 glow-red'
                  : 'border-itblue/30 hover:border-itblue/60 glow-blue'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                  services.color === 'red' ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'
                }`}>
                  <services.icon className="h-8 w-8" />
                </div>
                {services.highlight && (
                <div className="bg-itred text-white text-xs font-bold px-3 py-1 rounded-full h-fit">
                  ★ Most Popular
                </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{services.title}</h3>
              <p className="text-itsilver text-sm mb-4">{services.desc}</p>
              <span className={`text-sm font-semibold transition-colors ${
                services.color === 'red' ? 'text-itred grou-hover:text-itblue' : 'text-itblue group-hover:text-itred'
              }`}>Learn More</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <div className="w-full flex justify-center py-0.5 bg-transparent">
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"></div>
    </div>

    {/* FAQ */}
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesBg})` }} />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Roodepoort IT Support FAQs</h2>
          <div className="section-divider"></div>
        </div>
        <div className="space-y-3">
          {schema[1].mainEntity?.map((item: any) => (
            <FAQItem key={item.name} q={item.name} a={item.acceptedAnswer.text} />
          ))}
        </div>
      </div>
    </section>

    <div className="w-full flex justify-center py-0.5 bg-transparent">
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"></div>
    </div>

    {/* CTA */}
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${contactBg})` }} />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to get legendary IT support in Roodepoort?</h2>
        <p className="text-silver mb-8">Free IT health check. No obligation. No jargon. Just honest advice from your local IT team.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#contact" className="btn-primary">Get Free IT Assessment</a>
          <a href="tel:+27846348144" className="btn-secondary">Call +27 84 634 8144</a>
        </div>
      </div>
    </section>

    <Footer />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-itgray2 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-itgray hover:bg-itgray2 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <span className="text-itred flex-shrink-0 text-xl">{open ? '-' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-itdark text-itsilver leading-relaxed text-sm">{a}</div>
      )}
    </div>
  );
}