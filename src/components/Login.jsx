import React, {useEffect} from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import * as api from '../api/index'
import { useNavigate } from 'react-router-dom'
import { AiFillGoogleCircle } from 'react-icons/ai'

export default function Login() {
  const navigate = useNavigate()
  
  const handleLogin = async (tokenResponse) => {
    await api.auth(tokenResponse.access_token)
    return navigate('/dashboard')
  }

  const login = useGoogleLogin({
      onSuccess: handleLogin
  })

      
  return (
    <div className='w-screen h-screen bg-slate-900 flex justify-center items-center bg-[url(../assets/bghome.svg)] bg-no-repeat bg-cover'>
        <button className='bg-slate-800 text-white flex items-center gap-2 text-lg' onClick={() => login()}>Login With Google <AiFillGoogleCircle className='text-2xl'/></button>
    </div>
  )
}
