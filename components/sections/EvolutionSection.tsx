'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. GENERATE PATHS (120 pts, 12 o'clock start)
const createPolygon = (type: 'square' | 'triangle' | 'circle', points = 120) => {
  const data = [];
  const cx = 50, cy = 50;

  for (let i = 0; i < points; i++) {
    const t = i / points;
    let x = 0, y = 0;

    if (type === 'square') {
      if (t < 0.125) {
        const p = t / 0.125;
        x = 50 + p * 40; y = 10;
      }
      else if (t < 0.375) {
        const p = (t - 0.125) / 0.25;
        x = 90; y = 10 + p * 80;
      }
      else if (t < 0.625) { // BOTTOM EDGE
        const p = (t - 0.375) / 0.25;
        x = 90 - p * 80; y = 90;
      }
      else if (t < 0.875) {
        const p = (t - 0.625) / 0.25;
        x = 10; y = 90 - p * 80;
      }
      else {
        const p = (t - 0.875) / 0.125;
        x = 10 + p * 40; y = 10;
      }
    }
    else if (type === 'triangle') {
      if (t < 0.333) {
        const p = t / 0.333;
        x = 50 + p * 40; y = 10 + p * 80;
      } else if (t < 0.666) { // BOTTOM EDGE (Matches Square)
        const p = (t - 0.333) / 0.333;
        x = 90 - p * 80; y = 90;
      } else {
        const p = (t - 0.666) / 0.333;
        x = 10 + p * 40; y = 90 - p * 80;
      }
    }
    else if (type === 'circle') {
      const angle = (t * Math.PI * 2) - (Math.PI / 2);
      x = cx + 40 * Math.cos(angle);
      y = cy + 40 * Math.sin(angle);
    }
    data.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M" + data[0] + " L" + data.slice(1).join(" L") + " Z";
};

const PATH_SQUARE = createPolygon('square');
const PATH_TRIANGLE = createPolygon('triangle');
const PATH_CIRCLE = createPolygon('circle');

interface EvolutionSectionProps {
  onToggleHeader?: (visible: boolean) => void;
}

export function EvolutionSection({ onToggleHeader }: EvolutionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null); // Kept for Arrow
  const textRef = useRef<HTMLDivElement>(null); // Restoration: Text Ref

  const words = ["Ideas", "Code", "Design", "Tech", "Process", "Testing", "Launch", "Iterate"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pathRef.current) return;

      // Ensure window is defined (useLayoutEffect runs on client)
      const isMobile = window.innerWidth < 768;

      // --- INITIAL STATES ---
      // Scatter Range: Mobile (50vw), Desktop (90vw)
      const scatterSpreadX = isMobile ? 50 : 90;
      const scatterSpreadY = isMobile ? 50 : 60;

      wordsRef.current.forEach((wordEl, i) => {
        if (wordEl) {
          const xVar = (Math.random() - 0.5) * scatterSpreadX;
          const yVar = (Math.random() - 0.5) * scatterSpreadY;

          gsap.set(wordEl, {
            x: xVar + "vw",
            y: yVar + "vh",
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            letterSpacing: '0px'
          });
        }
      });

      gsap.set(centerTextRef.current, { scale: 1, opacity: 1, letterSpacing: '0px' });
      gsap.set(svgRef.current, { autoAlpha: 1, scale: 0.01, opacity: 0 });
      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });
      gsap.set(introRef.current, { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          end: "+=1000%",
          onEnter: () => onToggleHeader?.(false),
          onLeaveBack: () => onToggleHeader?.(true),
          invalidateOnRefresh: true,
        }
      });

      // Hide Scatter Text on Scroll
      tl.to(introRef.current, { autoAlpha: 0, duration: 2 }, 0);

      // --- PHASE 1: KINETIC COLLAPSE (0-20%) ---
      const compressParams = {
        x: 0,
        y: 0,
        scale: 0.05,
        letterSpacing: '-50px',
        opacity: 1,
        duration: 20,
        ease: "expo.in"
      };

      wordsRef.current.forEach((wordEl) => tl.to(wordEl, compressParams, 0));
      tl.to(centerTextRef.current, compressParams, 0);

      // --- PHASE 2: EXPLOSION (20-25%) ---
      tl.to([wordsRef.current, centerTextRef.current], { autoAlpha: 0, duration: 0.1 }, 20);
      tl.to(svgRef.current, { autoAlpha: 1, duration: 0.1 }, 20);

      tl.to(svgRef.current, {
        scale: 1,
        duration: 5,
        ease: "elastic.out(1, 0.4)"
      }, 20.1);

      // --- PHASE 3: MORPHING (25-75%) ---
      // Square -> Triangle
      tl.to(pathRef.current, {
        attr: { d: PATH_TRIANGLE },
        duration: 20,
        ease: "power1.inOut"
      }, 25);

      // Restoration: Philosophy Text Fade In (45-70)
      tl.to(textRef.current, {
        autoAlpha: 1,
        duration: 25,
        ease: "power2.inOut"
      }, 45);

      // Triangle -> Circle
      tl.to(pathRef.current, {
        attr: { d: PATH_CIRCLE },
        duration: 20,
        ease: "power1.inOut"
      }, 50);

      // --- PHASE 4: TRANSITION (75-85%) ---
      tl.to([svgRef.current, textRef.current], {
        autoAlpha: 0,
        scale: 0.8,
        duration: 10,
        ease: "power2.inOut"
      }, 75);

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-brand-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Center fixed text */}
      <div
        ref={centerTextRef}
        className="evolution-center-text font-display font-bold text-[6.5vw] md:text-5xl text-brand-black absolute z-10 origin-center top-1/2 -translate-y-1/2 whitespace-nowrap"
      >
        Mykyta Polovianiuk
      </div>

      {/* Intro Arrow & Text (Fade Out on Scroll) */}
      <div
        ref={introRef}
        className="absolute bottom-10 flex flex-col items-center gap-4 z-10 text-brand-black pointer-events-none"
      >
        <svg width="24" height="24" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M12 4V20M12 20L18 14M12 20L6 14" />
        </svg>
      </div>

      {/* Scattered words */}
      {words.map((word, index) => (
        <div
          key={word}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="absolute font-display font-bold text-[4.5vw] md:text-3xl text-brand-black whitespace-nowrap origin-center"
        >
          {word}
        </div>
      ))}

      {/* Philosophy Text (Restored) */}
      <div
        ref={textRef}
        className="font-display font-bold text-md md:text-2xl text-brand-black absolute bottom-50 z-30 opacity-0 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        everything starts as a shape.
      </div>

      {/* Morphing SVG */}
      <svg
        ref={svgRef}
        className="w-[80vw] max-w-[300px] aspect-square absolute z-20 origin-center will-change-transform"
        viewBox="0 0 100 100"
      >
        <path
          ref={pathRef}
          fill="black"
        />
      </svg>
    </div>
  );
}