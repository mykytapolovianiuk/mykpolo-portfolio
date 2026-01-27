'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500); // Wait 500ms before calling onComplete
      }
    });

    // Animate "MYK" spinning clockwise
    tl.fromTo('.loading-myk', 
      { 
        rotation: 0,
        opacity: 0,
        scale: 0.5
      },
      {
        rotation: 360,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.inOut'
      },
      0
    );

    // Animate "POLO" spinning counter-clockwise
    tl.fromTo('.loading-polo',
      {
        rotation: 0,
        opacity: 0,
        scale: 0.5
      },
      {
        rotation: -360,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.inOut'
      },
      0
    );

    // Slide up to reveal hero
    tl.to('.loading-screen', {
      y: '-100%',
      duration: 1,
      ease: 'power3.inOut',
      delay: 0.5
    });
  }, []);

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-brand-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4">
          <span className="loading-myk text-6xl md:text-8xl font-display font-bold">
            MYK
          </span>
          <span className="loading-polo text-6xl md:text-8xl font-display font-bold">
            POLO
          </span>
        </div>
      </div>
    </div>
  );
}