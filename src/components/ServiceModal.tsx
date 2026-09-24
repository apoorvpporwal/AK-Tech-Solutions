import React from 'react';
import { X, CheckCircle2, ArrowRight, Clock, Users, Wrench } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onInquireService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-[calc(100vw-1rem)] sm:max-w-2xl bg-[#0f1118] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-4 sm:my-8 text-left overflow-hidden"
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

        {/* Title & Tagline */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Technical Capability
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {service.title}
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {service.fullDescription}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Key Capabilities & Workflows
          </h4>
          <div className="space-y-2">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Typical Delivery Timeline</span>
            </div>
            <p className="text-xs text-zinc-300">{service.timeline}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>Recommended For</span>
            </div>
            <p className="text-xs text-zinc-300 line-clamp-2">{service.idealFor}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <Wrench className="w-3.5 h-3.5 text-zinc-400" />
            <span>Technologies & Tools Employed:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables pack */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Client Deliverables:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.deliverables.map((item, i) => (
              <div key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onInquireService(service.title);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <span>Inquire About This Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
