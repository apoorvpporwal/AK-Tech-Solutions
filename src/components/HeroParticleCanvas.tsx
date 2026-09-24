import React, { useEffect, useRef } from 'react';

interface HeroParticleCanvasProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseVal: number;
  color: string;
}

interface PulsePacket {
  p1: Particle;
  p2: Particle;
  progress: number;
  speed: number;
}

export const HeroParticleCanvas: React.FC<HeroParticleCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Find the enclosing section to capture mouse events across the entire hero
    const parentSection = canvas.closest('section') || canvas.parentElement;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Check for user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth mouse coordinate tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 150
    };

    let particles: Particle[] = [];
    let pulses: PulsePacket[] = [];
    const maxConnectionDist = 125;

    const initCanvasSize = () => {
      if (!canvas || !parentSection) return;
      const rect = parentSection.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      // Density calculation: balanced for high performance and visual elegance
      const area = width * height;
      const count = Math.min(Math.max(Math.floor(area / 16000), 32), 75);

      particles = [];
      const colors = ['#ffffff', '#f1f5f9', '#e2e8f0', '#94a3b8'];

      for (let i = 0; i < count; i++) {
        // 18% of particles have high-tech electric cyan / emerald hue
        const isCyan = Math.random() < 0.14;
        const isEmerald = !isCyan && Math.random() < 0.08;

        let nodeColor = colors[Math.floor(Math.random() * colors.length)];
        if (isCyan) nodeColor = '#38bdf8';
        if (isEmerald) nodeColor = '#34d399';

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.4),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.4),
          radius: (isCyan || isEmerald) ? Math.random() * 1.4 + 1.2 : Math.random() * 1.1 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2,
          alpha: 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.012,
          pulseVal: Math.random() * Math.PI * 2,
          color: nodeColor
        });
      }
    };

    // Event handlers attached to parent section so hover and click work everywhere
    const handleMouseMove = (e: MouseEvent) => {
      if (!parentSection) return;
      const rect = parentSection.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      if (!parentSection) return;
      const rect = parentSection.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Subtle ripple acceleration to nearby nodes
      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 220 && dist > 1) {
          const force = (1 - dist / 220) * 2.2;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!parentSection || !e.touches[0]) return;
      const rect = parentSection.getBoundingClientRect();
      mouse.targetX = e.touches[0].clientX - rect.left;
      mouse.targetY = e.touches[0].clientY - rect.top;
      mouse.active = true;
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    // Visibility observer to pause RAF when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (parentSection) {
      observer.observe(parentSection);
      parentSection.addEventListener('mousemove', handleMouseMove, { passive: true });
      parentSection.addEventListener('mouseleave', handleMouseLeave);
      parentSection.addEventListener('click', handleClick);
      parentSection.addEventListener('touchmove', handleTouchMove, { passive: true });
      parentSection.addEventListener('touchend', handleTouchEnd);
    }

    window.addEventListener('resize', initCanvasSize);
    initCanvasSize();

    let lastPulseTime = 0;
    let lastFrameTime = performance.now();

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((currentTime - lastFrameTime) / 1000, 0.1);
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position easing
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Periodically trigger a subtle synaptic pulse packet across connected nodes
      if (currentTime - lastPulseTime > 2000 && particles.length > 2) {
        lastPulseTime = currentTime;
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        let nearest: Particle | null = null;
        let minDist = maxConnectionDist;
        for (const p2 of particles) {
          if (p1 === p2) continue;
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < minDist) {
            minDist = d;
            nearest = p2;
          }
        }
        if (nearest) {
          pulses.push({
            p1,
            p2: nearest,
            progress: 0,
            speed: Math.random() * 0.7 + 0.6
          });
        }
      }

      // Draw inter-particle connections and cursor connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections between neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDist) {
            const alphaFactor = 1 - dist / maxConnectionDist;
            const lineAlpha = alphaFactor * 0.15; // Refined, non-intrusive line opacity

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Give subtle cyan tint to connections involving accent nodes
            if (p1.color === '#38bdf8' || p2.color === '#38bdf8') {
              ctx.strokeStyle = `rgba(56, 189, 248, ${(lineAlpha * 1.3).toFixed(3)})`;
              ctx.lineWidth = 0.85;
            } else if (p1.color === '#34d399' || p2.color === '#34d399') {
              ctx.strokeStyle = `rgba(52, 211, 153, ${(lineAlpha * 1.2).toFixed(3)})`;
              ctx.lineWidth = 0.85;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();
          }
        }

        // Connect nearby particles to the mouse pointer
        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < mouse.radius) {
            const mAlpha = (1 - mdist / mouse.radius) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Organic buoyancy away from cursor
            const force = (1 - mdist / mouse.radius) * 0.35;
            p1.vx += (mdx / mdist) * force * 0.35;
            p1.vy += (mdy / mdist) * force * 0.35;
          }
        }
      }

      // Render synaptic signal pulses along active edges
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * dt;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = pulse.p1.x + (pulse.p2.x - pulse.p1.x) * pulse.progress;
        const py = pulse.p1.y + (pulse.p2.y - pulse.p1.y) * pulse.progress;
        const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.7;

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${pulseAlpha.toFixed(3)})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and render particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Dampen back to ambient speed
        p.vx *= 0.988;
        p.vy *= 0.988;

        // Soft bounce at viewport boundary
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Pulse intensity
        p.pulseVal += p.pulseSpeed;
        const pulseAlpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.18;
        p.alpha = Math.max(0.12, Math.min(0.85, pulseAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.color === '#38bdf8') {
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha.toFixed(3)})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
          ctx.shadowBlur = 5;
        } else if (p.color === '#34d399') {
          ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha.toFixed(3)})`;
          ctx.shadowColor = 'rgba(52, 211, 153, 0.4)';
          ctx.shadowBlur = 5;
        } else {
          ctx.fillStyle = `rgba(248, 250, 252, ${p.alpha.toFixed(3)})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Subtle interactive cursor point
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', initCanvasSize);
      if (parentSection) {
        parentSection.removeEventListener('mousemove', handleMouseMove);
        parentSection.removeEventListener('mouseleave', handleMouseLeave);
        parentSection.removeEventListener('click', handleClick);
        parentSection.removeEventListener('touchmove', handleTouchMove);
        parentSection.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 z-[2] pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85"
      />
    </div>
  );
};
