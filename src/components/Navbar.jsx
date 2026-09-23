import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiMenu4Line } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

export default function Navbar() {
    const headerRef = useRef(null)
    const tl = useRef();

    useGSAP(() => {
        const headerAnim = gsap.to(headerRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.35,
            ease: "power3.inOut",
        })

        // 2. The Velocity Tracker (Always active)
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                // Failsafe: Always force reveal if at the absolute top of the page
                if (self.scroll() <= 0) {
                    headerAnim.reverse();
                    return;
                }

                // Only hide/show if past a minor threshold to prevent jitter at the top
                if (self.scroll() > 1500) {
                    if (self.direction === 1) {
                        headerAnim.play();
                    } else {
                        headerAnim.reverse();
                    }
                }
            }
        });

        // 3. The Background State Watcher (Triggers at 1500px)
        ScrollTrigger.create({
            start: "1500px top",
            end: "max",
            toggleClass: {
                targets: headerRef.current,
                className: "header-scrolled"
            }
        });
        tl.current = gsap.timeline({ paused: true });

        tl.current.to('.navbar', {
            right: 0,
            opacity: 1,
            duration: .5
        })
        tl.current.from(".navbar ul li", {
            opacity: 0,
            x: 150,
            duration: .5,
            stagger: .2
        })
        tl.current.from(".navbar .close-menu", {
            opacity: 0,
            duration: .5,
            y: -100
        }, 'same')
        tl.current.from(".navbar .social-text", {
            opacity: 0,
            duration: .5,
            y: 100
        }, 'same')
        tl.current.from(".navbar .social-links", {
            opacity: 0,
            duration: .5,
            x: 150
        })
    }, { scope: headerRef }, [])

    return (
        <header ref={headerRef} className='fixed px-5 xl:px-20 py-2.5 top-0 left-0 w-full z-20 flex justify-between items-center'>
            <div className="logo-block">
                <h2 className='text-white logo font-medium uppercase text-2xl'>Design By Kay</h2>
            </div>
            <button className="nav-icon p-2" tabIndex='1' onClick={() => tl.current.play()}>
                <RiMenu4Line className='text-white size-8' />
            </button>
            <nav className="navbar absolute h-dvh bg-white top-0 right-0 py-24 px-15 flex items-center">
                <button className="close-menu bg-black p-4 absolute top-8 right-8" onClick={() => tl.current.reverse()}>
                    <MdClose className='text-white size-10 ' />
                </button>
                <ul className='flex flex-col gap-8 mb-15'>
                    <li className='text-5xl font-bold uppercase'>Services</li>
                    <li className='text-5xl font-bold uppercase'>Work</li>
                    <li className='text-5xl font-bold uppercase'>Testimonials</li>
                    <li className='text-5xl font-bold uppercase'>About</li>
                    <li className='text-5xl font-bold uppercase'>contact</li>
                </ul>
                <div className="social-info flex items-center gap-16 absolute bottom-10">
                    <div className="social-text">
                        <h4>Want to See More?</h4>
                        <p>Come and check out my social pages</p>
                    </div>
                    <div className="social-links flex gap-3 items-center">
                        <div className="social-icon bg-black p-2.5 rounded-3xl">
                            <FaInstagram className='text-white size-7' />
                        </div>
                        <div className="social-icon bg-black p-2.5 rounded-3xl">
                            <FaYoutube className='text-white size-7' />
                        </div>
                        <div className="social-icon bg-black p-2.5 rounded-3xl">
                            <FaLinkedinIn className='text-white size-7' />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
