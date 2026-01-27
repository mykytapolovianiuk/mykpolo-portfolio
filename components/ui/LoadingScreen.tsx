'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // 1. Run infinite scroll for 2.5 seconds
    tl.to({}, { duration: 2.5 });

    // 2. Animate curtain open (Left -> -100%, Right -> +100%)
    tl.to([leftPanelRef.current, rightPanelRef.current], {
      xPercent: (i) => i === 0 ? -100 : 100,
      duration: 1.2,
      ease: 'power4.inOut',
    });

    // 3. Remove container
    tl.to(containerRef.current, { display: 'none' });
  }, { scope: containerRef });

  // Conveyor Belt Generator
  const ConveyorBelt = ({ direction }: { direction: 'up' | 'down' }) => {
    // Create tall list of "MYK POLO MYKPOLO" for dense wall effect
    const content = Array(40).fill("MYK POLO MYKPOLO").map((text, i) => (
      <div key={i} className="font-display font-bold text-[6vh] leading-[0.85] text-brand-black tracking-tight uppercase">
        {text}
      </div>
    ));

    return (
      <div className="relative h-screen overflow-hidden flex-1 flex justify-center">
        {/* Animated container with TWO content sets for seamless loop */}
        <div className={`flex flex-col items-center ${direction === 'down' ? 'animate-infinite-scroll-down' : 'animate-infinite-scroll-up'}`}>
          {content}
          {content} {/* Duplicate for looping */}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex bg-brand-white">
      {/* Left Panel - Moves DOWN */}
      <div ref={leftPanelRef} className="w-1/2 h-full bg-brand-white border-r border-brand-black/10 overflow-hidden flex items-center">
        <div className="w-full flex justify-center gap-4 opacity-80">
          <ConveyorBelt direction="down" />
          <ConveyorBelt direction="down" />
        </div>
      </div>

      {/* Right Panel - Moves UP */}
      <div ref={rightPanelRef} className="w-1/2 h-full bg-brand-white overflow-hidden flex items-center">
        <div className="w-full flex justify-center gap-4 opacity-80">
          <ConveyorBelt direction="up" />
          <ConveyorBelt direction="up" />
        </div>
      </div>
    </div>
  );
}