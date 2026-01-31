'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sendGAEvent } from '@/lib/analytics';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function ProjectSection({ onToggleHeader }: { onToggleHeader?: (visible: boolean) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // GLOBAL PINNING
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", // Increased pin duration for better feel
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Recalculate on resize
            anticipatePin: 1, // Smoother pinning
            onEnter: () => onToggleHeader?.(false),
            onLeaveBack: () => onToggleHeader?.(true)
        });

        // GLOBAL ANIMATIONS (Floating)
        gsap.to(".project-item", {
            y: "random(-10, 10)",
            x: "random(-10, 10)",
            rotation: "random(-2, 2)",
            duration: "random(4, 7)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { amount: 2, from: "random" }
        });

        // Heartbeat (Global)
        if (circleRef.current) {
            gsap.to(circleRef.current, {
                scale: 1.05,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

    }, { scope: containerRef });

    return (
        <section
            id="project-section"
            ref={containerRef}
            className="w-full min-h-screen bg-brand-white relative overflow-hidden md:flex md:flex-col md:items-center md:justify-center"
        >
            {/* --- MOBILE LAYOUT (<md) --- */}
            {/* RESTORED ABSOLUTE POSITIONING */}
            <div className="block md:hidden w-full h-[900px] relative">
                {/* PROJECT Title (41, 22) */}
                <div className="absolute top-[41px] left-[22px]">
                    <h2 className="font-display font-bold text-[22px] leading-none text-brand-black uppercase">
                        PROJECT
                    </h2>
                </div>

                {/* Circle Anchor (84, 150, 200x200) */}
                <div
                    id="project-circle-anchor-mobile"
                    className="absolute top-[84px] left-[150px] w-[200px] h-[200px] rounded-full bg-black pointer-events-none"
                />

                {/* Svitanok (332, 29) */}
                <a href="https://notion.site/mykpolo/svitanok" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'Svitanok', source: 'mobile_list' })} className="project-item absolute top-[332px] left-[29px] flex items-center gap-3">
                    <div>
                        <div className="font-sans font-medium text-[20px] leading-tight text-brand-black">
                            Svitanok<br />
                            <span className="text-[16px] opacity-60">2025, e-commerce</span>
                        </div>
                    </div>
                    <svg width="24" height="24" className="opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* FoutUp (411, 205) */}
                <a href="https://notion.site/mykpolo/foutup" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'FoutUp', source: 'mobile_list' })} className="project-item absolute top-[411px] left-[205px] flex items-center gap-3">
                    <div>
                        <div className="font-sans font-medium text-[20px] leading-tight text-brand-black">
                            FoutUp<br />
                            <span className="text-[16px] opacity-60">2025, e-commerce</span>
                        </div>
                    </div>
                    <svg width="24" height="24" className="opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* TRON (456, 29) */}
                <a href="https://notion.site/mykpolo/tron" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'TRON', source: 'mobile_list' })} className="project-item absolute top-[456px] left-[29px] flex items-center gap-3">
                    <div>
                        <div className="font-sans font-medium text-[20px] leading-tight text-brand-black">
                            TRON<br />
                            <span className="text-[16px] opacity-60">2025, web3</span>
                        </div>
                    </div>
                    <svg width="24" height="24" className="opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* Lux Yachts (517, 188) */}
                <a href="https://notion.site/mykpolo/luxyachts" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'Lux Yachts', source: 'mobile_list' })} className="project-item absolute top-[517px] left-[188px] flex items-center gap-3">
                    <div>
                        <div className="font-sans font-medium text-[20px] leading-tight text-brand-black">
                            Lux Yachts<br />
                            <span className="text-[16px] opacity-60">2025, shop</span>
                        </div>
                    </div>
                    <svg width="24" height="24" className="opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* ProfContact (590, 47) */}
                <a href="https://notion.site/mykpolo/profcontact" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'ProfContact', source: 'mobile_list' })} className="project-item absolute top-[590px] left-[47px] flex items-center gap-3">
                    <div>
                        <div className="font-sans font-medium text-[20px] leading-tight text-brand-black">
                            ProfContact<br />
                            <span className="text-[16px] opacity-60">2024, job’s help</span>
                        </div>
                    </div>
                    <svg width="24" height="24" className="opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>
            </div>

            {/* --- DESKTOP LAYOUT (md+) --- */}
            <div className="hidden md:block w-[1440px] h-[900px] shrink-0 relative">
                {/* TITLE */}
                <div className="absolute left-[66px] top-[30px]">
                    <h2 className="font-display font-semibold text-[32px] uppercase leading-none text-brand-black">
                        PROJECT
                    </h2>
                </div>

                {/* ANCHOR */}
                <div
                    ref={circleRef}
                    id="project-circle-anchor"
                    className="absolute left-[1072px] top-[100px] w-[302px] h-[309px] rounded-full bg-black origin-center pointer-events-none"
                />

                {/* ITEMS (Absolute Coordinates) */}
                <a href="https://notion.site/mykpolo/svitanok" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'Svitanok', source: 'desktop_map' })} className="project-item absolute left-[66px] top-[250px] group flex items-center gap-4" data-cursor-text="VIEW">
                    <div className="relative">
                        <div className="font-sans text-[32px] font-medium leading-tight text-brand-black">
                            Svitanok<br />
                            <span className="leading-tight lowercase opacity-100 text-brand-black">2025, e-commerce</span>
                        </div>
                        <div className="h-[2px] w-0 bg-brand-black group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                    </div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* FoutUp */}
                <a href="https://notion.site/mykpolo/foutup" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'FoutUp', source: 'desktop_map' })} className="project-item absolute left-[690px] top-[330px] group flex items-center gap-4" data-cursor-text="VIEW">
                    <div className="relative">
                        <div className="font-sans text-[32px] font-medium leading-tight text-brand-black">
                            FoutUp<br />
                            <span className="leading-tight lowercase opacity-100 text-brand-black">2025, e-commerce</span>
                        </div>
                        <div className="h-[2px] w-0 bg-brand-black group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                    </div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* TRON */}
                <a href="https://notion.site/mykpolo/tron" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'TRON', source: 'desktop_map' })} className="project-item absolute left-[443px] top-[520px] group flex items-center gap-4" data-cursor-text="VIEW">
                    <div className="relative">
                        <div className="font-sans text-[32px] font-medium leading-tight text-brand-black">
                            TRON<br />
                            <span className="leading-tight lowercase opacity-100 text-brand-black">2025, web3</span>
                        </div>
                        <div className="h-[2px] w-0 bg-brand-black group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                    </div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* ProfContact */}
                <a href="https://notion.site/mykpolo/profcontact" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'ProfContact', source: 'desktop_map' })} className="project-item absolute left-[934px] top-[680px] group flex items-center gap-4" data-cursor-text="VIEW">
                    <div className="relative">
                        <div className="font-sans text-[32px] font-medium leading-tight text-brand-black">
                            ProfContact<br />
                            <span className="leading-tight lowercase opacity-100 text-brand-black">2024, job’s help</span>
                        </div>
                        <div className="h-[2px] w-0 bg-brand-black group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                    </div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* Lux Yachts */}
                <a href="https://notion.site/mykpolo/luxyachts" target="_blank" onClick={() => sendGAEvent('click_project', { project_name: 'Lux Yachts', source: 'desktop_map' })} className="project-item absolute left-[77px] top-[700px] group flex items-center gap-4" data-cursor-text="VIEW">
                    <div className="relative">
                        <div className="font-sans text-[32px] font-medium leading-tight text-brand-black">
                            Lux Yachts<br />
                            <span className="leading-tight lowercase opacity-100 text-brand-black">2025, shop</span>
                        </div>
                        <div className="h-[2px] w-0 bg-brand-black group-hover:w-full transition-all duration-300 absolute bottom-0 left-0" />
                    </div>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                {/* --- MARQUEE CTA (Desktop Only) --- */}
                <div className="hidden md:flex absolute bottom-[100px] left-0 w-full z-20 bg-brand-white border-t-2 border-brand-black py-3 overflow-hidden group">
                    <a
                        href="mailto:mykytapolovianiuk.work@gmail.com"
                        onClick={() => sendGAEvent('click_hire_me', { source: 'marquee' })}
                        className="flex whitespace-nowrap animate-infinite-scroll-left group-hover:[animation-play-state:paused] cursor-pointer"
                    >
                        {/* Duplicate content to ensure seamless loop (0% -> -50%) */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <span key={i} className="font-display font-bold text-3xl md:text-4xl uppercase text-brand-black mr-12">
                                OPEN FOR NEW PROJECTS — BOOK A CALL —
                            </span>
                        ))}
                    </a>
                </div>
            </div>
        </section>
    );
}
