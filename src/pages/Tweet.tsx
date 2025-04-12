import GridBackground from '@/utils/GridBackground';
import axios from 'axios';
import { ArrowBigUpDash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Tweet = () => {
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
    
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tweets/create`,
                {
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
          
          if (response.data.success) {
            navigate('/');
          }
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <GridBackground />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Post tweet
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-50">
          <form className="space-y-6" onSubmit={submitHandler}>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="block text-sm/6 font-medium text-gray-100">
                  Content
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  id="content"
                  name="content"
                  placeholder='content...'
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowBigUpDash /> Post
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Tweet
