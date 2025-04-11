import axios from 'axios';
import { ArrowBigUpDash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            if (!video || !thumbnail) {
                alert('Please upload');
                return;
            }
            formData.append('video', video); 
            // formData.append('coverImage', coverImage); 
            formData.append('thumbnail', thumbnail);
            formData.append('title', title);
            formData.append('description', description);
    
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/videos/upload-video`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'       
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

      <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 50px, 50px -50px, -50px 0px',
            animation: 'backgroundShift 20s linear infinite',
          }} />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} />

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
            Upload Video
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-50">
          <form className="space-y-6" onSubmit={submitHandler}>
            
            <div className='flex gap-4'>
                <div>
                <label htmlFor="video" className="block text-sm/6 font-medium text-gray-100">
                    Video
                </label>
                <div className="mt-2">
                    <input
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    id="video"
                    name="video"
                    type="file"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>
                
                <div>
                <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-100">
                    Thumbnail
                </label>
                <div className="mt-2">
                    <input
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-100">
                  Title
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  type="text"
                  placeholder='title'
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-100">
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  type="text"
                  placeholder='description'
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
                <ArrowBigUpDash /> Upload
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Upload
