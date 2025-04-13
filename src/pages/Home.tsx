import React, { useContext, useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import { AuthContext } from '@/context/authContext';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';

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
    <div className="grid grid-cols-[1fr_5fr] gap-4 mt-6 px-4 min-h-[75vh]">
      <aside className="bg-[#09090b] rounded-lg shadow-lg overflow-hidden">
        <Sidebar />
      </aside>

      <main className="bg-[#09090b] text-white p-4 rounded-xl shadow-md">
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
