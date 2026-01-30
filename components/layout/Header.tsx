'use client';

import { useState } from 'react';

interface HeaderProps {
  visible?: boolean;
  isDark?: boolean;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

export function Header({ visible = true, isDark = false, isOpen = false, onToggle }: HeaderProps) {

  return (
    <>
      {/* Header Container - Fades based on visible prop */}
      <header
        className={`fixed top-0 left-0 w-full z-50 mix-blend-difference text-white transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Logo */}
        <div className="absolute top-[30px] left-[52px] pointer-events-auto hidden md:block">
          <div className="font-display font-bold text-[24px]">MYKPOLO</div>
        </div>

        {/* About Button (Desktop) */}
        <button
          onClick={() => onToggle?.(!isOpen)}
          className="absolute top-[35px] right-[52px] font-display font-bold text-[16px] hover:opacity-70 transition-opacity pointer-events-auto cursor-pointer hidden md:block"
        >
          #about
        </button>
      </header>

      {/* Sidebar - Fixed right, 600px width (Desktop) / Full Width (Mobile) */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] z-[60] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <div className={`relative w-full h-full ${isDark ? 'text-black' : 'text-white'}`}>

          {/* Close Button (Mobile: 327, 27 | Desktop: Right 54) */}
          <button
            onClick={() => onToggle?.(false)}
            className="absolute top-[27px] right-[24px] md:top-[39px] md:right-[54px] font-display font-bold text-[16px] hover:opacity-70 cursor-pointer z-50"
          >
            x
          </button>

          {/* Mobile "about" label */}
          <div className="absolute top-[27px] left-[30px] font-display font-bold text-[16px] md:hidden z-50">
            about
          </div>

          {/* Content Container (Scrollable) */}
          <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-20 pt-[60px] md:pt-0">
            {/* Note: I added top padding for mobile so content doesn't overlap header close/about buttons */}
            <div className="relative min-h-[900px] flex flex-col gap-8 md:block">

              {/* 1. Bio */}
              <div className="relative md:absolute top-0 left-[30px] w-[317px] md:top-[105px] md:left-[43px] md:w-[496px] mt-10 md:mt-0">
                <p className="font-display font-bold text-[12px] md:text-[16px] leading-relaxed uppercase">
                  Full-stack developer based in Kyiv, creating digital experiences with attention to detail and modern technologies.
                </p>
              </div>

              {/* 2. Technology */}
              <div className="relative md:absolute left-[30px] md:top-[245px] md:left-[43px]">
                <h3 className="font-display font-bold text-[14px] md:text-[16px] uppercase mb-4 md:mb-6">TECHNOLOGY</h3>
                <div className="flex flex-col gap-8 md:gap-8 font-display font-bold text-[12px] md:text-[14px] uppercase pl-[8px] md:pl-0">
                  <div className="flex flex-col gap-1">
                    <span className="block opacity-50 text-[10px] md:text-[12px] mb-1">Frontend</span>
                    <span>React, Next.js, TypeScript, Wordpress, Shopify, Tailwind CSS</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="block opacity-50 text-[10px] md:text-[12px] mb-1">Backend</span>
                    <span>Node.js, Express, MongoDB, Firebase, Supabase, PHP</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="block opacity-50 text-[10px] md:text-[12px] mb-1">Tools</span>
                    <span>Git, Figma, Framer, GSAP, Photoshop, AI</span>
                  </div>
                </div>
              </div>

              {/* 3. Experience */}
              <div className="relative md:absolute left-[30px] md:top-[539px] md:left-[43px]">
                <h3 className="font-display font-bold text-[14px] md:text-[16px] uppercase mb-4 md:mb-6">EXPERIENCE</h3>
                <div className="flex flex-col gap-6 font-display font-bold text-[10px] md:text-[14px] uppercase pl-[8px] md:pl-0">
                  <div className="flex flex-row md:gap-4 relative">
                    <span className="w-[80px] absolute left-0 top-0 md:static">2025</span>
                    <div className="pl-[75px] md:pl-0 flex flex-row md:flex-col gap-4 md:gap-0">
                      <div className="w-[104px] md:w-auto">Freelance Full-stack Developer</div>
                      <div className="opacity-70 w-auto md:w-auto">& Frontend Developer Web Agency</div>
                    </div>
                  </div>
                  <div className="flex flex-row md:gap-4 mt-6 md:mt-0">
                    <span className="w-[80px]">2023-2024</span>
                    <div>Freelance Web Developer</div>
                  </div>
                </div>
              </div>

              {/* 4. Footer Links */}
              <div className="relative md:absolute left-[30px] pb-10 md:top-[850px] md:left-[43px]">
                <h3 className="font-display font-bold text-[14px] uppercase mb-4 md:hidden">contact</h3>
                <div className="pl-[1px] md:pl-0">
                  <div className="font-sans text-[12px] lowercase underline mb-8 md:hidden">
                    mykytapolovianiuk.work@gmail.com
                  </div>
                  <div className="flex gap-8 font-display font-bold text-[14px] uppercase">
                    <a href="https://instagram.com/shinjiwwww" className="hover:underline">instagram</a>
                    <a href="https://github.com/mykytapolovianiuk" className="hover:underline">github</a>
                    <a href="https://linkedin.com" className="hover:underline md:hidden">linkedin</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => onToggle?.(false)}
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity duration-500 ease-in-out"
        />
      )}
    </>
  );
}