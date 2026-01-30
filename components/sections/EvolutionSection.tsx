'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. GENERATE PATHS (CORRECTED MATCHING VERTICES AT 12 O'CLOCK)
// Keeping the proven 120-point logic
const createPolygon = (type: 'square' | 'triangle' | 'circle', points = 120) => {
  const data = [];
  const cx = 50, cy = 50;

  for (let i = 0; i < points; i++) {
    const t = i / points;
    let x = 0, y = 0;

    if (type === 'square') {
      if (t < 0.125) { // Top Center -> Top Right
        x = 50 + (t / 0.125) * 40; y = 10;
      } else if (t < 0.375) { // Right
        x = 90; y = 10 + ((t - 0.125) / 0.25) * 80;
      } else if (t < 0.625) { // Bottom
        x = 90 - ((t - 0.375) / 0.25) * 80; y = 90;
      } else if (t < 0.875) { // Left
        x = 10; y = 90 - ((t - 0.625) / 0.25) * 80;
      } else { // Top Left -> Top Center
        x = 10 + ((t - 0.875) / 0.125) * 40; y = 10;
      }
    }
    else if (type === 'triangle') {
      if (t < 0.333) {
        const lt = t / 0.333;
        x = 50 + lt * 40; y = 10 + lt * 80;
      } else if (t < 0.666) {
        const lt = (t - 0.333) / 0.333;
        x = 90 - lt * 80; y = 90;
      } else {
        const lt = (t - 0.666) / 0.333;
        x = 10 + lt * 40; y = 90 - lt * 80;
      }
    }
    else if (type === 'circle') {
      const angle = (t * Math.PI * 2) - (Math.PI / 2);
      const r = 40;
      x = cx + r * Math.cos(angle);
      y = cy + r * Math.sin(angle);
    }
    data.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M" + data[0] + " L" + data.slice(1).join(" L") + " Z";
};

const PATH_SQUARE = createPolygon('square');
const PATH_TRIANGLE = createPolygon('triangle');
const PATH_CIRCLE = createPolygon('circle');

export function EvolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const liquidContainerRef = useRef<HTMLDivElement>(null); // For Gooey Filter
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);

  const words = ["Ideas", "Code", "Design", "Tech", "Process", "Testing", "Launch", "Iterate"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pathRef.current) return;

      // --- INITIAL STATES ---
      // Words scattered
      wordsRef.current.forEach((wordEl) => {
        if (wordEl) {
          gsap.set(wordEl, {
            x: (Math.random() - 0.5) * 600, // Spread out widely
            y: (Math.random() - 0.5) * 400,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          });
        }
      });

      // Center Text
      gsap.set(centerTextRef.current, { scale: 1, opacity: 1 });

      // SVG Shape (The "Symbiote Core")
      // Starts invisible and small
      gsap.set(svgRef.current, {
        autoAlpha: 1,
        scale: 0,
        opacity: 0 // Hidden until "Birth"
      });

      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });
      gsap.set(finalTextRef.current, { autoAlpha: 0 });

      // --- MASTER TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=1000%"
        }
      });

      // --- PHASE 1: THE VORTEX (0-20%) ---
      // Slight rotation/swirl to create energy
      // We can swirl them by rotating the container or moving individual words in arcs?
      // Simple approach: random movement to "jitter" them before implosion
      wordsRef.current.forEach((wordEl, i) => {
        // Random swirling motion
        const angle = (i / words.length) * Math.PI * 2;
        tl.to(wordEl, {
          x: `+=${Math.cos(angle) * 50}`,
          y: `+=${Math.sin(angle) * 50}`,
          duration: 20,
          ease: "sine.inOut"
        }, 0);
      });


      // --- PHASE 2: THE IMPLOSION (SYMBIOTE ASSEMBLY) (20-35%) ---
      // All words & center text suck into (0,0)
      // Gooey filter will merge them into a blob

      wordsRef.current.forEach((wordEl) => {
        tl.to(wordEl, {
          x: 0,
          y: 0,
          scale: 0.5, // Don't scale to 0 completely, stay as a "clump"
          opacity: 1,  // Stay visible for the blob
          duration: 15, // 20->35
          ease: "expo.in"
        }, 20);
      });

      // Center text also implodes into the blob
      tl.to(centerTextRef.current, {
        scale: 0.1,
        opacity: 1, // Keep opacity to contribute to blob color
        duration: 15,
        ease: "expo.in"
      }, 20);


      // --- PHASE 3: THE BIRTH (35-40%) ---
      // Words vanish, Shape appears and expands from the blob

      // 1. Words & Text disappear INSTANTLY (swapped)
      tl.to([wordsRef.current, centerTextRef.current], {
        opacity: 0,
        duration: 1, // Fast swap
        immediateRender: false
      }, 35); // Start of birth

      // 2. Shape appears (opacity 1) and Scales UP (0 -> 1)
      tl.to(svgRef.current, {
        opacity: 1, // Visible now
        scale: 1,   // Explode out
        duration: 5, // 35 -> 40
        ease: "elastic.out(1, 0.5)"
      }, 35);


      // --- PHASE 4: MORPHING (Improved Pacing) ---

      // 40-55%: HOLD SQUARE (No changes)

      // 55-60%: MORPH SQUARE -> TRIANGLE
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 5, // 55 -> 60 (Fast & Fluid)
        ease: "power2.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 55);

      // 60-75%: HOLD TRIANGLE (No changes)

      // 75-80%: MORPH TRIANGLE -> CIRCLE
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 5, // 75 -> 80 (Fast & Fluid)
        ease: "power2.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 75);

      // 80-100%: FINAL TEXT REVEAL
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 20, // 80 -> 100
        ease: "none"
      }, 80);

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-brand-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 
          LIQUID CONTAINER 
          Everything inside here gets the Gooey effect.
          Backgrounds must be transparent for it to work well on shapes.
      */}
      <div
        ref={liquidContainerRef}
        className="w-full h-full flex items-center justify-center relative"
        style={{ filter: "url(#goo)" }}
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

        {/* Morphing SVG (The "Symbiote") */}
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
      </div>

      {/* Final text (Outside Goo, or Inside? Often better outside to be sharp) */}
      <div
        ref={finalTextRef}
        className="font-display font-bold text-2xl text-brand-black absolute bottom-20 z-30 opacity-0"
      >
        everything starts as a shape.
      </div>

      {/* INVISIBLE SVG FILTER DEFINITION */}
      <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}