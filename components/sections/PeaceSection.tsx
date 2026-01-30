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
          A. CENTER TEXT 
          White Mode: "PEACE" (180px, Black)
          Black Mode: "For those who can't see this" (20px, White)
      */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                {!isBlack ? (
                    <h2 className="font-display font-bold text-[12vw] md:text-[180px] text-black leading-none uppercase tracking-tighter">
                        PEACE
                    </h2>
                ) : (
                    <h2 className="font-display font-bold text-xl md:text-[20px] text-white leading-none">
                        "For those who can't see this"
                    </h2>
                )}
            </div>


            {/* 
            {/* 1. Email (Left) -> Bottom ~35px, Left 52px */}
            <div className={`absolute left-[32px] md:left-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                <a href="mailto:mykytapolovianiuk.work@gmail.com">mykytapolovianiuk.work@gmail.com</a>
            </div>

            {/* 2. Instagram (Right) -> Bottom ~35px, Right ~52px */}
            <div className={`absolute right-[32px] md:right-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                <a href="https://instagram.com/shinjiwwww">instagram</a>
            </div>

            {/* 3. Location (Center) -> Bottom ~30px */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-[30px] font-sans text-base z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'
                    }`}
            >
                based in Kyiv
            </div>

        </section>
    );
}
