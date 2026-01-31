'use client';

import { sendGAEvent } from '@/lib/analytics';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
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

    // Keep state ref updated
    useEffect(() => {
        isBlackRef.current = isBlack;
    }, [isBlack]);

    useLayoutEffect(() => {
        // Ensure Header is visible when entering Peace section from refresh or navigation
        onToggleHeader?.(true);

        // We can still use ScrollTrigger to toggle it if we scroll back up?
        // User instruction: "Header Logic: useLayoutEffect: setHeaderVisible(true) on mount/enter."
        // Let's implement ScrollTrigger for precise control as well, but default to true.
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%", // slightly earlier
                onEnter: () => {
                    onToggleHeader?.(true);
                    if (isBlackRef.current) onToggleTheme?.(true);
                },
                onLeaveBack: () => {
                    onToggleHeader?.(false); // Hide when going back to Projects (as Projects requested)
                    onToggleTheme?.(false);
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleClick = () => {
        setIsBlack(true);
        onToggleTheme?.(true);
        sendGAEvent('activate_peace_secret', { time: new Date().toISOString() });
    };

    const scrollToTop = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section
            ref={containerRef}
            id="peace-section"
            onClick={handleClick}
            className={`relative min-h-screen w-full overflow-hidden transition-colors duration-0 cursor-pointer ${isBlack ? 'bg-black' : 'bg-white'}`}
        >
            {/* CENTER TEXT */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                {!isBlack ? (
                    <h2 className="font-display font-bold text-[18vw] md:text-[180px] text-black leading-none uppercase tracking-tighter">
                        PEACE
                    </h2>
                ) : (
                    <h2 className="font-display font-bold text-[5vw] md:text-[20px] text-white leading-none text-center px-4">
                        "For those who can't see this"
                    </h2>
                )}
            </div>

            {/* FOOTER DESK/MOBILE SPLIT */}

            {/* Desktop Footer (hidden mobile) */}
            <div className="hidden md:block">
                <div className={`absolute left-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="mailto:mykytapolovianiuk.work@gmail.com">mykytapolovianiuk.work@gmail.com</a>
                </div>
                <div className={`absolute right-[52px] bottom-[35px] font-sans text-base underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="https://instagram.com/shinjiwwww">instagram</a>
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-[30px] font-sans text-base z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    based in Kyiv
                </div>
            </div>

            {/* Mobile Footer (visible mobile) */}
            <div className="block md:hidden">
                <div className={`absolute left-5 bottom-6 font-sans text-sm underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="mailto:mykytapolovianiuk.work@gmail.com">email</a>
                </div>
                <div className={`absolute right-5 bottom-6 font-sans text-sm underline z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    <a href="https://instagram.com/shinjiwwww">instagram</a>
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 bottom-12 font-sans text-sm z-10 bg-transparent ${isBlack ? 'text-white' : 'text-black'}`}>
                    based in Kyiv
                </div>
            </div>

            {/* SCROLL TO TOP BUTTON (New Requirement) */}
            <div className="absolute bottom-[80px] md:bottom-[80px] left-1/2 -translate-x-1/2 z-20">
                <button
                    onClick={scrollToTop}
                    className={`w-12 h-12 rounded-full border border-current flex items-center justify-center transition-colors hover:opacity-70 ${isBlack ? 'text-white border-white' : 'text-black border-black'}`}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19V5M12 5L5 12M12 5L19 12" />
                    </svg>
                </button>
            </div>

        </section>
    );
}
