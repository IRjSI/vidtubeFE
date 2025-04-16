import { useContext, useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import { AuthContext } from '@/context/authContext';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubscribeChannel from './SubscribeChannel';

// Helper function to format duration from seconds to mm:ss
const formatDuration = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Home = () => {
  const [videos, setVideos] = useState<any[]>([]);
  //@ts-ignore
  const { isLoggedIn, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [userNotFound, setUserNotFound] = useState('found');

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
        const lowerCaseUsername = username.toLowerCase();
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user-search/${lowerCaseUsername}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
        );
            
        if (response.data.success) {
            // this is how to pass props while navigating (use useLocation hook in that component)
            navigate('/subscribe', { state: { user: response.data.data[0] } });
        } else {          
          setUserNotFound('Not found')
        }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) return;    

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-videos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setVideos(response.data.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, [token]);

  if (!isLoggedIn) return <LandingPage />;

  return (
    <div className="grid grid-cols-[1fr_5fr] gap-4 mt-6 px-4 min-h-[85vh]">
      <aside className="rounded-lg shadow-lg overflow-hidden">
        <Sidebar />
      </aside>


      <main className=" text-white p-4 rounded-xl shadow-md bg-[#0f0f11]/60">
        <form onSubmit={submitHandler} className='flex items-center gap-1'>
          <input
            type="text"
            placeholder="Search..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-64 text-sm px-4 py-2 rounded-full border border-[#3d3d3d] bg-[#0f0f11] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          <button type='submit' className='bg-white text-black p-1 rounded-md'><Search /></button>
          {userNotFound === 'Not found' ? (<p className='text-white'>User not found!</p>) : null}
        </form>
        {videos.length === 0 ? (
          <div className="text-gray-400">No videos found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto no-scrollbar max-h-full">
            {videos.map((video, ind) => {
              const user = video.user?.[0];
              const username = user?.username || 'Unknown';
              const thumbnail = video.thumbnail || 'https://via.placeholder.com/300x180';
              const duration = formatDuration(parseInt(video.duration || 0));

              return (
                <div
                  key={ind}
                  className="flex flex-col relative cursor-pointer rounded-lg hover:bg-white/5 transition p-2"
                >
                  <div className="relative w-full rounded-lg mb-2">
                    <img
                      src={thumbnail}
                      className="w-full h-40 rounded-lg object-cover"
                      alt="thumbnail"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 font-semibold text-white text-xs px-2 py-1 rounded">
                      {duration}
                    </div>
                  </div>
                  <div className="font-semibold mt-1 line-clamp-2 mb-1">{video.title}</div>
                  <div className="text-[#d8d8d8] text-sm font-light">{username}</div>
                  <div className="text-[#d8d8d8] text-sm font-light">{video.views} views</div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
