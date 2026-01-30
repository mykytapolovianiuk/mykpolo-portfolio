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

export function EvolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 400,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)', // NO BLUR
            letterSpacing: '0px'
          });
        }
      });

      gsap.set(centerTextRef.current, { scale: 1, opacity: 1, letterSpacing: '0px' });

      // SVG Shape (The "Symbiote Core")
      // Hidden scale 0.05 (dot)
      gsap.set(svgRef.current, {
        autoAlpha: 1,
        scale: 0.05,
        opacity: 0 // Hidden until swap
      });

      gsap.set(pathRef.current, { attr: { d: PATH_SQUARE } });
      gsap.set(finalTextRef.current, { autoAlpha: 0 });

      // --- MASTER TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5, // 0.5 scrub for heavy feel
          end: "+=1000%"
        }
      });

      // --- PHASE 1: EVENT HORIZON (0-20%) ---
      // Words rotate/swirl
      wordsRef.current.forEach((wordEl, i) => {
        const angle = (i / words.length) * Math.PI * 2;
        tl.to(wordEl, {
          x: `+=${Math.cos(angle) * 30}`,
          y: `+=${Math.sin(angle) * 30}`,
          scale: 0.8,
          rotation: Math.random() * 20 - 10,
          duration: 20,
          ease: "sine.inOut"
        }, 0);
      });

      // --- PHASE 2: SINGULARITY (20-30%) ---
      // Implosion to (0,0), Scale -> 0.05, LetterSpacing -> -20px
      // Creates dense black mass. NO FADING.

      wordsRef.current.forEach((wordEl) => {
        tl.to(wordEl, {
          x: 0,
          y: 0,
          scale: 0.05,
          letterSpacing: '-20px',
          rotation: Math.random() * 360, // Chaos
          opacity: 1,
          duration: 10, // 20->30
          ease: "expo.in"
        }, 20);
      });

      tl.to(centerTextRef.current, {
        scale: 0.05,
        letterSpacing: '-20px',
        rotation: 180,
        duration: 10,
        ease: "expo.in"
      }, 20);

      // --- PHASE 3: THE BIG BANG (30-32%) ---
      // Swap: Words vanish, Shape appears & Scales 0.05 -> 1

      // 1. Swap visibility Instantly
      tl.to([wordsRef.current, centerTextRef.current], {
        autoAlpha: 0,
        duration: 0.1
      }, 30);

      tl.to(svgRef.current, {
        autoAlpha: 1,
        duration: 0.1
      }, 30);

      // 2. Explosion
      tl.to(svgRef.current, {
        scale: 1,
        duration: 2, // 30->32 (Very fast)
        ease: "power4.out" // Aggressive bang
      }, 30.1);


      // --- PHASE 4: MORPHING (Hold & Transform) ---

      // 32-45%: HOLD SQUARE

      // 45-55%: MORPH SQUARE -> TRIANGLE
      const squareToTriangle = interpolate(PATH_SQUARE, PATH_TRIANGLE);
      const proxy1 = { progress: 0 };

      tl.to(proxy1, {
        progress: 1,
        duration: 10, // 45 -> 55
        ease: "linear",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', squareToTriangle(proxy1.progress));
          }
        }
      }, 45);

      // 55-70%: HOLD TRIANGLE

      // 70-80%: MORPH TRIANGLE -> CIRCLE
      const triangleToCircle = interpolate(PATH_TRIANGLE, PATH_CIRCLE);
      const proxy2 = { progress: 0 };

      tl.to(proxy2, {
        progress: 1,
        duration: 10, // 70 -> 80
        ease: "linear",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute('d', triangleToCircle(proxy2.progress));
          }
        }
      }, 70);

      // 80-100%: FINAL TEXT & PULSE
      tl.to(finalTextRef.current, {
        autoAlpha: 1,
        duration: 20,
        ease: "none"
      }, 80);

    });

    // Separate Pulse (Active only at end)
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
        if (self.progress > 0.85) {
          pulseTween.play();
        } else {
          pulseTween.pause();
          // Reset scale if not in "Bang" phase
          if (self.progress > 0.35) {
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