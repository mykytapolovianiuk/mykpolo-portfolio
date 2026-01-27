'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function EvolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shapeRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);

  // Word data with their final square positions
  const wordsData = [
    { text: "Ideas", x: -150, y: -150 },
    { text: "Code", x: 150, y: -150 },
    { text: "Design", x: -150, y: 150 },
    { text: "Tech", x: 150, y: 150 },
    { text: "Process", x: -150, y: 0 },
    { text: "Testing", x: 150, y: 0 },
    { text: "Launch", x: 0, y: -150 },
    { text: "Iterate", x: 0, y: 150 }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current || !shapeRef.current) return;

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
      opacity: 0
    });

    // Create master timeline with ScrollTrigger
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600%", // Increased scroll duration for heavier feel
        pin: true,
        scrub: 0.5, // Slower scrub for deliberate feel
        anticipatePin: 1
      }
    });

    // STEP 1: Words Assembly - Chaos to tight square formation
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        masterTimeline.to(wordEl, {
          x: wordsData[i].x,
          y: wordsData[i].y,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.inOut"
        }, 0);
      }
    });

    // STEP 2: The Swap - Hide words/name, show shape as square
    masterTimeline.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in"
    }, 1.8);

    masterTimeline.to(shapeRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    }, 2);

    // Set initial square state
    gsap.set(shapeRef.current, {
      width: "12rem",
      height: "12rem",
      backgroundColor: "var(--color-brand-black)",
      borderRadius: "0%",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    });

    // STEP 3: Morph to Triangle
    masterTimeline.to(shapeRef.current, {
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 2.5);

    // STEP 4: Text Reveal starts during triangle phase
    masterTimeline.to(finalTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, 3);

    // STEP 5: Morph to Circle
    masterTimeline.to(shapeRef.current, {
      borderRadius: "50%",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reset to full square for circle
      duration: 1.2,
      ease: "power2.inOut"
    }, 3.8);

    // STEP 6: Heartbeat effect (starts when circle is fully formed)
    masterTimeline.to(shapeRef.current, {
      scale: 1.08,
      repeat: -1,
      yoyo: true,
      duration: 0.7,
      ease: "power1.inOut"
    }, 5);

  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full bg-brand-white relative overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
      >
        {/* Center Name */}
        <div 
          ref={nameRef}
          className="absolute font-display font-bold text-5xl text-brand-black z-10"
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

        {/* Morphing Shape Element - SINGLE element for true morphing */}
        <div
          ref={shapeRef}
          className="absolute z-20"
        />

        {/* Final Text */}
        <div
          ref={finalTextRef}
          className="absolute font-display font-bold text-2xl text-brand-black z-30"
          style={{ top: '75%', transform: 'translateY(20px)' }}
        >
          everything starts as a shape.
        </div>
      </div>
    </section>
  );
}