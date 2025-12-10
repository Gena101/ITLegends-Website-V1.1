import {
  Menu,
  X,
  Cloud,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Cpu,
  BookOpen
} from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ManagedITSupportPage from './pages/ManagedITSupport';
import HardwareNetworkPage from './pages/HardwareNetwork';
import CybersecurityPage from './pages/Cybersecurity';
import CloudBackupPage from './pages/CloudBackup';
import ServerMaintenancePage from './pages/ServerMaintenance';
import HelpdeskPage from './pages/Helpdesk';
import BlogPostPage from './pages/BlogPost';
import ContactPage from './pages/Contact';
import Footer from './components/Footer';
import BlogIndexPage from './pages/BlogIndexPage';
import { blogPosts } from './data/blogPosts';

// ✅ Image imports so Vite/Netlify can bundle them correctly
import heroBg from './assets/hero.webp';
import whoWeAreBg from './assets/who-we-are.webp';
import servicesBg from './assets/services-bg.webp';
import whyUsBg from './assets/whyus-bg.webp';
import contactBg from './assets/contact-bg.webp';
import headerImg from './assets/header-img.webp';
import heroLogoImg from './assets/hero-img.webp';
import SeoHead from './components/SeoHead';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.itlegends.co.za/#it-legends',
  name: 'IT Legends',
  url: 'https://www.itlegends.co.za/',
  logo: 'https://www.itlegends.co.za/logo-itlegends.png',
  image:'https://www.itlegends.co.za/logo-itlegends.png',
  telephone: '+27-84-634-8144',
  email: 'info@itlegends.co.za',
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'South Africa',
  },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '715 Elm Street, Grobler Park',
      addressLocality: 'Roodepoort',
      postalCode: '1724',
      addressCountry: 'ZA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '265 Theuns Van Niekerk Street, Wierdapark',
      addressLocality: 'Centurion',
      postalCode: '0157',
      addressCountry: 'ZA',
    },
  ],
  sameAs: [
    'https://www.facebook.com/itlegends',
    'https://www.instagram.com/itlegends/',
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'Website',
  '@id': 'https://www.itlegends.co.za/#website',
  url: 'https://www.itlegends.co.za/',
  name: 'IT Legends',
  inLanguage: 'en-ZA',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.itlegends.co.za/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          }
        />
        <Route
          path="/services/managed-it-support"
          element={<ManagedITSupportPage />}
        />
        <Route
          path="/services/hardware-network"
          element={<HardwareNetworkPage />}
        />
        <Route
          path="/services/cybersecurity"
          element={<CybersecurityPage />}
        />
        <Route path="/services/cloud-backup" element={<CloudBackupPage />} />
        <Route
          path="/services/server-maintenance"
          element={<ServerMaintenancePage />}
        />
        <Route path="/services/helpdesk" element={<HelpdeskPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <SeoHead
        title="Managed IT Support, Cybersecurity & Cloud Services | IT Legends South Africa"
        description="IT Legends provides managed IT support, cybersecurity, cloud & backup, server maintenance and helpdesk services for small and medium businesses in Johannesburg, Pretoria and greater Gauteng."
        url="/"
        type="website"
        image="https://www.itlegends.co.za/logo-itlegends.png"
        schema={[localBusinessSchema, webSiteSchema]}
      />

      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
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
      {/* Divider between Why Partner With Us and Blog & IT Tips */}
      <SectionDivider />

      <BlogAndITTips />
      {/* Divider between Blog & IT Tips and Contact */}
      <SectionDivider />

      <Contact />
      <SectionDivider />

      <Footer />
    </div>
  );
}

