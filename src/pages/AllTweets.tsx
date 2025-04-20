import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { PencilIcon, Trash2, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const AllTweets = () => {
    const [tweets, setTweets] = useState<any[]>([]);
    const [myTweets, setMyTweets] = useState<any[]>([]);
    const [whose, setWhose] = useState('all');
    const [updatedContent, setUpdatedContent] = useState('');
    const [form, setForm] = useState(false);
    const [reload, setReload] = useState(false);
    const [editingTweetId, setEditingTweetId] = useState<string | null>(null);

    //@ts-ignore
    const { token } = useContext(AuthContext);

    const deleteTweet = async ( id: string ) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tweets/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    
            if (response.data.success) {
                console.log(response.data.message);
                setReload(prev => !prev)
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const updateTweet = async ( e: any, id: string) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tweets/update/${id}`,{
                newContent: updatedContent
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    
            if (response.data.success) {
                console.log(response.data.message);
                setReload(prev => !prev)
                setForm(false)
                console.log(form);
                setUpdatedContent('');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const showForm = (id: string, content: string) => {
        setEditingTweetId(id);
        setUpdatedContent(content);
    };
    const closeForm = () => {
        setEditingTweetId(null);
    };

    useEffect(() => {
        if (!token) return;    

        if (whose === "all") {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/tweets/get-all-tweets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                .then((response) => setTweets(response.data.data))
                .catch((error) => console.error('Error fetching videos:', error));
        } else {
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/tweets/get-user-tweets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                .then((response) => setMyTweets(response.data.data))
                .catch((error) => console.error('Error fetching tweets:', error));
        }
        
    }, [token, whose, reload]);

  return (
    <div>
        <main className=" text-white p-4 rounded-xl shadow-md bg-[#0f0f11]/60 h-[90vh]">
        <div className="flex gap-4 justify-center">

            <button onClick={() => setWhose("all")} className={`${whose === 'all' ? 'bg-gray-300 text-black' : 'bg-white text-black'} px-4 py-2 rounded-md`}>
                All Tweets
            </button>

            <button onClick={() => setWhose("user")} className={`${whose === 'user' ? 'bg-gray-300 text-black' : 'bg-white text-black'} px-4 py-2 rounded-md`}>
                My Tweets
            </button>

        </div>
        {tweets.length === 0 && myTweets.length === 0 ? (
          <div className="text-gray-400">No Tweets found.</div>
        ) : (
            whose === "all" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 overflow-y-auto no-scrollbar max-h-full">
                    {tweets.map((tweet, ind) => {
                    return (
                        <div
                            key={ind}
                            className="flex flex-col relative cursor-pointer rounded-lg bg-[#d8d8d8] text-black transition p-2 h-44 mt-8"
                        >
                            <div className="rounded-lg mb-2 overflow-y-auto no-scrollbar">
                                <Trash2 className="absolute right-0 text-red-700" />
                                <div className="">
                                    {tweet.content}
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto no-scrollbar max-h-full">
                    {myTweets.map((tweet, ind) => {
                    return (
                        <div
                            key={ind}
                            className="flex flex-col relative cursor-pointer rounded-lg bg-[#d8d8d8] text-black transition p-2 h-56 mt-8"
                        >
                            {editingTweetId === tweet._id ? (
                                <div>
                                    <X className="absolute right-8 text-blue-700" onClick={closeForm}/>
                                    <form onSubmit={(e) => updateTweet(e,tweet._id)} className={`flex flex-col justify-center items-center gap-4 absolute backdrop-blur-md text-white`}>
                                        <textarea 
                                            value={updatedContent}
                                            onChange={(e) => setUpdatedContent(e.target.value)}
                                            className="bg-gray-700 p-4 rounded-md"
                                            autoFocus
                                        />
                                        <button type="submit" className="bg-blue-700 p-2 rounded-md">Update</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="rounded-lg mb-2 overflow-y-auto no-scrollbar">
                                    <PencilIcon className="absolute right-8 text-blue-700" onClick={() => showForm(tweet._id, tweet.content)}/>
                                    <Trash2 className="absolute right-0 text-red-700" onClick={() => deleteTweet(tweet._id)} />
                                    <div className="">
                                        {tweet.content}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    );
                    })}
                </div>
            )
          
        )}
      </main>
    </div>
  )
}

export default AllTweets
