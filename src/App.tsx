import { Menu, X, Code, Cloud, Shield, Zap, Users, TrendingUp, Mail, Phone, MapPin, ChevronRight, Cpu, BookOpen, Calendar, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagedITSupportPage from './pages/ManagedITSupport';
import HardwareNetworkPage from './pages/HardwareNetwork';
import CybersecurityPage from './pages/Cybersecurity';
import CloudBackupPage from './pages/CloudBackup';
import ServerMaintenancePage from './pages/ServerMaintenance';
import HelpdeskPage from './pages/Helpdesk';
//import BlogPage from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import BlogPost1Page from './pages/BlogPost1';
import BlogPost2Page from './pages/BlogPost2';
import BlogPost3Page from './pages/BlogPost3';
import ContactPage from './pages/Contact';
import Footer from './components/Footer';


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />} />
        <Route path="/services/managed-it-support" element={<ManagedITSupportPage />} />
        <Route path="/services/hardware-network" element={<HardwareNetworkPage />} />
        <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
        <Route path="/services/cloud-backup" element={<CloudBackupPage />} />
        <Route path="/services/server-maintenance" element={<ServerMaintenancePage />} />
        <Route path="/services/helpdesk" element={<HelpdeskPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/post-1" element={<BlogPost1Page />} />
        <Route path="/blog/post-2" element={<BlogPost2Page />} />
        <Route path="/blog/post-3" element={<BlogPost3Page />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (open: boolean) => void }) {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      {/* Divider between Hero and Who We Are */}
      <SectionDivider />
      
      <WhoWeAre />
      {/* Divider between Who We Are and Our Services */}
      <SectionDivider />
      
      <OurServices />
      {/* Divider between Our Services and Why Partner With Us */}
      <SectionDivider />
      
      <WhyPartner />
      {/* Divider between Why Partner With Us and Latest Insights */}
      <SectionDivider />
      
      <Blog />
      {/* Divider between Latest Insights and Blog & IT Tips */}
      <SectionDivider />
      
      <BlogAndITTips />
      {/* Divider between Blog & IT Tips and Contact */}
      <SectionDivider />
      
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

function SectionDivider() { 
  return ( 
    <div className="w-full flex justify-center py-8"> 
      <div className="w-[90%] h-px bg-gradient-to-r from-itred to-itblue">
        </div>
      </div> 
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 pb-32">
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
    <section id="who-we-are" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray">
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
      description: 'Proactive monitoring and support to keep your systems running smoothly 24/7.',
      link: '/services/managed-it-support'
    },
    {
      icon: Cpu,
      title: 'Hardware & Network Setup',
      description: 'Professional installation and configuration of enterprise-grade infrastructure.',
      link: '/services/hardware-network'
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Protection',
      description: 'Advanced threat detection and security measures to protect your business data.',
      link: '/services/cybersecurity'
    },
    {
      icon: Cloud,
      title: 'Cloud & Backup Solutions',
      description: 'Secure cloud infrastructure and automated backup systems for business continuity.',
      link: '/services/cloud-backup'
    },
    {
      icon: Zap,
      title: 'Server Maintenance & Monitoring',
      description: 'Continuous server health monitoring and preventative maintenance services.',
      link: '/services/server-maintenance'
    },
    {
      icon: Users,
      title: 'Helpdesk & Remote Assistance',
      description: 'Expert technical support through remote assistance and dedicated helpdesk.',
      link: '/services/helpdesk'
    }
  ];

  return (
    <section id="services" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-itdark">
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
              <a
                key={index}
                href={service.link}
                aria-label={`Learn more about ${service.title}`}
                className={`card-dark group cursor-pointer ${isRed ? 'glow-red border-itred/30 hover:border-itred/60' : 'glow-blue border-itblue/30 hover:border-itblue/60'} block`}
              >
                <div className={`w-16 h-16 ${isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-itsilver text-sm mb-4">{service.description}</p>
                <span className={`text-sm font-semibold ${isRed ? 'text-itred group-hover:text-itblue' : 'text-itblue group-hover:text-itred'} transition-colors`}>
                  Learn more
                </span>
              </a>
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
      icon: Zap,
      title: 'Rapid Response Times',
      description: 'Our dedicated support team responds to your IT needs within hours, minimizing downtime and keeping your business running.'
    },
    {
      icon: Shield,
      title: 'Certified Technicians',
      description: 'Industry-certified experts with proven expertise across multiple technology platforms and best practices.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions for All Business Sizes',
      description: 'From startups to enterprises, our solutions grow with your business, adapting to your evolving needs.'
    }
  ];

  return (
    <section id="why-us" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Partner With Us</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isRed = index % 2 === 0;
            return (
              <div
                key={index}
                className={`card-dark ${isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'} flex flex-col items-center text-center`}
              >
                <div className={`w-20 h-20 ${isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'} rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-itsilver leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
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
    <section id="blog" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Latest Insights</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Stay informed with our latest thoughts on technology trends and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const isRed = index % 2 === 0;
            return (
              <article
                key={index}
                className={`card-dark group cursor-pointer overflow-hidden ${isRed ? 'glow-red border-itred/30 hover:border-itred/60' : 'glow-blue border-itblue/30 hover:border-itblue/60'}`}
              >
                <div className="h-48 bg-gradient-to-br from-itblue/30 to-itred/30 border-b border-itgray2"></div>
                <div className="p-6">
                  <div className={`text-sm font-semibold mb-2 ${isRed ? 'text-itred' : 'text-itblue'}`}>{post.category}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-itred transition-colors">{post.title}</h3>
                  <p className="text-itsilver mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-itsilver/60">{post.date}</span>
                    <span className={`font-semibold flex items-center transition-colors text-sm ${isRed ? 'text-itred group-hover:text-itblue' : 'text-itblue group-hover:text-itred'}`}>
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 

function BlogAndITTips() {
  const blogPosts = [
    {
      title: '5 Essential Cybersecurity Tips for Small Businesses',
      date: 'November 12, 2024',
      snippet: 'Protect your business from cyber threats with these practical security measures that every small business should implement today.'
    },
    {
      title: 'Understanding Cloud Migration: A Step-by-Step Guide',
      date: 'November 8, 2024',
      snippet: 'Planning to move your infrastructure to the cloud? Learn the key considerations and best practices for a smooth migration process.'
    },
    {
      title: 'Windows 11 Update Alert: What IT Managers Need to Know',
      date: 'November 5, 2024',
      snippet: 'Microsoft has released critical security patches. Here is what you need to know about the latest updates and how they affect your systems.'
    }
  ];

  return (
    <section id="blog-tips" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itgray to-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-itred mr-3" />
            <h2 className="section-title">Blog & IT Tips</h2>
          </div>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Weekly IT tips, security alerts, and tech insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => {
            const isRed = index % 2 === 0;
            return (
              <a
                key={index}
                href="/blog"
                className={`card-dark group cursor-pointer ${isRed ? 'glow-red border-itred/30 hover:border-itred/60' : 'glow-blue border-itblue/30 hover:border-itblue/60'} block`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 ${isRed ? 'bg-itred/20' : 'bg-itblue/20'} rounded-lg flex items-center justify-center border ${isRed ? 'border-itred/30' : 'border-itblue/30'}`}>
                    <Calendar className={`h-5 w-5 ${isRed ? 'text-itred' : 'text-itblue'}`} />
                  </div>
                  <span className="text-sm text-itsilver/70">{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-itred transition-colors">
                  {post.title}
                </h3>

                <p className="text-itsilver leading-relaxed mb-4 text-sm">
                  {post.snippet}
                </p>

                <span className={`inline-flex items-center font-semibold transition-colors text-sm ${isRed ? 'text-itred group-hover:text-itblue' : 'text-itblue group-hover:text-itred'}`}>
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/blog"
            className="btn-primary inline-flex items-center justify-center"
          >
            View All Blog Posts
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
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
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itgray to-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Let's Build Something Legendary.</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                  <Phone className="h-7 w-7 text-itred" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 text-lg">Phone</div>
                  <div className="text-itsilver text-base">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-itblue/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itblue/30">
                  <Mail className="h-7 w-7 text-itblue" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 text-lg">Email</div>
                  <div className="text-itsilver text-base">contact@itlegends.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                  <MapPin className="h-7 w-7 text-itred" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 text-lg">Location</div>
                  <div className="text-itsilver text-base">123 Tech Street, Suite 100<br />San Francisco, CA 94105</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">
                  Name
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

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition resize-none text-white placeholder-itsilver/50"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
