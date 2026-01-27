'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/layout/Header';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    if (!isLoading) {
      // Hero section animations - ONLY Triangle Rotation
      
      // Animate triangle with rotation ONLY (no scaling/fading)
      // Wait 2.5 seconds, then rotate
      gsap.to('.hero-triangle', {
        rotation: 180,
        duration: 1,
        delay: 1,
        ease: 'power2.inOut'
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Убрали transition-opacity и opacity-0. Сайт виден всегда (под шторами) */}
      <div className="relative z-0"> 
        <Header />
        
        {/* Hero Section - White Background with Exact Figma Positioning */}
        <section className="relative min-h-screen bg-brand-white overflow-hidden">
          {/* Main Name - Positioned exactly as Figma: top-[436px], left-[52px] */}
          {/* Static position, no animation class */}
          <div className="hero-name absolute top-[350px] left-[52px] z-20">
            <h1 className="font-display font-bold text-[128px] leading-[200px] text-brand-black md:text-[128px] text-[64px]">
              Mykyta Polovianiuk
            </h1>
          </div>
          
          {/* Center Triangle - Positioned in center */}
          {/* Initial state is visible (scale 1, opacity 1) due to CSS, GSAP only handles rotation */}
          <div className="hero-triangle absolute top-1/4 right-1/25 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <svg 
              width="300" 
              height="300" 
              viewBox="0 0 200 200" 
              className="text-brand-black"
            >
              <polygon 
                points="70,0 0,121 140,121" 
                fill="currentColor"
              />
            </svg>
          </div>
          
          {/* Footer Elements - Positioned at bottom */}
          {/* Email Link - Bottom Left */}
          <a 
            href="mailto:mykytapolovianiuk.work@gmail.com"
            className="absolute bottom-8 left-8 font-sans text-[16px] text-brand-black underline transition-all lowercase"
          >
            mykytapolovianiuk.work@gmail.com
          </a>
          
          {/* Instagram Link - Bottom Right */}
          <a 
            href="https://instagram.com/shinjiwwww"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-8 right-8 font-sans text-[16px] text-brand-black underline transition-all lowercase"
          >
            instagram
          </a>
          
          {/* Location and Arrow - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              className="text-brand-black mb-1"
            >
              <path 
                d="M7 10l5 5 5-5z" 
                fill="currentColor"
              />
            </svg>
            <span className="font-sans text-[14px] text-brand-black">
              based in Kyiv
            </span>
          </div>
        </section>

        {/* Work Section Placeholder */}
        <section className="min-h-screen bg-brand-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-4xl mb-8 text-brand-black">WORK</h2>
            <p className="max-w-2xl mx-auto text-lg text-brand-black">
              Portfolio projects coming soon...
            </p>
          </div>
        </section>
      </div>
    </>
  );
}