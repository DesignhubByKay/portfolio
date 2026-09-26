import React, { useState, useRef } from 'react'
import Canvas from '../mini-components/Canvas'
import LandingHorizontalScroll from '../mini-components/LandingHorizontalScroll'
import Floating from '../mini-components/Floating'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useGSAP } from '@gsap/react'

export default function Landing(props) {
    const [tl, setTl] = useState(null)
    const loaderBlock = [1, 2]
    const countRef = useRef(null)
    const trackRef = useRef(null)
    const loaderTl = gsap.timeline(/*{
        onStart: () => {
            document.body.style.overflow = 'hidden';
        },
        onComplete: () => {
            
            document.body.style.overflow = '';
        }
    }*/)
    useGSAP(() => {
        if (!countRef) return
        let obj = { count: 0 }
        const loaderBlock = gsap.utils.toArray('.loader-block')

        loaderTl.to(obj, {
            count: 100,
            duration: 3,
            ease: 'none',
            onUpdate: () => {
                if (countRef.current) {
                    countRef.current.innerText = Math.round(obj.count);
                }
            }
        }, 0)
        loaderTl.to(trackRef.current, {
            yPercent: -33.33, // Pushes track up to reveal "Create"
            duration: 0.8,
            delay:.5,
            ease: "expo.inOut" // A harsh, cinematic curve
        }, 0) // Wait half a second before shifting

            .to(trackRef.current, {
                yPercent: -66.66, // Pushes track up to reveal "Inspire"
                duration: 0.8,
                delay:.5,
                ease: "expo.inOut"
            }, "<+0.8")
            .to('.loader-block-1',{
                y:'-100%',
                duration:.5,
                ease:'power2.inOut'
            },'loader')
            .to('.loader-block-2',{
                y:'100%',
                duration:.5,
                ease:'power2.inOut'
            },'loader')
            .to('.loader', {
                display: 'none',
            }, '<+.1')
    }, [])

    return (
        <>
            <div className="loader fixed top-0 left-0 w-full h-dvh z-20">
                <div className="loader-wrapper h-dvh w-full flex justify-center items-center">
                    {/* <div className="loader-text text-black z-1 text-7xl font-bold italic"></div> */}
                    <div className="mask-window z-1">
                        <div className="word-track" ref={trackRef}>
                            <h2 className="word text-black z-1 text-7xl font-bold italic">Design</h2>
                            <h2 className="word text-black z-1 text-7xl font-bold italic">Create</h2>
                            <h2 className="word text-black z-1 text-7xl font-bold italic">Inspire</h2>
                        </div>
                    </div>
                </div>
                <div className="loader-count absolute z-1 bottom-5 right-5 flex items-center justify-center font-semibold text-black text-4xl size-20"><span ref={countRef} className='count'> </span>%</div>
                <div className="loader-bg">
                    {loaderBlock.map(item => {
                        return <span key={item} className={`loader-block loader-block-${item}`}></span>
                    })}
                </div>
            </div>
            <section className='relative'>
                <div className="landing">
                    <div className="canvas-block">
                        <Canvas setTl={setTl} loaded={props.loaded} />
                    </div>
                    {tl &&
                        <>
                            <LandingHorizontalScroll text={"Frontend Developer"} timeline={tl} loader={loaderTl} />
                            <Floating class='top-left' timeline={tl} heading='the architect' description='I’m Karan Sharma, a designer and frontend developer who works between pixels and code. I like turning ideas into thoughtful, interactive digital experiences.' />
                            <Floating class='top-right' timeline={tl} heading='The hybrid advantage' description='5+ years across UI/UX, frontend development, graphic design, branding, and motion. Experienced in creating digital experiences from concept to final build.' />
                        </>
                    }
                </div>
            </section>
        </>
    )
}
