import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../api/index'
import LinkCard from './LinkCard'
import LinkForm from './LinkForm'
import Navbar from './Navbar'
import Toast from './Toast'

export default function Dashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
  const [links, setLinks] = useState([])

  const fetchLink = async () => {
    const allLinks = await api.getLinks(user.email)
    setLinks(allLinks)
  }

useEffect(() => {
  return async () => {
    if (user) {
      fetchLink()
      .then(() => console.log("fetched"))
      .catch(err => ReactDOM.render(<Toast>Something Went Wrong, Please reload</Toast>, document.getElementById('modal')))
    } else {
      navigate('/login')
    }
  }
}, [])

const listLinks = links?.map(
  (link, index) =>
    <LinkCard 
      key={index}
      urlID={link?.urlID}
      uID={link?.uID}
      ori={link?.oriUrl}
      mini={link?.miniUrl}
      date={link?.date}
      click={link?.clicks}
    />
)

  return (
    <> 
      <Navbar>
        <h1 className='text-2xl text-white'>Dashboard</h1>
        <LinkForm/>
      </Navbar>
      <div className='flex min-h-screen w-full flex-col bg-slate-900 bg-no-repeat bg-cover bg-[url(../assets/bg1.svg)] overflow-x-hidden'>
        <div className='flex flex-col mx-[10%] mt-24 z-10'>
          <h2 className='text-lg mb-4 text-slate-200'>All Links :</h2>
          <div className='flex max-sm:flex-col-reverse flex-row-reverse flex-wrap justify-center w-full'>
            {links.length != 0 ? <>{listLinks}</> : <p className='text-slate-200 text-sm'>Nothing there, like your feel for me :)</p>}
          </div>
        </div>
      </div>
    </>
  )
}
