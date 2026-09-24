import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/agencyData';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects: () => void;
}

// Interactive Image Slider for each Project Card
const ProjectCardSlider: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const images = (project.images && project.images.length > 0)
    ? project.images
    : (project.imageSrc ? [project.imageSrc] : []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultiple = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleSelectDot = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[16/10] flex items-center justify-center bg-zinc-900 text-zinc-500 text-xs rounded-xl border border-white/10">
        <ImageIcon className="w-5 h-5 mr-2 opacity-50" />
        Preview Coming Soon
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#090a0d] border border-white/10 select-none group/slider">
      {/* Current Slide Image with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${project.title} - Slide ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>

      {/* Subtle Bottom Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117]/80 via-transparent to-transparent pointer-events-none opacity-40" />

      {/* Multiple Images Counter Badge */}
      {hasMultiple && (
        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300 pointer-events-none shadow-md">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Navigation Arrows for Slider */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project preview"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project preview"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => handleSelectDot(e, idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-4 bg-white'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const displayProjects = filter === 'all' 
    ? featuredProjects 
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#08090b] border-t border-white/[0.06] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Our Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Featured Projects
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              We've built solutions for businesses across multiple industries. Browse through our project showcases and interfaces.
            </p>
          </div>

          <button
            onClick={onViewAllProjects}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-zinc-300 transition-colors self-start md:self-end pb-1 border-b border-transparent hover:border-white cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Projects Grid with Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#0f1117] hover:bg-[#131620] rounded-2xl border border-white/[0.08] hover:border-white/20 p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-md hover:shadow-2xl"
            >
              <div className="space-y-4">
                {/* Interactive Multi-Image Slider */}
                <ProjectCardSlider project={project} />

                {/* Project Title & Category */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-zinc-100 transition-colors font-display">
                      {project.title}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">
                    {project.categoryLabel}
                  </p>
                </div>
              </div>

              {/* Tags Row */}
              <div className="pt-4 mt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-zinc-400 bg-white/[0.05] px-2.5 py-0.5 rounded border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
