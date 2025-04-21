import { useNavigate } from 'react-router-dom'
import { formatDuration } from '@/utils/formatDuration';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/authContext';

const LikedVideos = () => {
  const [videos, setVideos] = useState([]) // array of liked videos

  //@ts-ignore
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();
  const videoClick = (id: string) => {
    navigate('/watch', { state: { id: id } });
  };
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/likes/all-videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => setVideos(response.data.data))
      .catch(err => console.log(err))

  }, [token])
    return (
      <div className="overflow-y-auto no-scrollbar max-h-full p-4">
          <div className="text-center mb-4">Liked Videos: {videos.length}</div>
          {videos.map((item: any, ind: number) => {
              const video = item.video; 
              const id = video._id;
              const thumbnail = video.thumbnail || 'https://via.placeholder.com/300x180';
              const duration = formatDuration(parseInt(video.duration || 0));

              return (
                  <div
                      key={ind}
                      className="grid grid-cols-[2fr_9fr_1fr] gap-4 relative cursor-pointer rounded-lg hover:bg-white/5 transition p-2 mb-2"
                      onClick={() => videoClick(id)}
                  >
                      <div className="relative rounded-lg mb-2">
                          <img
                              src={thumbnail}
                              className="w-64 h-40 rounded-lg object-cover"
                              alt="thumbnail"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/80 font-semibold text-white text-xs px-2 py-1 rounded">
                              {duration}
                          </div>
                      </div>
                      <div>
                          <div className="font-semibold mt-1 line-clamp-2 mb-1">{video.title}</div>
                          <div className="text-[#d8d8d8] text-sm font-light">{video.views} views</div>
                      </div>
                  </div>
              );
          })}
      </div>
  );
};

export default LikedVideos
