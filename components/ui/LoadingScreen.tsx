'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useGSAP(() => {
    // Create ticker animations for each row
    const rows = gsap.utils.toArray('.ticker-row') as HTMLElement[];
    
    rows.forEach((row, index) => {
      const direction = index % 2 === 0 ? 1 : -1; // Even rows go right, odd rows go left
      
      gsap.to(row, {
        xPercent: direction * 100,
        duration: 15,
        repeat: -1,
        ease: 'none'
      });
    });

    // Curtain exit animation
    const tl = gsap.timeline({
      delay: 3, // Show for 3 seconds
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    tl.to('.loading-screen', {
      yPercent: -100,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }, []);

  // Generate 12 rows of ticker text
  const tickerRows = Array(12).fill(null).map((_, index) => (
    `POLO MYKPOLO MYKPOLO POLO MYKPOLO MYKPOLO POLO MYKPOLO MYKPOLO POLO MYKPOLO MYKPOLO`
  ));

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-brand-black overflow-hidden">
      <div className="h-full flex flex-col justify-center">
        {tickerRows.map((text, index) => (
          <div 
            key={index} 
            className="ticker-row whitespace-nowrap font-display text-white text-4xl md:text-5xl font-bold uppercase tracking-wider"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}