'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorFollowerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // We use a simple dot.
        // For performance, we can specificy x/y setters
        const xSet = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
        const ySet = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

        const onMove = (e: MouseEvent) => {
            // Center the 12px cursor
            xSet(e.clientX - 6);
            ySet(e.clientY - 6);
        };

        const onHoverStart = () => {
            gsap.to(cursorRef.current, { scale: 2.5, duration: 0.2 });
        };

        const onHoverEnd = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMove);

        // Add global listeners for interactive elements
        const links = document.querySelectorAll('a, button, .cursor-hover');
        links.forEach(el => {
            el.addEventListener('mouseenter', onHoverStart);
            el.addEventListener('mouseleave', onHoverEnd);
        });

        // Observer for dynamic content (Optional, but good for SPA)
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
    }, { scope: cursorRef }); // scope might be tricky with window listeners, but okay.

    return (
        <div
            ref={cursorRef}
            className="hidden md:block fixed top-0 left-0 w-[12px] h-[12px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        />
    );
}
