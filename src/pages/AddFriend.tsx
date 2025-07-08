import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const AddFriend = () => {
  const location = useLocation();
  const users = location.state?.users;
  //@ts-ignore
  const { token } = useContext(AuthContext);

  interface subStateType {
    [userId: string]: 'remove' | 'add'
  }
  const [subState, setSubState] = useState<subStateType>({});
  const [message, setMessage] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const onClickHandler = async (user: any) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/add-friend/${user?._id}`, {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );      
          
      if (response.data.success) {
        if (response.data.message === "can't add yourself") {
          setMessage("Can't add to yourself")
          setId(user._id)
          return
        }
        setSubState(prev => ({...prev, [user._id]: response.data.message === 'removed successfully' ? 'Add' : 'Remove'}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //@ts-ignore
    users.forEach(user => {axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get-friend-status/${user?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setSubState(prev => ({...prev, [user._id]: response.data.data.message ? 'Remove' : 'Add'}))
          })
          .catch(err => console.log(err))
        })
  }, [token, users])
  
  return (
    <main className="flex items-center justify-center min-h-[85vh] gap-6 flex-wrap">
      {users && users.map((user: any) => (
        <div key={user._id} className='text-white px-24 py-12 rounded-xl shadow-md bg-[#0f0f11]/60'>
          <div className='flex justify-center'>
            <img src={user.avatar} alt={`${user.username}'s avatar`} className='w-24 h-24 object-cover' />
          </div>
          <div className='text-center text-2xl font-semibold mt-2'>
            {user.username}
          </div>
          <div className='text-xl mt-8 flex flex-col items-center space-y-2'>
            {(user._id === id && message) && (
              <p className='text-gray-400'>{message}</p>
            )}
            <button 
              onClick={() => onClickHandler(user)} 
              className={`${subState[user._id] === 'remove' ? 'border border-black text-white hover:bg-black' : 'bg-black hover:bg-black/90'} p-2 px-4 rounded-md cursor-pointer`}>
              {subState[user._id] || 'Add'}
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default AddFriend
