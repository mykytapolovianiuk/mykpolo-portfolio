'use client';

import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference p-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-display font-bold text-xl uppercase">
            MYKPOLO
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="font-display text-sm uppercase tracking-wider"
          >
            #about
          </button>
        </div>
      </header>

      {/* Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-brand-white bg-opacity-95 flex items-center justify-center">
          <div className="text-center text-brand-black">
            <h2 className="font-display text-4xl mb-8">ABOUT</h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed">
              Minimalist brutalist portfolio showcasing the evolution from chaos to structure. 
              Every design element follows geometric progression and monochromatic purity.
            </p>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 font-display text-sm uppercase tracking-wider border border-brand-black px-6 py-3 hover:bg-brand-black hover:text-brand-white transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}