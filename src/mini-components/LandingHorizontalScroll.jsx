import React,{useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function LandingHorizontalScroll(props) {
    const horizontalHeading = useRef(null)
    const horizontalBlock = useRef(null)
    const timeline = props.timeline
    const loader = props.loader

    useGSAP(()=>{
        const heading = horizontalHeading.current
        const headingHeight = heading.offsetHeight
        horizontalBlock.current.style.top = window.innerHeight - headingHeight + 'px'
        const totalWidth = heading.offsetWidth
        const styles = getComputedStyle(horizontalBlock.current)
        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        const visibleWidth = window.innerWidth - paddingLeft - paddingRight
        const maxX = totalWidth - visibleWidth
        const headingSplit = new SplitText(heading,{
            type: "chars",
            charsClass: "characters++",
            mask:true
        })
        loader.from('.characters',{
            yPercent:"random([100,-100])",
            autoAlpha:0,
            duration:1,
            stagger:.02,
            ease: "power2.out",
        },'2')

        timeline.to(heading,{
            x:`-${maxX}`
            
        },0)
    },[])
  return (
    <div ref={horizontalBlock} className='landing-horizontal-text z-1 absolute px-5 xl:px-20'>
      <h1 ref={horizontalHeading} className='text-white font-bold'>{props.text}</h1>
    </div>
  )
}
