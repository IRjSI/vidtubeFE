import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SubscribeChannel = () => {
  const location = useLocation();
  const users = location.state?.users;
  //@ts-ignore
  const { token, isLoggedIn } = useContext(AuthContext);

  interface subStateType {
    [userId: string]: 'Unsubscribe' | 'Subscribe'
  }
  const [subState, setSubState] = useState<subStateType>({});
  const [message, setMessage] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const onClickHandler = async (user: any) => {
    if (!isLoggedIn) {
      alert("login to subscribe")
    }
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
          setMessage("Can't subscribe to yourself")
          setId(user._id)
          return
        }
        setSubState(prev => ({...prev, [user._id]: response.data.message === 'Unsubscribed successfully' ? 'Subscribe' : 'Unsubscribe'}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //@ts-ignore
    users.forEach(user => {axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscription/get-status/${user?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            setSubState(prev => ({...prev, [user._id]: response.data.data.message ? 'Unsubscribe' : 'Subscribe'}))
          })
          .catch(err => console.log(err))
        })
  }, [token, users])
  
  return (
  <main className="min-h-[85vh] bg-gradient-to-br from-gray-900 to-black p-6">
    <div className="max-w-6xl mx-auto space-y-4">
      {users && users.map((user: any) => (
        <div 
          key={user._id} 
          className="bg-[#0f0f11]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800/30"
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <img 
                src={user.avatar} 
                alt={`${user.username}'s avatar`} 
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
              />
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-white">{user.username}</h2>
              </div>

              {(user._id === id && message) && (
                <div className="mt-3 p-3 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-300 text-sm">{message}</p>
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => onClickHandler(user)}
                className={`
                  px-6 py-2.5 rounded-full font-medium transition-all duration-200 min-w-[120px]
                  ${subState[user._id] === 'Unsubscribe' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                    : 'bg-white text-black hover:bg-gray-200 font-semibold'
                  }
                `}
              >
                {subState[user._id] === 'Unsubscribe' ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    Subscribed
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </div>
        </div>
      ))}

      {(!users || users.length === 0) && (
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No creators found</h3>
        </div>
      )}
    </div>
  </main>
);
}

export default SubscribeChannel
