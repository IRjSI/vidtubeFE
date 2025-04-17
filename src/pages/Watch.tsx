import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Watch = () => {
    const location = useLocation();
    const id = location.state?.id;
    //@ts-ignore
    const { token } = useContext(AuthContext);
    const [video, setVideo] = useState<any | null>(null);
    const [videoLiked, setVideoLiked] = useState(false);

    const likeVideo = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/likes/video/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.success) {                
                setVideoLiked(response.data.data.videoLiked);
            } else {
                console.error("Failed to like video:", response.data.message);
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };
    

    useEffect(() => {
        //get video by id
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-video/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setVideo(response.data.data[0]))
            .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/likes/video-status/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setVideoLiked(response.data.data.message))
            .catch(err => console.log(err))
    }, [id, token])

    if (!video) {
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div className="grid grid-rows-[auto_auto_auto_auto] gap-4 p-6 md:p-8">

        <div className="w-full h-[65vh] flex items-center justify-center overflow-hidden shadow-lg">
            <video
                src={video.videoFile}
                className="w-full h-full rounded-lg"
                controls
                autoPlay
            ></video>
        </div>

        <p className="text-xl font-semibold text-white">
            {video.title}
        </p>

        <div className='flex items-center justify-between w-1/2'>
            <div className='flex justify-center items-center gap-2'>
                <img src={video.user[0].avatar} className='w-10 h-10 rounded-full object-cover' alt="" />
                <p className='text-lg font-semibold'>{video.user[0].username}</p>
                <p className='text-black bg-white hover:bg-[#d8d8d8] cursor-pointer py-2 px-4 rounded-3xl'>Subscribe</p>
            </div>
            <div className='flex gap-2 bg-[#272727] px-4 py-2 rounded-full cursor-pointer'>
                <button className='cursor-pointer' onClick={likeVideo}><ThumbsUp
                    fill={videoLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                /></button>
                <p className='border-r'></p>
                <button className='cursor-pointer'><ThumbsDown /></button>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-gray-400 bg-[#1a1a1d] p-4 rounded-xl shadow-md">
            <p className="text-lg font-medium text-white">Description</p>
            <p className="text-base leading-relaxed">
                {video.description}
            </p>
        </div>
    </div>

  )
}

export default Watch
