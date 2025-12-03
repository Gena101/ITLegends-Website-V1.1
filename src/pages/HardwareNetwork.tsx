import { Code, ChevronRight, AlertCircle, CheckCircle, Target, Zap, Wrench } from 'lucide-react';
import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function HardwareNetworkPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero title="Hardware & Network Setup" subtitle="Professional installation and configuration of your I.T. infrastructure." />
      <SectionDivider />
      
      <PainPoints />
      <SectionDivider />
      
      <OurSolution />
      <SectionDivider />
      
      <Benefits />
      <SectionDivider />
      
      <Process />
      <SectionDivider />
      
      <ContentSection />
      <SectionDivider />
      
      <CTA />
      <Footer />
    </div>
  );
}

function ServiceNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
return (
    <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
          <a href="#" className="flex items-center space-x-2">
            <img src="/src/assets/header-img.webp" alt="IT Legends Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-white">IT Legends</span>
          </a>
        </div>

          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-itsilver hover:text-itred transition-colors font-medium">
              Back to Home
            </a>
          </div>

          <button
            className="md:hidden text-itsilver"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-itgray border-t border-itgray2">
          <div className="px-4 py-4">
            <a
              href="/"
              className="block text-itsilver hover:text-itred transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Back to Home
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function SectionDivider() { 
  return ( 
    <div className="w-full flex justify-center py-0.5 bg-transparent"> 
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"/>
    </div> 
  );
}

interface ServiceHeroProps {
  title: string;
  subtitle: string;
}

function ServiceHero({ title, subtitle }: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-hero.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          {subtitle}
        </p>

        <a
          href="/#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          Request a Quote
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function PainPoints() {
  const painPoints = [
    'New offices taking too long to get fully connected.',
    'Unstable Wi-Fi and slow network speeds.',
    'Hardware that is outdated, mismatched, or not properly configured.'
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-painpoints.webp')"
        }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Common Pain Points</h2>
            <div className="section-divider mb-8"></div>
          </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="card-dark glow-red border-itred/30 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-itred/20 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-itred" />
              </div>
              <p className="text-itsilver text-base leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurSolution() {
  const solutions = [
    'Full planning and installation of servers, switches, routers, and Wi-Fi.',
    'Best-practice network design for speed, stability, and security.',
    'Hardware recommendations that match your budget and growth plans.'
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-solution.webp')"
        }}
        ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Solution</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="card-dark glow-blue border-itblue/30 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-itblue/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-itblue" />
              </div>
              <p className="text-itsilver text-base leading-relaxed">{solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      title: 'Faster Networks',
      description: 'Optimised networks for speed and performance.'
    },
    {
      title: 'Stable Connections',
      description: 'Reduced dropouts and connectivity issues.'
    },
    {
      title: 'Future-Ready Setup',
      description: 'Scalable infrastructure that grows with your business.'
    },
    {
      title: 'Expert Configuration',
      description: 'Installed and configured by experienced technicians.'
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-benefits.webp')"
        }}
        ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Key Benefits</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark ${isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'} flex flex-col items-center text-center`}
              >
                <div className={`w-12 h-12 ${isRed ? 'bg-itred/20' : 'bg-itblue/20'} rounded-full flex items-center justify-center mb-4`}>
                  <CheckCircle className={`h-6 w-6 ${isRed ? 'text-itred' : 'text-itblue'}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-itsilver text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      title: 'Plan',
      description: 'We assess your space, users, and requirements.',
      icon: Target,
      number: '01'
    },
    {
      title: 'Deploy',
      description: 'We install and configure all hardware and network equipment.',
      icon: Zap,
      number: '02'
    },
    {
      title: 'Optimise',
      description: 'We test, fine-tune, and document your setup for future changes.',
      icon: Wrench,
      number: '03'
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-process.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Process</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="card-dark glow-blue border-itblue/30">
                  <div className="text-5xl font-bold text-itblue/20 mb-4">{step.number}</div>
                  <div className="w-12 h-12 bg-itblue/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-itblue" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-itsilver text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-itblue to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContentSection() {
  const detailGroups = [
    {
      title: 'Network Infrastructure',
      items: [
        'LAN and Wi-Fi design for offices and warehouses',
        'Business-grade switches, routers, and firewalls',
        'VLANs, segmentation, and traffic shaping',
      ],
    },
    {
      title: 'Hardware Supply & Setup',
      items: [
        'Desktops, laptops, and workstations for staff',
        'On-premises servers and NAS devices',
        'Monitors, peripherals, and essential accessories',
      ],
    },
    {
      title: 'Ongoing Support & Documentation',
      items: [
        'Network topology diagrams and asset inventory',
        'Standards for future upgrades and expansions',
        'Collaboration with your internal or external IT teams',
      ],
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hardware-details.webp')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Service Details</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-3xl mx-auto">
            Our Hardware & Network Setup service covers everything from planning and procurement to clean installations and long-term support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {detailGroups.map((group, index) => (
            <div
              key={index}
              className="card-dark glow-blue border-itblue/30 h-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3 text-itsilver text-sm leading-relaxed">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-itblue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ name: '', email: '', company: '', message: ''});
  };

  return (
    <section id="contact"
    className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/contact-bg.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Need a reliable hardware and network setup?
        </h2>
        <div className="section-divider mb-8"></div>

        <p className="text-lg text-itsilver">
          We'll design and install infrastructure that just works.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white mb-3"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-3"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-white mb-3"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-white mb-3"
          >
            Tell us about your current setup
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition resize-none text-white placeholder-itsilver/50"
            placeholder="Describe your current hardware, network, and any issue you're experiencing..."
          ></textarea>
        </div>

        <button type="submit" className="btn-primary w-full text-lg">
          Request a Hardware & Network Audit
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </form>
    </div>
  </section>
  );
}

function ServiceFooter() {
  return (
    <footer className="bg-itdark border-t border-itgray2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-itred" />
              <span className="text-xl font-bold text-white">IT Legends</span>
            </a>
            <p className="text-itsilver">
              Reliable managed IT support, cybersecurity, cloud and network solutions for South African businesses.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-itsilver text-sm">
              <li><a href="/services/managed-it-support" className="hover:text-itred transition-colors">Managed IT Support</a></li>
              <li><a href="/services/cloud-backup" className="hover:text-itred transition-colors">Cloud & Backup Solutions</a></li>
              <li><a href="/" className="hover:text-itred transition-colors">Other Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-itsilver text-sm">
              <li>contact@itlegends.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-itgray2 pt-8 text-center text-itsilver/60">
          <p>&copy; 2024 IT Legends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
