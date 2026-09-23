import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Floating(props) {
  const floatTimeline = props.timeline
  useGSAP(() => {
    floatTimeline.fromTo('.floating-box',
      { x: 'random([100,-100])', opacity: 0 },
      { x: 0, opacity: 1 },
      '0' // Injects exactly at the start of the hero timeline
    );
  })


  return (
    <div className={`floating-box absolute px-6 py-8 ${props.class}`}>
      {/* <span className='bg'></span> */}
      <div className="floating-head">
        <h2 className='text-white uppercase italic font-semibold text-2xl mb-2.5'>{props.heading}</h2>
      </div>
      <div className="floating-text">
        <p className='text-white capitalize italic'>{props.description}</p>
      </div>

      <span className='line'></span>
    </div>
  )
}
