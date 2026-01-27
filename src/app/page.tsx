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
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)'
        }
      );

      // Animate name parts
      tl.fromTo('.hero-name-top',
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.6'
      );

      tl.fromTo('.hero-name-bottom',
        {
          x: 50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.7'
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
          <div className="text-center relative">
            {/* Name Top Left of Triangle */}
            <div className="hero-name-top font-display text-4xl md:text-6xl font-bold mb-8 text-brand-black absolute -top-16 left-1/2 transform -translate-x-1/2 -translate-y-full">
              Mykyta
            </div>
            
            {/* Black Triangle */}
            <div className="hero-triangle my-8">
              <svg 
                width="120" 
                height="104" 
                viewBox="0 0 120 104" 
                className="mx-auto"
              >
                <polygon 
                  points="60,0 0,104 120,104" 
                  fill="currentColor" 
                  className="text-brand-black"
                />
              </svg>
            </div>
            
            {/* Name Bottom Right of Triangle */}
            <div className="hero-name-bottom font-display text-4xl md:text-6xl font-bold mt-8 text-brand-black absolute -bottom-16 left-1/2 transform -translate-x-1/2 translate-y-full">
              Polovianiuk
            </div>
          </div>
          
          {/* Footer with Links */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <div className="flex justify-between items-center">
              {/* Email Link */}
              <a 
                href="mailto:mykytapolovianiuk.work@gmail.com"
                className="text-sm font-sans text-brand-black hover:opacity-70 transition-opacity lowercase"
              >
                Email
              </a>
              
              {/* Center Arrow and Location */}
              <div className="flex flex-col items-center">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  className="text-brand-black mb-1"
                >
                  <path 
                    d="M7 10l5 5 5-5z" 
                    fill="currentColor"
                  />
                </svg>
                <span className="text-xs font-sans text-brand-black lowercase">
                  based in kyiv
                </span>
              </div>
              
              {/* Instagram Link */}
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans text-brand-black hover:opacity-70 transition-opacity lowercase"
              >
                Instagram
              </a>
            </div>
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
