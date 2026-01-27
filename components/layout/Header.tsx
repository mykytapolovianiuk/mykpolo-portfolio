'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useGSAP(() => {
    if (isPanelOpen) {
      gsap.to('.side-panel', {
        xPercent: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    } else {
      gsap.to('.side-panel', {
        xPercent: 100,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isPanelOpen]);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference p-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-display font-bold text-xl uppercase">
            MYKPOLO
          </div>
          <button 
            onClick={() => setIsPanelOpen(true)}
            className="font-display text-sm uppercase tracking-wider"
          >
            #about
          </button>
        </div>
      </header>

      {/* Side Panel Overlay */}
      <div className={`side-panel fixed top-0 right-0 h-full bg-brand-black z-30 w-full md:w-3/4 lg:w-1/2 ${isPanelOpen ? '' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8 md:p-12">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsPanelOpen(false)}
              className="text-white font-display text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              Close
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-grow flex flex-col justify-center">
            <h2 className="font-display text-5xl md:text-6xl text-white mb-8">ABOUT</h2>
            
            <div className="space-y-6 text-white">
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                Creative developer specializing in brutalist design and geometric evolution. 
                Transforming chaos into structured digital experiences through minimalist aesthetics.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                Based in Kyiv, Ukraine. Available for selective projects worldwide.
              </p>
              
              <div className="mt-12 pt-8 border-t border-white/20">
                <h3 className="font-display text-2xl mb-4">CONTACT</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:mykytapolovianiuk.work@gmail.com"
                    className="block text-white hover:opacity-70 transition-opacity text-lg"
                  >
                    mykytapolovianiuk.work@gmail.com
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:opacity-70 transition-opacity text-lg"
                  >
                    @mykpolo (Instagram)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
}