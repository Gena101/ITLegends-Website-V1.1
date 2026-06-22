import { useState } from 'react';
import { Home, ChevronRight, Shield, Server, Cloud, Cpu, Users } from 'lucide-react';
import Footer from '../../components/Footer';
import SeoHead from '../../components/SeoHead';
import managedHero from '../../assets/managed-hero.webp';
import servicesBg from '../../assets/services-bg.webp';
import contactBg from '../../assets/contact-bg.webp';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.itlegends.co.za/#it-legends-sandton',
    'name': 'IT Legends – Sandton',
    'url': 'https://www.itlegends.co.za/it-support-sandton/',
    'telephone': '+27-84-634-8144',
    'email': 'info@itlegends.co.za',
    'description': 'Managed IT support, cybersecurity, cloud and network solutions for businesses in Sandton, Johannesburg\'s premier business district.',
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
      'latitude': -26.1073,
      'longitude': 28.0567,
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Sandton' },
      { '@type': 'City', 'name': 'Rosebank' },
      { '@type': 'City', 'name': 'Fourways' },
      { '@type': 'City', 'name': 'Randburg' },
      { '@type': 'City', 'name': 'Johannesburg' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Who provides IT support in Sandton?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends provides managed IT support, cybersecurity, cloud and network solutions for businesses in Sandton and the greater Johannesburg north area including Rosebank, Fourways and Randburg.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How quickly can IT Legends respond to IT problems in Sandton?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends provides immediate remote support and can be on-site in Sandton within hours for critical issues. Our Roodepoort office gives us quick access to Sandton and the northern suburbs of Johannesburg.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What IT services does IT Legends offer in Sandton?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends offers managed IT support, cybersecurity, cloud and backup solutions, server maintenance, hardware and network setup, and helpdesk support for businesses in Sandton, Rosebank, Fourways, Randburg and surrounding areas.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How much does IT support cost for a business in Sandton?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'IT Legends offers scalable managed IT support packages for businesses of all sizes in Sandton. Whether you are a startup or an established company, we tailor our packages to your needs and budget. Contact us on +27 84 634 8144 for a free assessment.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Does IT Legends support corporate offices in Sandton?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. IT Legends supports both SMEs and larger corporate offices in Sandton with enterprise-grade managed IT support, cybersecurity, network infrastructure and cloud solutions.',
        },
      },
    ],
  },
];

const services = [
  { icon: Shield, title: 'Managed IT Support', desc: 'Proactive monitoring, maintenance and remote support — your outsourced IT department in Sandton.', color: 'red', href: '/services/managed-it-support', highlight: true },
  { icon: Shield, title: 'Cybersecurity', desc: 'Endpoint protection, firewall management and threat detection to keep your Sandton business safe.', color: 'blue', href: '/services/cybersecurity', highlight: false },
  { icon: Cloud, title: 'Cloud & Backup', desc: 'Microsoft 365, cloud migrations and automated offsite backups for business continuity.', color: 'red', href: '/services/cloud-backup', highlight: false },
  { icon: Server, title: 'Server Maintenance', desc: 'Continuous server monitoring and preventative maintenance to prevent costly downtime.', color: 'blue', href: '/services/server-maintenance', highlight: false },
  { icon: Cpu, title: 'Hardware & Network', desc: 'Supply, installation and configuration of routers, switches, cabling and workstations.', color: 'red', href: '/services/hardware-network', highlight: false },
  { icon: Users, title: 'Helpdesk Support', desc: 'Fast remote helpdesk assistance for day-to-day IT problems across your Sandton team.', color: 'blue', href: '/services/helpdesk', highlight: false },
];

export default function ITSupportSandton() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <SeoHead
        title="IT Support Sandton | Managed IT Services | IT Legends"
        description="IT Legends provides managed IT support, cybersecurity, cloud and network solutions for businesses in Sandton. Enterprise-grade IT for Johannesburg's business hub. Call +27 84 634 8144."
        url="/it-support-sandton/"
        type="website"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${managedHero})` }} />
        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute top-20 right-6 z-10">
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-itgray/80 hover:bg-itred transition-colors text-white text-sm font-medium rounded-lg border border-itgray2">
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-block bg-itred/20 border border-itred/40 text-itred text-sm font-semibold px-4 py-1 rounded-full mb-6">
            Sandton, Johannesburg
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            IT Support in <span className="bg-gradient-to-r from-itred to-itblue text-transparent bg-clip-text">Sandton</span>
          </h1>
          <p className="text-lg sm:text-xl text-itsilver mb-10 leading-relaxed max-w-2xl mx-auto">
            Enterprise-grade managed IT support, cybersecurity and cloud solutions for Sandton businesses. Fast response times. Certified technicians. Fixed monthly costs.
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
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesBg})` }} />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Sandton's Trusted IT Partner</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-itsilver text-lg leading-relaxed mb-6">
            Sandton is the financial capital of Africa — home to banks, law firms, accounting practices, insurance companies and thousands of SMEs that cannot afford IT downtime. IT Legends delivers enterprise-grade managed IT support tailored for the demands of Sandton's fast-paced business environment.
          </p>
          <p className="text-itsilver text-lg leading-relaxed">
            We support businesses across Sandton, Rosebank, Fourways, Randburg, Bryanston and Morningside — acting as your dedicated IT department for a predictable monthly cost.
          </p>
        </div>
      </section>

      <div className="w-full flex justify-center py-0.5 bg-transparent">
        <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"></div>
      </div>

      {/* Services */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${servicesBg})` }} />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">IT Services in Sandton</h2>
            <div className="section-divider mb-6"></div>
            <p className="text-itsilver max-w-2xl mx-auto">Everything your Sandton business needs — from daily helpdesk support to enterprise cybersecurity protection.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className={`card-dark group cursor-pointer block ${
                  service.highlight
                    ? 'border-itred/60 glow-red ring-1 ring-itred/30'
                    : service.color === 'red'
                    ? 'border-itred/30 hover:border-itred/60 glow-red'
                    : 'border-itblue/30 hover:border-itblue/60 glow-blue'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    service.color === 'red' ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'
                  }`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  {service.highlight && (
                    <div className="bg-itred text-white text-xs font-bold px-3 py-1 rounded-full h-fit">
                      ★ Most Popular
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-itsilver text-sm mb-4">{service.desc}</p>
                <span className={`text-sm font-semibold transition-colors ${
                  service.color === 'red' ? 'text-itred group-hover:text-itblue' : 'text-itblue group-hover:text-itred'
                }`}>Learn more</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Sandton IT Support FAQs</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get legendary IT support in Sandton?</h2>
          <p className="text-itsilver mb-8">Free IT health check. No obligation. No jargon. Just honest advice from your local IT team.</p>
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
        <span className="text-itred flex-shrink-0 text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-itdark text-itsilver leading-relaxed text-sm">{a}</div>
      )}
    </div>
  );
}