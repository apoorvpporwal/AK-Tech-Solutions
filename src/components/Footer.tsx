import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/agencyData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060709] border-t border-white/[0.08] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <Logo size="lg" />
            </div>
            
            <p className="text-xs text-zinc-400 font-medium">
              Innovate · Automate · Grow
            </p>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              We empower modern enterprises and growing businesses with custom web applications, autonomous AI workflows, and high-conversion lead generation systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Projects', 'About', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors line-clamp-1"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-zinc-300" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="break-all">{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:underline">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <span className="text-[11px] font-bold text-white block">
                Subscribe to Our Newsletter
              </span>
              <p className="text-[11px] text-zinc-400">
                Get the latest updates, tips and insights.
              </p>
              
              {subscribed ? (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#111319] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); alert("Sitemap:\n• Home\n• Services (12 Tech Fields)\n• Featured Projects\n• Why Choose Us\n• Industries\n• Frequently Asked Questions\n• Contact & Lead Generation\n• Get a Quote Estimator"); }} className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
