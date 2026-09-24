import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const images = (project.images && project.images.length > 0)
    ? project.images
    : (project.imageSrc ? [project.imageSrc] : []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-[calc(100vw-1rem)] sm:max-w-3xl bg-[#0f1118] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl my-4 sm:my-8 text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-30"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Title */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              {project.categoryLabel}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">{project.clientIndustry}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {project.title}
          </h2>
          <p className="text-sm text-zinc-400 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Media Preview Slider */}
        {images.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="relative w-full max-w-full h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black group/modalSlider">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={images[activeImageIndex]}
                  alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-xs text-zinc-300 font-mono">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-white scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Impact Metrics Banner */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
          {project.impactMetrics.map((metric) => (
            <div key={metric.label} className="text-center space-y-0.5">
              <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">
                {metric.value}
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Problem & Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#141722] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wide block">
              The Client Challenge
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#141722] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">
              Our Technical Solution
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-semibold text-zinc-400 block">
            Core Technology Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed deployment & post-launch support included</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              <span>Build a System Like This</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
