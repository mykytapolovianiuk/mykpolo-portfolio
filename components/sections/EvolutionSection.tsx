'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. GENERATE PATHS (Helper function to ensure 120 pts match)
const createPolygon = (type: 'square' | 'triangle' | 'circle') => {
  const points = 120;
  const data = [];
  for (let i = 0; i < points; i++) {
    const progress = i / points;
    let x = 0, y = 0;

    if (type === 'square') {
      // Map 0..1 to 4 sides of a 10-90 box (80x80 size)
      // Perimeter = 80 * 4 = 320 units
      // 0-0.25 (Top): 10,10 -> 90,10
      // 0.25-0.5 (Right): 90,10 -> 90,90
      // 0.5-0.75 (Bottom): 90,90 -> 10,90
      // 0.75-1.0 (Left): 10,90 -> 10,10

      if (progress < 0.25) { // Top
        const p = progress / 0.25;
        x = 10 + (p * 80);
        y = 10;
      } else if (progress < 0.5) { // Right
        const p = (progress - 0.25) / 0.25;
        x = 90;
        y = 10 + (p * 80);
      } else if (progress < 0.75) { // Bottom
        const p = (progress - 0.5) / 0.25;
        x = 90 - (p * 80);
        y = 90;
      } else { // Left
        const p = (progress - 0.75) / 0.25;
        x = 10;
        y = 90 - (p * 80);
      }

    } else if (type === 'circle') {
      // Start from top (-90deg or -PI/2) to match square/triangle start
      // Center 50,50. Radius 40.
      const angle = (progress * Math.PI * 2) - (Math.PI / 2);
      x = 50 + 40 * Math.cos(angle);
      y = 50 + 40 * Math.sin(angle);
    } else if (type === 'triangle') {
      // Equilateral-ish triangle fitting in the box
      // Points: Top(50, 10), BottomRight(90, 80), BottomLeft(10, 80)?
      // User said: Top(50,10), BottomRight(90,90), BottomLeft(10,90).
      // 3 sides: 0-0.33, 0.33-0.66, 0.66-1.0

      if (progress < 1 / 3) { // Right side (Top -> BottomRight)
        const p = progress * 3;
        x = 50 + (p * 40); // 50 -> 90
        y = 10 + (p * 80); // 10 -> 90
      } else if (progress < 2 / 3) { // Bottom side (BottomRight -> BottomLeft)
        const p = (progress - 1 / 3) * 3;
        x = 90 - (p * 80); // 90 -> 10
        y = 90;            // 90 -> 90
      } else { // Left side (BottomLeft -> Top)
        const p = (progress - 2 / 3) * 3;
        x = 10 + (p * 40); // 10 -> 50
        y = 90 - (p * 80); // 90 -> 10
      }
    }

    // Fix floating point issues
    data.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M" + data[0] + " L" + data.slice(1).join(" L") + " Z";
}

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
            scale: 1,
            filter: 'blur(0px)'
          });
        }
      });

      // Hide SVG initially
      gsap.set(svgRef.current, { autoAlpha: 0 });
      // Hide Center Text initially? No, maybe it's there. 
      // User said: "Solid Square appears... slightly before words fully disappear"

      // Initialize path
      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5, // Added lag for smoothness
          end: "+=700%"
        }
      });

      // --- PHASE 1: ATOMIC IMPLOSION (0-30%) ---
      // Words move towards center (random within 50px), scale down, blur, fade out

      wordsRef.current.forEach((wordEl) => {
        if (wordEl) {
          // Random point near center
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 50;
          const targetX = Math.cos(angle) * dist;
          const targetY = Math.sin(angle) * dist;

          tl.to(wordEl, {
            x: targetX,
            y: targetY,
            scale: 0.5,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 30, // 0 -> 30
            ease: "power2.inOut"
          }, 0);
        }
      });

      // Center text also fades out? "Words Implode... Swap (Words Opacity 0, Shape Opacity 1)"
      // Let's fade out center text with them
      if (centerTextRef.current) {
        tl.to(centerTextRef.current, {
          autoAlpha: 0,
          duration: 30,
          ease: "power2.inOut"
        }, 0);
      }

      // --- PHASE 2: SWAP (25-35%) ---
      // Solid Square appears slightly BEFORE words fully disappear (overlap)
      // Words finish disappearing at 30.
      // Shape starts appearing at 25?

      tl.to(svgRef.current, {
        autoAlpha: 1,
        duration: 10, // 25 -> 35
        ease: "power2.inOut"
      }, 25);


      // --- PHASE 3: MORPH SQUARE -> TRIANGLE (35-60%) ---
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 25, // 35 -> 60
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 35);


      // --- PHASE 4: MORPH TRIANGLE -> CIRCLE (60-85%) ---
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 25, // 60 -> 85
        ease: "power1.inOut",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 60);


      // --- PHASE 5: FINAL TEXT & PULSE (85-100%) ---
      // Reveal final text
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 15,
        ease: "none"
      }, 85);

      // Pulse Animation - Only triggers at the end
      // We can use a separate ScrollTrigger or just a callback/tween at the end of this scrub timeline?
      // "Add a specific gsap.to(pathRef.current, ...) that ONLY triggers when the scroll progress reaches the Circle"
      // If we are scrubbing, we can't easily have an infinite loop RUNNING while scrubbing unless we use checking.
      // Better: Add a callback to start the pulse if it's not started, or use a separate non-scrub ST.
      // BUT, simple approach: Tween the scale up/down in the timeline itself? No, pulse needs to be continuous if user stops.

      // Alternative: Use onComplete/onReverseComplete callbacks to toggle a separate animation.
      // Or just a separate ScrollTrigger that starts when we hit the circle phase.

      // Let's put a callback at 85% to start a separate independent tween
    });

    // Separate Pulse Animation (Independent of Scrub)
    // It should active when we are near the end.
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
      end: "+=700%", // match main timeline
      onUpdate: (self) => {
        // If progress > 0.85 (Circle phase start), play pulse
        if (self.progress > 0.85) {
          pulseTween.play();
        } else {
          pulseTween.pause();
          gsap.to(svgRef.current, { scale: 1, duration: 0.2 }); // Reset scale
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