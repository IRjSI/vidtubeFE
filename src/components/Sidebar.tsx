import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const navigate = useNavigate();

  //@ts-ignore
  const { token } = useContext(AuthContext);

  const getLikedVideos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/likes/all-videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    navigate('/liked-videos', { state: { likes: response.data.data } });
  }

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-channels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        setChannels(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching channels:', error);
      });
  }, [token]);

  return (
    <aside className="text-white py-6 px-4 rounded-xl backdrop-blur-xl min-h-[85vh] bg-[#0f0f11]/60 shadow-md flex flex-col">
      <h1 className="text-xl font-semibold mb-4">Subscriptions</h1>

      {channels.length === 0 ? (
        <div className="text-gray-500 text-sm">No channels subscribed.</div>
      ) : (
        <div className='grid grid-rows-[3fr_1fr] items-center h-full'>
          <ul className="overflow-y-auto max-h-full no-scrollbar space-y-2">
            {channels.map((channel, index) => {
              const user = channel.user?.[0];
              const avatar = user?.avatar || 'https://via.placeholder.com/32';
              const username = user?.username || 'Unknown';
              
              return (
                <li
                key={index}
                className="p-2 rounded-lg hover:bg-white/10 transition flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={avatar}
                    alt={username}
                    className="w-8 h-8 rounded-full object-cover"
                    />
                  <span className="text-sm font-medium">{username}</span>
                </li>
              );
            })}
          </ul>
          <div className='border-t'>
            <p className='p-2 rounded-lg hover:bg-white/10 transition flex items-center gap-3 cursor-pointer mt-2' onClick={getLikedVideos}>Liked videos</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
