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
      {/* Fixed Logo and Menu Trigger - Absolute positioning to match Figma */}
      <div className="fixed top-0 left-0 w-full h-0 z-50 pointer-events-none">
        {/* Logo - Positioned exactly as Figma: top-[30px], left-[52px] */}
        <div className="absolute top-[30px] left-[52px] pointer-events-auto">
          <div className="font-display font-bold text-[24px] text-brand-black">
            MYKPOLO
          </div>
        </div>
        
        {/* About Trigger - Positioned exactly as Figma: top-[35px], right-[52px] */}
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-[35px] right-[52px] font-display font-bold text-[16px] text-brand-black hover:opacity-70 transition-opacity pointer-events-auto uppercase"
        >
          #about
        </button>
      </div>

      {/* Side Panel Overlay - Exactly 600px width, black background */}
      <div className={`side-panel fixed top-0 right-0 h-full bg-brand-black z-40 w-[600px] ${isPanelOpen ? '' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Close Button - Positioned exactly as Figma: top-[39px], right-[52px] */}
          <div className="absolute top-[39px] right-[52px]">
            <button 
              onClick={() => setIsPanelOpen(false)}
              className="text-white font-display text-[16px] font-bold hover:opacity-70 transition-opacity uppercase"
            >
              x
            </button>
          </div>
          
          {/* Content - Padded ~60px from left edge */}
          <div className="pl-[60px] pr-[52px] pt-[120px] pb-[52px]">
            {/* ABOUT Section */}
            <div className="mb-[250px]">
              <h2 className="font-display text-[16px] text-white uppercase mb-6">ABOUT</h2>
              <p className="font-display text-[14px] text-white uppercase leading-relaxed max-w-xs">
                Creative developer specializing in brutalist design and geometric evolution. 
                Transforming chaos into structured digital experiences.
              </p>
            </div>
            
            {/* TECHNOLOGY Section */}
            <div className="mb-[250px]">
              <h3 className="font-display text-[16px] text-white uppercase mb-6">TECHNOLOGY</h3>
              <div className="font-display text-[14px] text-white uppercase space-y-2">
                <div>NEXT.JS</div>
                <div>TYPESCRIPT</div>
                <div>TAILWIND CSS</div>
                <div>GSAP</div>
                <div>THREE.JS</div>
              </div>
            </div>
            
            {/* EXPERIENCE Section */}
            <div className="mb-[250px]">
              <h3 className="font-display text-[16px] text-white uppercase mb-6">EXPERIENCE</h3>
              <div className="font-display text-[14px] text-white uppercase space-y-4">
                <div>
                  <div>SENIOR FRONTEND DEVELOPER</div>
                  <div className="text-white/70">2020-PRESENT</div>
                </div>
                <div>
                  <div>CREATIVE DEVELOPER</div>
                  <div className="text-white/70">2018-2020</div>
                </div>
              </div>
            </div>
            
            {/* CONTACT Section */}
            <div>
              <h3 className="font-display text-[16px] text-white uppercase mb-6">CONTACT</h3>
              <div className="font-display text-[14px] text-white uppercase space-y-3">
                <a 
                  href="mailto:mykytapolovianiuk.work@gmail.com"
                  className="block hover:opacity-70 transition-opacity"
                >
                  EMAIL
                </a>
                <a 
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity"
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
}