import React, { useRef } from 'react'
import img4 from '../assets/img4.jpg'
import agl from '../assets/aglLaw.webm'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

export default function Ledger() {
    // const sequenceTween = useRef(null);
    // const images = [
    //     `${img4}`,
    //     "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    //     "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    //     "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=800",
    //     "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    //     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    //     "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    // ];
    const ledger = [
        { id: 0, year: '2026', name: 'BSR Projects', tech: 'Wordpress Website + Brand Identity', client: 'B.Sudhakar Rao', url: 'https://bsrprojects.co/', media: agl },
        { id: 1, year: '2026', name: 'DevAppsIT', tech: 'Wordpress Website + Brand Identity', client: 'Sunil', url: 'https://devappsit.com/', media: agl },
        { id: 2, year: '2026', name: 'Endura Learning', tech: 'Wordpress Website + Brand Identity', client: 'Andrew Wang', url: 'https://enduras-leaning.webflow.io/', media: agl },
        { id: 3, year: '2026', name: 'AlignX', tech: 'Wordpress Website + Brand Identity', client: 'Sai Teja', url: 'https://www.alignx.ai/', media: agl },
        { id: 4, year: '2026', name: 'Japji Law', tech: 'Wordpress Website + Brand Identity', client: 'Satpal Singh', url: 'https://japjilaw.com/', media: agl },
        { id: 5, year: '2026', name: 'AGL Law', tech: 'Wordpress Website + Brand Identity', client: 'Guramrit Singh', url: 'https://agllaw.ca/', media: agl }
    ]
    const cursorRef = useRef(null)
    const imageRef = useRef(null)
    const sectionRef = useRef(null)

    const { contextSafe } = useGSAP(() => {
        if (!cursorRef.current) return;
        const cursor = cursorRef.current
        const section = sectionRef.current
        gsap.set(cursor, {
            scale: 0,
            opacity: 0
        })

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        const handleMouse = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        }

        section.addEventListener('mousemove', handleMouse)


        return () => {
            section.removeEventListener("mousemove", handleMouse);
        }
    }, { scope: sectionRef });

    const handleHover = contextSafe((mediaSrc) => {
        // let animation = { frame: 0 };
        // if (sequenceTween.current) sequenceTween.current.kill();
        // sequenceTween.current = gsap.to(animation,{
        //     frame: images.length - 0.01,
        //     duration:1,
        //     repeat:-1,
        //     ease: "none", // Linear ease
        //     yoyo:true,
        //     onUpdate:()=>{
        //         const index = Math.floor(animation.frame); 
        //         if (images[index]) {
        //             imageRef.current.src = images[index];
        //         }
        //     }
        // })
        imageRef.current.src = mediaSrc

        gsap.to(cursorRef.current, {
            scale: 1, opacity: 1, duration: 0.35, ease: "expo.out",
            overwrite: "auto" 
        });

        gsap.fromTo(imageRef.current,
            { scale: 1.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" }
        );
    });

    const handleLeave = contextSafe(() => {
        // if (sequenceTween.current) sequenceTween.current.kill();
        gsap.to(cursorRef.current, {
            scale: 0, opacity: 0, duration: 0.35, ease: "expo.inOut", overwrite: "auto"
        });
    });

    return (
        <section className='relative py-20 px-20' ref={sectionRef}>
            <div className="ledger-wrapper">
                <div className="ledger-inner">
                    {ledger.map((item) => (
                        <div
                            key={item.id}
                            className="ledger-block text-white flex w-full relative text-center items-center"
                            onMouseEnter={() => handleHover(item.media)}
                            onMouseLeave={handleLeave}
                        >
                            <div className="ledger-date py-14 px-5 text-2xl font-semibold">{item.year}</div>
                            <div className="ledger-name py-14 px-5 text-2xl font-semibold">{item.name}</div>
                            <div className="ledger-tech py-14 px-5 text-2xl font-semibold">{item.tech}</div>
                            <div className="client-name py-14 px-5 text-2xl font-semibold">{item.client}</div>
                            <a className='absolute ledger-link w-full h-full top-0 left-0' target='_blank' href={item.url}></a>
                        </div>
                    ))}
                    <div ref={cursorRef} className="ledger-cursor pointer-events-none fixed top-0 left-0 z-50">
                        <div className="ledger-media overflow-hidden">
                            {/* <img ref={imageRef} className="w-full h-full object-cover" alt="Project preview" /> */}
                            <video ref={imageRef} autoPlay={true} muted={true} playsInline={true} loop={true}></video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
