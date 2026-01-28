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
      // Guard against null refs
      if (!leftPanelRef.current || !rightPanelRef.current || !containerRef.current) {
        setTimeout(onComplete, 100);
        return;
      }

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

  // Text Block Component - Dense repeating text
  const TextBlock = () => (
    <>
      {Array(20).fill("MYK POLO").map((t, i) => (
        <div key={i} className="whitespace-nowrap font-display font-bold text-[10vh] leading-[0.8] text-black tracking-tighter uppercase select-none">
          {t}
        </div>
      ))}
    </>
  );

  // Column Component with seamless looping
  const Column = ({ direction }: { direction: 'up' | 'down' }) => (
    <div className="relative h-screen overflow-hidden flex-1 flex justify-center">
      <div className={direction === 'down' ? 'animate-infinite-scroll-down' : 'animate-infinite-scroll-up'}>
        <TextBlock />
        <TextBlock /> {/* Duplicate for seamless loop */}
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex bg-brand-white">
      {/* Left Panel - Scrolls DOWN */}
      <div ref={leftPanelRef} className="w-1/2 h-full bg-brand-white border-r border-brand-black/10 overflow-hidden flex items-center">
        <div className="w-full flex justify-center opacity-90">
          <Column direction="down" />
        </div>
      </div>

      {/* Right Panel - Scrolls UP */}
      <div ref={rightPanelRef} className="w-1/2 h-full bg-brand-white overflow-hidden flex items-center">
        <div className="w-full flex justify-center opacity-90">
          <Column direction="up" />
        </div>
      </div>
    </div>
  );
}