'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isReady, setIsReady] = useState(false);

  // Real loading check
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsReady(true);
      }, 2000); // Minimum 2 seconds
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useGSAP(() => {
    if (!isReady) return;

    // Create vertical column animations
    const leftColumns = gsap.utils.toArray('.left-panel .scroll-column') as HTMLElement[];
    const rightColumns = gsap.utils.toArray('.right-panel .scroll-column') as HTMLElement[];
    
    // Left panel columns scroll UP
    leftColumns.forEach((column, index) => {
      gsap.to(column, {
        yPercent: -100,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });
    });

    // Right panel columns scroll DOWN
    rightColumns.forEach((column, index) => {
      gsap.to(column, {
        yPercent: 100,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });
    });

    // Curtain exit animation - Left slides left, Right slides right
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    tl.to('.left-panel', {
      xPercent: -100,
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0);

    tl.to('.right-panel', {
      xPercent: 100,
      duration: 1.2,
      ease: 'power3.inOut'
    }, 0);
  }, [isReady]);

  // Generate columns of text
  const generateColumns = (count: number) => {
    return Array(count).fill(null).map((_, index) => (
      <div key={index} className="scroll-column whitespace-nowrap font-display text-white text-[24px] font-bold uppercase tracking-wider">
        {Array(15).fill("POLO MYKPOLO").join(" ")}
      </div>
    ));
  };

  if (!isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left Panel - Black background, White text */}
      <div className="left-panel w-1/2 bg-brand-black flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col justify-around px-8">
          {generateColumns(10)}
        </div>
      </div>
      
      {/* Right Panel - Black background, White text */}
      <div className="right-panel w-1/2 bg-brand-black flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col justify-around px-8">
          {generateColumns(10)}
        </div>
      </div>
    </div>
  );
}