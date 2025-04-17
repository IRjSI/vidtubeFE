import { AuthContext } from '@/context/authContext'
import GridBackground from '@/utils/GridBackground'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  //@ts-ignore
  const { login } = useContext(AuthContext);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        username,
        email,
        password
      })
      
      if (response.data.success) {
        login(response.data.data.refreshToken)
        navigate('/');
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
            <h2 className="text-3xl font-bold tracking-tight text-white">Login to your Account</h2>
            <Link to={'/signup'} className='text-blue-500 mt-2 text-sm text-center'>Don't have an account?</Link>
          </div>

          <form className="space-y-6 bg-[#1a1a20] rounded-2xl shadow-lg p-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
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
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login
