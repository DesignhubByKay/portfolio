import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function ContactTarget() {
    const sectionRef = useRef(null);
    const emailRef = useRef(null);
    const copiedRef = useRef(null);
    const charsRef = useRef([]);
    const [isCopied, setIsCopied] = useState(false);

    const { contextSafe } = useGSAP(() => {
        // Split both targets
        const emailSplit = new SplitText(emailRef.current, { type: "chars", charsClass: "char" });
        new SplitText(copiedRef.current, { type: "chars", charsClass: "char" });
        
        charsRef.current = emailSplit.chars;

        // Proximity Magnetism Math
        const handleMouseMove = (e) => {
            if (isCopied) return; // Kill hover effect after clicking

            const { clientX, clientY } = e;
            const radius = 300; // The magnetic pull threshold

            charsRef.current.forEach((char) => {
                const rect = char.getBoundingClientRect();
                const charCenterX = rect.left + rect.width / 2;
                const charCenterY = rect.top + rect.height / 2;

                const distX = clientX - charCenterX;
                const distY = clientY - charCenterY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < radius) {
                    // Calculate pull strength (closer = stronger)
                    const pull = (radius - distance) / radius;
                    gsap.to(char, {
                        x: distX * pull * 0.3,
                        y: distY * pull * 0.3,
                        scale: 1 + (pull * 0.2),
                        duration: 0.4,
                        ease: "power3.out",
                        overwrite: "auto"
                    });
                } else {
                    // Release back to origin
                    gsap.to(char, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)",
                        overwrite: "auto"
                    });
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            emailSplit.revert();
        };
    }, { scope: sectionRef, dependencies: [isCopied] });

    // 3. The Strobe & Copy Sequence
    const handleClick = contextSafe(() => {
        if (isCopied) return;
        setIsCopied(true);

        navigator.clipboard.writeText("hello@karansharma.com");

        const tl = gsap.timeline();

        // The Strobe (Invert colors instantly)
        tl.to(sectionRef.current, {
            backgroundColor: "#fff",
            color: "#000",
            duration: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "none"
        })
        // Shatter the email text outward
        .to(charsRef.current, {
            y: -100,
            opacity: 0,
            scale: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power4.in"
        }, "<")
        // Slam the "COPIED" text into place
        .to(emailRef.current, { display: "none", duration: 0 })
        .fromTo(copiedRef.current, 
            { opacity: 0, scale: 2 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }
        )
        // Reset the state after 3 seconds
        .add(() => {
            setTimeout(() => {
                setIsCopied(false);
                gsap.set(emailRef.current, { display: "block" });
                gsap.set(charsRef.current, { y: 0, opacity: 1, scale: 1 });
                gsap.set(copiedRef.current, { opacity: 0 });
            }, 3000);
        });
    });

    return (
        <section ref={sectionRef} className="contact-target" onClick={handleClick}>
            <div className="contact-text-wrapper">
                <div ref={emailRef} className="contact-email">
                    hello@karansharma.com
                </div>
                <div ref={copiedRef} className="contact-copied">
                    Copied to Clipboard
                </div>
            </div>
        </section>
    );
}