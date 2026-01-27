'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isPanelOpen) {
      // Open: Move to 0%
      gsap.to(panelRef.current, {
        xPercent: 0,
        duration: 0.8,
        ease: 'power4.out',
      });
    } else {
      // Close: Move to 100% (off screen)
      gsap.to(panelRef.current, {
        xPercent: 100,
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, [isPanelOpen]);

  return (
    <>
      {/* Top Bar - Fixed header with mix-blend-difference */}
      <div className="fixed top-0 left-0 w-full h-0 z-50 pointer-events-none mix-blend-difference text-brand-white">
        {/* Logo */}
        <div className="absolute top-[30px] left-[52px] pointer-events-auto">
          <div className="font-display font-bold text-[24px]">MYKPOLO</div>
        </div>
        
        {/* About Button */}
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-[35px] right-[52px] font-display font-bold text-[16px] uppercase hover:opacity-70 transition-opacity pointer-events-auto cursor-pointer"
        >
          #about
        </button>
      </div>

      {/* Sidebar - Fixed right, 600px width, black background */}
      {/* CRITICAL: Initial transform: translateX(100%) to prevent black screen flash */}
      <div 
        ref={panelRef}
        style={{ transform: 'translateX(100%)' }} 
        className="fixed top-0 right-0 h-screen w-full md:w-[600px] bg-black z-[60] shadow-2xl"
      >
        <div className="relative w-full h-full text-white">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsPanelOpen(false)}
            className="absolute top-[39px] right-[54px] font-display font-bold text-[16px] uppercase hover:opacity-70 cursor-pointer z-20"
          >
            x
          </button>

          {/* Content Container */}
          <div className="absolute inset-0 overflow-y-auto no-scrollbar">
             <div className="relative min-h-[900px]">
                
                {/* 1. Intro */}
                <div className="absolute top-[105px] left-[43px] w-[80%] md:w-[496px]">
                  <p className="font-display font-bold text-[16px] leading-relaxed uppercase">
                    Full-stack developer based in Kyiv, creating digital experiences with attention to detail and modern technologies.
                  </p>
                </div>

                {/* 2. Technology */}
                <div className="absolute top-[245px] left-[43px]">
                  <h3 className="font-display font-bold text-[16px] uppercase mb-6">TECHNOLOGY</h3>
                  <div className="flex flex-col gap-8 font-display font-bold text-[14px] uppercase">
                     <div>
                        <span className="block opacity-50 text-[12px] mb-1">Frontend</span>
                        <span>React, Next.js, TypeScript, Wordpress, Shopify, Tailwind CSS</span>
                     </div>
                     <div>
                        <span className="block opacity-50 text-[12px] mb-1">Backend</span>
                        <span>Node.js, Express, MongoDB, Firebase, Supabase, PHP</span>
                     </div>
                     <div>
                        <span className="block opacity-50 text-[12px] mb-1">Tools</span>
                        <span>Git, Figma, Framer, GSAP, Photoshop, AI</span>
                     </div>
                  </div>
                </div>

                {/* 3. Experience */}
                <div className="absolute top-[539px] left-[43px]">
                   <h3 className="font-display font-bold text-[16px] uppercase mb-6">EXPERIENCE</h3>
                   <div className="flex flex-col gap-6 font-display font-bold text-[14px] uppercase">
                      <div className="flex gap-4">
                         <span className="w-[80px]">2025</span>
                         <div>
                            <div>Freelance Full-stack Developer</div>
                            <div className="opacity-70">& Frontend Developer Web Agency</div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <span className="w-[80px]">2023-24</span>
                         <div>Freelance Web Developer</div>
                      </div>
                   </div>
                </div>

                {/* 4. Footer Links */}
                <div className="absolute top-[850px] md:top-[903px] left-[43px] pb-10">
                   <div className="flex gap-8 font-display font-bold text-[14px] uppercase">
                      <a href="https://instagram.com/shinjiwwww" className="hover:underline">instagram</a>
                      <a href="https://github.com/mykytapolovianiuk" className="hover:underline">github</a>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isPanelOpen && (
        <div 
          onClick={() => setIsPanelOpen(false)}
          className="fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm transition-opacity duration-500"
        />
      )}
    </>
  );
}