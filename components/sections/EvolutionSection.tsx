'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { generateShapes } from '../utils/geometry';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function EvolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shapeRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);

  // Generate mathematical shapes with 120 vertices each
  const shapes = generateShapes();

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
    if (!sectionRef.current) return;

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

    // Hide shape and final text initially
    gsap.set([shapeRef.current, finalTextRef.current], {
      autoAlpha: 0
    });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 0.5, // Add slight smoothing
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

    // STEP 2: The Singularity - Words vanish, Shape appears with Square state
    tl.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      autoAlpha: 0,
      duration: 0.3
    }, 1.2);

    tl.to(shapeRef.current, {
      autoAlpha: 1,
      duration: 0.3
    }, 1.3);

    // Set initial square state using mathematical 120-vertex polygon
    gsap.set(shapeRef.current, {
      clipPath: shapes.square
    });

    // STEP 3: Morph 1 (Square -> Triangle) - Liquid transition due to identical vertex count
    tl.to(shapeRef.current, {
      clipPath: shapes.triangle,
      duration: 1.5,
      ease: "power2.inOut"
    }, 1.8);

    // STEP 4: Morph 2 (Triangle -> Circle) - Perfect liquid morph
    tl.to(shapeRef.current, {
      clipPath: shapes.circle,
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
    tl.to(shapeRef.current, {
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

      {/* The Shape - Mathematical 120-vertex morphing element */}
      <div
        ref={shapeRef}
        className="w-[300px] h-[300px] bg-brand-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      />

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