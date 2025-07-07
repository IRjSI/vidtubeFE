import { AuthContext } from "@/context/authContext";
import axios from "axios"
import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FindUsers = () => {
  //@ts-expect-error
  const { isLoggedIn, token } = useContext(AuthContext);
  const navigate = useNavigate()

  const [username, setUsername] = useState("");

  const findUser = async (e: any) => {
    e.preventDefault();
    try {
        const lowerCaseUsername = username.toLowerCase();
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user-search/${lowerCaseUsername}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
        );
            
        if (response.data.success) {          
          // this is how to pass props while navigating (use useLocation hook in that component)
          navigate('/add-friend', { state: { users: response.data.data } });
        } else {          
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <form onSubmit={findUser} className='flex items-center'>
          <input
            type="text"
            placeholder="Search user..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-64 text-sm px-4 py-2 rounded-s-full border border-white/10 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/10"
            />
          <button type='submit' className='border border-white/10 text-white p-2 rounded-e-xl'><Search size={20} /></button>
        </form>
    </div>
  )
}

export default FindUsers