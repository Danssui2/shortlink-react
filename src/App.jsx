import React from 'react'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import { Route, Routes} from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default App