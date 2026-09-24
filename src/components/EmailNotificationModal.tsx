import React from 'react';
import { X, Mail, CheckCircle2, ArrowUpRight, Copy, Check, MessageSquare } from 'lucide-react';
import { EmailNotificationPayload } from '../services/leadService';

interface EmailNotificationModalProps {
  notification: EmailNotificationPayload | null;
  onClose: () => void;
}

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({
  notification,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!notification) return null;

  const handleCopy = () => {
    const summary = `Lead: ${notification.lead.fullName}\nEmail: ${notification.lead.email}\nPhone: ${notification.lead.phone}\nServices: ${notification.lead.services.join(', ')}\nBudget: ${notification.lead.budget}\nMessage: ${notification.lead.message}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-[calc(100vw-1rem)] sm:max-w-2xl bg-[#0d0f14] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-4 sm:my-8 text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Email Header Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Lead Dispatched & Email Sent
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">[{notification.sentAt}]</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Email Notification Dispatched to Team
            </h2>
          </div>
        </div>

        {/* Simulated Email Envelope Box */}
        <div className="rounded-2xl bg-[#141722] border border-white/10 p-5 space-y-3 mb-6">
          <div className="flex items-start justify-between border-b border-white/[0.08] pb-3 text-xs">
            <div className="space-y-1">
              <div>
                <span className="text-zinc-500 font-medium">To: </span>
                <span className="text-zinc-200 font-mono font-medium">
                  {notification.to.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">From: </span>
                <span className="text-zinc-200 font-mono font-medium">
                  {notification.from}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 font-medium">Subject: </span>
                <span className="text-white font-semibold">
                  {notification.subject}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase font-bold">
              Delivered
            </span>
          </div>

          {/* Lead Information Card */}
          <div className="space-y-2.5 pt-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-500 block">Prospect Name:</span>
                <span className="text-white font-semibold text-sm">
                  {notification.lead.fullName}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Contact Email:</span>
                <span className="text-blue-400 font-medium font-mono">
                  {notification.lead.email}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-500 block">Phone:</span>
                <span className="text-zinc-300 font-mono">
                  {notification.lead.phone}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Budget Bracket:</span>
                <span className="text-emerald-400 font-semibold font-mono">
                  {notification.lead.budget}
                </span>
              </div>
            </div>

            <div>
              <span className="text-zinc-500 block">Services Required:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {notification.lead.services.map((srv) => (
                  <span
                    key={srv}
                    className="px-2 py-0.5 rounded bg-white/10 text-zinc-200 text-[11px]"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <span className="text-zinc-500 block mb-1">Message Content:</span>
              <p className="p-3 rounded-lg bg-black/40 text-zinc-300 font-normal leading-relaxed whitespace-pre-wrap">
                "{notification.lead.message}"
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Lead Info' : 'Copy Lead Details'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`mailto:${notification.lead.email}?subject=Re:%20AK%20Tech%20Solutions%20Project%20Inquiry`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Reply to Client</span>
            </a>

            <a
              href={`https://wa.me/${notification.lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(notification.lead.fullName)},%20this%20is%20AK%20Tech%20Solutions%20following%20up%20on%20your%20inquiry.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              title="Chat with lead on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
