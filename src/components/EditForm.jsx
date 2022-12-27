import React, { useState, useRef } from 'react'
import Modal from './Modal'
import { nanoid } from 'nanoid'
import * as api from '../api/index'
import ReactDOM from 'react-dom'
import { FiEdit } from 'react-icons/fi'
import Toast from './Toast'

// ori urlID uID
export default function LinkForm(props) {

    	const [show, setShow] = useState(false)
		const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))

		const [ori, setOri] = useState(props.ori)
		const [urlID, setUrlID] = useState(props.urlID)
    
		const miniInput = useRef()
    
		const randomizeID = () => {
			const id = nanoid(5)
			setUrlID(id)
			miniInput.current.value = id
		}

  return (
    <>
			<button className='bg-slate-700 w-14 h-14 text-white' onClick={() => setShow(true)}><FiEdit/></button>
			{show ? 
					(<>
						<div className='flex absolute bg-slate-800 rounded-lg h-full inset-0 w-full'>
							<Modal title={'Edit ' + props.urlID}>
								<form className='flex flex-col w-[80%]' onSubmit={e => e.preventDefault()}>
									<button className='absolute top-8 right-8 text-white bg-slate-700' onClick={() => setShow(false)}>X</button>

									<label className='text-white' htmlFor="link">Link</label>
									<input className='bg-slate-600 rounded-lg text-white mb-4 p-2' name='link' type="text" onChange={(e) => setOri(e.target.value)} defaultValue={props?.ori}/>

									<label className='text-white' htmlFor="mini">Short Link</label>
									<input className='bg-slate-600 rounded-lg text-white mb-6 p-2' name='mini' type="text" ref={miniInput} onChange={(e) => setUrlID(e.target.value)} defaultValue={props?.urlID}/>

									<div className='flex justify-between mb-8 gap-4'>
										<button className='text-white bg-slate-700' onClick={randomizeID}>Randomize</button>
										<button className='text-white bg-slate-700' onClick={async () => { api.updateLinks(ori, urlID, props.uID); setShow(false); ReactDOM.render(<Toast>Updating...</Toast>, document.getElementById('modal')) }}>Update</button>
									</div>
								</form>  
							</Modal>
						</div>	
          </>) : null
			}
    </>
  )
}
