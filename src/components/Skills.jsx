import React from 'react'
import figma from '../assets/figma-icon.webp'
import Skill from '../mini-components/Skill'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from "gsap";

export default function Skills() {

    useGSAP(() => {
    const row1Anim = gsap.to('.skills-inner.first-row', {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1
    });

    const row2Anim = gsap.to('.skills-inner.second-row', {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1
    });

    row1Anim.totalTime(row1Anim.duration() * 100);
    row2Anim.totalTime(row2Anim.duration() * 100);
    row2Anim.timeScale(-1);

    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            gsap.to(row1Anim, { timeScale: self.direction, duration: 0.2, overwrite: true });
            gsap.to(row2Anim, { timeScale: -self.direction, duration: 0.2, overwrite: true });
        }
    });

}, []);

  return (
    <section className='pb-10 md:pb-20 lg:pb-60'>
      <div className="skills-wrapper flex flex-col gap-4 lg:gap-12">
        <div className="skills-lane">
            <div className="skills-row overflow-hidden ">
                <div className="skills-inner pt-5 pb-6 first-row flex flex-nowrap items-center gap-8 w-max">
                    <div className="skill-col flex flex-nowrap items-center gap-8 shrink-0">
                        <Skill icon={figma} name='HTML'/>
                        <Skill icon={figma} name='CSS'/>
                        <Skill icon={figma} name='JavaScript'/>
                        <Skill icon={figma} name='React'/>
                        <Skill icon={figma} name='GSAP'/>
                        <Skill icon={figma} name='Tailwind'/>
                        <Skill icon={figma} name='Bootstrap'/>
                        <Skill icon={figma} name='Wordpress'/>
                        <Skill icon={figma} name='Shopify'/>
                        <Skill icon={figma} name='Webflow'/>
                        <Skill icon={figma} name='Wix'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                    <div className="skill-col flex flex-nowrap items-center gap-8">
                        <Skill icon={figma} name='HTML'/>
                        <Skill icon={figma} name='CSS'/>
                        <Skill icon={figma} name='JavaScript'/>
                        <Skill icon={figma} name='React'/>
                        <Skill icon={figma} name='GSAP'/>
                        <Skill icon={figma} name='Tailwind'/>
                        <Skill icon={figma} name='Bootstrap'/>
                        <Skill icon={figma} name='Wordpress'/>
                        <Skill icon={figma} name='Shopify'/>
                        <Skill icon={figma} name='Webflow'/>
                        <Skill icon={figma} name='Wix'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                </div>
            </div> 
        </div>
        <div className="skills-lane">
            <div className="skills-row overflow-hidden">
                <div className="skills-inner pt-5 pb-6 second-row flex flex-nowrap items-center gap-8 w-max">
                    <div className="skill-col flex flex-nowrap items-center gap-8 shrink-0">
                        <Skill icon={figma} name='Photoshop'/>
                        <Skill icon={figma} name='Illustrator'/>
                        <Skill icon={figma} name='After Effects'/>
                        <Skill icon={figma} name='Nano Banana'/>
                        <Skill icon={figma} name='Mockup Design'/>
                        <Skill icon={figma} name='Logo and Branding'/>
                        <Skill icon={figma} name='Graphic Design'/>
                        <Skill icon={figma} name='Motion Design'/>
                        <Skill icon={figma} name='Figma'/>
                        <Skill icon={figma} name='figma'/>
                        <Skill icon={figma} name='figma'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                    <div className="skill-col flex flex-nowrap items-center gap-8">
                        <Skill icon={figma} name='Photoshop'/>
                        <Skill icon={figma} name='Illustrator'/>
                        <Skill icon={figma} name='After Effects'/>
                        <Skill icon={figma} name='Nano Banana'/>
                        <Skill icon={figma} name='Mockup Design'/>
                        <Skill icon={figma} name='Logo and Branding'/>
                        <Skill icon={figma} name='Graphic Design'/>
                        <Skill icon={figma} name='Motion Design'/>
                        <Skill icon={figma} name='Figma'/>
                        <Skill icon={figma} name='figma'/>
                        <Skill icon={figma} name='figma'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                </div>
            </div>
            </div>
      </div>
    </section>
  )
}
