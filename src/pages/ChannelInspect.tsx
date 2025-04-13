import { Chart } from '@/components/Chart'
import { AuthContext } from '@/context/authContext';
import GridBackground from '@/utils/GridBackground'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const ChannelInspect = () => {
  const [subscribers, setSubscribers] = useState(0);
  const [videos, setVideos] = useState(0);
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
   //@ts-ignore
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return
    

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-subscribers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => setSubscribers(response.data.data.length))

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-videos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => setVideos(response.data.data.length))
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
        setName(response.data.data.username)
        setAvatar(response.data.data.avatar)
        setCoverImage(response.data.data.coverImage)        
      })
  }, [token])

  return (
    <div>
      <GridBackground />

      <div className='grid grid-cols-[1fr_2fr] gap-5 p-8 min-h-[75vh]'>

        <div className='border border-white/10 bg-white/5 h-full w-full rounded-xl p-4 flex flex-col gap-4 backdrop-blur-lg'>
          <div>
            <img src={`${coverImage}`} alt="" className='w-full h-40 object-cover rounded-xl' />
          </div>
          <div className='flex items-center gap-8'>
            <img src={`${avatar}`} alt="" className='rounded-full w-24 h-24 object-cover' />
            <h1 className='text-2xl font-bold'>{name}</h1>
          </div>
          <div className='bg-[#d8d8d8] p-4 rounded-xl'>
            <p className='text-gray-900 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cupiditate veniam esse dolores aspernatur itaque rerum, vero voluptatibus, odit dolor provident temporibus harum neque</p>
            <p className='text-gray-600 mt-2 font-light'>India</p>
          </div>
        </div>

        <div className='flex flex-col border border-white/10 bg-white/5 rounded-xl backdrop-blur-lg w-full p-4 gap-4'>
          <h2 className='text-xl font-semibold'>Channel Statistics</h2>
          {/* <Chart /> */}
          <p>Subscribers: {subscribers}</p>
          <p>Videos: {videos}</p>
        </div>

      </div>
    </div>
  )
}

export default ChannelInspect
