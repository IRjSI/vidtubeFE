import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { ArrowBigUpDash } from 'lucide-react';
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
    <div className="flex flex-1 flex-col items-center justify-center min-h-[95vh] bg-[#0f0f11]/60 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]">

      <div className='border border-white/10 h-full sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-xl bg-[#0d0d0e] backdrop-blur-lg'>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm z-50">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-100">
          Post tweet
        </h2>
      </div>

      <div className="mt-10 z-50">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-100">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
          </div>

          {error && (
            <div className="text-sm text-red-500 font-medium -mt-4">
              {error}
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
  );
};

export default Tweet;
