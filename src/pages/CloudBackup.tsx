import React, { useState } from 'react';
import { ChevronRight, AlertCircle, CheckCircle, Cloud, Shield, Server } from 'lucide-react';
import Footer from '../components/Footer';
import { useEffect } from 'react';

// ✅ Image imports so Netlify/Vite bundle them correctly
import headerImg from '../assets/header-img.webp';
import cloudHeroBg from '../assets/cloud-hero.webp';
import cloudSolutionBg from '../assets/cloud-solution.webp';
import cloudBenefitsBg from '../assets/cloud-benefits.webp';
import cloudProcessBg from '../assets/cloud-process.webp';
import contactBg from '../assets/contact-bg.webp';

export default function CloudBackupPage() {

  useEffect (() => {
    window.scrollTo (0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero
        title="Cloud & Backup Solutions"
        subtitle="Secure cloud storage and automated backups to protect your business data."
        buttonText="Request a Cloud Consultation"
      />
      <SectionDivider />
      
      <PainPoints />
      <SectionDivider />

      <OurSolution />
      <SectionDivider />
      
      <Benefits />
      <SectionDivider />
      
      <Process />
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
            <a href="/" className="flex items-center space-x-2">
              <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">
                IT Legends | Cloud &amp; Backup Solutions
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

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
}

function ServiceHero({ title, subtitle, buttonText = 'Request a Quote' }: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cloudHeroBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          {subtitle}
        </p>

        <a
          href="#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          {buttonText}
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function PainPoints() {
  const painPoints = [
    'No reliable offsite backups if your office is hit by theft, fire, or hardware failure.',
    'Backups are manual, inconsistent, or never tested for recovery.',
    'No clear Recovery Time Objective (RTO) or Recovery Point Objective (RPO).',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image (re-use hero) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cloudHeroBg})`,
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
    'Automated cloud backups for servers, workstations, and critical business data.',
    'Geo-redundant storage options to protect against local disasters.',
    'Monitored backup jobs with alerts for failures and guided recovery testing.',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cloudSolutionBg})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Solutions</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="card-dark glow-blue border-itblue/30 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-itblue/20 rounded-full flex items-center justify-center mb-4">
                {index === 0 && <Cloud className="h-6 w-6 text-itblue" />}
                {index === 1 && <Shield className="h-6 w-6 text-itblue" />}
                {index === 2 && <Server className="h-6 w-6 text-itblue" />}
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
      title: 'Business Continuity',
      description: 'Your business can recover quickly from ransomware, hardware failures, or accidental deletions.',
    },
    {
      title: 'Compliance & Peace of Mind',
      description: 'Retention policies and secure storage help you meet compliance and audit requirements.',
    },
    {
      title: 'Predictable Costs',
      description: 'Clear monthly pricing models based on data usage and protection requirements.',
    },
    {
      title: 'Monitored by Experts',
      description: 'The IT Legends team monitors backup jobs and helps you validate that restores actually work.',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cloudBenefitsBg})`,
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

function Process() {
  const steps = [
    {
      number: 1,
      title: 'Discover',
      description: 'We analyze your current data locations, volumes, and critical systems.',
    },
    {
      number: 2,
      title: 'Design & Implement',
      description: 'We design a cloud and backup strategy and deploy the required tools and policies.',
    },
    {
      number: 3,
      title: 'Monitor & Test',
      description: 'We monitor backups, run test restores, and adjust as your environment grows.',
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
          backgroundImage: `url(${cloudProcessBg})`,
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

function CTA() {
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
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          service: 'Cloud & Backup Query',
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
            Ready to Secure Your Data in the Cloud?
          </h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver">
            Let us help you design a robust cloud and backup strategy that keeps your data safe and recoverable.
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
