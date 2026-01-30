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
      // 0.0 - 0.125: Top Center -> Top Right
      if (t < 0.125) {
        const p = t / 0.125;
        x = 50 + p * 40; y = 10;
      }
      // 0.125 - 0.375: Right
      else if (t < 0.375) {
        const p = (t - 0.125) / 0.25;
        x = 90; y = 10 + p * 80;
      }
      // 0.375 - 0.625: Bottom
      else if (t < 0.625) {
        const p = (t - 0.375) / 0.25;
        x = 90 - p * 80; y = 90;
      }
      // 0.625 - 0.875: Left
      else if (t < 0.875) {
        const p = (t - 0.625) / 0.25;
        x = 10; y = 90 - p * 80;
      }
      // 0.875 - 1.0: Top Left -> Top Center
      else {
        const p = (t - 0.875) / 0.125;
        x = 10 + p * 40; y = 10;
      }
    }
    else if (type === 'triangle') {
      // Top(50,10) -> BR(90,90) -> BL(10,90) -> Top
      if (t < 0.333) {
        const p = t / 0.333;
        x = 50 + p * 40; y = 10 + p * 80;
      } else if (t < 0.666) {
        const p = (t - 0.333) / 0.333;
        x = 90 - p * 80; y = 90;
      } else {
        const p = (t - 0.666) / 0.333;
        x = 10 + p * 40; y = 90 - p * 80;
      }
    }
    else if (type === 'circle') {
      // Start -90deg (Top)
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
  const finalTextRef = useRef<HTMLDivElement>(null); // Replaced by Transition effect
  const centerTextRef = useRef<HTMLDivElement>(null);

  const words = ["Ideas", "Code", "Design", "Tech", "Process", "Testing", "Launch", "Iterate"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pathRef.current) return;

      // --- INITIAL STATES ---
      wordsRef.current.forEach((wordEl) => {
        if (wordEl) {
          gsap.set(wordEl, {
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            letterSpacing: '0px'
          });
        }
      });

      gsap.set(centerTextRef.current, { scale: 1, opacity: 1, letterSpacing: '0px' });
      gsap.set(svgRef.current, { autoAlpha: 1, scale: 0.05, opacity: 0 }); // Hidden
      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });

      // --- MASTER TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          end: "+=1000%",
          onEnter: () => onToggleHeader?.(false),
          onLeaveBack: () => onToggleHeader?.(true)
        }
      });

      // --- PHASE 1: KINETIC COLLAPSE (0-25%) ---
      // Words & Text compress significantly

      const compressParams = {
        x: 0,
        y: 0,
        scale: 0.05,
        letterSpacing: '-50px', // EXTREME JAGGED COLLAPSE
        opacity: 1,
        duration: 25, // 0->25
        ease: "expo.in"
      };

      wordsRef.current.forEach((wordEl) => tl.to(wordEl, compressParams, 0));
      tl.to(centerTextRef.current, compressParams, 0);

      // --- PHASE 2: EXPLOSION (25-27%) ---
      // Swap Instantly
      tl.to([wordsRef.current, centerTextRef.current], { autoAlpha: 0, duration: 0.1 }, 25);
      tl.to(svgRef.current, { autoAlpha: 1, duration: 0.1 }, 25);

      // Boom
      tl.to(svgRef.current, {
        scale: 1,
        duration: 2, // 25->27
        ease: "elastic.out(1, 0.4)"
      }, 25.1);

      // --- PHASE 3: MORPHING (27-75%) ---

      // Hold Square: 27-40

      // Morph Square -> Triangle: 40-50
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };
      tl.to(proxy1, {
        progress: 1, duration: 10, ease: "linear",
        onUpdate: () => pathRef.current && pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress))
      }, 40);

      // Hold Triangle: 50-60

      // Morph Triangle -> Circle: 60-70
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };
      tl.to(proxy2, {
        progress: 1, duration: 10, ease: "linear",
        onUpdate: () => pathRef.current && pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress))
      }, 60);

      // Hold Circle: 70-75 (Prepare for flight)


      // --- PHASE 4: FLY DOWN (TRANSITION) (75-100%) ---
      // Circle zooms out and moves to top-right of the Next Section.
      // Assuming Next Section starts immediately after.
      // We are Pinned. Moving relative to the viewport center.
      // Move Down: +100vh (approximately pushing it offscreen/into next section space? No, pinned element stays in view).
      // Wait, if it's pinned, "moving down" physically moves it down the screen.
      // To "land" in the next section, we want it to end up in a position that MATCHES the next section's layout.

      tl.to(svgRef.current, {
        x: "30vw",   // Move Right
        y: "35vh",   // Move Down (towards bottom right corner)
        scale: 0.6,
        duration: 25, // 75 -> 100
        ease: "power2.inOut"
      }, 75);

    });

    // Pulse Trigger (Project Section)
    const pulseTween = gsap.to(svgRef.current, {
      scale: 0.65,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut",
      paused: true
    });

    ScrollTrigger.create({
      trigger: "#project-section",
      start: "top center",
      onEnter: () => pulseTween.play(),
      onLeaveBack: () => pulseTween.pause()
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
        className="evolution-center-text font-display font-bold text-5xl text-brand-black absolute z-10 origin-center"
      >
        Mykyta Polovianiuk
      </div>

      {/* Scattered words */}
      {words.map((word, index) => (
        <div
          key={word}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="absolute font-display font-bold text-xl text-brand-black whitespace-nowrap origin-center"
        >
          {word}
        </div>
      ))}

      {/* Morphing SVG */}
      <svg
        ref={svgRef}
        className="w-[300px] h-[300px] absolute z-20 origin-center"
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