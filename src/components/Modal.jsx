import React from 'react'

export default function Modal(props) {

  return (
    <>
      <div className={`${props.pos} bg-slate-800 flex flex-col items-center z-100 w-full mb-32 rounded-lg px-6 py-8`}>
        <div className='flex mb-5 mt-3 items-center'>
          <h1 className='font-medium text-lg text-white'>{props.title}</h1>
        </div>
        {props.children}
      </div>
    </>
  )
}
