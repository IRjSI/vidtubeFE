import React from 'react'
import { useLocation } from 'react-router-dom';

const SubscribeChannel = () => {
  const location = useLocation();
  const user = location.state?.user;

  const onClickHandler = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <main className="flex items-center justify-center h-[85vh]">
      <div className='text-white px-24 py-12 rounded-xl shadow-md bg-[#0f0f11]/60'>
        <div className='flex justify-center'>
          <img src={user.avatar} alt="" className='w-24' />
        </div>
        <div className='text-center text-2xl font-semibold mt-2'>
          {user.username}
        </div>
        <div className='text-xl mt-8'>
          <button onClick={onClickHandler} className='bg-red-600 hover:bg-red-600/90 p-2 rounded-md cursor-pointer'>Subscribe</button>
        </div>
      </div>
    </main>
  )
}

export default SubscribeChannel
