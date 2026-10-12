import React from 'react'
import figma from '../assets/figma-icon.webp'
import html from '../assets/html.webp'
import wordpress from '../assets/wordpress.webp'
import shopify from '../assets/shopify.webp'
import webflow from '../assets/webflow.webp'
import reactIcon from '../assets/react-icon.webp'
import gsapIcon from '../assets/gsap.webp'
import css from '../assets/css.webp'
import js from '../assets/js.webp'
import wix from '../assets/wix.webp'
import bootstrap from '../assets/bootstrap.webp'
import tailwind from '../assets/tailwind.webp'
import photoshop from '../assets/photoshop.webp'
import illustrator from '../assets/illustrator.webp'
import ae from '../assets/ae.webp'
import gemini from '../assets/gemini.webp'
import kling from '../assets/kling.webp'
import gs from '../assets/google-studios.webp'
import runway from '../assets/runway.webp'
import notebook from '../assets/notebook.webp'
import claude from '../assets/claude.webp'
import antigravity from '../assets/antigravity.webp'
import chat from '../assets/chatGPT.webp'
import lovable from '../assets/lovable.webp'
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
                        <Skill icon={html} name='HTML'/>
                        <Skill icon={css} name='CSS'/>
                        <Skill icon={js} name='JavaScript'/>
                        <Skill icon={reactIcon} name='React'/>
                        <Skill icon={gsapIcon} name='GSAP'/>
                        <Skill icon={tailwind} name='Tailwind'/>
                        <Skill icon={bootstrap} name='Bootstrap'/>
                        <Skill icon={wordpress} name='Wordpress'/>
                        <Skill icon={shopify} name='Shopify'/>
                        <Skill icon={webflow} name='Webflow'/>
                        <Skill icon={wix} name='Wix'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                    <div className="skill-col flex flex-nowrap items-center gap-8">
                        <Skill icon={html} name='HTML'/>
                        <Skill icon={css} name='CSS'/>
                        <Skill icon={js} name='JavaScript'/>
                        <Skill icon={reactIcon} name='React'/>
                        <Skill icon={gsapIcon} name='GSAP'/>
                        <Skill icon={tailwind} name='Tailwind'/>
                        <Skill icon={bootstrap} name='Bootstrap'/>
                        <Skill icon={wordpress} name='Wordpress'/>
                        <Skill icon={shopify} name='Shopify'/>
                        <Skill icon={webflow} name='Webflow'/>
                        <Skill icon={wix} name='Wix'/>
                        <Skill icon={figma} name='figma'/>
                    </div>
                </div>
            </div> 
        </div>
        <div className="skills-lane">
            <div className="skills-row overflow-hidden">
                <div className="skills-inner pt-5 pb-6 second-row flex flex-nowrap items-center gap-8 w-max">
                    <div className="skill-col flex flex-nowrap items-center gap-8 shrink-0">
                        <Skill icon={photoshop} name='Photoshop'/>
                        <Skill icon={illustrator} name='Illustrator'/>
                        <Skill icon={ae} name='After Effects'/>
                        <Skill icon={gemini} name='Gemini'/>
                        <Skill icon={kling} name='Kling'/>
                        <Skill icon={gs} name='Google Studios'/>
                        <Skill icon={runway} name='Runway'/>
                        <Skill icon={notebook} name='NotebookLM'/>
                        <Skill icon={claude} name='Claude'/>
                        <Skill icon={antigravity} name='Antigravity'/>
                        <Skill icon={chat} name='chatGPT'/>
                        <Skill icon={lovable} name='Lovable'/>
                    </div>
                    <div className="skill-col flex flex-nowrap items-center gap-8">
                        <Skill icon={photoshop} name='Photoshop'/>
                        <Skill icon={illustrator} name='Illustrator'/>
                        <Skill icon={ae} name='After Effects'/>
                        <Skill icon={gemini} name='Gemini'/>
                        <Skill icon={kling} name='Kling'/>
                        <Skill icon={gs} name='Google Studios'/>
                        <Skill icon={runway} name='Runway'/>
                        <Skill icon={notebook} name='NotebookLM'/>
                        <Skill icon={claude} name='Claude'/>
                        <Skill icon={antigravity} name='Antigravity'/>
                        <Skill icon={chat} name='chatGPT'/>
                        <Skill icon={lovable} name='Lovable'/>
                    </div>
                </div>
            </div>
            </div>
      </div>
    </section>
  )
}
