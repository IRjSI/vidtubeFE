import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { ArrowBigUpDash, MessageSquare } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tweet = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      setError('Tweet cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tweets/create`,
        { content: trimmedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate('/');
      } else {
        setError('Failed to post tweet. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[90vh] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]">

    <div className='w-full max-w-2xl'>

      <div className="text-center mb-8">
        <div className='flex items-center gap-3 mb-4'>
          <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30">
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Share Your Thoughts
          </h1>
        </div>
      </div>

      <div className='bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl'>

      <div className="p-8">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="space-y-3">
            <label htmlFor="content" className="text-lg font-semibold text-white flex items-center gap-2">
              Your Tweet
            </label>
            <div className="relative">
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share your thoughts, ideas, or just say hello..."
                className="w-full h-32 px-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200 resize-none"
                />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-red-300 font-medium">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center gap-2 rounded-md ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500'
              } px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4`}
              >
              <ArrowBigUpDash />
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
      </div>
                </div>
    </div>
  );
};

export default Tweet;
