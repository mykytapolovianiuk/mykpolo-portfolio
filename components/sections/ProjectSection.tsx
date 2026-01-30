'use client';

import { useRef, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ProjectItemProps {
    title: string;
    category: string;
    year: string;
}

const ProjectItem = ({ title, category, year }: ProjectItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Meditative Hover Effect (Updated Params)
        gsap.to(itemRef.current, {
            y: "random(-10, 10)",
            rotation: "random(-2, 2)",
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }, { scope: itemRef });

    return (
        <div ref={itemRef} className="flex flex-col mb-16 origin-center">
            <div className="flex items-baseline gap-4 mb-2">
                <h3 className="font-display font-bold text-4xl md:text-5xl text-brand-black uppercase">
                    {title}
                </h3>
            </div>
            <div className="font-display font-bold text-sm md:text-base text-brand-black/60 uppercase">
                {year}, {category}
            </div>
        </div>
    );
};

export function ProjectSection() {
    const projects = [
        { title: "Svitanok", category: "e-commerce", year: "2025" },
        { title: "FoutUp", category: "e-commerce", year: "2025" },
        { title: "TRON", category: "web3", year: "2025" },
        { title: "Lux Yachts", category: "shop", year: "2025" },
        { title: "ProfContact", category: "job's help", year: "2024" }
    ];

    return (
        <section
            id="project-section"
            className="relative min-h-screen bg-brand-white pt-[20vh] pb-[20vh] px-8 md:px-16 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Left Column: Projects */}
                <div className="flex flex-col">
                    <div className="mb-24 sticky top-10">
                        <h2 className="font-display font-medium text-xs uppercase text-brand-black tracking-widest">
                            Selected Works
                        </h2>
                    </div>

                    <div className="mt-12">
                        {projects.map((p, i) => (
                            <ProjectItem key={i} {...p} />
                        ))}
                    </div>
                </div>

                {/* Right Column: Space for the Flying Circle Anchor */}
                <div className="relative hidden md:block">
                    {/* Circle lands here visually */}
                </div>

            </div>
        </section>
    );
}
