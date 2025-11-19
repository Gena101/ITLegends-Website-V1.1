import { Code, ChevronRight, Shield, Network, CheckCircle, AlertCircle, Zap, Lock, Eye } from 'lucide-react';
import { useState } from 'react';

export default function CybersecurityPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero title="Cybersecurity & Protection" subtitle="Shield your business from cyber threats, data breaches, and ransomware." buttonText="Request a Security Assessment" />
      <SectionDivider />
      
      <ContentSection />
      <SectionDivider />
      
      <FinalCTA />
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

function SectionDivider() { 
  return ( 
    <div className="w-full flex justify-center py-8"> 
      <div className="w-[90%] h-px bg-gradient-to-r from-itred to-itblue">
        </div>
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
                  Increased cyberattacks targeting SMEs in South Africa.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itred text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Weak passwords and outdated software creating vulnerabilities.
                </p>
              </div>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itred text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  No real visibility into threats until it's too late.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Solution</h2>
            <div className="section-divider mb-8"></div>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="bg-itdark border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Advanced endpoint protection against malware and ransomware.
                </p>
              </div>
            </div>
            <div className="bg-itdark border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Firewalls, intrusion detection, and secure network configuration.
                </p>
              </div>
            </div>
            <div className="bg-itdark border border-itgray2 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-itblue text-2xl font-bold flex-shrink-0">•</div>
                <p className="text-itsilver text-lg leading-relaxed">
                  Ongoing monitoring, patching, and cybersecurity best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Benefits</h2>
            <div className="section-divider mb-8"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-8 hover:border-itblue transition-colors">
              <Shield className="h-12 w-12 text-itblue mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Strong Protection</h3>
              <p className="text-itsilver">
                Defend your business from modern cyber threats.
              </p>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-8 hover:border-itblue transition-colors">
              <Network className="h-12 w-12 text-itblue mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Secure Network</h3>
              <p className="text-itsilver">
                Professional configuration reduces risk exposure.
              </p>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-8 hover:border-itblue transition-colors">
              <CheckCircle className="h-12 w-12 text-itblue mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Compliance Ready</h3>
              <p className="text-itsilver">
                Meet security requirements and safeguard client data.
              </p>
            </div>
            <div className="bg-itgray/30 border border-itgray2 rounded-lg p-8 hover:border-itblue transition-colors">
              <AlertCircle className="h-12 w-12 text-itblue mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Monitoring</h3>
              <p className="text-itsilver">
                Instant alerts and proactive threat prevention.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itgray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Process</h2>
            <div className="section-divider mb-8"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-itdark border border-itgray2 rounded-lg p-8 h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-itblue/20 mb-6">
                  <Zap className="h-7 w-7 text-itblue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Evaluate</h3>
                <p className="text-itsilver">
                  We review your cybersecurity risks and vulnerabilities.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="w-8 h-0.5 bg-itgray2"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-itblue rounded-full"></div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-itdark border border-itgray2 rounded-lg p-8 h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-itblue/20 mb-6">
                  <Lock className="h-7 w-7 text-itblue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Secure</h3>
                <p className="text-itsilver">
                  We deploy protection tools and harden your systems.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="w-8 h-0.5 bg-itgray2"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-itblue rounded-full"></div>
              </div>
            </div>
            <div className="bg-itdark border border-itgray2 rounded-lg p-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-itblue/20 mb-6">
                <Eye className="h-7 w-7 text-itblue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Monitor</h3>
              <p className="text-itsilver">
                We monitor continuously and respond proactively.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      ></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight text-glow">
          Ready to protect your business from cyber threats?
        </h2>

        <p className="text-lg text-itsilver mb-8">
          Let IT Legends secure your systems and data.
        </p>

        <a
          href="/#contact"
          className="btn-primary inline-flex items-center justify-center"
        >
          Get Protected Today
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
