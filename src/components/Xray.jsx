import React,{useRef} from 'react'
import wireframe from '../assets/desktop-wireframe.jpg'
import ui from '../assets/desktop-ui.jpg'
import mobileWireframe from '../assets/mobile-wireframe.jpg'
import mobileUi from '../assets/mobile-ui.jpg'
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

export default function Xray() {

   const wrapperRef = useRef(null);
    const topLayerRef = useRef(null);

    const { contextSafe } = useGSAP(() => {
        gsap.from('.x-ray-placeholder', { opacity: 0.8, duration: 1, repeat: -1, yoyo: true });
    });

    const handleMouseMove = contextSafe((e) => {
        const { left, top } = wrapperRef.current.getBoundingClientRect();
        
        const x = e.clientX - left;
        const y = e.clientY - top;
        gsap.to(topLayerRef.current, {
            '--x': `${x}px`,
            '--y': `${y}px`,
            duration: 0.1, 
            ease: "power2.out"
        });
    });

    const handleMouseEnter = contextSafe(() => {
        gsap.to(topLayerRef.current, { '--radius': (window.innerWidth > 768) ?'250px' : '150px', duration: 0.4, ease: "back.out(1.5)" });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to(topLayerRef.current, { '--radius': '0px', duration: 0.4, ease: "power2.out" });
    });
    
  return (
    <section className='relative py-20 px-5 lg:px-20'>
        <div className="x-ray-heading text-white text-center mb-20 mx-auto">
            <h2 className='text-4xl md:text-5xl lg:text-7xl font-bold mb-5'>ARCHITECTURE TO <span className='secondary-color'>SURFACE</span></h2>
            <p>The structural framework must be flawless before the visual layer is applied. I translate bare-metal blueprints into high-fidelity environments, ensuring the underlying mathematical architecture perfectly dictates the final aesthetic surface.</p>
        </div>
        <div ref={wrapperRef} className="x-ray-wrapper relative cursor-crosshair" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="x-ray-placeholder absolute bottom-5 left-7 rounded-2xl z-20 pointer-events-none">
                X-Ray Mode <span>[ Interaction Activated ]</span>
            </div>
            
            <div ref={topLayerRef} className="x-ray-top absolute z-10 top-0 left-0 pointer-events-none">
                <img src={(window.innerWidth > 768)? ui : mobileUi} alt="UI" />
            </div>
            
            <div className="x-ray-bottom absolute z-0 top-0 left-0">
                <img className='pointer-events-none' src={(window.innerWidth > 768)? wireframe : mobileWireframe} alt="wireframe" />
            </div>
        </div>
    </section>
  )
}
