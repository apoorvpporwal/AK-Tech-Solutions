import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Linkedin, 
  Github, 
  Instagram, 
  Youtube, 
  Twitter, 
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/agencyData';
import { leadService, EmailNotificationPayload } from '../services/leadService';

interface ContactSectionProps {
  onLeadSubmitted: (notification: EmailNotificationPayload) => void;
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onLeadSubmitted,
  preselectedService 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    budget: '$5,000 - $15,000',
    services: preselectedService ? [preselectedService] : ['Website & Web Development']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastNotification, setLastNotification] = useState<EmailNotificationPayload | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const availableServices = [
    'Website & Web Development',
    'AI Automation & Workflows',
    'AI Lead Generation System',
    'WhatsApp Automation',
    'CRMs & Process Automation',
    'Data Analytics & BI'
  ];

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== srv) };
      } else {
        return { ...prev, services: [...prev.services, srv] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { notification } = await leadService.submitLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        budget: formData.budget,
        services: formData.services.length > 0 ? formData.services : ['General Technical Inquiry']
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setLastNotification(notification);
      onLeadSubmitted(notification);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        budget: '$5,000 - $15,000',
        services: ['Website & Web Development']
      });
    } catch {
      setIsSubmitting(false);
      setErrorMsg('An error occurred submitting your inquiry. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0b0e] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Lead Generation Form Box */}
          <div className="lg:col-span-7 bg-[#101219] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="space-y-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Let's Build Something Great Together
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Have a project in mind? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {isSuccess && lastNotification ? (
              <div className="p-8 rounded-2xl bg-[#141724] border border-emerald-500/30 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you! An automated email notification with your project brief has been sent to our engineering team at{' '}
                  <strong className="text-white">{COMPANY_INFO.notificationEmail}</strong>.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => onLeadSubmitted(lastNotification)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    View Dispatched Email Preview
                  </button>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                  >
                    Chat on WhatsApp Directly →
                  </a>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="w-full text-xs text-zinc-500 hover:text-zinc-300 pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* 2-Column Row: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 2-Column Row: Phone & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-300">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white transition-colors cursor-pointer"
                    >
                      <option value="$1,000 - $3,000">₹75,000 - ₹2.5 Lakhs ($1k - $3k)</option>
                      <option value="$3,000 - $7,000">₹2.5 Lakhs - ₹6 Lakhs ($3k - $7k)</option>
                      <option value="$7,000 - $15,000">₹6 Lakhs - ₹12 Lakhs ($7k - $15k)</option>
                      <option value="$15,000+">₹12 Lakhs+ ($15k+ Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Services Selection Pills */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-300">
                    What Services Do You Need? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableServices.map((srv) => {
                      const selected = formData.services.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                            selected
                              ? 'bg-white text-black font-semibold border-white shadow-sm'
                              : 'bg-[#090a0d] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-300">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, current bottlenecks, and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-all shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Sending Notification...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info Cards & Social Listing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#101219] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white font-display">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a0c10] border border-white/[0.06] hover:border-white/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
                      Email
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-zinc-200 break-all">
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Phone Item */}
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a0c10] border border-white/[0.06] hover:border-white/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
                      Phone
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-zinc-200">
                      {COMPANY_INFO.phoneDisplay}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Item */}
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a0c10] border border-white/[0.06] hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
                      WhatsApp
                    </span>
                    <span className="text-sm font-semibold text-emerald-400 group-hover:underline">
                      Chat with us on WhatsApp
                    </span>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a0c10] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 block">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-300">
                      {COMPANY_INFO.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Follow Us Social Icons matching reference */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <span className="text-xs font-semibold text-zinc-400 block">
                  Follow Us
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={COMPANY_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={COMPANY_INFO.socials.x}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="X / Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Handwritten script flourish matching reference bottom note */}
              <div className="pt-2 text-right">
                <span className="inline-block text-xs sm:text-sm font-handwriting text-zinc-300 italic tracking-wide rotate-[-2deg]">
                  Let's create something amazing together! ✨
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
