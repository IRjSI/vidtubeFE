import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SubscribeChannel = () => {
  const location = useLocation();
  const user = location.state?.user;
  //@ts-ignore
  const { token } = useContext(AuthContext);
  const [subState, setSubState] = useState('Subscribe');

  const onClickHandler = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/subscription/toggle/${user?._id}`, {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
          
      if (response.data.success) {
        if (response.data.message === "can't subscribe yourself") {
          return
        }
        response.data.message === 'Unsubscribed successfully' ? setSubState('Subscribe') : setSubState('Unsubscribe')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-status/${user?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setSubState(response.data.data.message ? "Unsubscribe" : "Subscribe")
          })
          .catch(err => console.log(err))
  }, [token])
  
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
          <button onClick={onClickHandler} className={`${subState === 'Unsubscribe' ? 'bg-red-500 hover:bg-red-500/90' : 'bg-red-600 hover:bg-red-600/90'} p-2 rounded-md cursor-pointer`}>{subState}</button>
        </div>
      </div>
    </main>
  )
}

export default SubscribeChannel
