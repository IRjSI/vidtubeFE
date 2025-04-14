import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import { ArrowBigUpDash, LogOut, MessageCircle, Plus } from 'lucide-react';

const Header = () => {
  //@ts-ignore
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f11]/80 backdrop-blur-md shadow-md border-b border-[#222]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1">
        <img
          onClick={() => navigate('/')}
          src="https://images-platform.99static.com//_is1GO09t56h442BZLWbRgiNgAw=/612x19:1179x586/fit-in/500x500/99designs-contests-attachments/133/133449/attachment_133449824"
          alt="Logo"
          className="w-12 rounded-3xl cursor-pointer hover:opacity-90 transition"
        />

        {isLoggedIn ? (
          <div className="flex gap-3 items-center">
            <Link to="/show-tweets" title="Tweets">
              <button className="bg-white text-black p-2 rounded-md hover:bg-gray-200 transition">
                <MessageCircle size={18} />
              </button>
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 text-sm px-4 py-2 rounded-full border border-[#3d3d3d] bg-[#0f0f11] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Link to="/tweet" title="Tweet">
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
              className=" text-sm px-4 py-2 rounded-md border transition border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" title="Channel Insights">
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
