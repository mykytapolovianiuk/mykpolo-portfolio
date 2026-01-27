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
        }
      );

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
        
        {/* Hero Section - White Background with Exact Figma Positioning */}
        <section className="relative min-h-screen bg-brand-white overflow-hidden">
          {/* Main Name - Positioned exactly as Figma: top-[436px], left-[52px] */}
          <div className="hero-name absolute top-[436px] left-[52px] z-10">
            <h1 className="font-display font-bold text-[128px] leading-[200px] text-brand-black md:text-[128px] text-[64px]">
              Mykyta Polovianiuk
            </h1>
          </div>
          
          {/* Center Triangle - Positioned in remaining space */}
          <div className="hero-triangle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg 
              width="140" 
              height="121" 
              viewBox="0 0 140 121" 
              className="text-brand-black"
            >
              <polygon 
                points="70,0 0,121 140,121" 
                fill="currentColor"
              />
            </svg>
          </div>
          
          {/* Footer Elements - Positioned exactly as Figma */}
          {/* Email Link - top-[969px], left-[52px] */}
          <a 
            href="mailto:mykytapolovianiuk.work@gmail.com"
            className="absolute top-[969px] left-[52px] font-sans text-[16px] text-brand-black hover:underline transition-all lowercase"
          >
            mykytapolovianiuk.work@gmail.com
          </a>
          
          {/* Instagram Link - top-[969px], right-[~52px] */}
          <a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[969px] right-[52px] font-sans text-[16px] text-brand-black hover:underline transition-all lowercase"
          >
            @mykpolo
          </a>
          
          {/* Location Text - top-[975px], centered */}
          <div className="absolute top-[975px] left-1/2 transform -translate-x-1/2 font-sans text-[16px] text-brand-black">
            based in kyiv
          </div>
          
          {/* Arrow Icon - top-[885px], centered */}
          <div className="absolute top-[885px] left-1/2 transform -translate-x-1/2">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              className="text-brand-black"
            >
              <path 
                d="M7 10l5 5 5-5z" 
                fill="currentColor"
              />
            </svg>
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
