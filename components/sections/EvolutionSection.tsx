'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// HIGH-FIDELITY PATHS (12 Points for smoother morphing)
// SQUARE (12 pts)
const PATH_SQUARE = "M50,10 L75,10 L90,10 L90,50 L90,90 L50,90 L10,90 L10,50 L10,10 L25,10 L50,10 Z";

// TRIANGLE (12 pts - Top point splits into merged top edge of square)
const PATH_TRIANGLE = "M50,10 L63,36 L76,63 L90,90 L70,90 L50,90 L30,90 L10,90 L23,63 L36,36 L50,10 Z";

// CIRCLE (Standard Bezier - Flubber handles the poly-to-curve transition well)
const PATH_CIRCLE = "M50,10 C72,10 90,28 90,50 C90,72 72,90 50,90 C28,90 10,72 10,50 C10,28 28,10 50,10 Z";

export function EvolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);

  // Word data for scattering/gathering effect
  const words = ["Ideas", "Code", "Design", "Tech", "Process", "Testing", "Launch", "Iterate"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pathRef.current) return;

      // Set initial scattered positions for words
      wordsRef.current.forEach((wordEl) => {
        if (wordEl) {
          gsap.set(wordEl, {
            x: (Math.random() - 0.5) * 800,
            y: (Math.random() - 0.5) * 600,
            opacity: 0.8,
            scale: 0.9
          });
        }
      });

      // Hide SVG initially
      gsap.set(svgRef.current, { autoAlpha: 0 });

      // Create scroll-triggered timeline
      // Using a virtual duration of 100 for easy percentage mapping
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=700%"
        }
      });

      // --- PHASE 1: CHAOS -> STRUCTURE (0-35%) ---
      // Words move to form the PERFECT SQUARE PERIMETER
      // Square size: 300x300 => dist from center is 150
      const squareCoords = [
        { x: -150, y: -150 }, // Top Left
        { x: 0, y: -150 }, // Top Center
        { x: 150, y: -150 }, // Top Right
        { x: 150, y: 0 },    // Right Middle
        { x: 150, y: 150 },  // Bottom Right
        { x: 0, y: 150 },  // Bottom Center
        { x: -150, y: 150 },  // Bottom Left
        { x: -150, y: 0 },    // Left Middle
      ];

      wordsRef.current.forEach((wordEl, i) => {
        if (wordEl) {
          const target = squareCoords[i % squareCoords.length];
          tl.to(wordEl, {
            x: target.x,
            y: target.y,
            opacity: 1,
            scale: 1,
            duration: 35, // 0 -> 35 (Slower gather)
            ease: "power2.inOut"
          }, 0);
        }
      });

      // --- PHASE 2: THE WELD (35-40%) ---
      // Words dissolve into the solid square
      tl.to([wordsRef.current.filter(Boolean), centerTextRef.current], {
        autoAlpha: 0,
        duration: 5
      }, 35);

      tl.to(svgRef.current, {
        autoAlpha: 1,
        duration: 5
      }, 35);

      // Set initial square path
      gsap.set(pathRef.current, {
        attr: { d: PATH_SQUARE }
      });

      // --- PHASE 3: HOLD SQUARE (40-50%) ---
      // Pause (10 units)

      // --- PHASE 4: LIQUID MORPH 1 (SQUARE -> TRIANGLE) (50-65%) ---
      // Slower, viscous morph (15 units)
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 15,
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 50);

      // --- PHASE 5: HOLD TRIANGLE (65-70%) ---
      // Pause (5 units)

      // --- PHASE 6: LIQUID MORPH 2 (TRIANGLE -> CIRCLE) (70-85%) ---
      // Slower, viscous morph (15 units)
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 15,
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 70);

      // --- PHASE 7: FINAL STATE (85-100%) ---
      // Final Text Reveal
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 15,
        ease: "none"
      }, 85);

      // Heartbeat/pulse effect (independent loops)
      gsap.to(svgRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut"
      });

    }, containerRef);

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
        className="evolution-center-text font-display font-bold text-5xl text-brand-black absolute z-10"
      >
        Mykyta Polovianiuk
      </div>

      {/* Scattered words */}
      {words.map((word, index) => (
        <div
          key={word}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="absolute font-display font-bold text-xl text-brand-black whitespace-nowrap"
        >
          {word}
        </div>
      ))}

      {/* Morphing SVG */}
      <svg
        ref={svgRef}
        className="w-[300px] h-[300px] absolute z-20"
        viewBox="0 0 100 100"
      >
        <path
          ref={pathRef}
          fill="black"
        />
      </svg>

      {/* Final text */}
      <div
        ref={finalTextRef}
        className="font-display font-bold text-2xl text-brand-black absolute bottom-20 z-30 opacity-0"
      >
        everything starts as a shape.
      </div>
    </div>
  );
}