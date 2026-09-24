import React, { useState } from 'react';
import { X, Check, Calculator, ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuote: (quoteDetails: { services: string[]; budget: string; note: string }) => void;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyQuote
}) => {
  if (!isOpen) return null;

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Website & Web Development'
  ]);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');
  const [maintenance, setMaintenance] = useState(true);

  const servicePricing: { [key: string]: { label: string; basePrice: number; weeks: number } } = {
    'Website & Web Development': { label: 'Web Platform / Web App', basePrice: 2000, weeks: 3 },
    'UI/UX & Website Design': { label: 'UI/UX Design System', basePrice: 1200, weeks: 2 },
    'AI Automation & Workflows': { label: 'AI Automation & Agents', basePrice: 1800, weeks: 2 },
    'AI Lead Generation System': { label: 'AI Lead Generation Funnel', basePrice: 2200, weeks: 3 },
    'WhatsApp Automation': { label: 'WhatsApp Official Chatbot', basePrice: 1400, weeks: 1.5 },
    'CRMs & Process Automation': { label: 'CRM & ERP Custom Sync', basePrice: 1600, weeks: 2 },
    'Data Analytics & BI': { label: 'Executive BI Dashboard', basePrice: 1900, weeks: 2.5 }
  };

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  // Calculations
  const rawTotal = selectedServices.reduce((sum, srv) => sum + (servicePricing[srv]?.basePrice || 1000), 0);
  const bundleDiscount = selectedServices.length > 2 ? 0.85 : selectedServices.length > 1 ? 0.9 : 1.0;
  const speedMultiplier = timelineSpeed === 'express' ? 1.25 : 1.0;
  const estimatedMin = Math.round(rawTotal * bundleDiscount * speedMultiplier * 0.9);
  const estimatedMax = Math.round(rawTotal * bundleDiscount * speedMultiplier * 1.15);

  const totalWeeks = Math.max(
    ...selectedServices.map((s) => servicePricing[s]?.weeks || 2)
  ) * (timelineSpeed === 'express' ? 0.6 : 1);

  const handleApply = () => {
    let budgetBracket = '$1,000 - $3,000';
    if (estimatedMin >= 15000) budgetBracket = '$15,000+';
    else if (estimatedMin >= 7000) budgetBracket = '$7,000 - $15,000';
    else if (estimatedMin >= 3000) budgetBracket = '$3,000 - $7,000';

    onApplyQuote({
      services: selectedServices,
      budget: budgetBracket,
      note: `Configured via Instant Estimator: Estimated range $${estimatedMin.toLocaleString()} - $${estimatedMax.toLocaleString()} (${timelineSpeed} delivery).`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left"
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

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Interactive Project Cost & Timeline Estimator
            </h2>
            <p className="text-xs text-zinc-400">
              Configure your requirements to receive a real-time investment estimate
            </p>
          </div>
        </div>

        {/* Step 1: Select Capabilities */}
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            1. Select Required Capabilities:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.keys(servicePricing).map((srv) => {
              const selected = selectedServices.includes(srv);
              return (
                <button
                  type="button"
                  key={srv}
                  onClick={() => toggleService(srv)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selected
                      ? 'bg-white/10 border-white text-white font-semibold'
                      : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-xs">{servicePricing[srv].label}</span>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${selected ? 'bg-white text-black' : 'border border-zinc-600'}`}>
                    {selected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Delivery Speed */}
        <div className="mt-6 space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            2. Delivery Pace:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTimelineSpeed('standard')}
              className={`p-3 rounded-xl border text-left transition-all ${
                timelineSpeed === 'standard'
                  ? 'bg-white/10 border-white text-white'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400'
              }`}
            >
              <div className="text-xs font-bold text-white">Standard Delivery</div>
              <div className="text-[11px] text-zinc-400">High-polish, standard sprint timing</div>
            </button>

            <button
              type="button"
              onClick={() => setTimelineSpeed('express')}
              className={`p-3 rounded-xl border text-left transition-all ${
                timelineSpeed === 'express'
                  ? 'bg-white/10 border-white text-white'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400'
              }`}
            >
              <div className="text-xs font-bold text-emerald-400">Express Sprint ⚡</div>
              <div className="text-[11px] text-zinc-400">Dedicated double-capacity engineering</div>
            </button>
          </div>
        </div>

        {/* Estimation Output Card */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-[#151926] to-[#10131d] border border-white/15 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                Estimated Project Investment
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}
                <span className="text-xs text-zinc-400 font-sans ml-2 font-normal">USD</span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                Estimated Timeline
              </span>
              <div className="text-lg font-bold text-emerald-400 flex items-center sm:justify-end gap-1.5 font-mono">
                <Clock className="w-4 h-4" />
                <span>~{Math.round(totalWeeks)} - {Math.round(totalWeeks + 1.5)} Weeks</span>
              </div>
            </div>
          </div>

          {selectedServices.length > 1 && (
            <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-service bundle discount applied (10-15% savings)</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Non-binding ballpark estimation</span>
          </div>

          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
          >
            <span>Proceed with this Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
