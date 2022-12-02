import React from 'react'

export default function Block(props) {
 
  return (
    <div className='block' onClick={props.handleClick} style={{backgroundColor:(props.isHeld)? "#59E391":"#ffffff"}}>
       <div className="text">{props.value}</div>      
    </div>
  )
}
