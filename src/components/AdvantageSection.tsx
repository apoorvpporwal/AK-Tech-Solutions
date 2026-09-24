import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Headphones, 
  ChevronLeft, 
  ChevronRight,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Building,
  Factory,
  Lock,
  Hotel,
  Store,
  Sparkles
} from 'lucide-react';
import { TESTIMONIALS_DATA, INDUSTRIES_DATA } from '../data/agencyData';

gsap.registerPlugin(ScrollTrigger);

export const AdvantageSection: React.FC = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const currentTestimonial = TESTIMONIALS_DATA[currentTestimonialIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Advantage Cards
      const advCards = leftColRef.current?.querySelectorAll('.advantage-card-item');
      if (advCards && advCards.length > 0) {
        gsap.fromTo(
          advCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Animate Industry Cards
      const indCards = rightColRef.current?.querySelectorAll('.industry-tile-item');
      if (indCards && indCards.length > 0) {
        gsap.fromTo(
          indCards,
          { opacity: 0, scale: 0.92, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: rightColRef.current,
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

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const getIndustryIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-zinc-800" };
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Building': return <Building {...props} />;
      case 'Factory': return <Factory {...props} />;
      case 'ShieldCheck': return <Lock {...props} />;
      case 'Hotel': return <Hotel {...props} />;
      case 'Store': return <Store {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const advantages = [
    {
      title: 'Tailored Solutions',
      desc: 'No one-size-fits-all. We build what fits your business.',
      icon: <CheckCircle2 className="w-5 h-5 text-zinc-900" />
    },
    {
      title: 'Fast & Reliable',
      desc: 'Optimized for speed, performance and security.',
      icon: <Zap className="w-5 h-5 text-zinc-900" />
    },
    {
      title: 'Transparent Process',
      desc: 'Clear communication, regular updates and zero surprises.',
      icon: <ShieldCheck className="w-5 h-5 text-zinc-900" />
    },
    {
      title: 'Ongoing Support',
      desc: "We're with you, even after launch.",
      icon: <Headphones className="w-5 h-5 text-zinc-900" />
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-24 bg-[#f8f9fa] border-t border-zinc-200 relative text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Why Choose AK Tech Solutions + Testimonial */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                The Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-display">
                Why Choose AK Tech Solutions?
              </h2>
              <p className="text-base text-zinc-600 max-w-xl leading-relaxed">
                We're not just developers — we're your technology partners. We focus on real business outcomes, clean code, and long-term support.
              </p>
            </div>

            {/* 4 Advantage Grid Cards with Hover Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantages.map((adv, index) => (
                <div key={adv.title} className="advantage-card-item">
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 transition-all flex items-start gap-4 shadow-sm h-full"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                      {adv.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 mb-1 font-display">
                        {adv.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                        {adv.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote Slider Box matching dark card in reference */}
            <motion.div 
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl bg-[#0c0d12] text-white border border-zinc-800 p-6 sm:p-7 shadow-xl overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-3xl font-serif text-white/40 leading-none">“</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Animated Text on Slide Transition */}
              <div className="min-h-[70px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm sm:text-base font-medium text-zinc-200 leading-relaxed italic mb-6"
                  >
                    "{currentTestimonial.quote}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center font-bold text-white text-xs">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </div>
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonialIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentTestimonialIndex === idx
                          ? 'w-5 bg-white'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Industries We Work With */}
          <div ref={rightColRef} className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Industries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-display">
                Industries We Work With
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                We serve businesses across various industries, helping them grow with technology.
              </p>
            </div>

            {/* 3x3 Grid of Industry Tiles with Micro-Interactions */}
            <div className="grid grid-cols-3 gap-3">
              {INDUSTRIES_DATA.map((ind) => (
                <div key={ind.id} className="industry-tile-item">
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="bg-[#f8f9fa] hover:bg-zinc-100 p-4 rounded-xl border border-zinc-200/80 transition-colors flex flex-col items-center justify-center text-center space-y-2 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-2xs group-hover:border-zinc-300 transition-colors">
                      {getIndustryIcon(ind.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-zinc-800">
                      {ind.name}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom trust remark */}
            <div className="mt-6 pt-4 border-t border-zinc-200 text-center">
              <p className="text-[11px] text-zinc-500">
                Custom architecture built specifically for regulated compliance, speed, and client conversion.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
