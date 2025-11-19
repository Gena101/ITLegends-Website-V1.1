import { Code, Calendar, User, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function BlogPost1Page() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation />
      <BlogPostHero
        title="Why Every Business Needs Proactive IT Support"
        date="November 18, 2024"
        author="IT Legends Team"
      />
      <BlogContent />
      <BackToBlog />
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
            <a href="/blog" className="text-itsilver hover:text-itred transition-colors font-medium">
              Back to Blog
            </a>
            <a href="/" className="text-itsilver hover:text-itred transition-colors font-medium">
              Home
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
          <div className="px-4 py-4 space-y-3">
            <a
              href="/blog"
              className="block text-itsilver hover:text-itred transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Back to Blog
            </a>
            <a
              href="/"
              className="block text-itsilver hover:text-itred transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

interface BlogPostHeroProps {
  title: string;
  date: string;
  author: string;
}

function BlogPostHero({ title, date, author }: BlogPostHeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-itdark via-itgray to-itdark overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-itred/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-itblue/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 text-glow">
          {title}
        </h1>

        <div className="flex flex-wrap gap-6 text-itsilver">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-itred" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-itblue" />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogContent() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-4xl mx-auto">
        <article className="text-itsilver leading-relaxed space-y-6">
        </article>
      </div>
    </section>
  );
}

function BackToBlog() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-itdark to-itgray border-t border-itgray2">
      <div className="max-w-4xl mx-auto text-center">
        <a
          href="/blog"
          className="btn-secondary inline-flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blog
        </a>
      </div>
    </section>
  );
}