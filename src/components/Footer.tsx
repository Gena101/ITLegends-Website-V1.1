import { Facebook, Instagram } from 'lucide-react';
import heroBg from '../assets/hero.webp';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
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
              Reliable managed IT support, cybersecurity, cloud and network solutions for South African
              businesses.
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/itlegends"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-itgray2 hover:border-itblue/60 hover:bg-itblue/20 transition-all"
              >
                <Facebook className="h-6 w-6 text-itsilver hover:text-itblue transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/itlegends/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-itgray2 hover:border-itred/60 hover:bg-itred/20 transition-all"
              >
                <Instagram className="h-6 w-6 text-itsilver hover:text-itred transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li>
                <a href="/" className="hover:text-itblue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#who-we-are" className="hover:text-itblue transition-colors">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-itblue transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/#blog" className="hover:text-itblue transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-itblue transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-itblue tansition-colors">
                  Privacy &amp; Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li>
                <a href="/services/managed-it-support" className="hover:text-itblue transition-colors">
                  Managed IT Support
                </a>
              </li>
              <li>
                <a href="/services/hardware-network" className="hover:text-itblue transition-colors">
                  Hardware &amp; Network Setup
                </a>
              </li>
              <li>
                <a href="/services/cloud-backup" className="hover:text-itblue transition-colors">
                  Cloud &amp; Backup Solutions
                </a>
              </li>
              <li>
                <a href="/services/server-maintenance" className="hover:text-itblue transition-colors">
                  Server Maintenance &amp; Monitoring
                </a>
              </li>
              <li>
                <a href="/services/cybersecurity" className="hover:text-itblue transition-colors">
                  Cybersecurity &amp; Protection
                </a>
              </li>
              <li>
                <a href="/services/helpdesk" className="hover:text-itblue transition-colors">
                  Helpdesk &amp; Remote Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm sm:text-base">Connect</h4>
            <ul className="space-y-2 text-itsilver text-sm sm:text-base">
              <li>
                <a href="mailto:info@itlegends.co.za" className="hover:text-itblue transition-colors">
                  info@itlegends.co.za
                </a>
              </li>

              <li>
                <a href="tel:+27846348144" className="hover:text-itblue transition-colors">
                  +27 (84) 634 8144
                </a>
              </li>

              <li>
                <span className="font-semibold text-white">Johannesburg:</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=715+Elm+Street,+Grobler+Park,+Roodepoort,+1724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-itred transition-colors"
                >
                  715 Elm Street, Grobler Park, Roodepoort, 1724
                </a>
              </li>

              <li>
                <span className="font-semibold text-white">Pretoria:</span>
                <br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=265+Theuns+Van+Niekerk+Street,+Wierdapark,+Centurion,+0157"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-itred transition-colors"
                >
                  265 Theuns Van Niekerk Street, Wierdapark, Centurion, 0157
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-4 text-center text-itsilver/60 text-sm sm:text-base">
          <p>&copy; 2025 IT Legends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
