import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChannelInspect = () => {
  const [subscribers, setSubscribers] = useState(0);
  const [name, setName] = useState('');
  const [coverImage, setCoverImage] = useState<File | string | null>(null);
  const [avatar, setAvatar] = useState<File | string | null>(null);
  //@ts-ignore
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const myVideos = () => {
    navigate('/my-videos');
  };

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-subscribers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setSubscribers(response.data.data.length));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.data.username);
        setAvatar(response.data.data.avatar);
        setCoverImage(
          response.data.data.coverImage !== ''
            ? response.data.data.coverImage
            : 'https://media.istockphoto.com/id/1253420527/photo/beautiful-bright-blue-clouds-in-a-light-blue-sky-16-9-panoramic-format.jpg?s=612x612&w=0&k=20&c=TP1T5pEc_CY2Nz81cfPhskLjbjpfNLGzHhJd_iovMp0='
        );
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">

      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${coverImage}`}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative group">
              <img
                src={`${avatar}`}
                alt="Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {name}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <span className="text-lg font-medium">
                  {subscribers.toLocaleString()} subscribers
                </span>
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                <span className="text-sm">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 h-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b bg-blue-400 rounded-full" />
                About Channel
              </h2>
              
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 p-6 rounded-xl border border-gray-600/30">
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cupiditate veniam esse dolores aspernatur itaque rerum, vero voluptatibus, odit dolor provident temporibus harum neque
                </p>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Channel Stats
              </h3>
              
              <div className="space-y-4">
                <div className="bg-red-500/20 p-4 rounded-xl border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-red-300 font-medium">Subscribers</span>
                    <span className="text-2xl font-bold text-red-400">
                      {subscribers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Studio</h3>
              
              <div className="space-y-4">
                <button 
                  onClick={myVideos}
                  className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Manage Videos
                  </div>
                </button>
              </div>
            </div>


          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">More Features</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced analytics, monetization tools, and collaboration features are coming soon to enhance your channel management experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInspect;