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
        delay: 0.5 // Wait for loading screen to finish
      });

      // Animate triangle
      tl.fromTo('.hero-triangle',
        {
          rotation: 0,
          scale: 0,
          opacity: 0
        },
        {
          rotation: 360,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'back.out(1.7)'
        }
      );

      // Animate name
      tl.fromTo('.hero-name',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.8'
      );

      // Animate location and arrow
      tl.fromTo('.hero-bottom',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        },
        '-=0.6'
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
          <div className="text-center">
            {/* Triangle SVG */}
            <div className="hero-triangle mb-12">
              <svg 
                width="120" 
                height="104" 
                viewBox="0 0 120 104" 
                className="mx-auto"
              >
                <polygon 
                  points="60,0 0,104 120,104" 
                  fill="currentColor" 
                />
              </svg>
            </div>
            
            {/* Name */}
            <h1 className="hero-name font-display text-5xl md:text-7xl font-bold mb-8">
              Mykyta Polovianiuk
            </h1>
            
            {/* Location and arrow */}
            <div className="hero-bottom flex flex-col items-center space-y-4">
              <div className="w-px h-12 bg-brand-white"></div>
              <span className="text-sm uppercase tracking-widest">
                based in Kyiv
              </span>
            </div>
          </div>
        </section>

        {/* Work Section Placeholder */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-4xl mb-8">WORK</h2>
            <p className="max-w-2xl mx-auto text-lg">
              Portfolio projects coming soon...
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
