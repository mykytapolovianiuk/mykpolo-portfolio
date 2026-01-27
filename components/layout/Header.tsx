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
        <div className="h-full relative">
          {/* Close Button - Positioned exactly as Figma: top-[39px], right-[54px] */}
          <div className="absolute top-[39px] right-[54px]">
            <button 
              onClick={() => setIsPanelOpen(false)}
              className="text-white font-display font-bold text-[16px] hover:opacity-70 transition-opacity uppercase"
            >
              x
            </button>
          </div>
          
          {/* Content - Padded ~43px from left edge as specified */}
          <div className="absolute left-[43px] top-0 h-full flex flex-col justify-between py-[39px]">
            {/* Menu Sections */}
            <div>
              {/* ABOUT Section - top-[39px] */}
              <div className="absolute top-[39px] font-display font-bold text-[16px] text-white uppercase">
                about
              </div>
              
              {/* Main Description - top-[105px], width 496px */}
              <div className="absolute top-[105px] w-[496px]">
                <p className="font-display font-bold text-[14px] text-white leading-relaxed">
                  Creative developer specializing in brutalist design and geometric evolution. 
                  Transforming chaos into structured digital experiences through minimalist aesthetics.
                </p>
              </div>
              
              {/* TECHNOLOGY Section - top-[245px] */}
              <div className="absolute top-[245px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">TECHNOLOGY</h3>
                
                {/* Tech Stack - top-[311px] */}
                <div className="absolute top-[311px] font-display font-bold text-[14px] text-white uppercase space-y-2">
                  <div>REACT</div>
                  <div>NEXT.JS</div>
                  <div>TYPESCRIPT</div>
                  <div>TAILWIND CSS</div>
                  <div>GSAP</div>
                </div>
                
                {/* Backend Stack - top-[379px] */}
                <div className="absolute top-[379px] font-display font-bold text-[14px] text-white uppercase space-y-2">
                  <div>NODE.JS</div>
                  <div>EXPRESS</div>
                  <div>MONGODB</div>
                </div>
                
                {/* Tools - top-[447px] */}
                <div className="absolute top-[447px] font-display font-bold text-[14px] text-white uppercase space-y-2">
                  <div>FIGMA</div>
                  <div>GITHUB</div>
                  <div>VERCEL</div>
                </div>
              </div>
              
              {/* EXPERIENCE Section - top-[539px] */}
              <div className="absolute top-[539px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">EXPERIENCE</h3>
                <div className="font-display font-bold text-[14px] text-white uppercase space-y-4">
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
              
              {/* CONTACT Section - top-[783px] */}
              <div className="absolute top-[783px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">contact</h3>
              </div>
            </div>
            
            {/* Social Links (bottom) - top-[903px] */}
            <div className="absolute top-[903px]">
              <div className="font-display font-bold text-[14px] text-white uppercase space-y-3">
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
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity"
                >
                  GITHUB
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