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
        // 1. PINNING: Lock the section in place to force "dwelling"
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", // Stay for 1.5 screen heights
            pin: true,
            scrub: true, // Smooth feel
        });

        // 2. FLOATING: Increased Axis Movement
        gsap.to(".project-item", {
            y: "random(-60, 60)", // Increased from 10 to 60
            x: "random(-30, 30)", // Added X axis movement
            rotation: "random(-3, 3)",
            duration: "random(4, 7)", // Slower, deeper breaths
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });

        // 3. HEARTBEAT: Circle pulses
        gsap.to(circleRef.current, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut" // A soft heartbeat
        });

    }, { scope: containerRef });

    return (
        <section
            id="project-section"
            ref={containerRef}
            className="w-full h-screen bg-brand-white relative overflow-hidden flex items-center justify-center"
        >
            {/* 
        Responsive Container 
      */}
            <div className="w-full max-w-[1440px] h-full relative">

                {/* TITLE (5%, 5%) */}
                <div className="absolute left-[5%] top-[5%]">
                    <h2 className="font-display font-semibold text-[clamp(24px,2.5vw,32px)] uppercase leading-none text-brand-black">
                        PROJECT
                    </h2>
                </div>

                {/* Svitanok (5%, 30%) */}
                <a
                    href="https://notion.site/mykpolo/svitanok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute left-[5%] top-[30%] group cursor-pointer block"
                >
                    <div className="font-sans text-[clamp(24px,2.5vw,32px)] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        Svitanok<br />
                        <span className="text-[0.8em] lowercase opacity-60">2025, e-commerce</span>
                    </div>
                </a>

                {/* FoutUp (48%, 38%) */}
                <a
                    href="https://notion.site/mykpolo/foutup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute left-[48%] top-[38%] group cursor-pointer block"
                >
                    <div className="font-sans text-[clamp(24px,2.5vw,32px)] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        FoutUp<br />
                        <span className="text-[0.8em] lowercase opacity-60">2025, e-commerce</span>
                    </div>
                </a>

                {/* TRON (30%, 60%) */}
                <a
                    href="https://notion.site/mykpolo/tron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute left-[30%] top-[60%] group cursor-pointer block"
                >
                    <div className="font-sans text-[clamp(24px,2.5vw,32px)] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        TRON<br />
                        <span className="text-[0.8em] lowercase opacity-60">2025, web3</span>
                    </div>
                </a>

                {/* Lux Yachts (5%, 78%) */}
                <a
                    href="https://notion.site/mykpolo/luxyachts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute left-[5%] top-[78%] group cursor-pointer block"
                >
                    <div className="font-sans text-[clamp(24px,2.5vw,32px)] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        Lux Yachts<br />
                        <span className="text-[0.8em] lowercase opacity-60">2025, shop</span>
                    </div>
                </a>

                {/* ProfContact (65%, 75%) */}
                <a
                    href="https://notion.site/mykpolo/profcontact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-item absolute left-[65%] top-[75%] group cursor-pointer block"
                >
                    <div className="font-sans text-[clamp(24px,2.5vw,32px)] font-medium leading-tight text-brand-black group-hover:opacity-70 transition-opacity">
                        ProfContact<br />
                        <span className="text-[0.8em] lowercase opacity-60">2024, job’s help</span>
                    </div>
                </a>

                {/* THE CIRCLE ANCHOR (74%, 23%) - Visible Black Circle to "catch" the transition */}
                <div
                    ref={circleRef}
                    id="project-circle-anchor"
                    className="absolute left-[74%] top-[23%] w-[clamp(200px,20vw,300px)] h-[clamp(200px,20vw,300px)] rounded-full bg-black origin-center"
                />

                {/* Bottom Arrow */}
                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="animate-bounce">
                        <path d="M12 4V20M12 20L18 14M12 20L6 14" />
                    </svg>
                </div>

            </div>
        </section>
    );
}
