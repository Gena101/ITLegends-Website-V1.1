import React, { useState } from 'react';
import { ChevronRight, AlertCircle, CheckCircle, Headphones, Monitor, Clock } from 'lucide-react';
import Footer from '../components/Footer';

// ✅ Image imports for bundling / Netlify
import headerImg from '../assets/header-img.webp';
import helpdeskHeroBg from '../assets/helpdesk-hero.webp';
import hardwarePainpointsBg from '../assets/hardware-painpoints.webp';
import helpdeskSolutionBg from '../assets/helpdesk-solution.webp';
import helpdeskBenefitsBg from '../assets/helpdesk-benefits.webp';
import helpdeskProcessBg from '../assets/helpdesk-process.webp';
import helpdeskDetailsBg from '../assets/helpdesk-details.webp';
import contactBg from '../assets/contact-bg.webp';

export default function HelpdeskPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero />
      <SectionDivider />
      
      <PainPointsSection />
      <SectionDivider />
      
      <SolutionSection />
      <SectionDivider />
      
      <BenefitsSection />
      <SectionDivider />
      
      <ProcessSection />
      <SectionDivider />
      
      <ContentSection />
      <SectionDivider />
      
      <CTASection />
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
            <a href="/" className="flex items-center space-x-2">
              <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">
                IT Legends | Helpdesk &amp; Remote Assistance
              </span>
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
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue" />
    </div> 
  );
}

function ServiceHero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${helpdeskHeroBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Helpdesk &amp; Remote Support
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Fast, friendly, technical support for your users – wherever they are, on any device.
        </p>

        <a
          href="#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          Get IT Support
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function PainPointsSection() {
  const painPoints = [
    'Staff waiting hours (or days) for help when something breaks.',
    'No single place for users to log issues or track progress.',
    'Remote staff struggling to get IT support when working from home or on the road.',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hardwarePainpointsBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Common Helpdesk Pain Points</h2>
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

function SolutionSection() {
  const solutions = [
    'Centralised helpdesk for logging, tracking, and resolving all IT issues.',
    'Remote support tools to assist users quickly without needing to be onsite.',
    'Clear SLAs, escalation paths, and communication so users always know what is happening.',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${helpdeskSolutionBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Helpdesk &amp; Remote Support Solution</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="card-dark glow-blue border-itblue/30 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-itblue/20 rounded-full flex items-center justify-center mb-4">
                {index === 0 && <Headphones className="h-6 w-6 text-itblue" />}
                {index === 1 && <Monitor className="h-6 w-6 text-itblue" />}
                {index === 2 && <Clock className="h-6 w-6 text-itblue" />}
              </div>
              <p className="text-itsilver text-base leading-relaxed">{solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: 'Happier, More Productive Staff',
      description: 'Issues get resolved faster so your team can stay focused on their work.',
    },
    {
      title: 'Consistent Support Experience',
      description: 'Standardised processes ensure every user gets the same high level of support.',
    },
    {
      title: 'Support for Remote & Hybrid Teams',
      description: 'Your staff can get help from anywhere – home, office, or on the road.',
    },
    {
      title: 'Clear Insight into IT Issues',
      description: 'Reporting and ticket trends help you see what is breaking and where improvements are needed.',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${helpdeskBenefitsBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

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
                className={`card-dark ${
                  isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'
                } flex flex-col items-center text-center`}
              >
                <div
                  className={`w-12 h-12 ${
                    isRed ? 'bg-itred/20' : 'bg-itblue/20'
                  } rounded-full flex items-center justify-center mb-4`}
                >
                  <CheckCircle
                    className={`h-6 w-6 ${
                      isRed ? 'text-itred' : 'text-itblue'
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-itsilver text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: '1',
      title: 'Onboard & Document',
      description: 'We document your environment, users, and common applications to support.',
    },
    {
      number: '2',
      title: 'Launch Helpdesk Channels',
      description: 'We enable support via email, phone, and remote tools with clear instructions for staff.',
    },
    {
      number: '3',
      title: 'Monitor, Report & Improve',
      description: 'We track response and resolution times, identify patterns, and continuously improve.',
    },
  ];

  return (
    <section
      id="process"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${helpdeskProcessBg})`,
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

        <div className="max-w-5xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-itred to-transparent transform translate-y-0"></div>
                )}
                <div className="card-dark glow-red border-itred/30 relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-itred to-itblue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 mt-2">
                    {step.title}
                  </h3>
                  <p className="text-itsilver leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-1 h-6 bg-gradient-to-b from-itred to-transparent"></div>
                )}
                <div className="card-dark glow-red border-itred/30 relative pl-16">
                  <div className="absolute -left-6 -top-6 w-12 h-12 bg-gradient-to-br from-itred to-itblue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-itsilver leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSection() {
  const detailGroups = [
    {
      title: 'How Your Team Gets Support',
      items: [
        'Dedicated email address for logging tickets.',
        'Optional phone line / WhatsApp for urgent issues.',
        'Remote support sessions to resolve problems quickly.',
      ],
    },
    {
      title: 'What We Support',
      items: [
        'Laptops, desktops, and basic peripherals.',
        'Common business applications, email, and collaboration tools.',
        'Basic network and connectivity troubleshooting for end-users.',
      ],
    },
    {
      title: 'Service Levels & Coverage',
      items: [
        'Business hours support, with after-hours options available.',
        'Target response and resolution times based on ticket priority.',
        'Escalation paths for complex or recurring issues.',
      ],
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${helpdeskDetailsBg})`,
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
            Our Helpdesk &amp; Remote Support service is designed to become your team's go-to place whenever &quot;something doesn't work&quot;.
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

function CTASection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formState.honeypot) {
      console.warn('Spam submission blocked (honeypot triggered).');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);
    setReference(null);

    try {
      const res = await fetch('https://hook.us2.make.com/pt14ynlwgyio4c48iwruduu9curorf4a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          service: 'Helpdesk Query',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      const data = await res.json();
      setReference(data.reference || null);
      setStatus('success');
      setFormState({ name: '', email: '', company: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };
  
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${contactBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Need reliable Helpdesk &amp; Remote Support?
          </h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver">
            Tell us about your users and support needs, and we'll tailor a helpdesk and remote assistance plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input 
              type="text"
              id="website"
              name="honeypot"
              value={formState.honeypot}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
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
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
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
            <label htmlFor="company" className="block text-sm font-semibold text-white mb-3">
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
              Tell us about your IT needs
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition resize-none text-white placeholder-itsilver/50"
              placeholder="Tell us about your current IT challenges and goals..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full text-lg flex items-center justify-center gap-2"
          >
            {status === 'loading' ? 'Sending...' : 'Request a Consultation'}
            <ChevronRight className="h-5 w-5" />
          </button>

          {status === 'success' && reference && (
            <p className="text-sm text-green-400 mt-3 text-center">
              Thank you! Your reference number is{' '}
              <span className="font-semibold">{reference}</span>.
            </p>
          )}

          {status === 'error' && errorMessage && (
            <p className="text-sm text-red-400 mt-3 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>  
  );
}
