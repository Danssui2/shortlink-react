import React from 'react'
import * as api from '../api/index'
import EditForm from './EditForm'
import { AiOutlineDelete, AiOutlineLink } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'
import ReactDOM from 'react-dom'
import Toast from './Toast'

// ori mini urlid uid date
export default function LinkCard(props) {
  return (
    <div className='flex relative'>
      <div className='flex flex-col rounded-xl glass p-8 mb-4 md:mr-4 xl:mb-6 xl:mr-6 max-sm:w-full max-w-md'>
        <h2 className='font-semibold font-Outfit text-4xl mb-3 text-white break-all'>{props.urlID}</h2>
        <p className='font-thin text-sm text-slate-400'>Minified link</p>
        <h4 className='mb-2 text-white text-sm break-all'>{props.mini}</h4>
        <p className='font-thin text-sm text-slate-400'>Original Link</p>      
        <h5 className='mb-2 text-white text-sm break-all'>{props.ori}</h5>
        <p className='font-thin text-sm text-slate-400'>Clicks</p>      
        <p className='mb-2 text-white text-sm'>{props.click}</p>
        <p className='font-thin text-sm text-slate-400'>Created</p>      
        <p className='mb-4 text-white text-sm'>{props.date}</p>
        <div className="flex gap-2 flex-wrap justify-around">
          <a href={props.mini} className='text-black'><button className='bg-slate-700 w-14 h-14 text-white'><AiOutlineLink/></button></a>
          <button className='bg-slate-700 w-14 h-14 text-white' onClick={() => navigator.clipboard.writeText(props.mini)}><FiCopy/></button>
          <EditForm ori={props.ori} urlID={props.urlID} uID={props.uID}/>
          <button className='w-14 h-14 bg-slate-700 text-white' onClick={() => { api.removeOwner(props.uID); ReactDOM.render(<Toast>Deleting...</Toast>, document.getElementById('modal')) }}><AiOutlineDelete/></button>
        </div>
      </div>
    </div>
  )
}

LinkCard.defaultProps = {
  urlID: 'Something',
  mini: 'http://localhost:5000/go/something',
  ori: 'www.google.com',
  date: 'August 6 2022',
}
