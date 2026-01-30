'use client';

import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { EvolutionSection } from '@/components/sections/EvolutionSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, [isLoading]);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isHeroAnimating, setIsHeroAnimating] = useState(false);

  // Wait for fonts
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
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
      <div className="relative z-0">
        <Header />

        {/* Hero Section - Always rendered underneath */}
        <Hero startAnimation={isHeroAnimating} />


        {/* Evolution Section - Chaos to Structure to Product */}
        <EvolutionSection />
      </div>
    </>
  );
}