import React from 'react';
import { X, Mail, Phone, Calendar, Trash2, ExternalLink, Inbox } from 'lucide-react';
import { LeadSubmission } from '../types';
import { leadService } from '../services/leadService';

interface AdminLeadsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onLeadsUpdated: () => void;
}

export const AdminLeadsDrawer: React.FC<AdminLeadsDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  onLeadsUpdated
}) => {
  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the local lead history?')) {
      localStorage.removeItem('ak_tech_leads_v1');
      onLeadsUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md bg-[#0d0f15] border-l border-white/10 h-full p-4 sm:p-6 flex flex-col justify-between overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Inbound Leads ({leads.length})
                </h3>
                <span className="text-[11px] text-zinc-400">
                  Real-time pipeline & submissions
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Leads */}
          {leads.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-zinc-500">
                <Inbox className="w-6 h-6" />
              </div>
              <p className="text-sm text-zinc-400">No leads captured yet.</p>
              <p className="text-xs text-zinc-600">
                Submit the contact form or quote calculator to test.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-[#141722] border border-white/[0.08] space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        {lead.fullName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold uppercase">
                      {lead.budget}
                    </span>
                  </div>

                  <div className="space-y-1 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      <a href={`mailto:${lead.email}`} className="text-blue-400 hover:underline">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <a href={`tel:${lead.phone}`} className="hover:text-white">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {lead.services.map((srv) => (
                      <span
                        key={srv}
                        className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 text-[10px]"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>

                  <p className="p-2.5 rounded bg-black/40 text-zinc-300 font-normal leading-relaxed italic">
                    "{lead.message}"
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                    <a
                      href={`mailto:${lead.email}?subject=Regarding%20your%20inquiry%20with%20AK%20Tech%20Solutions`}
                      className="text-white hover:underline flex items-center gap-1 text-[11px] font-medium"
                    >
                      <span>Reply via Email</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)},%20this%20is%20AK%20Tech%20Solutions.`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline text-[11px] font-medium"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        {leads.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
            <span>Stored in browser pipeline</span>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
