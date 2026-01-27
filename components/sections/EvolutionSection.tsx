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
  const nameRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const shapeRef = useRef<HTMLDivElement>(null);
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
        end: "+=400%",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // STEP 1: Chaos -> Square Formation
    // Animate words to form rectangle around center
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

    // STEP 2: The Switch - Hide words/text, show shape as square
    tl.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      autoAlpha: 0,
      duration: 0.3
    }, 1.2);

    // Show shape with initial square state
    tl.to(shapeRef.current, {
      autoAlpha: 1,
      duration: 0.3
    }, 1.3);

    // Set initial square properties
    gsap.set(shapeRef.current, {
      width: "16rem",
      height: "16rem",
      backgroundColor: "var(--color-brand-black)",
      borderRadius: "0%",
      clipPath: "inset(0% 0% 0% 0%)"
    });

    // STEP 3: Morph to Triangle
    tl.to(shapeRef.current, {
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      duration: 1,
      ease: "power2.inOut"
    }, 1.8);

    // STEP 4: Morph to Circle
    // Reset clip-path to full coverage and animate border-radius to 50%
    tl.to(shapeRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "50%",
      duration: 1,
      ease: "power2.inOut"
    }, 3);

    // STEP 5: Final Text Reveal
    tl.to(finalTextRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 3.5);

  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen w-full bg-brand-white relative overflow-hidden flex items-center justify-center"
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

      {/* The Shape (Hero Element) - Single div that morphs through all states */}
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
    </section>
  );
}