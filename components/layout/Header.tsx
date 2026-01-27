'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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

      {/* Side Panel Overlay - Fixed 600px width sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-brand-black z-50 w-[600px] max-w-full transform transition-transform duration-600 ease-out ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                  Full-stack developer based in Kyiv, creating digital experiences with attention to detail and modern technologies.
                </p>
              </div>
              
              {/* TECHNOLOGY Section - top-[245px] */}
              <div className="absolute top-[245px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">TECHNOLOGY</h3>
                
                {/* Frontend - top-[311px] */}
                <div className="absolute top-[311px]">
                  <div className="font-display font-bold text-[14px] text-white uppercase mb-2">Frontend</div>
                  <div className="font-display font-bold text-[14px] text-white">
                    React, Next.js, TypeScript, Wordpress, shopify, Tailwind CSS
                  </div>
                </div>
                
                {/* Backend - top-[379px] */}
                <div className="absolute top-[379px]">
                  <div className="font-display font-bold text-[14px] text-white uppercase mb-2">Backend</div>
                  <div className="font-display font-bold text-[14px] text-white">
                    Node.js, Express, MongoDB, firebase, Supabase, PHP
                  </div>
                </div>
                
                {/* Tools - top-[447px] */}
                <div className="absolute top-[447px]">
                  <div className="font-display font-bold text-[14px] text-white uppercase mb-2">Tools</div>
                  <div className="font-display font-bold text-[14px] text-white">
                    Git, Figma, Framer, GSAP, Photoshop, ai
                  </div>
                </div>
              </div>
              
              {/* EXPERIENCE Section - top-[539px] */}
              <div className="absolute top-[539px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">EXPERIENCE</h3>
                
                {/* Experience 1 - top-[589px] */}
                <div className="absolute top-[589px]">
                  <div className="font-display font-bold text-[14px] text-white/70 mb-2">2025</div>
                  <div className="font-display font-bold text-[14px] text-white">
                    Freelance Full-stack Developer & Frontend Developer Web Agency
                  </div>
                </div>
                
                {/* Experience 2 - top-[675px] */}
                <div className="absolute top-[675px]">
                  <div className="font-display font-bold text-[14px] text-white/70 mb-2">2023-2024</div>
                  <div className="font-display font-bold text-[14px] text-white">
                    Freelance web Developer
                  </div>
                </div>
              </div>
              
              {/* CONTACT Section - top-[783px] */}
              <div className="absolute top-[783px]">
                <h3 className="font-display font-bold text-[16px] text-white uppercase mb-6">contact</h3>
              </div>
            </div>
            
            {/* Social Links (bottom) - top-[903px] with specific hrefs */}
            <div className="absolute top-[903px]">
              <div className="font-display font-bold text-[14px] text-white space-y-3">
                <a 
                  href="https://instagram.com/shinjiwwww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity uppercase"
                >
                  instagram
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity uppercase"
                >
                  linkedin
                </a>
                <a 
                  href="https://github.com/mykytapolovianiuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-70 transition-opacity uppercase"
                >
                  github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
}