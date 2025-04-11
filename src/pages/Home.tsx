import React, { useContext, useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import { AuthContext } from '@/context/authContext';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';

const Home = () => {
  //@ts-ignore
  const { isLoggedIn } = useContext(AuthContext);
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-videos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => setVideos(response.data.data))
    .catch(error => console.error('Error fetching videos:', error));
    
  }, [])

  return isLoggedIn ? (
    <div className="grid grid-cols-[1fr_5fr] gap-4 mt-6 px-4">
      <aside className="bg-[#09090b] rounded-lg shadow-lg overflow-hidden">
        <Sidebar />
      </aside>

      <main className="flex flex-col border border-[#9e9e9e] bg-[#09090b] text-white rounded-lg p-6 shadow-lg backdrop-blur-md">
        {videos.map((video, ind) => (
          <div key={ind} className='flex flex-col'>
            <img src={video.thumbnail} className='w-72 rounded-lg mb-2' alt="thumbnail" />
            <div className='font-semibold'>
              {video.title}
            </div>
            <div className='text-[#d8d8d8] text-sm font-light'>
              {video.owner}
            </div>
          </div>
        ))}
      </main>
    </div>
  ) : (
    <LandingPage />
  );
};

export default Home;
