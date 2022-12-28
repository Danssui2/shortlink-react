import React from 'react'
import { Link } from 'react-router-dom'
import * as api from '../api/index'
import Navbar from './Navbar'
import object from '../assets/object.png'

export default function Home() {

  const user = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <div className="w-screen h-screen flex flex-row justify-between items-center">
      <Navbar>
        <h3 className='text-white font-bold text-xl md:text-2xl'>MinifyLink</h3>
        {user ? 
          <div className='flex justify-between gap-3'>
            <div className='bg-slate-700 text-white font-semibold text-sm rounded-xl flex items-center h-8 px-3 md:h-10'>
              <p className='text-[10px] md:text-sm'>{user.name}</p>
              <img className='rounded-2xl w-7 h-7 md:w-8 md:h-8 ml-2' src={user.image} alt="" />
            </div>
            <div className='bg-slate-700 text-white font-semibold md:text-sm text-[10px] rounded-xl flex items-center h-8 md:h-10 px-3' onClick={()=> api.logout()}>Logout</div>
          </div>  
        : 
          <Link to='/login'><button className='bg-slate-700 text-white font-semibold text-sm rounded-xl flex items-center h-10'>Login</button></Link>
        }
      </Navbar>

      <div className='w-full h-full p-[10%] flex justify-center flex-col bg-slate-900 bg-cover bg-no-repeat bg-[url(../assets/bghome.svg)]'>
        <p className='text-slate-200 text-sm'>Link Shortner</p>
        <div className='w-72 mb-6'>
          <h1 className='text-white text-5xl md:text-6xl mb-2 font-Outfit'><span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600'>Make</span> urls easy to <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500'>Remember!</span></h1>
          <p className='text-slate-200 text-sm md:text-md'>Turn your long and hardread link into beautiful short customisable Link!</p>
        </div>

        <Link to={user ? '/dashboard' : '/login'}><button className='p-2 bg-violet-700 rounded-2xl text-white font-bold px-6'>Get Started</button></Link>          
      </div>

      <div className='absolute max-sm:hidden right-5 mb-15 flex'>
        <img className='w-80 h-80 lg:w-96 lg:h-96' src={object} alt="obj" />
      </div>
    </div>
  )
}
