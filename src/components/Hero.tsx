import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';
import { Logo } from './Logo';
import { HeroParticleCanvas } from './HeroParticleCanvas';

interface HeroProps {
  onGetStarted: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onViewWork }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#08090b] pt-32 sm:pt-36 pb-20 lg:pb-28"
    >
      {/* Background Image with Reduced Intensity & Buttery Smooth Ambient Floating */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        animate={{
          scale: [1.02, 1.05, 1.02],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <img
          src="/src/assets/images/hero_cover_bg_1790231026481.jpg"
          alt="AK Tech Solutions Hero Tech Canvas"
          className="w-full h-full object-cover object-center opacity-20 mix-blend-luminosity"
          loading="eager"
        />
        {/* Layered Gradient Overlays to preserve dark theme and high readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090b]/90 via-[#08090b]/70 to-[#08090b]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08090b]/50 to-[#08090b]" />
        <div className="absolute inset-0 tech-grid-pattern opacity-25" />
      </motion.div>

      {/* Interactive Neural Particle Canvas Network */}
      <HeroParticleCanvas />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Grid: Side-by-Side on Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Copy, Actions & Stats */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Kicker Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-zinc-300 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Technology</span>
              <span className="text-zinc-600">×</span>
              <span>Automation</span>
              <span className="text-zinc-600">×</span>
              <span>Growth</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08] font-display">
                Build Smarter.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Grow Faster.
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal"
            >
              <strong className="text-white font-semibold">{COMPANY_INFO.name}</strong> is a modern tech agency helping businesses build powerful websites, automate processes with AI, and optimize their operations for long-term growth.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-black bg-white hover:bg-zinc-200 transition-all shadow-xl hover:shadow-white/20 active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onViewWork}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-zinc-200 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all cursor-pointer"
              >
                <span>View Our Work</span>
              </button>
            </motion.div>

            {/* Capability Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300 font-medium">
                <Code2 className="w-3 h-3 text-zinc-400" />
                Web Development
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300 font-medium">
                <Cpu className="w-3 h-3 text-zinc-400" />
                AI Automation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300 font-medium">
                <TrendingUp className="w-3 h-3 text-zinc-400" />
                Lead Generation
              </span>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-8 max-w-lg"
            >
              {COMPANY_INFO.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: High-Fidelity Floating Device Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-white/10 via-zinc-500/5 to-transparent rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            {/* Smooth Floating Container */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              className="relative w-full max-w-lg group"
            >
              {/* Floating Pill Badge 1: Top Left */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.4 }}
                className="absolute -top-4 left-4 sm:left-8 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131a]/95 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-2xl"
              >
                <Logo variant="mark-only" size="sm" className="h-3.5 w-auto" />
                <span>AK Tech Architecture</span>
              </motion.div>

              {/* Floating Pill Badge 2: Top Right */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-10 -right-2 sm:right-2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131a]/95 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-2xl"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI Automation</span>
              </motion.div>

              {/* Floating Pill Badge 3: Bottom */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-4 right-6 sm:right-10 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131a]/95 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-2xl"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Proven Conversion Systems</span>
              </motion.div>

              {/* Showcase Image Frame */}
              <div className="rounded-2xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/15 shadow-2xl overflow-hidden backdrop-blur-md">
                <img
                  src="/src/assets/images/hero_device_composition_1790230303735.jpg"
                  alt="AK Tech Solutions Hardware & Software Preview"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="eager"
                />
                {/* Subtle glass reflection highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#08090b] via-transparent to-transparent pointer-events-none opacity-40" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
