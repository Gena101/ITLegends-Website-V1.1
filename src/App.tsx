import { Menu, X, Code, Cloud, Shield, Zap, Users, TrendingUp, Mail, Phone, MapPin, ChevronRight, Cpu } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <WhoWeAre />
      <OurServices />
      <WhyPartner />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

function Navigation({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  const navItems = ['Who We Are', 'Services', 'Why Us', 'Blog', 'Contact'];

  return (
    <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-itred" />
            <span className="text-xl font-bold text-white">IT Legends</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-itsilver hover:text-itred transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-itsilver"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-itgray border-t border-itgray2">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-itsilver hover:text-itred transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
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
        <div className="flex items-center justify-center mb-6">
          <Code className="h-12 w-12 text-itred" />
          <span className="text-2xl font-bold text-white ml-3">IT Legends</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Providing You with LEGENDARY I.T. Services.
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          Empowering South African businesses with reliable I.T. solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center justify-center"
          >
            Get Support
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="#services"
            className="btn-secondary inline-flex items-center justify-center"
          >
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Who We Are</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver leading-relaxed max-w-3xl mx-auto">
            IT Legends is dedicated to empowering South African businesses through innovative, reliable I.T. solutions. We combine cutting-edge technology with deep industry expertise to deliver transformative results. Our mission is to be your trusted partner in navigating the digital landscape, providing strategic guidance and robust solutions that drive growth, efficiency, and competitive advantage for organizations of all sizes.
          </p>
        </div>
      </div>
    </section>
  );
}

function OurServices() {
  const services = [
    {
      icon: Shield,
      title: 'Managed IT Support',
      description: 'Proactive monitoring and support to keep your systems running smoothly 24/7.'
    },
    {
      icon: Cpu,
      title: 'Hardware & Network Setup',
      description: 'Professional installation and configuration of enterprise-grade infrastructure.'
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Protection',
      description: 'Advanced threat detection and security measures to protect your business data.'
    },
    {
      icon: Cloud,
      title: 'Cloud & Backup Solutions',
      description: 'Secure cloud infrastructure and automated backup systems for business continuity.'
    },
    {
      icon: Zap,
      title: 'Server Maintenance & Monitoring',
      description: 'Continuous server health monitoring and preventative maintenance services.'
    },
    {
      icon: Users,
      title: 'Helpdesk & Remote Assistance',
      description: 'Expert technical support through remote assistance and dedicated helpdesk.'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark group cursor-pointer ${isRed ? 'glow-red border-itred/30 hover:border-itred/60' : 'glow-blue border-itblue/30 hover:border-itblue/60'}`}
              >
                <div className={`w-16 h-16 ${isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-itsilver text-sm mb-4">{service.description}</p>
                <a href="#" className={`text-sm font-semibold ${isRed ? 'text-itred hover:text-itblue' : 'text-itblue hover:text-itred'} transition-colors`}>
                  Learn more
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  const reasons = [
    {
      title: 'Expert Team',
      description: 'Our certified professionals bring decades of combined experience across all major technologies and industries.'
    },
    {
      title: 'Proven Track Record',
      description: 'We have successfully delivered over 500 projects with client satisfaction rate of 98% and long-term partnerships.'
    },
    {
      title: 'Agile Approach',
      description: 'We use agile methodologies to ensure flexibility, transparency, and rapid delivery of high-quality solutions.'
    },
    {
      title: 'End-to-End Support',
      description: 'From initial consultation to post-launch maintenance, we provide comprehensive support at every stage.'
    },
    {
      title: 'Innovation First',
      description: 'We stay ahead of technology trends to provide cutting-edge solutions that give you a competitive advantage.'
    },
    {
      title: 'Cost-Effective',
      description: 'Transparent pricing and efficient processes ensure you get maximum value from your technology investment.'
    }
  ];

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itgray to-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Partner With Us</h2>
          <div className="section-divider mb-6"></div>
          <p className="section-subtitle">
            The IT Legends difference: commitment to excellence, innovation, and your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="relative pl-8 card-dark border-itsilver/20 hover:border-itred/50">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-itred to-itblue rounded"></div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-itsilver leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const posts = [
    {
      title: 'The Future of Cloud Computing in 2024',
      excerpt: 'Explore the latest trends in cloud technology and how they are reshaping business infrastructure.',
      date: 'Mar 15, 2024',
      category: 'Cloud'
    },
    {
      title: 'AI Integration: A Practical Guide for Businesses',
      excerpt: 'Learn how to successfully integrate artificial intelligence into your existing workflows and systems.',
      date: 'Mar 10, 2024',
      category: 'AI'
    },
    {
      title: 'Cybersecurity Best Practices for 2024',
      excerpt: 'Essential security measures every organization should implement to protect against modern threats.',
      date: 'Mar 5, 2024',
      category: 'Security'
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights</h2>
          <div className="section-divider mb-6"></div>
          <p className="section-subtitle">
            Stay informed with our latest thoughts on technology trends and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="card-dark overflow-hidden hover:border-itred/50">
              <div className="h-48 bg-gradient-to-br from-itblue/30 to-itred/30 border-b border-itgray2"></div>
              <div className="p-6">
                <div className="text-sm accent-text mb-2">{post.category}</div>
                <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                <p className="text-itsilver mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-itsilver/60">{post.date}</span>
                  <a href="#" className="text-itred hover:text-itblue font-semibold flex items-center transition-colors">
                    Read More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider mb-6"></div>
          <p className="section-subtitle">
            Ready to start your digital transformation journey? Let us talk about your project
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-itsilver mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-itsilver mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-itsilver mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-itsilver mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition resize-none text-white placeholder-itsilver/50"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                    <Mail className="h-6 w-6 text-itred" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Email</div>
                    <div className="text-itsilver">contact@itlegends.com</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-itblue/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itblue/30">
                    <Phone className="h-6 w-6 text-itblue" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Phone</div>
                    <div className="text-itsilver">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                    <MapPin className="h-6 w-6 text-itred" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Office</div>
                    <div className="text-itsilver">123 Tech Street, Suite 100<br />San Francisco, CA 94105</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-dark glow-blue border-itblue/30">
              <h4 className="font-bold text-white mb-3">Business Hours</h4>
              <div className="text-itsilver space-y-1">
                <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                <div>Saturday: 10:00 AM - 4:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-itdark border-t border-itgray2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-itred" />
              <span className="text-xl font-bold text-white">IT Legends</span>
            </div>
            <p className="text-itsilver">
              Transforming ideas into digital excellence through innovative technology solutions.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-itsilver">
              <li><a href="#who-we-are" className="hover:text-itred transition-colors">Who We Are</a></li>
              <li><a href="#services" className="hover:text-itred transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-itred transition-colors">Why Us</a></li>
              <li><a href="#blog" className="hover:text-itred transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-itsilver">
              <li>Cloud Solutions</li>
              <li>Custom Development</li>
              <li>Cybersecurity</li>
              <li>IT Consulting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-itsilver">
              <li>contact@itlegends.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
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

export default App;
