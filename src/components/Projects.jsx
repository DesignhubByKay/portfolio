import React, { useRef } from 'react'
import ProjectDetail from '../mini-components/ProjectDetail'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import devApp from '../assets/devVid.mp4'
import japji from '../assets/japjiVid.mp4'
import bsr from '../assets/bsrVid.mp4'
import dot from '../assets/dotVid.mp4'

export default function Projects() {
    const projectRef = useRef()
    const bsrArr = {
        name: 'BSR',
        sureName: 'Projects',
        description: 'Crafted a refined brand identity and digital presence for BSR Projects, bringing together architecture, interiors, modular solutions, and construction under one cohesive experience.',
        tech: ['wordpress', 'photoshop', 'nano banana', 'illustrator', 'figma', 'veo flash'],
        media: bsr
    }
    const devAppArr = {
        name: 'DevApps',
        sureName: 'IT',
        description: 'Built a distinctive brand identity and digital experience for DevApps IT, translating complex AI, analytics, and enterprise solutions into a clear and modern visual language.',
        tech: ['wordpress', 'photoshop', 'nano banana', 'illustrator', 'figma', 'veo flash'],
        media: devApp
    }
    const japArr = {
        name: 'Japji',
        sureName: 'Law',
        description: 'Developed a distinctive brand identity and digital experience for Japji Law, extending a sense of trust and professionalism across their legal services and everyday business materials.',
        tech: ['wordpress', 'photoshop', 'nano banana', 'illustrator', 'figma', 'veo flash'],
        media: japji
    }
    const dotArr = {
        name: '.',
        sureName: 'RESPECT',
        description: 'Created a cinematic coming-soon experience for .RESPECT, blending atmospheric visuals, motion, and storytelling to introduce a new generation of minimalist streetwear',
        tech: ['Shopfiy', 'photoshop', 'nano banana', 'Kling', 'Runway', 'After Effects'],
        media: dot
    }


    const { contextSafe } = useGSAP(() => {
        const projectArr = gsap.utils.toArray('.project-block')
        if (projectArr.length === 0) return
        const section = projectRef.current
        gsap.set(projectArr, { transformOrigin: "top center" });

        projectArr.forEach((block, index) => {
            const topOffset = 100 + (index * 60)
            ScrollTrigger.create({
                trigger: block,
                start: `top ${topOffset}px`,
                endTrigger: section,
                pin: true,
                end: 'bottom bottom'
            })
            const video = block.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;

                ScrollTrigger.create({
                    trigger: block,
                    start: `top ${topOffset}px`,
                    endTrigger: section,
                    end: 'bottom bottom',
                    onEnter: () => {
                        video.play().catch(() => { });
                    },

                    onLeaveBack: () => {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }
            if (index < projectArr.length - 1) {
                const targetScale = 1 - ((projectArr.length - 1 - index) * .1)
                gsap.to(block, {
                    scale: targetScale,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: block,
                        start: `top ${topOffset}px`,
                        endTrigger: section,
                        scrub: true,
                        end: 'bottom bottom'
                    }

                })
            }
        })
    }, { scope: projectRef, dependencies: [] })

    return (
        <section className='relative px-5 py-10 lg:px-20 lg:py-20'>
            <div className="project-wrapper">
                <div className="project-head text-white flex-col md:flex-row flex justify-between items-center">
                    <div className="project-heading">
                        <h2 className='text-4xl md:text-5xl lg:text-7xl font-bold mb-5 md:mb-0'>INDEX / <span className='secondary-color'>EXECUTION</span></h2>
                    </div>
                    <div className="project-description">
                        <p className='text-center md:text-left'>A curated look at the systems and spaces I’ve recently shipped. Everything here is built from scratch, focusing on solid design, clean architecture, and interactions that actually feel good to use.</p>
                    </div>
                </div>
                <div ref={projectRef} className="project-inner flex flex-col gap-10 pt-20">
                    <ProjectDetail name={bsrArr.name} sure={bsrArr.sureName} description={bsrArr.description} tech={bsrArr.tech} media={bsrArr.media} />
                    <ProjectDetail name={devAppArr.name} sure={devAppArr.sureName} description={devAppArr.description} tech={devAppArr.tech} media={devAppArr.media} />
                    <ProjectDetail name={japArr.name} sure={japArr.sureName} description={japArr.description} tech={japArr.tech} media={japArr.media} />
                    <ProjectDetail name={dotArr.name} sure={dotArr.sureName} description={dotArr.description} tech={dotArr.tech} media={dotArr.media} />
                </div>
            </div>
        </section>
    )
}
