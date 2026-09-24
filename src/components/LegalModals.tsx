import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1118] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-white" />
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Service & Engagement'}
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          <p>
            Effective Date: March 2026. Last updated for {COMPANY_INFO.name}.
          </p>

          {isPrivacy ? (
            <>
              <h3 className="text-sm font-bold text-white pt-2">1. Information Collection & Usage</h3>
              <p>
                {COMPANY_INFO.name} collects contact details (including full name, business email, telephone number, and project briefs) solely for evaluating client project inquiries, delivering custom technology solutions, and coordinating automated workflows.
              </p>

              <h3 className="text-sm font-bold text-white pt-2">2. Confidentiality & AI Data Privacy</h3>
              <p>
                We adhere to strict zero-data-retention confidentiality. Proprietary company SOPs, client documents, API secrets, and database records processed during AI automation projects are never shared with unauthorized third parties or used to train public language models.
              </p>

              <h3 className="text-sm font-bold text-white pt-2">3. Storage & Security</h3>
              <p>
                All data transmitted through our web forms is encrypted in transit using industry-standard TLS. We implement robust role-based access control and token encryption for all client integration credentials.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-sm font-bold text-white pt-2">1. Scope of Engagement</h3>
              <p>
                {COMPANY_INFO.name} provides software engineering, web application development, autonomous AI workflows, CRM integrations, and data intelligence services pursuant to mutually agreed statements of work.
              </p>

              <h3 className="text-sm font-bold text-white pt-2">2. Intellectual Property Rights</h3>
              <p>
                Upon final settlement of project invoices, all custom source code, documentation, Figma design assets, and automated workflow pipelines created specifically for the client become the exclusive intellectual property of the client.
              </p>

              <h3 className="text-sm font-bold text-white pt-2">3. Post-Launch Warranty & Support</h3>
              <p>
                All production deployments include a 30-day warranty against software defects, bugs, and API breakages originating from delivered code, with extended maintenance retainer agreements available thereafter.
              </p>
            </>
          )}

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
