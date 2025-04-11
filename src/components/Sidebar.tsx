import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
      const token = localStorage.getItem('token');
      
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-channels`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => setChannels(response.data.data))
      .catch(error => console.error('Error fetching videos:', error));
      
    }, [])

  return (
    <div className="border border-[#9e9e9e] text-white py-6 px-4 rounded-xl backdrop-blur-xl h-[85vh]">
      <h1 className="text-xl font-semibold mb-4">Subscriptions</h1>
      <div className="overflow-y-auto max-h-[70vh] no-scrollbar">
        <ul className="space-y-2">
          {channels.map((channel, index) => (
        <li
          key={index}
          className="p-2 rounded-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer flex gap-2"
        >
          {channel.channel}
        </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
