import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowRight,
  Globe, 
  Palette, 
  Cpu, 
  Target, 
  Mail, 
  MessageSquare, 
  Sliders, 
  Database, 
  FileText, 
  BarChart3, 
  Sparkles, 
  Search
} from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onExploreAll: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectService,
  onExploreAll 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current?.querySelectorAll('.service-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Icon mapper for consistent aesthetic
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-white" };
    switch (iconName) {
      case 'Code': return <Globe {...props} />;
      case 'Layout': return <Palette {...props} />;
      case 'Bot': return <Cpu {...props} />;
      case 'Target': return <Target {...props} />;
      case 'Mail': return <Mail {...props} />;
      case 'MessageSquare': return <MessageSquare {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Database': return <Database {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Search': return <Search {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="py-24 bg-[#0a0b0e] border-t border-white/[0.06] relative text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              What We Do
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Our Services
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              We provide end-to-end tech solutions to help businesses establish their digital presence, automate their workflows and achieve sustainable growth.
            </p>
          </div>

          <div>
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-200 bg-[#141720] hover:bg-[#1a1f2c] border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 12 Services Grid with GSAP Entrance + Framer Motion Floating Animation */}
        <div 
          ref={cardsContainerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="service-card-item h-full"
            >
              {/* Framer-motion subtle floating card */}
              <motion.div
                animate={{
                  y: [0, (index % 2 === 0 ? -5 : -7), 0],
                }}
                transition={{
                  duration: 4.5 + (index % 4) * 0.6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: (index % 4) * 0.25,
                }}
                whileHover={{
                  y: -9,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                onClick={() => onSelectService(service)}
                className="group relative h-full bg-[#0f1117] hover:bg-[#141720] p-6 rounded-2xl border border-white/[0.07] hover:border-white/20 transition-colors duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl hover:shadow-white/[0.02]"
              >
                <div>
                  {/* Header: Icon & Subtle Chevron */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 font-display group-hover:text-zinc-100 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer with timeline preview */}
                <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                  <span>{service.timeline}</span>
                  <span className="text-zinc-400 group-hover:text-white transition-colors font-medium">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
