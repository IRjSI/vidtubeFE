import { AuthContext } from '@/context/authContext'
import GridBackground from '@/utils/GridBackground'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

  <GridBackground />

  <div className="w-full max-w-md space-y-8 z-20">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white">Create your account</h2>
      <p className="mt-2 text-sm text-gray-400">Start your journey in seconds.</p>
      <Link to={'/login'} className='text-blue-500 mt-2 text-sm text-center'>Already have an account?</Link>
    </div>

    <form className="space-y-6 bg-[#1a1a20] rounded-2xl shadow-lg p-6" onSubmit={submitHandler}>

      {/* Avatar */}
      <div>
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-200">
          Avatar <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          id="avatar"
          name="avatar"
          type="file"
          required
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-200">
          Cover Image
        </label>
        <input
          onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          id="coverImage"
          name="coverImage"
          type="file"
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-200">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          type="text"
          required
          placeholder="Enter your username"
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Fullname */}
      <div>
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-200">
          Fullname
        </label>
        <input
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Your full name"
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete="new-password"
          className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
