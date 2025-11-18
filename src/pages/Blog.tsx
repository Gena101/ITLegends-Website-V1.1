import { Code } from 'lucide-react';
import { useState } from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation />
      <Hero />
      <BlogPosts />
      <Footer />
    </div>
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

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-itdark via-itgray to-itdark overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-itred/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-itblue/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-glow">
          IT Legends Blog & IT Tips
        </h1>

        <p className="text-lg sm:text-xl text-itsilver mb-12 leading-relaxed max-w-3xl mx-auto">
          Weekly insights, security alerts, and updates from the IT world.
        </p>
      </div>
    </section>
  );
}

function BlogPosts() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">

      </div>
    </section>
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
              Managed IT support for businesses of all sizes.
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
