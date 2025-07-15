import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '@/context/authContext';
import { LogOut, MessageCircleMore, MessageSquareMore, MessageSquarePlus, PlayIcon, Settings2, Video } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';

const Header = () => {
  const { isLoggedIn, logout, token } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const [data, setData] = useState<{ username: string, avatar: string }>()

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token])

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-lg shadow-lg border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">
        <PlayIcon onClick={() => navigate('/')} className='cursor-pointer text-slate-500' size={38} />

        {isLoggedIn ? (
          <div className="flex gap-3 items-center">
            <Link to="/message" title="message">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <MessageCircleMore size={18} />
              </button>
            </Link>
            <Link to="/show-tweets" title="Tweets">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <MessageSquareMore size={18} />
              </button>
            </Link>
            <Link to="/tweet" title="Create Post">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <MessageSquarePlus size={18} />
              </button>
            </Link>
            <Link to="/upload" title="Upload">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <Video size={18} />
              </button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img src={data?.avatar ? data.avatar : "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"} alt="prf" className='w-8 h-8 rounded-full object-cover cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className='flex items-center justify-center'>
                  <Link to={"/profile"} state={data}>
                    {data?.username ? data.username : "..."}
                  </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/insights" title="Studio" className='flex gap-2 items-center'>
                    <Settings2 size={18} />
                    Studio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={logout}
                    title='Logout'
                    className="text-sm flex gap-2 items-center cursor-pointer"
                  >
                    <LogOut className='text-red-500' size={18} />
                    logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to="/login" title="login">
            <button className="cursor-pointer text-sm px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
