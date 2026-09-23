import React from 'react'

export default function Skill(props) {
  return (
    <div className='skill-block flex gap-4 items-center shrink-0'>
        <div className="skill-icon size-8 md:size-12">
            <img src={props.icon} alt="" />
        </div>
        <div className="skill-name">
            <h3 className='text-4xl md:text-6xl capitalize font-medium'>{props.name}</h3>
        </div>
    </div>
  )
}
