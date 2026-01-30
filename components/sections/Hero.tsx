'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

interface HeroProps {
    startAnimation: boolean;
    onOpenAbout?: () => void;
}

export function Hero({ startAnimation, onOpenAbout }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        // Initialize timeline but KEEP IT PAUSED
        timelineRef.current = gsap.timeline({ paused: true });

        // Animate triangle with rotation ONLY (no scaling/fading)
        // Wait 1 second (per previous delay), then rotate
        timelineRef.current.to('.hero-triangle', {
            rotation: 180,
            duration: 1,
            delay: 1,
            ease: 'power2.inOut'
        });
    }, { scope: containerRef });

    // Play timeline when startAnimation becomes true
    useEffect(() => {
        if (startAnimation && timelineRef.current) {
            timelineRef.current.play();
        }
    }, [startAnimation]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-brand-white overflow-hidden">

            {/* --- MOBILE LAYOUT (<md) --- */}
            <div className="block md:hidden">
                {/* Top Left: MYKPOLO (26, 29) */}
                <div className="absolute top-[29px] left-[26px] z-20">
                    <h1 className="font-display font-bold text-[14px] leading-none text-brand-black">
                        MYKPOLO
                    </h1>
                </div>

                {/* Top Right: #about (262, 29) - Opens Overlay */}
                <button
                    onClick={onOpenAbout}
                    className="absolute top-[29px] left-[262px] z-20 font-display font-bold text-[14px] leading-none text-brand-black cursor-pointer"
                >
                    #about
                </button>

                {/* Center Triangle (Centered roughly? Specs said "Center/Visual triangle 250x250") */}
                {/* Let's center it in the view. */}
                <div className="hero-triangle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-10">
                    <svg width="250" height="250" viewBox="0 0 200 200" className="text-brand-black">
                        <polygon points="70,0 0,121 140,121" fill="currentColor" />
                    </svg>
                </div>

                {/* Main Text (20, 450) */}
                <div className="absolute top-[450px] left-[20px] z-20">
                    <h2 className="font-display font-bold text-[40px] leading-[1.1] text-brand-black">
                        Mykyta<br />Polovianiuk
                    </h2>
                </div>

                {/* Footer (Center, 765) */}
                <div className="absolute top-[765px] left-1/2 transform -translate-x-1/2 font-sans text-[16px] text-brand-black whitespace-nowrap">
                    based in Kyiv
                </div>
            </div>


            {/* --- DESKTOP LAYOUT (md+) --- */}
            <div className="hidden md:block">
                {/* Main Name - Positioned exactly as Figma: top-[436px], left-[52px] */}
                {/* Static position, no animation class */}
                <div className="hero-name absolute top-[350px] left-[52px] z-20">
                    <h1 className="font-display font-bold text-[128px] leading-[200px] text-brand-black md:text-[128px] text-[64px]">
                        Mykyta Polovianiuk
                    </h1>
                </div>

                {/* Center Triangle - Positioned in center */}
                {/* Initial state is visible (scale 1, opacity 1) due to CSS, GSAP only handles rotation */}
                <div className="hero-triangle absolute top-1/4 right-1/25 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <svg
                        width="300"
                        height="300"
                        viewBox="0 0 200 200"
                        className="text-brand-black"
                    >
                        <polygon
                            points="70,0 0,121 140,121"
                            fill="currentColor"
                        />
                    </svg>
                </div>

                {/* Footer Elements - Positioned at bottom */}
                {/* Email Link - Bottom Left */}
                <a
                    href="mailto:mykytapolovianiuk.work@gmail.com"
                    className="absolute bottom-8 left-8 font-sans text-[16px] text-brand-black underline transition-all lowercase"
                >
                    mykytapolovianiuk.work@gmail.com
                </a>

                {/* Instagram Link - Bottom Right */}
                <a
                    href="https://instagram.com/shinjiwwww"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-8 right-8 font-sans text-[16px] text-brand-black underline transition-all lowercase"
                >
                    instagram
                </a>

                {/* Location and Arrow - Bottom Center */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="text-brand-black mb-1"
                    >
                        <path
                            d="M7 10l5 5 5-5z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="font-sans text-[14px] text-brand-black">
                        based in Kyiv
                    </span>
                </div>
            </div>
        </section>
    );
}
