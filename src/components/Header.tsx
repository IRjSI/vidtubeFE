import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "@/context/authContext"
import { ArrowBigUpDash } from "lucide-react";

const Header = () => {
  //@ts-ignore
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className='flex justify-between items-center text-white text-lg backdrop-blur-xl py-1 px-4 rounded-lg '>
        <img src="https://images-platform.99static.com//_is1GO09t56h442BZLWbRgiNgAw=/612x19:1179x586/fit-in/500x500/99designs-contests-attachments/133/133449/attachment_133449824" alt="" className='w-12 rounded-3xl' />
        <input type="text" placeholder="Search" className="p-2 pl-4 active:outline-0 border border-[#9e9e9e] rounded-4xl w-2/4 bg-[#09090b]" />
        
        {isLoggedIn ? 
          (
            <div className="flex gap-2">
              <Link to={`/upload`} className="bg-white text-black px-2 py-1 rounded-lg cursor-pointer"><ArrowBigUpDash /></Link>
              <Link to={`/insights`} className="bg-white text-black px-2 py-1 rounded-lg cursor-pointer">Inspect</Link>
              <Link to={`/logout`} className="bg-white text-black px-2 py-1 rounded-lg cursor-pointer">Logout</Link>
            </div>
          ) 
          : 
          (
            <Link to={`/login`} className="bg-white text-black px-2 py-1 rounded-lg cursor-pointer">Login</Link>
          )
        }
    </div>
  )
}

export default Header
