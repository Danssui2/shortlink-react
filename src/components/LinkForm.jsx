import React, { useState, useRef } from 'react'
import Modal from './Modal'
import { nanoid } from 'nanoid'
import * as api from '../api/index'
import ReactDOM from 'react-dom'
import Toast from './Toast'

export default function LinkForm() {

  const [show, setShow] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))

  const [ori, setOri] = useState('https://github.com/danssui2')
  const [mini, setMini] = useState("danssgithub")
  const miniInput = useRef()

  const randomizeID = () => {
    const id = nanoid(5)
    setMini(id)
    miniInput.current.value = id
  }

  return (
    <>
			<button className='bg-slate-800 text-white font-semibold text-sm' onClick={() => setShow(true)}>Create New Link</button>
			{show ? 
					(
						<div className='flex fixed w-[80%] md:w-96 h-full items-center justify-center z-30 top-20 md:right-[10%] md:top-0'>
							<Modal title='Create New Link' pos='absolute'>
								<form className='flex flex-col w-[80%]' onSubmit={e => e.preventDefault()}>
									<button className='absolute top-8 right-8 text-white bg-slate-700' onClick={() => setShow(false)}>X</button>

									<label htmlFor="link" className='text-white'>Enter a Link</label>
									<input className='bg-slate-600 rounded-lg text-white mb-4 p-2' name='link' type="url" onChange={(e) => setOri(e.target.value)} required placeholder='www.github.com/danssui2'/>

									<label htmlFor="mini" className='text-white'>Enter a Short Link</label>
									<input className='bg-slate-600 rounded-lg text-white mb-6 p-2' name='mini' type="text" ref={miniInput} onChange={(e) => setMini(e.target.value)} required placeholder='DanssGithub'/>

                  <div className='flex justify-between mb-8 gap-4'>
                    <button className='bg-slate-700 text-white' onClick={randomizeID}>Randomize</button>
                    <button type='submit' className='bg-slate-700 text-white' onClick={async () => { api.createLinks(ori, mini); setShow(false); ReactDOM.render(<Toast>Creating...</Toast>, document.getElementById('modal')) }}>Create!</button>
                  </div>
								</form>  
							</Modal>
						</div>	
					)
			 : null
			}
    </>
  )
}
