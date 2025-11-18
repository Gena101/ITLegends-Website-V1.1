import { Code, ChevronRight, AlertCircle, CheckCircle, Zap, TrendingUp, DollarSign, Smile, LogIn, Wrench, CheckSquare } from 'lucide-react';
import { useState } from 'react';

export default function HelpdeskPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero title="Helpdesk & Remote Assistance" subtitle="Fast, friendly support for your team — anytime, anywhere." buttonText="Get Support Now" />
      <PainPointsSection />
      <SolutionSection />
      <BenefitsSection />
      <ProcessSection />
      <ContentSection />
      <ServiceFooter />
    </div>
  );
}

function ServiceNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-itred" />
            <span className="text-xl font-bold text-white">IT Legends</span>
          </a>

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
    </nav>
  );
}

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
}

function ServiceHero({ title, subtitle, buttonText = "Request a Quote" }: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-itdark via-itgray to-itdark"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-itred/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-itblue/5 rounded-full blur-3xl"></div>

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
          {buttonText}
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function PainPointsSection() {
  const painPoints = [
    "Staff wasting time trying to fix issues themselves.",
    "Slow or inconsistent support responses.",
    "Repeated problems due to lack of proper troubleshooting."
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Common Pain Points</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-itdark/50 border border-itgray2 rounded-lg p-8 hover:border-itred/50 transition-colors">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-itred mt-1 mr-4 flex-shrink-0" />
                <p className="text-itsilver leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const solutions = [
    "Instant remote troubleshooting for everyday I.T. issues.",
    "Skilled helpdesk technicians who resolve problems quickly.",
    "One central point of contact for all your staff."
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Solution</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-itgray/30 border border-itblue/30 rounded-lg p-8 hover:border-itblue/60 transition-colors">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-itblue mt-1 mr-4 flex-shrink-0" />
                <p className="text-itsilver leading-relaxed">{solution}</p>
              </div>
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
      title: 'Fast Support',
      description: 'Your team gets quick solutions to daily issues.',
      icon: Zap
    },
    {
      title: 'Higher Productivity',
      description: 'Less downtime means more work done.',
      icon: TrendingUp
    },
    {
      title: 'Cost-Effective',
      description: 'Remote support reduces onsite call-outs.',
      icon: DollarSign
    },
    {
      title: 'Staff Happiness',
      description: 'Employees feel supported and empowered.',
      icon: Smile
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Benefits</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark ${isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'} flex flex-col items-center text-center`}
              >
                <div className={`w-12 h-12 ${isRed ? 'bg-itred/20' : 'bg-itblue/20'} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${isRed ? 'text-itred' : 'text-itblue'}`} />
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

function ProcessSection() {
  const steps = [
    {
      number: '1',
      title: 'Log',
      description: 'Your team logs an issue via email, call, or our helpdesk.',
      icon: LogIn
    },
    {
      number: '2',
      title: 'Resolve',
      description: 'We remotely troubleshoot and fix the issue.',
      icon: Wrench
    },
    {
      number: '3',
      title: 'Follow Up',
      description: 'We confirm resolution and prevent repeat problems.',
      icon: CheckSquare
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Process</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-itred to-itred/60 rounded-full flex items-center justify-center border-2 border-itred/30">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-itdark border-2 border-itred rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-itred">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h3>
                  <p className="text-itsilver text-sm text-center leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-itred/50 to-transparent transform -translate-y-1/2 z-0"
                    style={{ left: '50%', top: '2rem', width: 'calc(100% + 2rem)', transform: 'translateX(calc(50% + 1rem))' }}>
                  </div>
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
              Managed IT support for businesses of all sizes.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-itsilver text-sm">
              <li><a href="/services/managed-it-support" className="hover:text-itred transition-colors">Managed IT Support</a></li>
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
