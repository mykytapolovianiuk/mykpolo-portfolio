'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { sendGAEvent } from '../../lib/analytics';

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
            delay: 0.2,
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
        <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">

            {/* --- MOBILE LAYOUT (<md) --- */}
            <div className="block md:hidden w-full h-full absolute inset-0">
                {/* Top Left: MYKPOLO */}
                <div className="absolute top-[7.7vw] left-[6.9vw] z-20">
                    <div className="font-display font-bold text-[3.7vw] leading-none text-black">
                        MYKPOLO
                    </div>
                </div>

                {/* Top Right: #about */}
                <button
                    onClick={() => {
                        onOpenAbout?.();
                        sendGAEvent('open_about', { source: 'hero' });
                    }}
                    className="absolute top-[7.7vw] right-[6.9vw] z-20 font-display font-bold text-[3.7vw] leading-none text-black cursor-pointer"
                >
                    #about
                </button>

                {/* Center Triangle (Manual Positioning) */}
                {/* Width 66vw. Center = (100 - 66) / 2 = 17vw. */}
                {/* Top ~30% for visual balance. */}
                <div className="absolute left-[18vw] top-[20%] z-10 w-[66vw] h-[66vw] flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 200 200" className="hero-triangle text-black">
                        {/* Centered Triangle Points: Top(100, 40), Left(30, 160), Right(170, 160) */}
                        <polygon points="100,40 30,160 170,160" fill="currentColor" />
                    </svg>
                </div>

                {/* Bottom Left: Name */}
                {/* Reverted to 10% bottom to fix 'too high' issue */}
                <div className="absolute bottom-[25%] left-[5.3vw] z-20">
                    <h1 className="font-display font-bold text-[10.6vw] leading-[1.5] text-black">
                        Mykyta<br />Polovianiuk
                    </h1>
                </div>

                {/* Bottom Center: Location & Arrow */}
                <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                    <span className="font-sans text-[4.2vw] text-black whitespace-nowrap">
                        based in Kyiv
                    </span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-black animate-bounce w-[6vw] h-[6vw]"
                    >
                        <path d="M7 13L12 18L17 13M12 6L12 17" />
                    </svg>
                </div>
            </div>


            {/* --- DESKTOP LAYOUT (md+) --- */}
            <div className="hidden md:block w-full h-full absolute inset-0">
                {/* Main Name */}
                {/* Vertical position pinned to height %, Text size scales with width */}
                <div className="hero-name absolute top-[39%] left-[3.6vw] z-20">
                    <h1 className="font-display font-bold text-[8.8vw] leading-[13.8vw] text-black">
                        Mykyta Polovianiuk
                    </h1>
                </div>

                {/* Center Triangle */}
                {/* Position pinned to height %. Size scales with width. */}
                <div className="absolute top-[25%] right-[3.5vw] transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 200 200"
                        className="hero-triangle text-black w-[20.8vw] h-[20.8vw]"
                    >
                        {/* Centered Triangle Points: Top(100, 40), Left(30, 160), Right(170, 160) */}
                        <polygon points="100,40 30,160 170,160" fill="currentColor" />
                    </svg>
                </div>

                {/* Footer Elements */}
                {/* Sticking to bottom securely */}
                <a
                    href="mailto:mykytapolovianiuk.work@gmail.com"
                    className="absolute bottom-8 left-[2.2vw] font-sans text-[1.1vw] text-black underline transition-all lowercase"
                >
                    mykytapolovianiuk.work@gmail.com
                </a>

                <a
                    href="https://instagram.com/shinjiwwww"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-8 right-[2.2vw] font-sans text-[1.1vw] text-black underline transition-all lowercase"
                >
                    instagram
                </a>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="font-sans text-[1vw] text-black">
                        based in Kyiv
                    </span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-black animate-bounce w-[1.5vw] h-[1.5vw]"
                    >
                        <path d="M7 13L12 18L17 13M12 6L12 17" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
