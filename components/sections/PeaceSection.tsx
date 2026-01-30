'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface PeaceSectionProps {
    onToggleHeader?: (visible: boolean) => void;
    onToggleTheme?: (isDark: boolean) => void;
}

export function PeaceSection({ onToggleHeader, onToggleTheme }: PeaceSectionProps) {
    const [isBlack, setIsBlack] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const isBlackRef = useRef(false);

    useEffect(() => {
        isBlackRef.current = isBlack;
    }, [isBlack]);

    useGSAP(() => {
        // Header Visibility Control & Theme
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            onEnter: () => {
                onToggleHeader?.(true);
                if (isBlackRef.current) onToggleTheme?.(true);
            },
            onLeaveBack: () => {
                onToggleHeader?.(false);
                onToggleTheme?.(false);
            }
        });
    }, { scope: containerRef });

    const handleClick = () => {
        setIsBlack(true);
        onToggleTheme?.(true); // Signal theme change
    };


    return (
        <section
            ref={containerRef}
            id="peace-section"
            onClick={handleClick} // One-way interaction
            className={`relative h-screen w-full overflow-hidden transition-colors duration-0 cursor-pointer ${isBlack ? 'bg-black' : 'bg-white'
                }`}
        >
            {/* 
                --- MOBILE LAYOUT (<md) ---
                PEACE (top 389, left 63, 48px)
                Footer: based in Kyiv (765)
            */}
            <div className="block md:hidden">
                <div className="absolute top-[389px] left-[63px] pointer-events-none select-none">
                    {!isBlack ? (
                        <h2 className="font-display font-bold text-[48px] text-black leading-none uppercase">
                            PEACE
                        </h2>
                    ) : (
                        <h2 className="font-display font-bold text-[24px] text-white leading-none text-center px-4">
                            "For those who can't see this"
                        </h2>
                    )}
                </div>

                {/* Footer (765 Center) */}
                <div className={`absolute top-[765px] left-1/2 transform -translate-x-1/2 font-sans text-[16px] whitespace-nowrap ${isBlack ? 'text-white' : 'text-brand-black'}`}>
                    based in Kyiv
                </div>
            </div>


            {/* --- DESKTOP LAYOUT (md+) --- */}
            <div className="hidden md:block w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    {!isBlack ? (
                        <h2 className="font-display font-bold text-[180px] text-black leading-none uppercase tracking-tighter">
                            PEACE
                        </h2>
                    ) : (
                        <h2 className="font-display font-bold text-[20px] text-white leading-none text-center px-4">
                            "For those who can't see this"
                        </h2>
                    )}
                </div>

                {/* 1. Email (Left) */}
                <div className={`absolute left-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="mailto:mykytapolovianiuk.work@gmail.com">mykytapolovianiuk.work@gmail.com</a>
                </div>

                {/* 2. Instagram (Right) */}
                <div className={`absolute right-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="https://instagram.com/shinjiwwww">instagram</a>
                </div>

                {/* 3. Location (Center) */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 bottom-[30px] font-sans text-base z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'
                        }`}
                >
                    based in Kyiv
                </div>
            </div>

        </section>
    );
}
