'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function ProjectSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // DESKTOP ANIMATIONS ONLY

            // 1. PINNING
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: true,
            });

            // 2. FLOATING
            gsap.to(".project-item", {
                y: "random(-60, 60)",
                x: "random(-30, 30)",
                rotation: "random(-3, 3)",
                duration: "random(4, 7)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { amount: 2, from: "random" }
            });
        });

        // 3. HEARTBEAT (Always active for the anchor, safe for both?)
        // Mobile Anchor: Top 84, Left 150 (Static?). 
        // User didn't ask for animation on mobile anchor, but "Circle Anchor: 200x200".
        // I will keep heartbeat for desktop only if not requested, or globally.
        // Let's keep it global inside a check or just global.
        gsap.to(circleRef.current, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <section
            id="project-section"
            ref={containerRef}
            className="w-full min-h-screen bg-brand-white relative overflow-hidden"
        >
            {/* --- MOBILE LAYOUT (<md) --- */}
            <div className="block md:hidden w-full h-[900px] relative"> {/* Fixed height or min-h to fit content */}
                {/* PROJECT Title (41, 22) */}
                <div className="absolute top-[41px] left-[22px]">
                    <h2 className="font-display font-bold text-[14px] leading-none text-brand-black uppercase">
                        PROJECT
                    </h2>
                </div>

                {/* Circle Anchor (84, 150, 200x200) */}
                <div className="absolute top-[84px] left-[150px] w-[200px] h-[200px] rounded-full bg-black pointer-events-none" />

                {/* Projects (Scattered) */}

                {/* Svitanok (332, 29) Size 16 */}
                <a href="https://notion.site/mykpolo/svitanok" target="_blank" className="absolute top-[332px] left-[29px] block">
                    <div className="font-sans font-medium text-[16px] leading-tight text-brand-black">
                        Svitanok<br />
                        <span className="text-[12px] opacity-60">2025, e-commerce</span>
                    </div>
                </a>

                {/* FoutUp (411, 205) */}
                <a href="https://notion.site/mykpolo/foutup" target="_blank" className="absolute top-[411px] left-[205px] block">
                    <div className="font-sans font-medium text-[16px] leading-tight text-brand-black">
                        FoutUp<br />
                        <span className="text-[12px] opacity-60">2025, e-commerce</span>
                    </div>
                </a>

                {/* TRON (456, 29) */}
                <a href="https://notion.site/mykpolo/tron" target="_blank" className="absolute top-[456px] left-[29px] block">
                    <div className="font-sans font-medium text-[16px] leading-tight text-brand-black">
                        TRON<br />
                        <span className="text-[12px] opacity-60">2025, web3</span>
                    </div>
                </a>

                {/* Lux Yachts (517, 188) */}
                <a href="https://notion.site/mykpolo/luxyachts" target="_blank" className="absolute top-[517px] left-[188px] block">
                    <div className="font-sans font-medium text-[16px] leading-tight text-brand-black">
                        Lux Yachts<br />
                        <span className="text-[12px] opacity-60">2025, shop</span>
                    </div>
                </a>

                {/* ProfContact (590, 47) */}
                <a href="https://notion.site/mykpolo/profcontact" target="_blank" className="absolute top-[590px] left-[47px] block">
                    <div className="font-sans font-medium text-[16px] leading-tight text-brand-black">
                        ProfContact<br />
                        <span className="text-[12px] opacity-60">2024, job’s help</span>
                    </div>
                </a>

                {/* Footer (765 Center) */}
                <div className="absolute top-[765px] left-1/2 transform -translate-x-1/2 font-sans text-[16px] text-brand-black whitespace-nowrap">
                    based in Kyiv
                </div>

            </div>


            {/* --- DESKTOP LAYOUT (md+) --- */}
            <div className="hidden md:block w-full h-full md:max-w-[1440px] md:mx-auto relative">

                {/* TITLE */}
                <div className="absolute md:left-[66px] md:top-[55px]">
                    <h2 className="font-display font-semibold text-[32px] uppercase leading-none text-brand-black">
                        PROJECT
                    </h2>
                </div>

                {/* ANCHOR */}
                <div
                    ref={circleRef}
                    id="project-circle-anchor"
                    className="absolute md:left-[1072px] md:top-[234px] md:w-[302px] md:h-[309px] rounded-full bg-black origin-center pointer-events-none"
                />

                {/* Svitanok */}
                <a
                    href="https://notion.site/mykpolo/svitanok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute md:left-[66px] md:top-[303px] group cursor-pointer block"
                >
                    <div className="font-sans text-[32px] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        Svitanok<br />
                        <span className="text-[32px] lowercase opacity-100 text-brand-black">2025, e-commerce</span>
                    </div>
                </a>

                {/* FoutUp */}
                <a
                    href="https://notion.site/mykpolo/foutup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute md:left-[690px] md:top-[382px] group cursor-pointer block"
                >
                    <div className="font-sans text-[32px] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        FoutUp<br />
                        <span className="text-[32px] lowercase opacity-100 text-brand-black">2025, e-commerce</span>
                    </div>
                </a>

                {/* TRON */}
                <a
                    href="https://notion.site/mykpolo/tron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute md:left-[443px] md:top-[606px] group cursor-pointer block"
                >
                    <div className="font-sans text-[32px] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        TRON<br />
                        <span className="text-[32px] lowercase opacity-100 text-brand-black">2025, web3</span>
                    </div>
                </a>

                {/* Lux Yachts */}
                <a
                    href="https://notion.site/mykpolo/luxyachts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute md:left-[77px] md:top-[801px] group cursor-pointer block"
                >
                    <div className="font-sans text-[32px] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        Lux Yachts<br />
                        <span className="text-[32px] lowercase opacity-100 text-brand-black">2025, shop</span>
                    </div>
                </a>

                {/* ProfContact */}
                <a
                    href="https://notion.site/mykpolo/profcontact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute md:left-[934px] md:top-[785px] group cursor-pointer block"
                >
                    <div className="font-sans text-[32px] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        ProfContact<br />
                        <span className="text-[32px] lowercase opacity-100 text-brand-black">2024, job’s help</span>
                    </div>
                </a>

                {/* Bottom Arrow */}
                <div className="absolute md:bottom-[5%] md:left-1/2 md:-translate-x-1/2 flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="animate-bounce">
                        <path d="M12 4V20M12 20L18 14M12 20L6 14" />
                    </svg>
                </div>

            </div>
        </section>
    );
}
