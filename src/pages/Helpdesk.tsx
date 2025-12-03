import { Code, ChevronRight, AlertCircle, CheckCircle, Headphones, PhoneCall, Monitor, Clock, Users, Zap, TrendingUp, DollarSign, Smile, LogIn, Wrench, CheckSquare } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function HelpdeskPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero title="Helpdesk & Remote Assistance" subtitle="Fast, friendly support for your team — anytime, anywhere." buttonText="Get Support Now" />
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
  buttonText?: string;
}

function ServiceHero({ title, subtitle, buttonText = "Request a Quote" }: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/helpdesk-hero.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bond text-white leading-tight mb-6 text-glow">
          Helpdesk & Remote Support
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Fast, friendly, technical support for your users - wherever they are, on any device.
        </p>

        <a
          href="/#contact"
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
    "Staff waiting hours (or days) for help when something breaks.",
    "No single place for users to log issues or track progress.",
    "Remote staff struggling to get IT support when working from home or on the road.",
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
          <h2 className="section-title">Common Helpdesk Pain Points</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid mb:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
          backgroundImage: "url('/src/assets/helpdesk-solution.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Helpdesk & Remote Support Solution</h2>
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
      description: 'Your staff can get help from anywhere - home, office, or on the road.',
    },
    {
      title: 'Clear Insight into IT Issues',
      description: 'Reporting and ticket trends help you see what is breaking and where improvements are needed.',
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/helpdesk-benefits.webp')"
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
    }
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
          backgroundImage: "url('/src/assets/helpdesk-process.webp')"
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
          
        </div>
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Service Details</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Content coming soon. Our team is preparing comprehensive information about this service.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-itred/10 to-itblue/10 border border-itred/30 rounded-lg p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need reliable helpdesk support?</h2>
          <p className="text-lg text-itsilver mb-8">We're here to assist your team whenever they need it.</p>
          <a
            href="/#contact"
            className="btn-primary inline-flex items-center justify-center"
          >
            Speak to Our Support Team
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
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
