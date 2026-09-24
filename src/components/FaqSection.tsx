import React, { useState } from 'react';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '../data/agencyData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 bg-[#f8f9fa] border-t border-zinc-200 relative text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Find answers to the most common questions about our services, process, and more.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-zinc-300 shadow-md'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-zinc-900 font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions helper */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 mb-1">
              Have a specific question about your project?
            </h4>
            <p className="text-xs text-zinc-600">
              Speak directly with our technical lead on WhatsApp for instant clarification.
            </p>
          </div>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shrink-0 shadow-md cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
