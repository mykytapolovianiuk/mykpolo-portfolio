'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Timer for 2.5s delay before exit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isVisible) {
      // Animate curtain open on exit
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 300);
        }
      });

      tl.to([leftPanelRef.current, rightPanelRef.current], {
        xPercent: (i) => i === 0 ? -100 : 100,
        duration: 1.2,
        ease: 'power4.inOut',
      });

      tl.to(containerRef.current, { 
        display: 'none' 
      });
    }
  }, [isVisible]);

  // Conveyor Belt Generator - Doubled content to prevent gaps
  const ConveyorBelt = ({ direction }: { direction: 'up' | 'down' }) => {
    // Create doubled content array to ensure seamless looping
    const baseContent = Array(20).fill("MYK POLO MYKPOLO");
    const doubledContent = [...baseContent, ...baseContent]; // Double it for gapless loop
    
    return (
      <div className="relative h-screen overflow-hidden flex-1 flex justify-center">
        {/* Animated container with doubled content */}
        <div className={`flex flex-col items-center ${direction === 'down' ? 'animate-infinite-scroll-down' : 'animate-infinite-scroll-up'}`}>
          {doubledContent.map((text, i) => (
            <div 
              key={i} 
              className="font-display font-bold text-[6vh] leading-[0.85] text-brand-black tracking-tight uppercase"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex bg-brand-white">
      {/* Left Panel - Moves DOWN */}
      <div ref={leftPanelRef} className="w-1/2 h-full bg-brand-white border-r border-brand-black/10 overflow-hidden flex items-center">
        <div className="w-full flex justify-center gap-4 opacity-80">
          <ConveyorBelt direction="down" />
        </div>
      </div>

      {/* Right Panel - Moves UP */}
      <div ref={rightPanelRef} className="w-1/2 h-full bg-brand-white overflow-hidden flex items-center">
        <div className="w-full flex justify-center gap-4 opacity-80">
          <ConveyorBelt direction="up" />
        </div>
      </div>
    </div>
  );
}