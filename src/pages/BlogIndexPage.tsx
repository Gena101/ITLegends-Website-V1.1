import React from 'react';
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';

// ✅ Image imports for bundling
import headerImg from '../assets/header-img.webp';
import blogHeroBg from '../assets/blog-hero.webp';

import SeoHead from '../components/SeoHead';

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-itdark text-itsilver flex flex-col">
      {/* SEO */}
      <SeoHead
        title="Blog & IT Tips"
        description="IT Legends blog with cloud, cybersecurity, IT Tips, Server Maintenance, End User Support and AI insights for South African businesses that reliable, secure IT."
      />
      
      {/* Top Nav */}
      <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-white">IT Legends | Blogs</span>
          </a>
          <a
            href="/#blog"
            className="inline-flex items-center text-itsilver hover:text-itred transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blogHeroBg})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Blog &amp; IT Tips
          </h1>
          <p className="text-lg text-itsilver max-w-2xl mx-auto">
            Deep dives, practical guides and security insights for South African businesses.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex justify-center py-0.5 bg-transparent mb-10">
            <div className="w-[95%] h-px bg-gradient-to-r from-itred to-itblue" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-dark group cursor-pointer overflow-hidden glow-blue border-itblue/30 hover:border-itblue/60 block"
              >
                {/* Card Image */}
                <div
                  className="h-40 bg-cover bg-center border-b border-itgray2"
                  style={{
                    backgroundImage: `url('${post.image}')`,
                  }}
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-xs text-itsilver/70">
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="text-sm font-semibold mb-2 text-itblue flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </div>

                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-itred transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-itsilver text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center text-sm font-semibold text-itblue group-hover:text-itred transition-colors">
                    Read Article
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
