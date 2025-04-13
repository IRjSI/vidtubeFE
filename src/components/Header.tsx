import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/authContext"
import { ArrowBigUpDash, LogOut, Plus } from "lucide-react";

const Header = () => {
  //@ts-ignore
  const { isLoggedIn, logout } = useContext(AuthContext);

  const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center text-white text-lg backdrop-blur-md py-2 px-8 rounded-lg z-50 sticky top-0'>
        <img onClick={() => navigate('/')} src="https://images-platform.99static.com//_is1GO09t56h442BZLWbRgiNgAw=/612x19:1179x586/fit-in/500x500/99designs-contests-attachments/133/133449/attachment_133449824" alt="" className='w-12 rounded-3xl cursor-pointer' />
        
        {isLoggedIn ? 
          (
            <div className="flex gap-2">
              <input type="text" placeholder="Search" className="px-2 pl-4 active:outline-0 border border-[#9e9e9e] rounded-4xl w-2/4 bg-[#09090b]" />
              <Link to={`/tweet`} className="bg-white text-black px-2 py-1 rounded-sm cursor-pointer"><Plus /></Link>
              <Link to={`/upload`} className="bg-white text-black px-2 py-1 rounded-sm cursor-pointer"><ArrowBigUpDash /></Link>
              <Link to={`/insights`} className="bg-white text-black px-2 py-1 rounded-sm cursor-pointer">Inspect</Link>
              <div onClick={logout} className="bg-red-300 text-red-700 border border-red-800 px-2 py-1 rounded-sm cursor-pointer"><LogOut /></div>
            </div>
          ) 
          : 
          (
            <Link to={`/login`} className="bg-white text-black px-2 py-1 rounded-sm cursor-pointer">Login</Link>
          )
        }
    </div>
  )
}

export default Header
