import { Code, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation />
      <Hero />
      <GetInTouch />
      <Footer />
    </div>
  );
}

function GetInTouch() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  return (
    <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
          Get in Touch
        </h2>

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
              className={`w-full px-4 py-3 bg-itgray border rounded-lg focus:ring-2 focus:border-transparent outline-none transition text-white placeholder-itsilver/50 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-itgray2 focus:ring-itred'
              }`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
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
              className={`w-full px-4 py-3 bg-itgray border rounded-lg focus:ring-2 focus:border-transparent outline-none transition text-white placeholder-itsilver/50 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-itgray2 focus:ring-itred'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3">
              Phone Number <span className="text-itsilver/60">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-itgray border border-itgray2 rounded-lg focus:ring-2 focus:ring-itred focus:border-transparent outline-none transition text-white placeholder-itsilver/50`}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 bg-itgray border rounded-lg focus:ring-2 focus:border-transparent outline-none transition text-white placeholder-itsilver/50 resize-none ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-itgray2 focus:ring-itred'
              }`}
              placeholder="Tell us about your IT needs..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full text-lg px-8 py-4 bg-itblue text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-itblue/30"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
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
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          Contact IT Legends
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed">
          We're here to support your business — get in touch anytime.
        </p>

        <a
          href="#contact-form"
          className="btn-primary inline-flex items-center justify-center"
        >
          Get Started
          <ChevronRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function Navigation() {
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

function Footer() {
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
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-itsilver text-sm">
              <li><a href="/" className="hover:text-itred transition-colors">Home</a></li>
              <li><a href="/#services" className="hover:text-itred transition-colors">Services</a></li>
              <li><a href="/blog" className="hover:text-itred transition-colors">Blog</a></li>
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
