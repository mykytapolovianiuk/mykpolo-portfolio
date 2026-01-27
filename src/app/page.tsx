'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from '@/components/layout/Header';
import { ProjectCard } from '@/components/sections/ProjectCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Initial animation for chaos to structure concept
    gsap.fromTo('.hero-element', 
      { 
        scale: 0,
        rotation: 180,
        opacity: 0 
      },
      { 
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out'
      }
    );

    // Scroll-triggered animations
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  const projects = [
    {
      title: "GEOMETRIC EVOLUTION",
      description: "Interactive installation exploring the transformation from chaotic forms to structured geometric patterns."
    },
    {
      title: "MONOCHROMATIC REALITY",
      description: "Brand identity system built entirely in black and white, challenging traditional color theory."
    },
    {
      title: "BRUTAL INTERFACES",
      description: "Web application design system embracing raw, unrefined digital aesthetics."
    },
    {
      title: "STRUCTURAL CHAOS",
      description: "Typography experiment pushing the boundaries between legibility and artistic expression."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-black text-brand-white overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 hero-element">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
              MYKPOLO
            </h1>
            <div className="w-32 h-1 bg-brand-white mx-auto mb-8"></div>
          </div>
          
          <p className="text-xl md:text-2xl mb-12 hero-element max-w-2xl mx-auto">
            MINIMALIST BRUTALISM
          </p>
          
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto hero-element">
            <div className="aspect-square bg-brand-white chaos-to-structure-square"></div>
            <div className="aspect-square bg-brand-white chaos-to-structure-triangle"></div>
            <div className="aspect-square bg-brand-white chaos-to-structure-circle"></div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 animate-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">SELECTED WORK</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                description={project.description}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-brand-white text-brand-black animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">CHAOS TO STRUCTURE</h2>
            <p className="text-xl md:text-2xl leading-relaxed">
              Transforming raw creative energy into purposeful, structured digital experiences. 
              Every line, every shape, every interaction follows the evolutionary path from 
              chaos to perfect geometric harmony.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">LET'S CREATE</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Ready to transform your vision into structured digital reality?
          </p>
          <button className="border-2 border-brand-white px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-brand-white hover:text-brand-black transition-all duration-300">
            GET IN TOUCH
          </button>
        </div>
      </section>
    </div>
  );
}
