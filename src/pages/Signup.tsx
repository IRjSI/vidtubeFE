import { AuthContext } from '@/context/authContext';
import GridBackground from '@/utils/GridBackground';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import GoogleAuth from './GoogleLogin';

const Signup = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //@ts-ignore
  const { login } = useContext(AuthContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!avatar || !coverImage) {
        alert('Please upload both avatar and cover image');
        return;
      }

      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('coverImage', coverImage);
      formData.append('fullname', fullname);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black/90 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      <GridBackground />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 items-center shadow-2xl rounded-2xl overflow-hidden bg-[#101014]">
        {/* Left Side Background Image */}
        <div
          className="hidden md:block h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517504734587-2890819debab?q=80&w=1639&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8 p-10 text-white"
        >
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">Create your account</h2>
            <p className="mt-2 text-sm text-gray-400">Start your journey in seconds.</p>
            <Link to="/login" className="text-indigo-400 hover:underline text-sm mt-2 inline-block">Already have an account?</Link>
          </div>

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Avatar & Cover Image */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="avatar" className="block text-sm text-gray-300">Avatar</label>
                <input
                  onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                  id="avatar"
                  type="file"
                  className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="coverImage" className="block text-sm text-gray-300">Cover Image</label>
                <input
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  id="coverImage"
                  type="file"
                  className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Enter your username"
                className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Fullname */}
            <div>
              <label htmlFor="fullname" className="block text-sm text-gray-300">Fullname</label>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type="text"
                id="fullname"
                placeholder="Your full name"
                className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300">Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                autoComplete="email"
                placeholder="your@email.com"
                className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md bg-white/90 px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Submit */}
            <div>
              <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-md bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            </div>
          </form>

          {/* <div className='border-t border-[#8f97a4]'>
            <GoogleAuth />
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
