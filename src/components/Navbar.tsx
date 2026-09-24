import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Github, 
  Twitter, 
  ArrowRight, 
  Menu, 
  X,
  Inbox
} from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenLeadsDrawer: () => void;
  leadsCount: number;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuoteModal, 
  onOpenLeadsDrawer,
  leadsCount,
  activeSection 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090b]/90 backdrop-blur-md border-b border-white/[0.08] transition-all duration-200">
      {/* Top Contact Strip (Always visible, responsive) */}
      <div className="border-b border-white/[0.06] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-zinc-400">
          {/* Contact Details List */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a 
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call us directly"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-300" />
              <span className="font-medium tracking-tight">{COMPANY_INFO.phoneDisplay}</span>
            </a>

            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Send us an email"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-300" />
              <span className="font-medium">{COMPANY_INFO.email}</span>
            </a>

            <a 
              href={COMPANY_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-emerald-400 text-zinc-300 transition-colors group"
              title="Chat on WhatsApp"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">WhatsApp Us</span>
            </a>
          </div>

          {/* Social Links & Leads Activity */}
          <div className="hidden md:flex items-center gap-5">
            {leadsCount > 0 && (
              <button 
                onClick={onOpenLeadsDrawer}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-white hover:bg-white/20 transition-all text-[11px]"
                title="View captured leads & email alerts"
              >
                <Inbox className="w-3 h-3 text-emerald-400" />
                <span>{leadsCount} {leadsCount === 1 ? 'Lead' : 'Leads'} Captured</span>
              </button>
            )}

            <div className="flex items-center gap-3">
              <span className="text-zinc-500 text-[11px] font-medium">Follow us</span>
              <a 
                href={COMPANY_INFO.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href={COMPANY_INFO.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href={COMPANY_INFO.socials.x} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 transition-all duration-200 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Brand Logo - Stylized AK Tech Solution */}
          <a href="#home" className="flex items-center group py-1" aria-label="AK Tech Solution Home">
            <Logo size="md" className="group-hover:opacity-90 transition-opacity" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="group flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-zinc-200 transition-all sm:hidden"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0e12] border-b border-white/10 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3 text-sm text-zinc-400">
            <a 
              href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="w-4 h-4 text-zinc-300" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="w-4 h-4 text-zinc-300" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a 
              href={COMPANY_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-emerald-400"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us (+91 98765 43210)</span>
            </a>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-center text-sm"
              >
                Get a Quote →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
