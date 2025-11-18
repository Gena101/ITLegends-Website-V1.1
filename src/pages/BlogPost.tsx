import { Code, Calendar, User, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPostPage() {
  const { slug } = useParams();

  const blogPost = {
    title: 'Why Every Business Needs Proactive IT Support',
    date: 'November 18, 2024',
    author: 'IT Legends Team',
    content: `
      <p>In today's fast-paced digital landscape, businesses rely heavily on their IT infrastructure to maintain operations, serve customers, and drive growth. Yet many organizations still take a reactive approach to IT support, only addressing issues after they've caused disruption. This outdated strategy can lead to costly downtime, lost productivity, and frustrated employees.</p>

      <h2>The Cost of Reactive IT Support</h2>

      <p>When businesses wait for problems to occur before taking action, they face several significant challenges:</p>

      <ul>
        <li><strong>Unexpected Downtime:</strong> System failures can halt operations for hours or even days, directly impacting revenue and customer satisfaction.</li>
        <li><strong>Data Loss Risks:</strong> Without proactive monitoring and backup verification, critical business data remains vulnerable.</li>
        <li><strong>Security Vulnerabilities:</strong> Unpatched systems and outdated software create entry points for cyberattacks.</li>
        <li><strong>Higher Repair Costs:</strong> Emergency fixes are typically more expensive than preventative maintenance.</li>
      </ul>

      <h2>The Proactive Alternative</h2>

      <p>Proactive IT support flips this model on its head. Instead of waiting for problems to occur, your IT partner continuously monitors your systems, identifies potential issues before they become critical, and implements preventative measures to keep everything running smoothly.</p>

      <p>Key benefits of proactive IT support include:</p>

      <ul>
        <li><strong>24/7 Monitoring:</strong> Automated systems watch for anomalies, performance degradation, and security threats around the clock.</li>
        <li><strong>Predictable Costs:</strong> Fixed monthly fees replace unpredictable emergency repair bills.</li>
        <li><strong>Improved Uptime:</strong> Issues are resolved before they impact your business operations.</li>
        <li><strong>Strategic Planning:</strong> Regular assessments help you plan for future technology needs and investments.</li>
      </ul>

      <h2>Real-World Impact</h2>

      <p>Consider a typical scenario: A server's hard drive begins showing signs of failure. With reactive support, this drive fails completely during business hours, causing unexpected downtime while emergency repairs are arranged. With proactive support, monitoring systems detect the early warning signs, the drive is replaced during a planned maintenance window, and business continues uninterrupted.</p>

      <h2>What Proactive Support Looks Like</h2>

      <p>A comprehensive proactive IT support plan typically includes:</p>

      <ul>
        <li>Continuous system monitoring and alerting</li>
        <li>Regular software updates and security patches</li>
        <li>Automated backup verification</li>
        <li>Performance optimization</li>
        <li>Security audits and vulnerability assessments</li>
        <li>Capacity planning and scalability reviews</li>
        <li>Documentation and disaster recovery planning</li>
      </ul>

      <h2>Making the Transition</h2>

      <p>Moving from reactive to proactive IT support doesn't have to be complicated. Start by conducting a comprehensive assessment of your current IT environment, identifying pain points, and understanding your business's specific needs. A qualified managed service provider can help you develop a customized support plan that fits your budget and requirements.</p>

      <h2>The Bottom Line</h2>

      <p>In an era where technology underpins virtually every business operation, proactive IT support isn't just a luxury—it's a necessity. By investing in preventative maintenance and continuous monitoring, you protect your business from costly disruptions, enhance security, and free your team to focus on what they do best: growing your business.</p>

      <p>Ready to make the switch to proactive IT support? Contact IT Legends today to learn how we can help keep your systems running smoothly and securely.</p>
    `
  };

  return (
    <div className="min-h-screen bg-itdark text-itsilver">
      <Navigation />
      <BlogPostHero title={blogPost.title} date={blogPost.date} author={blogPost.author} />
      <BlogContent content={blogPost.content} />
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

interface BlogContentProps {
  content: string;
}

function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-itdark">
      <div className="max-w-4xl mx-auto">
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white prose-headings:mb-4 prose-headings:mt-8
            prose-h2:text-3xl prose-h2:text-itred
            prose-h3:text-2xl prose-h3:text-itblue
            prose-p:text-itsilver prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-itsilver prose-ul:space-y-3
            prose-li:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
