'use client';

import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { EvolutionSection } from '@/components/sections/EvolutionSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    // Only need this hook if there are other global animations
    // Hero animation is now handled inside the Hero component
  }, [isLoading]);

  const [isHeroAnimating, setIsHeroAnimating] = useState(false);

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