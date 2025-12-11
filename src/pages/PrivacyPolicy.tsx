import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import privacyBg from '../assets/services-bg.webp';
import headerImg from '../assets/header-img.webp';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-itdark text-itsilver flex flex-col">

      <SeoHead
        title="Privacy & Cookie Policy | IT Legends"
        description="Learn how IT Legends collects, uses and protects your personal information, and how we use cookies and analytics on this website."
        url="/privacy-policy"
        type="article"
    />

    {/* Simple top bar */}
    <nav className="fixed top-0 w-full tech-glass z-50 border-b border-itgray2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              {/* ✅ Use imported header image */}
              <img src={headerImg} alt="IT Legends Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">
                IT Legends
              </span>
            </a>
        <a
          href="/"
          className="inline-flex items-center text-itsilver hover:text-itred transition-colors text-sm sm:text-base"
        >
          Back to Home
        </a>
      </div>
    </nav>

    {/* Content */}
    <main 
      className="flex-1 w-full pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(${privacyBg})`
      }}
    >
      <div className="max-w-4xl mx-auto bg-black/65 border border-itgray2 rounded-2xl shadow-xl p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-6">
          Privacy &amp; Cookie Policy
        </h1>

        <p className="text-sm text-itsilver/70 mb-8">
          Last updated: {new Date().getFullYear()}
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
          <p className="mb-3">
            IT Legends (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
            South African I.T. services provider specialising in manager IT
            support, cybersecurity, cloud and network solutions for
            businesses.
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{' '}
            <a
              href="mailto:info@itlegends.co.za"
              className="text-itblue hover:text-itred"
            >
              info@itlegends.co.za
            </a>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span>{' '}
            <a
              href="tel:+27846348144"
              className="text-itblue hover:text-itred"
            >
              +27 (84) 634 8144
            </a>
          </p>
          <p className="mb-1 font-semibold">Physical addresses:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              715 Elm Street, Grobler Park, Roodepoort, 1724, South Africa
            </li>
            <li>
              265 Theuns Van Niekerk Street, Wierdapark, Centurion, 0157, South Africa
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            2. What Information We Collect
          </h2>
          <p className="mb-3">
            We collect and process information in the following ways:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Contact form data:</span> when
              you submit a form on this website, we collect your name, email
              address, company name (if provided) and the details of your
              enquiry.
            </li>
            <li>
              <span className="font-semibold">
                Communication and support:
              </span>{' '}
              if you contact us directly (email, phone, WhatsApp), we may
              keep a record of that communication.
            </li>
            <li>
              <span className="font-semibold">Website usage data:</span>{' '}
              where analytics is enabled and consented to, we collect
              anonymised information such as pages visited, approximate
              location (country/city), browser type and device.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To respond to your enquiries and provide requested services.</li>
            <li>
              To operate, maintain and improve our website and online
              services.
            </li>
            <li>
              To send important updates about services you already use (not spam).
            </li>
            <li>
              Where permitted, to send relevant I.T. tips, news or marketing
              communications - you can opt-out at any time.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            4. Cookies &amp; Analytics
          </h2>
          <p className="mb-3">
            This website uses small text files called cookies. Cookies are
            stored on your device and help us provide a better experience.
          </p>
          <h3 className="font-semibold text-white mb-2">
            4.1. Essential cookies
          </h3>
          <p className="mb-3">
            These cookies are required for basic site functionality (for
            example, remembering your cookie choices). They cannot be
            switched off in our systems.
          </p>
          <h3 className="font-semibold text-white mb-2">
            4.2. Analytics cookies
          </h3>
          <p className="mb-3">
            With your concent, we may use Google Analytics or similar tools to
            understand how visitors use our website (which pages are visited,
            how long they stay, etc.). This helps us improve our content and
            services.
          </p>
          <p className="mb-3">
            Analytics cokkies are{' '}
            <span className="font-semibold">
              only enabled if you click &quote;Accept analytics&quote;
            </span> {' '}
            in our cookie banner. If you choose &quote;Decline analytics&quote;,
            we will not load analytics scripts.
          </p>
          <p>
            You can also clear cookies or manage them through your browser
            settings at any time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            5. Third-Party Services
          </h2>
          <p className="mb-3">
            We may use trusted third-party services to help us operate this
            website and manage enquiries, for example:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Make.com / automation tools:</span>{' '}
              to route contact form submission to our internal systems.
            </li>
            <li>
              <span className="font-semibold">Email providers:</span> to send
              and receive email communication.
            </li>
            <li>
              <span className="font-semibold">Analytics providers:</span> such
              as Google Analytics (only when analytics cookies are accepted).
            </li>
          </ul>
          <p className="mt-3">
            These providers only receive the information necessary to perform
            their services and are expected to protect it appropriately.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            6. Data Retention
          </h2>
          <p>
            We keep your personal data for as long as necessary to fulfill the
            purposes described above, or as required by applicable law. Contact
            enquiries may be retained for a reasonable period for reference
            and recordkeeping.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            7. Your Rights
          </h2>
          <p className="mb-3">
            Depending on applicable law, you may have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>Request access to the personal data we gold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data, where applicable.</li>
            <li>Object to certain types of processing.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{' '}
            <a
              href="mailto:info@itlegends.co.za"
              className="text-itblue hover:text-itred"
            >
              info@itlegends.co.za
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">
            8. Changes To This Policy
          </h2>
          <p>
            We may update this Privacy &amp; Cookie Policy from time to time to
            reflect changes in our practices or legal requirements. The
            &quot;Last updated&quot; date at the top indicates when it was
            last revised.
          </p> 
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
          <p>
            If you have any questions about this policy or how we handle your
            data, please contact us at{' '}
            <a
              href="mailto:info@itlegends.co.za"
              className="text-itblue hover:text-itred"
            >
              info@itlegends.co.za
            </a>
            .
          </p>
        </section>
      </div>
    </main>

    <Footer />
    </div>
  );
}