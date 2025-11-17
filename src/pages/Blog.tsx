import { Code, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
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
          Weekly insights, security tips, and important updates in the IT world.
        </p>
      </div>
    </section>
  );
}

function BlogPosts() {
  const posts = [
    {
      id: 1,
      title: '5 Essential Cybersecurity Tips for Small Businesses',
      date: 'November 12, 2024',
      category: 'Security',
      teaser: 'Protect your business from cyber threats with these practical security measures that every small business should implement today. Learn about password policies, employee training, and more.'
    },
    {
      id: 2,
      title: 'Understanding Cloud Migration: A Step-by-Step Guide',
      date: 'November 8, 2024',
      category: 'Cloud',
      teaser: 'Planning to move your infrastructure to the cloud? Learn the key considerations and best practices for a smooth migration process. We cover assessment, planning, and execution.'
    },
    {
      id: 3,
      title: 'Windows 11 Update Alert: What IT Managers Need to Know',
      date: 'November 5, 2024',
      category: 'Updates',
      teaser: 'Microsoft has released critical security patches. Here is what you need to know about the latest updates and how they affect your systems. Don\'t miss these important changes.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="card-dark group hover:border-itred/50 transition-all duration-300 flex flex-col sm:flex-row gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-itred bg-itred/20 rounded-full border border-itred/30">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-itsilver/70">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-itred transition-colors">
                  {post.title}
                </h2>

                <p className="text-itsilver leading-relaxed mb-6">
                  {post.teaser}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center text-itred hover:text-itblue font-semibold transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="w-full sm:w-48 h-40 sm:h-full bg-gradient-to-br from-itblue/20 to-itred/20 rounded-lg flex-shrink-0 border border-itgray2"></div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-itsilver mb-8">
            More posts coming soon. Check back for regular updates!
          </p>
          <a
            href="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            Back to Home
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
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