function Navigation({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const navItems = ['Who We Are', 'Services', 'Why Us', 'Blog', 'Contact'];

  return (
    <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <a href="#" className="flex items-center space-x-2">
              <img
                src={headerImg}
                alt="IT Legends Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">IT Legends</span>
            </a>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
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
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
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
    <div className="w-full flex justify-center py-0.5 bg-transparent">
      <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue"></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16 pb-15">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <img
            src={heroLogoImg}
            alt="IT Legends Logo"
            className="h-32 w-auto drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
          />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Providing You with{' '}
          <span className="bg-gradient-to-r from-itred to-itblue text-transparent bg-clip-text drop-shadow-[0_0_6px_rgba(0,0,0,0.7)] ">
            LEGENDARY
          </span>{' '}
          I.T. Services.
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
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-itblue text-white hover:shadow-[0_0_18px_4px_rgba(0,117,255,0.1)]"
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
    <section
      id="who-we-are"
      className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${whoWeAreBg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Who We Are</h2>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver leading-relaxed max-w-3xl mx-auto">
            IT Legends is dedicated to empowering South African businesses
            through innovative, reliable I.T. solutions. We combine
            cutting-edge technology with deep industry expertise to deliver
            transformative results. Our mission is to be your trusted partner
            in navigating the digital landscape, providing strategic guidance
            and robust solutions that drive growth, efficiency, and competitive
            advantage for organizations of all sizes.
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
      description:
        'Proactive monitoring and support to keep your systems running smoothly 24/7.',
      link: '/services/managed-it-support',
    },
    {
      icon: Cpu,
      title: 'Hardware & Network Setup',
      description:
        'Professional installation and configuration of enterprise-grade infrastructure.',
      link: '/services/hardware-network',
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Protection',
      description:
        'Advanced threat detection and security measures to protect your business data.',
      link: '/services/cybersecurity',
    },
    {
      icon: Cloud,
      title: 'Cloud & Backup Solutions',
      description:
        'Secure cloud infrastructure and automated backup systems for business continuity.',
      link: '/services/cloud-backup',
    },
    {
      icon: Zap,
      title: 'Server Maintenance & Monitoring',
      description:
        'Continuous server health monitoring and preventative maintenance services.',
      link: '/services/server-maintenance',
    },
    {
      icon: Users,
      title: 'Helpdesk & Remote Assistance',
      description:
        'Expert technical support through remote assistance and dedicated helpdesk.',
      link: '/services/helpdesk',
    },
  ];

  return (
    <section
      id="services"
      className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${servicesBg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isRed = index % 2 === 0;
            return (
              <Link
                key={index}
                to={service.link}
                aria-label={`Learn more about ${service.title}`}
                className={`card-dark group cursor-pointer ${
                  isRed
                    ? 'glow-red border-itred/30 hover:border-itred/60'
                    : 'glow-blue border-itblue/30 hover:border-itblue/60'
                } block`}
              >
                <div
                  className={`w-16 h-16 ${
                    isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'
                  } rounded-lg flex items-center justify-center mb-6`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-itsilver text-sm mb-4">
                  {service.description}
                </p>
                <span
                  className={`text-sm font-semibold ${
                    isRed
                      ? 'text-itred group-hover:text-itblue'
                      : 'text-itblue group-hover:text-itred'
                  } transition-colors`}
                >
                  Learn more
                </span>
              </Link>
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
      description:
        'Our dedicated support team responds to your IT needs within hours, minimizing downtime and keeping your business running.',
    },
    {
      icon: Shield,
      title: 'Certified Technicians',
      description:
        'Industry-certified experts with proven expertise across multiple technology platforms and best practices.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions for All Business Sizes',
      description:
        'From startups to enterprises, our solutions grow with your business, adapting to your evolving needs.',
    },
  ];

  return (
    <section
      id="why-us"
      className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${whyUsBg})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
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
                className={`card-dark ${
                  isRed ? 'glow-red border-itred/30' : 'glow-blue border-itblue/30'
                } flex flex-col items-center text-center`}
              >
                <div
                  className={`w-20 h-20 ${
                    isRed ? 'bg-itred/20 text-itred' : 'bg-itblue/20 text-itblue'
                  } rounded-lg flex items-center justify-center mb-6`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-itsilver leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BlogAndITTips() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background image (reusing servicesBg for now) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${servicesBg})`,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-itred mr-3" />
            <h2 className="section-title">Blog & IT Tips</h2>
          </div>
          <div className="section-divider mb-8"></div>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Stay informed with our latest thoughts on technology trends and best
            practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => {
            const isRed = index % 2 === 0;
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`card-dark group cursor-pointer ${
                  isRed
                    ? 'glow-red border-itred/30 hover:border-itred/60'
                    : 'glow-blue border-itblue/30 hover:border-itblue/60'
                } block`}
              >
                <div className="h-48 w-full overflow-hidden border-b border-itgray2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      isRed ? 'text-itred' : 'text-itblue'
                    }`}
                  >
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-itred transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-itsilver mb-4 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-itsilver/60">{post.date}</span>
                    <span
                      className={`font-semibold flex items-center transition-colors text-sm ${
                        isRed
                          ? 'text-itred group-hover:text-itblue'
                          : 'text-itblue group-hover:text-itred'
                      }`}
                    >
                      Read Full Article
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load more blogs button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="btn-secondary inline-flex items-center justify-center"
          >
            Load more blogs
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check - if this has any value, it's likely a bot
    if (formState.honeypot) {
      console.warn('Spam submission blocked (honeypot triggered).');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);
    setReference(null);

    try {
      const res = await fetch(
        'https://hook.us2.make.com/pt14ynlwgyio4c48iwruduu9curorf4a',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formState,
            service: 'General Query',
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      const data = await res.json();
      setReference(data.reference || null);
      setStatus('success');

      // Reset all fields including honeypot
      setFormState({
        name: '',
        email: '',
        company: '',
        message: '',
        honeypot: '',
      });
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let's Build Something Legendary.
          </h2>
          <div className="section-divider mb-8"></div>
        </div>

        <div className="grid mb:grid-cols-2 gap-6">
          {/* Left contact info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                  <Phone className="h-7 w-7 text-itred" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 text-lg">
                    Phone
                  </div>
                  <div className="text-itsilver text-base">
                    <a
                      href="tel:+27846348144"
                      className="hover:text-itred transition-colors"
                    >
                      +27 (84) 634 8144
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-itblue/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itblue/30">
                  <Mail className="h-7 w-7 text-itblue" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1 text-lg">
                    Email
                  </div>
                  <div className="text-itsilver text-base">
                    <a
                      href="mailto:info@itlegends.co.za"
                      className="hover:text-itred transition-colors"
                    >
                      info@itlegends.co.za
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-itred/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-itred/30">
                  <MapPin className="h-7 w-7 text-itred" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-itsilver text-base w-full">
                  {/* Johannesburg */}
                  <div>
                    <span className="font-semibold text-white block mb-1">
                      Johannesburg:
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=715+Elmstreet+,+Grobler+Park,+Roodepoort,+1724"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-itred transition-colors leading-relaxed"
                    >
                      715 Elm Street
                      <br />
                      Grobler Park
                      <br />
                      Roodepoort, 1724
                    </a>
                  </div>

                  {/* Pretoria */}
                  <div>
                    <span className="font-semibold text-white block mb-1">
                      Pretoria:
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=265+Theuns+Van+Niekerk+Street,+Wierdapark,+Centurion,+0157"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-itred transition-colors leading-relaxed"
                    >
                      265 Theuns Van Niekerk Street
                      <br />
                      Wierdapark
                      <br />
                      Centurion, 0157
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from real users */}
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

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-white mb-3"
                >
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

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold text-white mb-3"
                >
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
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-white mb-3"
                >
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
                disabled={status === 'loading'}
                className="btn-primary w-full text-lg"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && reference && (
                <p className="text-sm text-green-400 mt-3 text-center">
                  Thank you! Your reference number is{' '}
                  <span className="font-semibold">{reference}</span>.
                </p>
              )}

              {status === 'error' && errorMessage && (
                <p className="text-sm text-red-400 mt-3 text-center">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
