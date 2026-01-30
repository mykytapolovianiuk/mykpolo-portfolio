'use client';

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { EvolutionSection } from '@/components/sections/EvolutionSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { PeaceSection } from '@/components/sections/PeaceSection';

// Register specific plugin here if needed, or rely on global registration in components
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isDark, setIsDark] = useState(false); // Theme state
  const mainRef = useRef<HTMLElement>(null);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isHeroAnimating, setIsHeroAnimating] = useState(false);

  // Wait for fonts
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // 1. Strict Scroll Restoration
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // 2. Font Checking
    if (typeof document !== 'undefined') {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  if (!fontsLoaded) return null;


  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => {
          setIsLoading(false);
          setIsHeroAnimating(true);
        }} />
      )}

      {/* Main Content Layer */}
      <main ref={mainRef} className="relative z-0 bg-brand-white min-h-screen">
        <Header visible={headerVisible} isDark={isDark} />

        {/* Hero Section */}
        <Hero startAnimation={isHeroAnimating} />

        {/* Evolution Section - Header logic handled inside */}
        <EvolutionSection onToggleHeader={setHeaderVisible} />

        {/* Project Section */}
        <ProjectSection />

        {/* Peace Section - Header logic handled inside */}
        <PeaceSection
          onToggleHeader={setHeaderVisible}
          onToggleTheme={setIsDark}
        />
      </main>
    </>
  );
}