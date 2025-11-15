import { Code, ChevronRight, AlertCircle, Clock, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ManagedITSupportPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <ServiceNavigation />
      <ServiceHero />
      <PainPoints />
      <OurSolution />
      <Benefits />
      <Process />
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

function ServiceHero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-itdark via-itgray to-itdark"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-itred/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-itblue/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Managed IT Support
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Proactive support and monitoring to keep your business running.
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
    {
      icon: AlertCircle,
      title: 'System Downtime',
      description: 'Unexpected IT issues causing costly business interruptions and lost productivity.'
    },
    {
      icon: Clock,
      title: 'Reactive Support',
      description: 'Waiting for problems to occur instead of preventing them before they impact your operations.'
    },
    {
      icon: TrendingUp,
      title: 'Rising IT Costs',
      description: 'Emergency fixes and unplanned maintenance drain your budget without strategic planning.'
    },
    {
      icon: Users,
      title: 'Limited IT Resources',
      description: 'Small IT teams stretched thin managing multiple systems and cannot keep up with demands.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Common Pain Points</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Many businesses struggle with IT management challenges that impact their bottom line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark ${isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'} flex gap-6`}
              >
                <div className={`w-16 h-16 ${isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-itsilver text-sm">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OurSolution() {
  const solutions = [
    {
      number: '01',
      title: 'Proactive Monitoring',
      description: 'Continuous 24/7 monitoring of your infrastructure to detect and resolve issues before they impact your business.'
    },
    {
      number: '02',
      title: 'Expert Support Team',
      description: 'Certified technicians available around the clock to provide immediate assistance and technical expertise.'
    },
    {
      number: '03',
      title: 'Preventative Maintenance',
      description: 'Regular system updates, patches, and maintenance to keep your infrastructure secure and optimized.'
    },
    {
      number: '04',
      title: 'Performance Optimization',
      description: 'Continuous tuning and optimization to ensure your systems run at peak efficiency and reliability.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Solution</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Comprehensive managed IT support that puts your mind at ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="card-dark glow-blue border-itblue/30 relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-itred to-itblue rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {solution.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 mt-4">{solution.title}</h3>
              <p className="text-itsilver leading-relaxed">{solution.description}</p>
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
      title: 'Reduced Downtime',
      description: 'Minimize business interruptions with proactive monitoring and rapid response times.'
    },
    {
      title: 'Cost Savings',
      description: 'Predictable monthly costs instead of expensive emergency repairs and unplanned maintenance.'
    },
    {
      title: 'Enhanced Security',
      description: 'Continuous security monitoring, threat detection, and compliance management.'
    },
    {
      title: 'Scalability',
      description: 'Your support grows with your business, adapting to changing needs and demands.'
    },
    {
      title: 'Peace of Mind',
      description: 'Focus on your core business while we handle your IT infrastructure 24/7.'
    },
    {
      title: 'Expert Guidance',
      description: 'Strategic IT recommendations and planning to align technology with your business goals.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Key Benefits</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark ${isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 ${isRed ? 'bg-itred/20' : 'bg-itblue/20'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                    <CheckCircle className={`h-5 w-5 ${isRed ? 'text-itred' : 'text-itblue'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-itsilver text-sm">{benefit.description}</p>
                  </div>
                </div>
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
      title: 'Assessment',
      description: 'We analyze your current IT infrastructure, identifying strengths, weaknesses, and improvement opportunities.'
    },
    {
      number: 2,
      title: 'Planning',
      description: 'We develop a customized managed support plan tailored to your specific business needs and goals.'
    },
    {
      number: 3,
      title: 'Implementation',
      description: 'Our team deploys monitoring tools, establishes support protocols, and integrates with your systems.'
    },
    {
      number: 4,
      title: 'Monitoring',
      description: 'Continuous 24/7 monitoring begins, with proactive alerts and preventative maintenance.'
    },
    {
      number: 5,
      title: 'Optimization',
      description: 'Regular performance reviews and adjustments ensure your systems remain optimized for peak efficiency.'
    },
    {
      number: 6,
      title: 'Support',
      description: 'Dedicated support team available round-the-clock for any issues or technical assistance needed.'
    }
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itgray to-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Process</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            A structured approach to ensuring your IT success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card-dark glow-red border-itred/30 relative"
            >
              <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-itred to-itblue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 mt-2">{step.title}</h3>
              <p className="text-itsilver leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Optimize Your IT Operations?</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver">
            Let our team assess your needs and create a customized managed support plan for your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="btn-primary w-full text-lg"
          >
            Request a Consultation
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
