import { Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/hero.webp')"
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">IT Legends</span>
            </div>
            <p className="text-itsilver text-sm sm:text-base">
              Reliable managed IT support, cybersecurity, cloud and network solutions for South African businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li><a href="/" className="hover:text-itblue transition-colors">Home</a></li>
              <li><a href="/#who-we-are" className="hover:text-itblue transition-colors">Who We Are</a></li>
              <li><a href="/#services" className="hover:text-itblue transition-colors">Our Services</a></li>
              <li><a href="/blog" className="hover:text-itblue transition-colors">Blog</a></li>
              <li><a href="/#contact" className="hover:text-itblue transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li><a href="/services/managed-it-support" className="hover:text-itblue transition-colors">Managed IT Support</a></li>
              <li><a href="/services/hardware-network" className="hover:text-itblue transition-colors">Hardware & Network Setup</a></li>
              <li><a href="/services/cloud-backup" className="hover:text-itblue transition-colors">Cloud & Backup Solutions</a></li>
              <li><a href="/services/server-maintenance" className="hover:text-itblue transition-colors">Server Maintenance & Monitoring</a></li>
              <li><a href="/services/cybersecurity" className="hover:text-itblue transition-colors">Cybersecurity & Protection</a></li>
              <li><a href="/services/helpdesk" className="hover:text-itblue transition-colors">Helpdesk & Remote Assistance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Connect</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li>info@itlegends.co.za</li>
              <li>+27 (84) 634 8144</li>
              <li>Gauteng, South Africa</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8 text-center text-itsilver/60 text-sm sm:text-base">
          <p>&copy; IT Legends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
