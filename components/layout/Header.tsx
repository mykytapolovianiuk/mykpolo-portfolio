'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-black/90 backdrop-blur-sm py-4' : 'py-8'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          MYKPOLO
        </button>
        
        <nav>
          <ul className="flex space-x-8">
            <li>
              <button 
                onClick={() => scrollToSection('work')}
                className="hover:opacity-70 transition-opacity uppercase text-sm tracking-wider"
              >
                WORK
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:opacity-70 transition-opacity uppercase text-sm tracking-wider"
              >
                ABOUT
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:opacity-70 transition-opacity uppercase text-sm tracking-wider"
              >
                CONTACT
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}