'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';
import { useRef } from 'react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// STANDARD SIMPLE SVG PATHS - Flubber handles the complexity
const SHAPE_SQUARE = "M 10 10 L 90 10 L 90 90 L 10 90 Z"; // Simple Square
const SHAPE_TRIANGLE = "M 50 10 L 90 90 L 10 90 Z"; // Simple Triangle
const SHAPE_CIRCLE = "M 50 10 C 72 10 90 28 90 50 C 90 72 72 90 50 90 C 28 90 10 72 10 50 C 10 28 28 10 50 10 Z"; // Perfect Bezier Circle

export function EvolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);

  // Word data with their final positions forming a rectangle around center
  const wordsData = [
    { text: "Ideas", x: -200, y: -120 },
    { text: "Code", x: 200, y: -120 },
    { text: "Design", x: -200, y: 120 },
    { text: "Tech", x: 200, y: 120 },
    { text: "Process", x: -200, y: 0 },
    { text: "Testing", x: 200, y: 0 },
    { text: "Launch", x: 0, y: -120 },
    { text: "Iterate", x: 0, y: 120 }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !pathRef.current) return;

    // Set initial random positions for words (chaos state)
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        gsap.set(wordEl, {
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 400,
          opacity: 0.7,
          scale: 0.9
        });
      }
    });

    // Hide SVG and final text initially
    gsap.set([svgRef.current, finalTextRef.current], {
      autoAlpha: 0
    });

    // Create master timeline with ScrollTrigger
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // PHASE 1: ASSEMBLE - Words animate to rectangle formation
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        masterTimeline.to(wordEl, {
          x: wordsData[i].x,
          y: wordsData[i].y,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, 0);
      }
    });

    // PHASE 2: THE SWAP - Hide words -> Show SVG Path (Square)
    masterTimeline.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      autoAlpha: 0,
      duration: 0.3
    }, 1.2);

    masterTimeline.to(svgRef.current, {
      autoAlpha: 1,
      duration: 0.3
    }, 1.3);

    // Set initial square path
    gsap.set(pathRef.current, {
      attr: { d: SHAPE_SQUARE }
    });

    // PHASE 3: LIQUID MORPH (Square -> Triangle)
    const squareToTriangle = interpolate(SHAPE_SQUARE, SHAPE_TRIANGLE);
    const proxy1 = { t: 0 };

    masterTimeline.to(proxy1, {
      t: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute('d', squareToTriangle(proxy1.t));
        }
      }
    }, 1.8);

    // PHASE 4: LIQUID MORPH (Triangle -> Circle)
    const triangleToCircle = interpolate(SHAPE_TRIANGLE, SHAPE_CIRCLE);
    const proxy2 = { t: 0 };

    masterTimeline.to(proxy2, {
      t: 1,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute('d', triangleToCircle(proxy2.t));
        }
      }
    }, 3.5);

    // PHASE 5: FINAL TEXT REVEAL
    masterTimeline.to(finalTextRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 4.2);

    // PULSE ANIMATION (Independent) - Start after circle formation
    masterTimeline.to(svgRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut"
    }, 5);

  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full bg-brand-white relative overflow-hidden"
    >
      {/* Center Name */}
      <div 
        ref={nameRef}
        className="absolute font-display font-bold text-5xl text-brand-black z-10"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        Mykyta Polovianiuk
      </div>

      {/* Floating Words */}
      {wordsData.map((word, index) => (
        <div
          key={word.text}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="absolute font-display font-bold text-xl text-brand-black whitespace-nowrap z-10"
        >
          {word.text}
        </div>
      ))}

      {/* The SVG - Liquid morphing powered by flubber */}
      <svg 
        ref={svgRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-20"
        viewBox="0 0 100 100"
      >
        <path 
          ref={pathRef}
          fill="black"
        />
      </svg>

      {/* Final Text */}
      <div
        ref={finalTextRef}
        className="absolute font-display font-bold text-2xl text-brand-black z-30"
        style={{ top: '75%', left: '50%', transform: 'translate(-50%, 20px)' }}
      >
        everything starts as a shape.
      </div>
    </section>
  );
}