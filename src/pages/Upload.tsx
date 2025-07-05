import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { ArrowBigUpDash, Video } from 'lucide-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(''); 
    const [loading, setLoading] = useState(false); 
    //@ts-ignore
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    const submitHandler = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData();
          
            if (!video || !thumbnail) {
                alert('Please upload');
                return;
            }
            formData.append('video', video); 
            formData.append('thumbnail', thumbnail);
            formData.append('title', title);
            formData.append('description', description);
    
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/videos/upload-video`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
          
          if (response.data.success) {
            navigate('/');
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-[90vh]">

      <div className='w-full max-w-2xl'>

      <div className="text-center mb-8">
        <div className='flex items-center gap-3 mb-4'>
          <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30">
            <Video className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Share Your Views
          </h1>
        </div>
      </div>

      <div className='bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl'>

      <div className="p-8">
          <form className="space-y-6" onSubmit={submitHandler}>
            
            <div className='flex gap-4'>
                <div>
                <label htmlFor="video" className="text-lg font-semibold text-white flex items-center gap-2">
                    Video
                </label>
                <div className="mt-2">
                    <input
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    id="video"
                    name="video"
                    type="file"
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
                    />
                </div>
                </div>
                
                <div>
                <label htmlFor="thumbnail" className="text-lg font-semibold text-white flex items-center gap-2">
                    Thumbnail
                </label>
                <div className="mt-2">
                    <input
                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
                    />
                </div>
                </div>
            </div>

            <div className="space-y-3">
                <label htmlFor="title" className="text-lg font-semibold text-white flex items-center gap-2">
                  Title
                </label>
              <div className="mt-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  type="text"
                  placeholder='title'
                  required
                  className="w-full px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
                  />
              </div>
            </div>

            <div className="space-y-3">
                <label htmlFor="description" className="text-lg font-semibold text-white flex items-center gap-2">
                  Description
                </label>
              <div className="mt-2">
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  type="text"
                  placeholder='description'
                  required
                  className="w-full px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center gap-2 rounded-md ${loading ? "bg-indigo-500" : "bg-indigo-600"} px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4`}
              >
                <ArrowBigUpDash /> {loading ? "Uploading...(this may take a few moments)" : "Upload"}
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
      </div>
  )
}

export default Upload
