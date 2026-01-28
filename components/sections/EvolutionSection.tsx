'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// HIGH-DENSITY 60-POINT PATHS (15 pts per side) - Perfect perimeter mapping
const PATH_SQUARE = "M50,10 L52.6,10 L55.3,10 L58,10 L60.6,10 L63.3,10 L66,10 L68.6,10 L71.3,10 L74,10 L76.6,10 L79.3,10 L82,10 L84.6,10 L87.3,10 L90,10 L90,12.6 L90,15.3 L90,18 L90,20.6 L90,23.3 L90,26 L90,28.6 L90,31.3 L90,34 L90,36.6 L90,39.3 L90,42 L90,44.6 L90,47.3 L90,50 L90,52.6 L90,55.3 L90,58 L90,60.6 L90,63.3 L90,66 L90,68.6 L90,71.3 L90,74 L90,76.6 L90,79.3 L90,82 L90,84.6 L90,87.3 L90,90 L87.3,90 L84.6,90 L82,90 L79.3,90 L76.6,90 L74,90 L71.3,90 L68.6,90 L66,90 L63.3,90 L60.6,90 L58,90 L55.3,90 L52.6,90 L50,90 L47.3,90 L44.6,90 L42,90 L39.3,90 L36.6,90 L34,90 L31.3,90 L28.6,90 L26,90 L23.3,90 L20.6,90 L18,90 L15.3,90 L12.6,90 L10,90 L10,87.3 L10,84.6 L10,82 L10,79.3 L10,76.6 L10,74 L10,71.3 L10,68.6 L10,66 L10,63.3 L10,60.6 L10,58 L10,55.3 L10,52.6 L10,50 L10,47.3 L10,44.6 L10,42 L10,39.3 L10,36.6 L10,34 L10,31.3 L10,28.6 L10,26 L10,23.3 L10,20.6 L10,18 L10,15.3 L10,12.6 L10,10 L12.6,10 L15.3,10 L18,10 L20.6,10 L23.3,10 L26,10 L28.6,10 L31.3,10 L34,10 L36.6,10 L39.3,10 L42,10 L44.6,10 L47.3,10 L50,10 Z";

// 60-point TRIANGLE (20 pts per side)
const PATH_TRIANGLE = "M50,10 L52,14 L54,18 L56,22 L58,26 L60,30 L62,34 L64,38 L66,42 L68,46 L70,50 L72,54 L74,58 L76,62 L78,66 L80,70 L82,74 L84,78 L86,82 L88,86 L90,90 L86,90 L82,90 L78,90 L74,90 L70,90 L66,90 L62,90 L58,90 L54,90 L50,90 L46,90 L42,90 L38,90 L34,90 L30,90 L26,90 L22,90 L18,90 L14,90 L10,90 L12,86 L14,82 L16,78 L18,74 L20,70 L22,66 L24,62 L26,58 L28,54 L30,50 L32,46 L34,42 L36,38 L38,34 L40,30 L42,26 L44,22 L46,18 L48,14 L50,10 Z";

// 60-point CIRCLE (Approximation)
const PATH_CIRCLE = "M50,10 C52.2,10 54.4,10.2 56.6,10.5 C58.7,10.9 60.9,11.4 63,12 C65.1,12.7 67.1,13.5 69.1,14.4 C71.1,15.4 73,16.5 74.8,17.8 C76.6,19 78.3,20.4 79.9,21.9 C81.5,23.4 82.9,25 84.2,26.7 C85.5,28.4 86.6,30.2 87.6,32.1 C88.5,34 89.3,36 89.9,38 C90.4,40.1 90.8,42.2 90.9,44.4 C91,46.2 91,48.1 90.9,50 C90.8,52.2 90.4,54.4 89.9,56.5 C89.3,58.6 88.5,60.6 87.6,62.5 C86.6,64.4 85.5,66.2 84.2,67.9 C82.9,69.6 81.5,71.2 79.9,72.7 C78.3,74.2 76.6,75.6 74.8,76.8 C73,78.1 71.1,79.2 69.1,80.2 C67.1,81.1 65.1,81.9 63,82.6 C60.9,83.2 58.7,83.7 56.6,84.1 C54.4,84.4 52.2,84.6 50,84.6 C47.8,84.6 45.6,84.4 43.4,84.1 C41.3,83.7 39.1,83.2 37,82.6 C34.9,81.9 32.9,81.1 30.9,80.2 C28.9,79.2 27,78.1 25.2,76.8 C23.4,75.6 21.7,74.2 20.1,72.7 C18.5,71.2 17.1,69.6 15.8,67.9 C14.5,66.2 13.4,64.4 12.4,62.5 C11.5,60.6 10.7,58.6 10.1,56.5 C9.6,54.4 9.2,52.2 9.1,50 C9,48.1 9,46.2 9.1,44.4 C9.2,42.2 9.6,40.1 10.1,38 C10.7,35.9 11.5,33.9 12.4,32 C13.4,30.2 14.5,28.4 15.8,26.7 C17.1,25 18.5,23.4 20.1,21.9 C21.7,20.4 23.4,19 25.2,17.8 C27,16.5 28.9,15.4 30.9,14.4 C32.9,13.5 34.9,12.7 37,12 C39.1,11.4 41.3,10.9 43.4,10.5 C45.6,10.2 47.8,10 50,10 Z";

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

      // --- PHASE 1: CHAOS -> STRUCTURE (0-40%) ---
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
            duration: 40, // 0 -> 40
            ease: "power2.inOut"
          }, 0);
        }
      });

      // --- PHASE 2: THE WELD (40-45%) ---
      // Words dissolve into the solid square
      tl.to([wordsRef.current.filter(Boolean), centerTextRef.current], {
        autoAlpha: 0,
        duration: 5
      }, 40);

      tl.to(svgRef.current, {
        autoAlpha: 1,
        duration: 5
      }, 40);

      // Set initial square path
      gsap.set(pathRef.current, {
        attr: { d: PATH_SQUARE }
      });

      // --- PHASE 3: HOLD SQUARE (45-55%) ---
      // Pause

      // --- PHASE 4: FAST MORPH 1 (SQUARE -> TRIANGLE) (55-65%) ---
      // Reduced duration to 10 for sharper feeling
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 10,
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 55);

      // --- PHASE 5: HOLD TRIANGLE (65-70%) ---
      // Start fading in final text (0 -> 0.5)
      tl.to(finalTextRef.current, {
        autoAlpha: 0.5,
        duration: 5,
        ease: "none"
      }, 65);

      // --- PHASE 6: FAST MORPH 2 (TRIANGLE -> CIRCLE) (70-80%) ---
      // Reduced duration to 10 for sharper feeling
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 10,
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 70);

      // --- PHASE 7: FINAL STATE (80-100%) ---
      // Final Text Opacity -> 1
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 20,
        ease: "none"
      }, 80);

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