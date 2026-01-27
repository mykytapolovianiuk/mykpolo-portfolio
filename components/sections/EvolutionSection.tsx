'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// PRECISE SVG PATHS WITH EXACTLY 12 VERTICES EACH
// SQUARE (12 points) - Equidistant distribution along perimeter
const PATH_SQUARE = "M 0 0 L 33.33 0 L 66.66 0 L 100 0 L 100 33.33 L 100 66.66 L 100 100 L 66.66 100 L 33.33 100 L 0 100 L 0 66.66 L 0 33.33 Z";

// TRIANGLE (12 points) - Even distribution across 3 sides
const PATH_TRIANGLE = "M 50 0 L 66.66 33.33 L 83.33 66.66 L 100 100 L 66.66 100 L 33.33 100 L 0 100 L 16.66 66.66 L 33.33 33.33 L 50 0 L 50 0 L 50 0 Z";

// CIRCLE (12-point polygon approximation) - Guaranteed stability
const PATH_CIRCLE_POLY = "M 50 0 L 75 6.7 L 93.3 25 L 100 50 L 93.3 75 L 75 93.3 L 50 100 L 25 93.3 L 6.7 75 L 0 50 L 6.7 25 L 25 6.7 Z";

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

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
        scrub: 0.5, // Smooth scrubbing for premium feel
        anticipatePin: 1
      }
    });

    // STEP 1: Chaos -> Order (Words assemble into rectangle)
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        tl.to(wordEl, {
          x: wordsData[i].x,
          y: wordsData[i].y,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, 0);
      }
    });

    // STEP 2: The Switch - Hide words/text, show SVG with Square path
    tl.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      autoAlpha: 0,
      duration: 0.3
    }, 1.2);

    tl.to(svgRef.current, {
      autoAlpha: 1,
      duration: 0.3
    }, 1.3);

    // Set initial square path
    gsap.set(pathRef.current, {
      attr: { d: PATH_SQUARE }
    });

    // STEP 3: Morph 1 (Square -> Triangle) - SVG path interpolation
    tl.to(pathRef.current, {
      attr: { d: PATH_TRIANGLE },
      duration: 1.5,
      ease: "power2.inOut"
    }, 1.8);

    // STEP 4: Morph 2 (Triangle -> Circle) - Smooth path transition
    tl.to(pathRef.current, {
      attr: { d: PATH_CIRCLE_POLY },
      duration: 1.5,
      ease: "power2.inOut"
    }, 3.5);

    // STEP 5: Reveal final text
    tl.to(finalTextRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 4.2);

    // Heartbeat animation (independent, starts after circle formation)
    tl.to(svgRef.current, {
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

      {/* The Shape - SVG with precise path morphing */}
      <svg 
        ref={svgRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] z-20"
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