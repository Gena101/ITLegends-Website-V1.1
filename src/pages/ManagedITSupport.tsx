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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3184654/pexels-photo-3184654.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Managed IT Support
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Proactive, reliable I.T. support to keep your business running without interruptions.
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
    'Downtime costs money and disrupts operations',
    'Slow response times leave problems unresolved',
    'Recurring issues waste time and resources'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Common Pain Points</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {painPoints.map((point, index) => (
              <li
                key={index}
                className="card-dark glow-red border-itred/30 flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-itred/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-itred" />
                </div>
                <p className="text-itsilver text-base">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function OurSolution() {
  const solutions = [
    'Proactive monitoring catches issues before they escalate',
    'Remote & onsite support available when you need it',
    'Flat-fee pricing keeps your IT budget predictable'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Solution</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {solutions.map((solution, index) => (
              <li
                key={index}
                className="card-dark glow-blue border-itblue/30 flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-itblue/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-itblue" />
                </div>
                <p className="text-itsilver text-base">{solution}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      title: 'Fast Response',
      description: 'We resolve issues quickly to minimize downtime.'
    },
    {
      title: 'Predictable Costs',
      description: 'Fixed monthly pricing with no surprise bills.'
    },
    {
      title: 'Better Uptime',
      description: 'Proactive monitoring keeps systems running smoothly.'
    },
    {
      title: 'Happier Staff',
      description: 'Less IT frustration means more productivity.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Key Benefits</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
      title: 'Assess',
      description: 'We review your current IT setup and identify gaps.'
    },
    {
      number: 2,
      title: 'Implement',
      description: 'We deploy monitoring tools and support systems.'
    },
    {
      number: 3,
      title: 'Maintain',
      description: 'We provide ongoing support and proactive maintenance.'
    }
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itgray to-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Process</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
