import { Code, ChevronRight, Shield, CheckCircle, Globe, RefreshCw, Search, Cog, Lock } from 'lucide-react';
import { useState } from 'react';

export default function CloudBackupPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero
        title="Cloud & Backup Solutions"
        subtitle="Secure cloud storage and automated backups to protect your business data."
        buttonText="Request a Cloud Consultation"
      />
      <ContentSection />
      <Benefits />
      <Process />
      <CTA />
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

function ContentSection() {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Pain Points</h2>
            <div className="section-divider mb-8"></div>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itred text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Lost files due to hardware failure or accidental deletion.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itred text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Unreliable local backups that fail when you need them most.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itred text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Difficulty accessing data remotely or securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Solution</h2>
            <div className="section-divider mb-8"></div>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">✓</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Secure cloud-based storage with encrypted access.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">✓</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Automated scheduled backups with full restore options.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">✓</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Remote access to important files from anywhere, on any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Encrypted cloud storage protects sensitive information.'
    },
    {
      icon: CheckCircle,
      title: 'Peace of Mind',
      description: 'Automatic backups ensure your files are always safe.'
    },
    {
      icon: Globe,
      title: 'Remote Access',
      description: 'Access data easily from anywhere, anytime.'
    },
    {
      icon: RefreshCw,
      title: 'Disaster Recovery',
      description: 'Fast restore options in case of data loss.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
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

function Process() {
  const steps = [
    {
      icon: Search,
      title: 'Analyse',
      description: 'We assess your current storage and backup needs.'
    },
    {
      icon: Cog,
      title: 'Configure',
      description: 'We set up secure cloud systems and automated backups.'
    },
    {
      icon: Lock,
      title: 'Protect',
      description: 'We monitor, maintain, and ensure your data stays recoverable.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray/20">
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
                <div className="card-dark glow-blue border-itblue/30 flex flex-col items-center text-center h-full">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-itblue text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="mt-6 mb-4">
                    <div className="w-16 h-16 bg-itblue/20 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-itblue" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-itsilver leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-itblue to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-itred/10 to-itblue/10 border-y border-itgray2">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Protect your data with reliable cloud solutions.
        </h2>
        <p className="text-lg text-itsilver mb-8">
          Let's secure your files and keep your business resilient.
        </p>
        <a
          href="/#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          Secure My Data
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
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
