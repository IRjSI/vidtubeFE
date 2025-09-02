import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { Forward, Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import Comments from './Comments';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import VideoPlayer from '@/components/VideoPlayer';

const Watch = () => {
  const path = useParams();
  const id = path.id;
  //@ts-ignore
  const { token } = useContext(AuthContext);
  const [video, setVideo] = useState<any | null>(null);
  const [videoLiked, setVideoLiked] = useState(false);
  const [views, setViews] = useState(0);

  const playerRef = useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // player.on('waiting', () => {
    //   console.log('player is waiting');
    // });

    // player.on('dispose', () => {
    //   console.log('player will dispose');
    // });
  };

  const notify = () => toast('copied!');

  const likeVideo = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/likes/video/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
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
    const textToCopy = `${import.meta.env.VITE_FRONTEND_URL}/${id}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      notify();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  useEffect(() => {
    // get video by id
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-video/${id}`)
      .then(response => {
        setVideo(response.data.data[0]);
      })
      .catch(err => console.log(err));
                
    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/videos/inc-view/${id}`, {})
      .then(response => {
        console.log(views)
        setViews(response.data.data?.views || 0);
      })
      .catch(err => console.log(err));

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/likes/video-status/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setVideoLiked(response.data.data.message))
      .catch(err => console.log(err));
  }, [id, token]);

  if (!video) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Loader2 className='animate-spin' size={24} />
      </div>
    );
  }

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    aspectRatio: '16:9',
    sources: [{
        src: video.videoFile,  // .m3u8 link saved in DB
        type: 'application/x-mpegURL'
    }],
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto">
        <div className="grid grid-rows-[auto_auto_auto] gap-4 relative bg-[#000]">
          <div className='flex items-center justify-center'>
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
          
          <div className='grid grid-rows-[auto_auto_auto] gap-4 px-4 py-2 md:px-4'>
            <p className="text-xl font-semibold text-white">{video.title}</p>
            
            <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4'>
              <div className='flex justify-center items-center gap-2'>
                <img 
                  src={video.user[0].avatar} 
                  className='w-10 h-10 rounded-full object-cover' 
                  alt={`${video.user[0].username}'s avatar`} 
                />
                <p className='text-lg font-semibold text-white'>{video.user[0].username}</p>
              </div>
              
              <div className='flex gap-2 bg-[#272727] px-4 py-2 rounded-full'>
                <button 
                  className='cursor-pointer text-white hover:text-blue-400 transition-colors p-1' 
                  onClick={likeVideo}
                  aria-label="Like video"
                >
                  <ThumbsUp
                    size={20}
                    fill={videoLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  />
                </button>
                
                <div className='border-r border-gray-500 mx-2'></div>
                
                <button 
                  className='cursor-pointer text-white hover:text-red-400 transition-colors p-1'
                  aria-label="Dislike video"
                >
                  <ThumbsDown size={20} />
                </button>
                
                <div className='border-r border-gray-500 mx-2'></div>
                
                <button 
                  onClick={copyText} 
                  className='cursor-pointer text-white hover:text-green-400 transition-colors p-1'
                  aria-label="Share video"
                >
                  <Forward size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-gray-400 bg-[#1a1a1d] p-4 rounded-xl shadow-md">
              <div className="text-lg font-medium text-white flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <span>Description</span>
                <p className='text-sm text-gray-400'>{`${video.views} views`}</p>
              </div>
              <p className="text-base leading-relaxed">{video.description}</p>
            </div>
          </div>
          
          <div className="px-4">
            <Comments videoId={id} />
          </div>
          
          <Toaster
            position='bottom-right'    
            toastOptions={{
              duration: 5000,
              removeDelay: 1000,
              style: { background: '#363636', color: '#fff' }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Watch;
