import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/SplitText';
import img4 from '../assets/img4.jpg';
import theOrdinary from '../assets/theOrdinary.mp4';
import web1 from '../assets/web1.mp4'
import cloud from '../assets/clouddrop.png'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function About() {
    const aboutRef = useRef(null);
    const revealRef = useRef(null);
    const cursorRef = useRef(null);
    
    const imgRef = useRef(null);
    const videoRef = useRef(null);

    const { contextSafe } = useGSAP(() => {
        if (!aboutRef.current || !revealRef.current) return;

        const aboutSection = aboutRef.current;
        const aboutReveal = revealRef.current;
        const cursor = cursorRef.current;

        const headingSplit = new SplitText('.about-content h2', {
            type: "words",
            wordsClass: "aboutword++",
            mask: true
        });

        const revealTl = gsap.timeline({ paused: true })
            
            .from('.aboutword', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.06
            });

        ScrollTrigger.create({
            trigger: aboutSection,
            start: "top 98%",
            onEnter: () => {
                revealTl.play()
            },
            onLeaveBack: () => revealTl.reverse()
        })

        gsap.set(cursor, { scale: 0, opacity: 0 });
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        const handleMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };
        
        aboutSection.addEventListener("mousemove", handleMouseMove);

        return () => {
            aboutSection.removeEventListener("mousemove", handleMouseMove);
            headingSplit.revert();
        };
    }, [])

    const handleHover = contextSafe((mediaSrc, isVideo) => {
        if (isVideo) {
            videoRef.current.src = mediaSrc;
            gsap.set(videoRef.current, { display: "block" });
            gsap.set(imgRef.current, { display: "none" });
        } else {
            imgRef.current.src = mediaSrc;
            gsap.set(imgRef.current, { display: "block" });
            gsap.set(videoRef.current, { display: "none" });
        }

        gsap.to(cursorRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "expo.out",
        });
        
        gsap.fromTo([imgRef.current, videoRef.current], 
            { scale: 1.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
    });

    const handleLeave = contextSafe(() => {
        gsap.to(cursorRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.35,
            ease: "expo.inOut"
        });
    });

    return (
        <section ref={aboutRef} className="about-section">
            <div className="about-base" />
            <div ref={revealRef} className="about-reveal" />
            
            <div className="about-content">
                <h2 className="text-white italic text-center font-bold">I'm Karan. I design and build digital spaces that actually feel good to interact with. I blend clean <span className="about-text cursor-pointer" onMouseEnter={() => handleHover(web1, true)} onMouseLeave={handleLeave}>Web Development</span>, sharp <span className="about-text cursor-pointer" onMouseEnter={() => handleHover(cloud, false)} onMouseLeave={handleLeave}> Brand Identity</span>,and fluid <span className="about-text cursor-pointer" onMouseEnter={() => handleHover(theOrdinary, true)} onMouseLeave={handleLeave}> AI Motion </span>to bring ideas to life. No templates, no shortcuts. Just good design and solid code.</h2>
            </div>

            <div ref={cursorRef} className="about-cursor pointer-events-none fixed top-0 left-0 z-50">
                <div className="about-cursor-media overflow-hidden rounded-lg">
                    <img ref={imgRef} className="w-full h-full object-cover hidden" alt="Work highlight" />
                    <video ref={videoRef} className="w-full h-full object-cover hidden" autoPlay loop muted playsInline />
                </div>
            </div>
        </section>
    );
}