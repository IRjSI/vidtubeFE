import { AuthContext } from '@/context/authContext';
import GridBackground from '@/utils/GridBackground';
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
    <div>
      <GridBackground />

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 p-4 sm:p-6 lg:p-8 min-h-[75vh]'>

        <div className='border border-white/10 bg-[#0f0f11]/60 w-full rounded-xl p-4 flex flex-col gap-4 backdrop-blur-lg'>
          <div>
            <img
              src={`${coverImage}`}
              alt="Cover"
              className='w-full h-40 sm:h-48 md:h-56 object-cover rounded-xl'
            />
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8'>
            <img
              src={`${avatar}`}
              alt="Avatar"
              className='rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover'
            />
            <h1 className='text-xl sm:text-2xl font-bold text-center sm:text-left'>{name}</h1>
          </div>
          <div className='bg-[#d8d8d8] p-4 rounded-xl text-sm sm:text-base'>
            <p className='text-gray-900 font-semibold'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cupiditate veniam esse dolores aspernatur itaque rerum, vero voluptatibus, odit dolor provident temporibus harum neque
            </p>
            <p className='text-gray-600 mt-2 font-light'>India</p>
          </div>
        </div>

        <div className='flex flex-col border border-white/10 bg-[#0f0f11]/60 rounded-xl backdrop-blur-lg p-4 gap-4'>
          <h2 className='text-lg sm:text-xl font-semibold'>Channel Statistics</h2>
          <p className='text-red-700 font-semibold text-sm sm:text-base'>
            Subscribers: {subscribers}
          </p>
          <div onClick={myVideos}>
            <button className='font-semibold bg-blue-700/20 border border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white cursor-pointer transition-colors duration-200 text-sm sm:text-base'>
              Videos
            </button>
          </div>
            <div
              className='text-4xl font-semibold flex justify-center items-center h-full border border-[#2e2e2f] rounded-md bg-[#2e2e2f]/10'
              style={{
                backgroundImage: `
                  radial-gradient(circle at center, rgba(249, 250, 251, 1) 0%, rgba(249, 250, 251, 0.8) 40%, rgba(249, 250, 251, 0.3) 70%, rgba(249, 250, 251, 0) 100%),
                  url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'%23e5e7eb\'/%3E%3C/svg%3E')
                `,
                backgroundSize: '20px 20px',
                backgroundBlendMode: 'multiply',
              }}
            >
              <p className='p-4 border backdrop-blur-md rounded-xl'>
                More features coming soon...
              </p>
            </div>
          </div>

      </div>
    </div>
  );
};

export default ChannelInspect;
