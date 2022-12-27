import React, { useState } from 'react'
import { FiInfo } from 'react-icons/fi'

export default function Toast(props) {

  const [show, setShow] = useState(true)

  return (
    <> 
      { show ?
      <div className='flex w-full h-full fixed justify-center top-0 mt-10 z-50'>
          <div className='absolute w-[50%] lg:w-[30%] h-14 bg-slate-800 rounded-lg border border-purple-700 text-white font-bold text-lg flex items-center p-4 gap-2'>
              <FiInfo/> 
              {props.children}
              <button className='bg-slate-700 absolute top-2 right-2 text-white text-sm' onClick={() => setShow(false)}>X</button>
          </div>
      </div>
      : null }
     </>
  )
}
