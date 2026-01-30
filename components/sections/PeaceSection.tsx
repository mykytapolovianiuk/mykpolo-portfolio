'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface PeaceSectionProps {
    onToggleHeader?: (visible: boolean) => void;
}

export function PeaceSection({ onToggleHeader }: PeaceSectionProps) {
    const [isBlack, setIsBlack] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Header Visibility Control
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom", // As soon as it enters view? Or closer to enter? Design says "reappears ONLY when user reaches Peace". 
            // Let's say when 50% visible?
            // Instruction: "In PeaceSection: When onEnter (reached bottom), set headerVisible(true)"
            // "onLeaveBack (scrolling up to Projects), set headerVisible(false)"
            onEnter: () => onToggleHeader?.(true),
            onLeaveBack: () => onToggleHeader?.(false)
        });
    }, { scope: containerRef });


    return (
        <section
            ref={containerRef}
            id="peace-section"
            onClick={() => setIsBlack(!isBlack)}
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
          B. FOOTER ELEMENTS (Absolute)
          Colors switch based on isBlack
          Using Tailwind for positioning approximations based on 1440x1024 ref
      */}

            {/* 1. Email (Left) -> Bottom ~35px, Left 52px */}
            <a
                href="mailto:mykytapolovianiuk.work@gmail.com"
                className={`absolute left-[32px] md:left-[52px] bottom-[35px] font-sans text-base underline z-10 ${isBlack ? 'text-white' : 'text-black'
                    }`}
            >
                mykytapolovianiuk.work@gmail.com
            </a>

            {/* 2. Instagram (Right) -> Bottom ~35px, Right ~52px */}
            <a
                href="https://instagram.com/shinjiwwww"
                className={`absolute right-[32px] md:right-[52px] bottom-[35px] font-sans text-base underline z-10 ${isBlack ? 'text-white' : 'text-black'
                    }`}
            >
                instagram
            </a>

            {/* 3. Location (Center) -> Bottom ~30px */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-[30px] font-sans text-base z-10 ${isBlack ? 'text-white' : 'text-black'
                    }`}
            >
                based in Kyiv
            </div>

        </section>
    );
}
