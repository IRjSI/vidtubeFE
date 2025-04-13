import { AuthContext } from '@/context/authContext'
import GridBackground from '@/utils/GridBackground'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [avatar, setAvatar] = useState<File | null>(null);
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

  //@ts-ignore
  const { login } = useContext(AuthContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
        const formData = new FormData();

        if (!avatar) {
            alert('Please upload an avatar');
            return;
        }
        if (!coverImage) {
            alert('Please upload a cover image');
            return;
        }
        formData.append('avatar', avatar); 
        formData.append('coverImage', coverImage); 
        formData.append('fullname', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'       
                }
            }
        )
      
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-6 lg:px-8 min-h-screen">

      <GridBackground />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm z-50">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="avatar" className="block text-sm/6 font-medium text-gray-100">
                Avatar
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                  id="avatar"
                  name="avatar"
                  type="file"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="coverImage" className="block text-sm/6 font-medium text-gray-100">
                Cover Image
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Username
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder='username'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-100">
                Fullname
              </label>
              <div className="mt-2">
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder='fullname'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder='Email'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Password'
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Signup
