import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { Forward, Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useState } from 'react'
import Comments from './Comments';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Watch = () => {
    // const location = useLocation();
    // const id = location.state?.id;
    const path = useParams();
    const id = path.id;
    //@ts-ignore
    const { token } = useContext(AuthContext);
    const [video, setVideo] = useState<any | null>(null);
    const [videoLiked, setVideoLiked] = useState(false);
    const [views, setViews] = useState(0);
    // const [watched, setWatched] = useState(false);

    const notify = () => toast('copied!');

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

    const copyText = async () => {
        const textToCopy = `http://localhost:5173/watch/${id}`;

        try {
            await navigator.clipboard.writeText(textToCopy);
            notify();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    
    // const subscribe = async () => {
    //     const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/subscription/toggle/${video.owner}`,{},
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })

    //     if (response.data.success) {
    //         response.data.message === 'Unsubscribed successfully' ? setSubState('Subscribe') : setSubState('Unsubscribe')
    //     }
    // }

    useEffect(() => {
        //get video by id
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-video/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // console.log(response.data.data[0])
                setVideo(response.data.data[0])
            }
            )
            .catch(err => console.log(err))
                    
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/videos/inc-view/${id}`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                setViews(response.data.data.views)
            })
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
            <div className='flex justify-center items-center h-[85vh]'><Loader2 className='animate-spin' size={24} /></div>
        )
    }

  return (
    <div className="grid grid-rows-[auto_auto] gap-4 relative bg-[#000]">

        <div className="relative w-screen max-w-none h-[65vh] bg-black flex items-center justify-center overflow-hidden shadow-lg p-0 m-0" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
            <video
                src={video.videoFile}
                className="w-full h-full rounded-lg"
                controls
                autoPlay
            ></video>
        </div>
        
        <div className='grid grid-rows-[auto_auto_auto] gap-4 px-4 py-2 md:px-4'>

            {/* title */}
            <p className="text-xl font-semibold text-white">
                {video.title}
            </p>

            <div className='flex items-center justify-center sm:justify-between'>
                <div className='flex justify-center items-center gap-2'>
                    <img src={video.user[0].avatar} className='w-10 h-10 rounded-full object-cover' alt="" />
                    <p className='text-lg font-semibold'>{video.user[0].username}</p>
                </div>
                <div className='flex gap-2 bg-[#272727] px-4 py-2 rounded-full cursor-pointer'>
                    <button className='cursor-pointer' onClick={likeVideo}><ThumbsUp
                        fill={videoLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        /></button>
                    <p className='border-r'></p>
                    <button className='cursor-pointer'><ThumbsDown /></button>
                    <p className='border-r'></p>
                    
                    <button onClick={copyText} className='cursor-pointer'><Forward /></button>
                    
                    <Toaster position='bottom-right'     
                        toastOptions={{
                            // Define default options
                            className: '',
                            duration: 5000,
                            removeDelay: 1000,
                            style: {
                            background: '#363636',
                            color: '#fff',
                            }
                        }}
                    />
                </div>
            </div>

            {/* description */}
            <div className="flex flex-col gap-2 text-gray-400 bg-[#1a1a1d] p-4 rounded-xl shadow-md">
                <div className="text-lg font-medium text-white flex gap-2 items-center">Description <p className='text-sm text-gray-400'>{`${views} views`}</p></div>
                <p className="text-base leading-relaxed">
                    {video.description}
                </p>
            </div>

            {/* Comment Section */}
        
        </div>

        <Comments videoId={id} />
        
    </div>

  )
}

export default Watch
