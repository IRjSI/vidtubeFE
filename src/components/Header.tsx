import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import { ArrowBigUpDash, LogOut, MessageCircle, PlayIcon, Plus } from 'lucide-react';

const Header = () => {
  //@ts-ignore
  const { isLoggedIn, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-lg shadow-lg border-b border-slate-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <PlayIcon onClick={() => navigate('/')} className='cursor-pointer text-slate-500' size={38} />

        {isLoggedIn ? (
          <div className="flex gap-3 items-center">
            <Link to="/show-tweets" title="All Tweets">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <MessageCircle size={18} />
              </button>
            </Link>
            
            <Link to="/tweet" title="Create Post">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <Plus size={18} />
              </button>
            </Link>
            <Link to="/upload" title="Upload">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <ArrowBigUpDash size={18} />
              </button>
            </Link>
            <Link to="/insights" title="Channel Insights">
              <button className=" text-sm px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition">
                Inspect
              </button>
            </Link>
            <button
              onClick={logout}
              title='Logout'
              className=" text-sm px-4 py-2 rounded-md border transition border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={18} />
            </button>
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
