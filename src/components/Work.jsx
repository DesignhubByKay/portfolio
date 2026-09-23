import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import WorkContent from "../mini-components/WorkContent";
import WorkVisual from "../mini-components/WorkVisual";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

export default function Work() {
    const sectionRef = useRef(null);

    const devHeading = useRef(null);
    const graphicHeading = useRef(null);
    const brandHeading = useRef(null);
    const aiHeading = useRef(null);

    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
            gsap.set([graphicHeading.current,brandHeading.current,aiHeading.current],{
                opacity:0,
                y:50
            })
            gsap.set(['.graphic-visual','.branding-visual','.ai-visual'],{
                opacity:0
            })
            const tl = gsap.timeline({
                scrollTrigger:{
                    trigger:sectionRef.current,
                    start:'top top',
                    end:'+=5000',
                    scrub:true,
                    pin:true,
                    anticipatePin:1,
                    invalidateOnRefresh: true,
                }
            });
            tl
                .to('.dev-inner',{
                    x: () =>{
                        const inner = document.querySelector('.dev-inner')
                        const viewport = document.querySelector('.dev-visual')

                        return -(inner.scrollWidth - viewport.clientWidth)
                    },
                    duration:2
                })
                .to([devHeading.current,'.dev-visual'],{
                    opacity:0,
                    duration:.4
                })
                .to('.code-path',{
                    morphSVG:{
                        shape: ".graphic-path",
                        type: "linear",
                        shapeIndex:"auto",
                    },
                    duration:.4
                },'<')
                .to(graphicHeading.current,{
                    opacity:1,
                    y:0,
                    duration:.4
                },'<')
                .to('.graphic-visual',{
                    opacity:1,
                    duration:.4
                },'<')
                .to('.graphic-inner',{
                    x: () =>{
                        const inner = document.querySelector('.graphic-inner')
                        const parent = document.querySelector('.graphic-visual')

                        return -(inner.scrollWidth - parent.offsetWidth)
                    },
                    duration:2
                })
                .to([graphicHeading.current,'.graphic-visual'],{
                    opacity:0,
                    duration:.4
                })
                .to('.code-path',{
                    morphSVG:{
                        shape: ".brand-path",
                        type: "linear",
                        shapeIndex:"auto",
                    },
                    duration:.4
                },'<')
                .to(brandHeading.current,{
                    opacity:1,
                    y:0,
                    duration:.4
                },'<')
                .to('.branding-visual',{
                    opacity:1,
                    duration:.4
                },'<')
                .to('.branding-inner',{
                    x: () =>{
                        const inner = document.querySelector('.branding-inner')
                        const parent = document.querySelector('.branding-visual')

                        return -(inner.scrollWidth - parent.offsetWidth)
                    },
                    duration:2
                })
                .to([brandHeading.current,'.branding-visual'],{
                    opacity:0,
                    duration:.4
                })
                .to('.code-path',{
                    morphSVG: {
                        shape: ".ai-path",
                        type: "linear",
                        shapeIndex:"auto",
                    },
                    duration:.4
                },'<')
                .to(aiHeading.current,{
                    opacity:1,
                    y:0,
                    duration:.4
                },'<')
                .to('.ai-visual',{
                    opacity:1,
                    duration:.4
                },'<')
                .to('.ai-inner',{
                    x: () =>{
                        const inner = document.querySelector('.ai-inner')
                        const parent = document.querySelector('.ai-visual')

                        return -(inner.scrollWidth - parent.offsetWidth)
                    },
                    duration:2
                })
        }, sectionRef)
        return() => ctx.revert();
    },[])

return (
    <section ref={sectionRef} className="work-section px-5 py-15 xl:px-20 xl:py-0 ">

        <WorkContent
            dev={devHeading}
            graphic={graphicHeading}
            brand={brandHeading}
            ai={aiHeading}
        />

        <WorkVisual />

    </section>
);
}