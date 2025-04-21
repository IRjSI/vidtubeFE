import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { PenBox, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const MyVideos = () => {
    const [videos, setVideos] = useState<any | null>([]);

    //@ts-ignore
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const videoClick = (id: string) => {
        navigate('/watch', {state: { id: id }})
    }

    const deleteVideo = async (id: string) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/videos/delete-video/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            console.log(response.data.message);
        }
    }

    const editVideo = async (id: string) => {
        

        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/videos/update-video/${id}`, {

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
            console.log(response.data.message);
        }
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-my-videos`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
            .then(response => setVideos(response.data.data))
            .catch(err => console.log(err))
    }, [token])
    
  return (
    <div className="overflow-y-auto no-scrollbar max-h-full">
            <div className="text-center p-4">
                Total Videos: {videos.length}
            </div>
            {videos.map((video: any, ind: any) => {
              const id = video._id;
              const thumbnail = video.thumbnail || 'https://via.placeholder.com/300x180';
              const duration = formatDuration(parseInt(video.duration || 0));

              return (
                <div
                  key={ind}
                  className="grid grid-cols-[2fr_9fr_1fr] gap-4 relative cursor-pointer rounded-lg hover:bg-white/5 transition p-2"
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
                  <div className="flex gap-2">
                    <PenBox className="text-blue-700" size={18} onClick={() => editVideo(id)}/>
                    <Trash2 className="text-red-700 " size={18} onClick={() => deleteVideo(id)} />
                  </div>
                </div>
              );
            })}
          </div>
  )
}

export default MyVideos
