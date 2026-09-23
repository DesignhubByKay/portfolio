import React from 'react'
import img4 from '../assets/img4.jpg'
import g1 from '../assets/graphic/1.png'
import g2 from '../assets/graphic/2.png'
import g3 from '../assets/graphic/3.png'
import g4 from '../assets/graphic/4.png'
import g5 from '../assets/graphic/5.png'
import g6 from '../assets/graphic/6.png'
import i1 from '../assets/ai3.webp'
import i2 from '../assets/ai2.webp'
import ordinary from '../assets/theOrdinary.mp4'
import i4 from '../assets/ai4.webp'
import lip from '../assets/lipstick.mp4'
import space from '../assets/space.mp4'
import web1 from '../assets/web1.mp4'
import web2 from '../assets/web2.mp4'
import web3 from '../assets/web3.mp4'
import web4 from '../assets/web4.mp4'
import web5 from '../assets/web5.mp4'
import web6 from '../assets/web6.mp4'
import bsr from '../assets/bsr.png'
import dev from '../assets/devapp.png'
import kay from '../assets/kay.png'
import tmg from '../assets/tmg.png'
import cloud from '../assets/clouddrop.png'


const webImages = [
  `${web1}`,
  `${web2}`,
  `${web4}`,
  `${web3}`,
  `${web5}`,
  `${web6}`,
]
const brandImages = [
  `${bsr}`,
  `${dev}`,
  `${cloud}`,
  `${tmg}`,
  `${kay}`,
]
const graphicImages = [
  `${g1}`,
  `${g2}`,
  `${g3}`,
  `${g4}`,
  `${g5}`,
  `${g6}`,
]
const aiImages = [
  `${i2}`,
  `${ordinary}`,
  `${i1}`,
  `${lip}`,
  `${space}`,
  `${i4}`,
  
]

export default function WorkVisual() {
  return (
    <div className='work-visuals flex flex-col'>
      <div className="dev-visual">
        <div className="dev-inner flex gap-8">
          {webImages.map((media, index) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

            return (
              <div key={index} className="dev-block visual-block">
                {isVideo ? (
                  <video
                    src={media}
                    width="100%"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={media}
                    alt=""
                    width="100%"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="graphic-visual">
        <div className="graphic-inner flex gap-8">
          {graphicImages.map((img, index) => (
            <div key={index} className="graphic-block visual-block">
              <img src={img} alt="" width="100%" />
            </div>
          ))}
        </div>
      </div>
      <div className="branding-visual">
        <div className="branding-inner flex gap-8">
          {brandImages.map((img, index) => (
            <div key={index} className="branding-block visual-block">
              <img src={img} alt="" width="100%" />
            </div>
          ))}
        </div>
      </div>
      <div className="ai-visual">
        <div className="ai-inner flex gap-8">
          {aiImages.map((media, index) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

            return (
              <div key={index} className="ai-block visual-block">
                {isVideo ? (
                  <video
                    src={media}
                    width="100%"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={media}
                    alt=""
                    width="100%"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
