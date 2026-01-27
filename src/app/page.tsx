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
      // Hero section animations
      const tl = gsap.timeline({
        delay: 0.3
      });

      // Animate triangle
      tl.fromTo('.hero-triangle',
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)'
        }
      );

      // Animate name parts
      tl.fromTo('.hero-name-top',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.6'
      );

      tl.fromTo('.hero-name-bottom',
        {
          y: -30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.7'
      );

      // Animate footer elements
      tl.fromTo('.hero-footer',
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.5'
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        
        {/* Hero Section - White Background */}
        <section className="min-h-screen bg-brand-white flex flex-col items-center justify-center relative px-6 overflow-hidden">
          <div className="text-center">
            {/* Name Top */}
            <div className="hero-name-top font-display text-5xl md:text-7xl font-bold mb-2 text-brand-black">
              Mykyta
            </div>
            
            {/* Black Triangle */}
            <div className="hero-triangle my-4">
              <svg 
                width="100" 
                height="87" 
                viewBox="0 0 100 87" 
                className="mx-auto"
              >
                <polygon 
                  points="50,0 0,87 100,87" 
                  fill="currentColor" 
                  className="text-brand-black"
                />
              </svg>
            </div>
            
            {/* Name Bottom */}
            <div className="hero-name-bottom font-display text-5xl md:text-7xl font-bold mt-2 text-brand-black">
              Polovianiuk
            </div>
          </div>
          
          {/* Footer with Arrow and Location */}
          <div className="hero-footer absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div className="w-px h-8 bg-brand-black mb-4"></div>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              className="text-brand-black mb-2"
            >
              <path 
                d="M7 10l5 5 5-5z" 
                fill="currentColor"
              />
            </svg>
            <span className="text-sm font-sans text-brand-black uppercase tracking-widest">
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
