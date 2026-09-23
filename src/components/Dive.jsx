import React, { useRef } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import i1 from '../assets/ai1.webp'
import i2 from '../assets/ai2.webp'
import i3 from '../assets/ai3.webp'
import i4 from '../assets/ai4.webp'
import i5 from '../assets/ai5.webp'
import i6 from '../assets/ai6.webp'
import i8 from '../assets/ai8.webp'
import i9 from '../assets/ai9.webp'
import i10 from '../assets/ai10.webp'
import i11 from '../assets/ai11.webp'
import i12 from '../assets/ai12.webp'
import i13 from '../assets/ai13.webp'
import i14 from '../assets/ai14.webp'

gsap.registerPlugin(ScrollTrigger);

const images = [
    `${i1}`,
    `${i2}`,
    `${i3}`,
    `${i4}`,
    `${i5}`,
    `${i6}`,
    `${i12}`,
    `${i8}`,
    `${i9}`,
    `${i10}`,
    `${i11}`,
    `${i12}`,
    `${i13}`,
    `${i14}`,
    `${i3}`,
    `${i8}`,
    `${i11}`,
];

export default function Dive() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const sectionRef = useRef(null)
    const fontSize = (window.innerWidth > 768) ? '250' : '150'

    useGSAP(() => {
        if (!sectionRef) return;
        
        const imageElements = gsap.utils.toArray(".dive-image");

        function getEndRandomPos(){
            const side = gsap.utils.random(0,3,1)
            switch(side){
                case 0:
                    return{
                        x:gsap.utils.random(-700,-350),
                        y:gsap.utils.random(-500, -200)
                    };
                
                case 1:
                    return{
                        x:gsap.utils.random(350,700),
                        y:gsap.utils.random(500,200)
                    };
                case 2:
                    return{
                        x:gsap.utils.random(350,700),
                        y:gsap.utils.random(-500,-200)
                    };
                case 3:
                    return{
                        x:gsap.utils.random(-350,-750),
                        y:gsap.utils.random(500,200)
                    };
                default:
                    return{
                        x:gsap.utils.random(-600,-200),
                        y:gsap.utils.random(250,600)
                    };
            }

        }

        const imageTl = gsap.timeline();

        imageElements.forEach((image,index)=>{

            const destination = getEndRandomPos();
            const startTime = gsap.utils.random(0, 7);

            gsap.set(image,{
                x:0,
                y:-50,
                scale:0,
                opacity:0,
                rotation:gsap.utils.random(-12,12),
                filter:'blur(0px)',
                transformOrigin:'50% 50%'
            });

            imageTl.to(image,{
                opacity:gsap.utils.random(0.7,1),
                duration:.1,
                ease:'power2.out'
            },startTime)

            imageTl.to(image,{
                x:destination.x,
                y:destination.y,
                scale:gsap.utils.random(1.5, 2.8),
                rotation:gsap.utils.random(-18,18),
                duration:1.5,
                ease:'power2.in',
                opacity:1
            },startTime + 0.1)

            imageTl.to(image,{
                filter:'blur(9px)',
                duration:.3,
                opacity:0,
            },startTime + 0.1 + 1.5)

            imageTl.set(image,{
                x:0,
                y:-50,
                scale:0,
                rotation: gsap.utils.random(-12, 12),
                opacity: 0,
                filter: "blur(0px)",
            }, startTime + 0.1 + 1.5 + .3)

        })

        const tlDive = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=3000',
                scrub: 1,
                pin: true
            }
        })
        .to('#mask', {
                scale: 80,
                transformOrigin: '51% 50%',
                duration:5
            })
            tlDive.add(imageTl,'0.5')
    }, [])

    return (
        <div className='relative dive-section' ref={sectionRef}>
            <svg
                viewBox={`0 0 ${windowWidth} ${windowHeight}`}
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-dvh absolute inset-0 pointer-events-none z-20"
            >
                <defs>

                    <mask id="keyhole-mask">

                        <rect width="100%" height="100%" fill="white" />

                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="black"
                            fontSize={fontSize}
                            fontWeight="900"
                            letterSpacing="0.05em"
                            className="font-black uppercase"
                        >
                            LAB
                        </text>
                    </mask>
                </defs>
                <rect
                    id="mask"
                    width="100%"
                    height="100%"
                    fill="#000000"
                    mask="url(#keyhole-mask)"
                />
            </svg>
            <div className="relative h-dvh w-full bg-white">
                <div className="dive-images">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className="dive-image"
                            alt=""
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
