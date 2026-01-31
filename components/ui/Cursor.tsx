'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Set initial centering
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

        const xSet = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
        const ySet = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

        const onMove = (e: MouseEvent) => {
            xSet(e.clientX);
            ySet(e.clientY);
        };

        const onHoverStart = (e: Event) => {
            const target = e.target as HTMLElement;
            const text = target.getAttribute('data-cursor-text');

            if (text && textRef.current) {
                textRef.current.innerText = text;
                // Scale up for text - no need for x/y tweaks as we use % centering
                gsap.to(cursorRef.current, {
                    width: 80,
                    height: 80,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                gsap.to(textRef.current, { opacity: 1, duration: 0.2, delay: 0.1 });
            } else {
                // Regular hover
                gsap.to(cursorRef.current, { scale: 2.5, duration: 0.2 });
            }
        };

        const onHoverEnd = () => {
            // Reset
            if (textRef.current) textRef.current.innerText = "";
            gsap.to(textRef.current, { opacity: 0, duration: 0.1 });

            gsap.to(cursorRef.current, {
                width: 12,
                height: 12,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', onMove);

        // Add global listeners for interactive elements
        const links = document.querySelectorAll('a, button, .cursor-hover');
        links.forEach(el => {
            el.addEventListener('mouseenter', onHoverStart);
            el.addEventListener('mouseleave', onHoverEnd);
        });

        // Observer for dynamic content
        const observer = new MutationObserver((mutations) => {
            const newLinks = document.querySelectorAll('a, button, .cursor-hover');
            newLinks.forEach(el => {
                el.removeEventListener('mouseenter', onHoverStart);
                el.removeEventListener('mouseleave', onHoverEnd);
                el.addEventListener('mouseenter', onHoverStart);
                el.addEventListener('mouseleave', onHoverEnd);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMove);
            links.forEach(el => {
                el.removeEventListener('mouseenter', onHoverStart);
                el.removeEventListener('mouseleave', onHoverEnd);
            });
            observer.disconnect();
        };
    }, { scope: cursorRef });

    return (
        <div
            ref={cursorRef}
            className="hidden md:flex fixed top-0 left-0 w-[12px] h-[12px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference items-center justify-center overflow-hidden"
        >
            <span
                ref={textRef}
                className="text-black text-[12px] font-bold opacity-0 uppercase leading-none whitespace-nowrap"
            />
        </div>
    );
}
