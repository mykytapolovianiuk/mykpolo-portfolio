'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. GENERATE PATHS (CORRECTED MATCHING VERTICES AT 12 O'CLOCK)
const createPolygon = (type: 'square' | 'triangle' | 'circle', points = 120) => {
  const data = [];
  const cx = 50, cy = 50;

  for (let i = 0; i < points; i++) {
    // Standardize t so 0 starts at -90deg (Top Center)
    const t = i / points;
    let x = 0, y = 0;

    if (type === 'square') {
      // Perimeter: Top->Right->Bottom->Left. 
      // Since we want to start at Top-Center (50, 10), we shift the phase.
      // Total Length = 320 (80*4). Top Center is at 40 (1/8th or 0.125 into the path if starting TopLeft).
      // Let's manually map sides starting from TOP CENTER:
      // 0.0 - 0.125: Top Center -> Top Right
      // 0.125 - 0.375: Right Side
      // 0.375 - 0.625: Bottom Side
      // 0.625 - 0.875: Left Side
      // 0.875 - 1.0: Top Left -> Top Center

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
      // Start Top Center (50, 10). 
      // 0.0 - 0.33: Top -> Bottom Right
      // 0.33 - 0.66: BR -> Bottom Left
      // 0.66 - 1.0: BL -> Top
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
      // Start -90deg (Top Center)
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
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);

  // Word data
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
            opacity: 1,
            scale: 3, // Start large per instructions "Imposion: scale 3 -> 0"
            filter: 'blur(0px)'
          });
        }
      });

      // SVG Initialization
      gsap.set(svgRef.current, {
        autoAlpha: 1, // Visible but scaled to 0
        scale: 0      // Per "Crucial: SVG Square starts at scale: 0"
      });
      // Center Text also starts visible?
      // "Strictly: ... CenterText also implodes"
      // So center text starts scale 1? or 3? Let's assume 3 to match words? 
      // User says "Ensure the centerText also implodes (scales down) with the words." 
      // If words go 3 -> 0, centerText should go 3 -> 0?
      gsap.set(centerTextRef.current, { scale: 3, opacity: 1 });

      // Initialize path
      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });

      // Initial state of Final Text
      gsap.set(finalTextRef.current, { autoAlpha: 0 });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: "+=1000%" // Increased scroll distance
        }
      });

      // --- PHASE 1: IMPLOSION (0-25%) ---
      // Words move to Center, Scale 3->0, Blur 0->10, Opacity 1->0

      wordsRef.current.forEach((wordEl) => {
        if (wordEl) {
          tl.to(wordEl, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            filter: 'blur(10px)',
            duration: 25, // 0 -> 25
            ease: "power2.inOut"
          }, 0);
        }
      });

      // Center text implosions
      if (centerTextRef.current) {
        tl.to(centerTextRef.current, {
          scale: 0,
          opacity: 0,
          duration: 25,
          ease: "power2.inOut"
        }, 0);
      }

      // --- THE BANG (Exactly at 25%) ---
      // SVG Square scale: 0 -> 1 (elastic out)
      // Since we are scrubbing, "elastic out" might look weird if user scrolls slowly, but let's add it.
      // We want this to happen QUICKLY around 25%.
      // Actually, if we use scrub, it maps to scroll position. "Elastic out" effect will only work if we give it scroll distance.
      // "At exactly 25%, animate Square scale: 0 -> 1".

      tl.to(svgRef.current, {
        scale: 1,
        duration: 5, // 25 -> 30 (Short burst)
        ease: "elastic.out(1, 0.5)"
      }, 25);


      // --- PHASE 2: HOLD SQUARE (30-40%) ---
      // (Gap in timeline)

      // --- PHASE 3: MORPH SQUARE -> TRIANGLE (40-50%) ---
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 10, // 40 -> 50
        ease: "linear",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 40);


      // --- PHASE 4: HOLD TRIANGLE (50-65%) ---
      // (Gap)

      // --- PHASE 5: MORPH TRIANGLE -> CIRCLE (65-75%) ---
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 10, // 65 -> 75
        ease: "linear",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 65);


      // --- PHASE 6: HOLD CIRCLE & FINAL TEXT (75-90%) ---
      // Final Text Fades In
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 15, // 75 -> 90
        ease: "none"
      }, 75);


      // --- PHASE 7: PULSE (90-100%) ---
      // "Activate Pulse"

    });

    // Independent Pulse Animation
    const pulseTween = gsap.to(svgRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
      paused: true
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000%",
      onUpdate: (self) => {
        // Pulse active from 90% onwards
        if (self.progress >= 0.9) {
          pulseTween.play();
        } else {
          pulseTween.pause();
          // Ensure we don't snap scale if we are in the "Bang" phase
          // The main timeline controls scale from 0->1 between 25-30%.
          // After 30% scale is 1.
          // So resetting to 1 is safe if > 30%
          if (self.progress > 0.3) {
            gsap.to(svgRef.current, { scale: 1, duration: 0.2, overwrite: 'auto' });
          }
        }
      }
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