import React from 'react'

export default function Navbar(props) {
  return (
    <div className='absolute w-screen h-24 top-0 flex justify-between px-[10%] py-4 items-center'>
        {props.children}
    </div>
  )
}
