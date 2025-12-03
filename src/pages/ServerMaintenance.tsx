import { Code, ChevronRight, AlertCircle, CheckCircle, Server, Activity, Clock, Zap, TrendingUp, Shield, Database, Search, Wrench, Eye } from 'lucide-react';
import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function ServerMaintenancePage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero title="Server Maintenance & Monitoring" subtitle="Keep your servers secure, updated, and performing at their best." buttonText="Request a Server Health Check" />
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
      
      <CallToAction />
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
          backgroundImage: "url('/src/assets/server-maintenance-hero.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Server Maintenance & Monitoring
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Proactive server health, patching, and monitoring to keep your core systems secure, stable, and always available.
        </p>

        <a
          href="/#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          Stabilise My Servers
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );    
}

function PainPoints() {
  const painPoints = [
    'Server going down unexpectedly during business hours.',
    'Patches and security updates applied late - or not al all.',
    'No central visibility into CPU, RAM, disk, and service health.',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/server-maintenance-painpoints.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Common Pain Points</h2>
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
  )
}

function OurSolution() {
  const solutions = [
    '24/7 monitoring of critical metrics like uptime, performance, and disk capacity.',
    'Structured patch management schedules to keep servers secure and compliant.',
    'Proactive issue resolution before users feel the impact.',
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/server-maintenance-solution.webp')"
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
                {index === 0 && <Activity className="h-6 w-6 text-itblue" />}
                {index === 1 && <Shield className="h-6 w-6 text-itblue" />}
                {index === 2 && <Clock className="h6 w-6 text-itblue" />}
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
      title: 'Higher Uptime',
      description: 'Proactive monitoring and intervention keep your servers online when your staff and customers need them most.',
    },
    {
      title: 'Improved Security',
      description: 'Timely patching and configuration hardening reduce vulnerabilities and attack surfaces.',
    },
    {
      title: 'Performance Visibility',
      description: 'Clear insight into bottlenecks helps you plan upgrades before performance becomes a problem.',
    },
    {
      title: 'Predictable Support',
      description: 'Maintenance windows and communication plans ensure your team always knows what is happening.',
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/server-maintenance-benefits.webp')"
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
      title: 'Baseline & Audit',
      description: 'We document your existing servers, roles, workloads, and current risks.',
    },
    {
      number: 2,
      title: 'Stabilise & Secure',
      description: 'We apply patches, fix urgent issues, and harden configurations.',
    },
    {
      number: 3,
      title: 'Monitor & Optimise',
      description: 'We continuously monitor, report, and fine-tune performance and capacity.',
    }
  ];

  return (
    <section
      id="process"
      className="relative py-20 px-4 sm:px-6 lg_px-8 overflow-hidden"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/server-maintenance-process.webp')"
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
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-itred to-itblue rounded-lg flex items-center justify-center text-white font-bold text-xl1">
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
      title: 'Server Types We Support',
      items: [
        'Windows Server (AD, file, print, application roles)',
        'Linux servers for applications, web, and databases',
        'On-premises, virtualised, and hybrid environments',
      ],
    },
    {
      title: 'Maintenance & Monitoring',
      items: [
        'Patch management planning and deployment',
        'Performance monitoring (CPU, RAM, I/O, services)',
        'Log review and alerting on critical events',
      ],
    },
    {
      title: 'Stability & Recovery',
      items: [
        'Capacity planning and hardware lifecycle guidance',
        'Backup and restore coordination with your backup solution',
        'Disaster recovery planning input for server workloads',
      ],
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/server-maintenance-details.webp')"
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Service Details</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg test-itsilver max-w-3xl mx-auto">
            Our Server Maintenance & Monitoring service is designed to give you the stability and insight you need around your most critical systems.
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

function CallToAction() {
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
    setFormState({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
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
            Ready to Stabilise your Servers?
          </h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver">
            Tell us about your current server environment and challenges. We`ll help you design a maintenance and monitoring plan that keeps everything running smoothly.
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
              Tell us about your servers
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition resize-none text-white placeholder-itsilver/50"
              placeholder="How many servers do you have, what do they run, and what issues are you currently seeing?"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary w-full text-lg">
            Request a Server Health Check
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
