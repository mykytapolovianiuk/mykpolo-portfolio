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
  const textRef = useRef<HTMLDivElement>(null);

  // Word data with their final positions
  const wordsData = [
    { text: "Ideas", finalPos: { top: '15%', left: '50%', x: '-50%' } },
    { text: "Technologies", finalPos: { top: '25%', right: '15%' } },
    { text: "Requirements", finalPos: { bottom: '25%', right: '15%' } },
    { text: "Code", finalPos: { bottom: '15%', left: '50%', x: '-50%' } },
    { text: "Testing", finalPos: { bottom: '25%', left: '15%' } },
    { text: "Iteration", finalPos: { top: '25%', left: '15%' } },
    { text: "Design", finalPos: { top: '50%', left: '15%', y: '-50%' } }
  ];

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Set initial positions for words (scattered)
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        gsap.set(wordEl, {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          scale: 0.8,
          opacity: 0.5
        });
      }
    });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Phase 1: Chaos -> Order (Words form rectangle)
    wordsRef.current.forEach((wordEl, i) => {
      if (wordEl) {
        const pos = wordsData[i]?.finalPos;
        
        tl.to(wordEl, {
          left: pos?.left || 'auto',
          right: pos?.right || 'auto',
          top: pos?.top || 'auto',
          bottom: pos?.bottom || 'auto',
          xPercent: pos?.x ? -50 : (pos?.y ? -50 : 0),
          yPercent: pos?.y ? -50 : 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, 0);
      }
    });

    // Phase 2: The Snap (Hide words and name, show square)
    tl.to([nameRef.current, ...wordsRef.current.filter(Boolean)], {
      opacity: 0,
      duration: 0.1
    }, 1);

    tl.set(squareRef.current, {
      opacity: 1
    }, 1.1);

    // Phase 3: Evolution (Square -> Triangle -> Circle)
    // Square to Triangle
    tl.to(squareRef.current, {
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      duration: 0.8,
      ease: 'power2.inOut'
    }, 1.5);

    tl.set(triangleRef.current, {
      opacity: 1
    }, 1.5);

    tl.set(squareRef.current, {
      opacity: 0
    }, 1.5);

    // Triangle to Circle
    tl.to(triangleRef.current, {
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 2.3);

    tl.set(circleRef.current, {
      opacity: 1
    }, 2.3);

    tl.set(triangleRef.current, {
      opacity: 0
    }, 2.3);

    // Phase 4: Product (Circle beating + text fade in)
    tl.to(circleRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power1.inOut'
    }, 3.1);

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 3.1);

  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="h-screen w-full relative bg-brand-white overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
      >
        {/* Central Name */}
        <div 
          ref={nameRef}
          className="absolute font-display font-bold text-[4rem] text-brand-black z-10"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          Mykyta Polovianiuk
        </div>

        {/* Floating Words */}
        {wordsData.map((word, index) => (
          <div
            key={word.text}
            ref={(el) => { wordsRef.current[index] = el; }}
            className="absolute font-display font-bold text-[1.5rem] text-brand-black whitespace-nowrap z-10"
          >
            {word.text}
          </div>
        ))}

        {/* Solid Black Square */}
        <div
          ref={squareRef}
          className="absolute w-64 h-64 bg-brand-black opacity-0 z-20"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Solid Black Triangle */}
        <svg
          ref={triangleRef}
          className="absolute w-64 h-64 text-brand-black opacity-0 z-20"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          viewBox="0 0 100 100"
        >
          <polygon 
            points="50,0 0,100 100,100" 
            fill="currentColor"
          />
        </svg>

        {/* Solid Black Circle */}
        <div
          ref={circleRef}
          className="absolute w-64 h-64 bg-brand-black rounded-full opacity-0 z-20"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Final Text */}
        <div
          ref={textRef}
          className="absolute font-display font-bold text-[2rem] text-brand-black opacity-0 z-30"
          style={{ top: '75%', left: '50%', transform: 'translate(-50%, 20px)' }}
        >
          everything starts as a shape.
        </div>
      </div>
    </section>
  );
}