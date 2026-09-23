import React from 'react'

export default function ProjectDetail(props) {
    return (
        <div className="project-block flex flex-col md:flex-row items-center p-10 md:p-10 lg:p-20">
            <div className="project-info text-white flex flex-col gap-5">
                <h2 className='text-4xl md:text-5xl lg:text-8xl font-semibold lg:mb-5'>{props.name} <span>{props.sure}</span></h2>
                <p>{props.description}</p>
                <div className="project-tech flex flex-wrap gap-2.5">
                    {props.tech.map((item,index)=>(
                        <div key={index} className="tech-block px-5 py-2 capitalize rounded-4xl">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="project-media">
                <video src={props.media} loop autoPlay playsInline muted></video>
                
            </div>
        </div>
    )
}
