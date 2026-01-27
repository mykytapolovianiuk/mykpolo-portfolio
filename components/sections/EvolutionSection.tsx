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
  const squareRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);

  // Word data with their final rectangular positions
  const wordsData = [
    { text: "Ideas", x: -200, y: -150 },
    { text: "Code", x: 200, y: -150 },
    { text: "Design", x: -200, y: 150 },
    { text: "Tech", x: 200, y: 150 },
    { text: "Process", x: -200, y: 0 },
    { text: "Testing", x: 200, y: 0 },
    { text: "Launch", x: 0, y: -150 },
    { text: "Iterate", x: 0, y: 150 }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Set initial random positions for words (chaos state)
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        gsap.set(wordEl, {
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 600,
          opacity: 0.6,
          scale: 0.8
        });
      }
    });

    // Hide shapes initially
    gsap.set([squareRef.current, triangleRef.current, circleRef.current, finalTextRef.current], {
      opacity: 0
    });

    // Create master timeline with ScrollTrigger
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // STEP 1: Chaos to Order - Words form rectangle around center name
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

    // STEP 2: The Switch - Hide words/name, show black square
    masterTimeline.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      opacity: 0,
      duration: 0.1,
      ease: "power1.in"
    }, 1);

    masterTimeline.fromTo(squareRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      },
      1.1
    );

    // STEP 3: Morph 1 - Square to Triangle
    masterTimeline.to(squareRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, 2);

    masterTimeline.fromTo(triangleRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      },
      2.1
    );

    // STEP 4: Morph 2 - Triangle to Circle
    masterTimeline.to(triangleRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, 3);

    masterTimeline.fromTo(circleRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      },
      3.1
    );

    // STEP 5: Final - Fade in text
    masterTimeline.to(finalTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 3.5);

    // Heartbeat effect for circle (continuous when visible)
    gsap.to(circleRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
      paused: true,
      onStart: function() {
        // Only run when circle is visible
        if (circleRef.current && parseFloat(getComputedStyle(circleRef.current).opacity) > 0.5) {
          this.play();
        }
      }
    });

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

        {/* Black Square */}
        <div
          ref={squareRef}
          className="absolute w-48 h-48 bg-brand-black z-20"
        />

        {/* Black Triangle */}
        <svg
          ref={triangleRef}
          className="absolute w-48 h-48 text-brand-black z-20"
          viewBox="0 0 100 100"
        >
          <polygon 
            points="50,10 10,90 90,90" 
            fill="currentColor"
          />
        </svg>

        {/* Black Circle */}
        <div
          ref={circleRef}
          className="absolute w-48 h-48 bg-brand-black rounded-full z-20"
        />

        {/* Final Text */}
        <div
          ref={finalTextRef}
          className="absolute font-display font-bold text-2xl text-brand-black z-30"
          style={{ top: '70%' }}
        >
          everything starts as a shape.
        </div>
      </div>
    </section>
  );
}