import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { PenBox, Trash2, X } from "lucide-react";
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
                            className="border-2 border-[#2e2e2f] flex flex-col relative cursor-pointer rounded-lg bg-[#151514] text-white transition p-2 h-44 mt-8 items-center"
                        >
                            <div className="rounded-lg mb-2 overflow-y-auto no-scrollbar">
                                <div className="">
                                    {tweet.content}
                                </div>
                            </div>
                        </div>
                    );
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto no-scrollbar h-[75vh]">
                    {myTweets.map((tweet, ind) => {
                    return (
                        <div
                            key={ind}
                            className="border-2 border-[#2e2e2f] flex flex-col relative cursor-pointer rounded-lg bg-[#fff]/5 text-white transition p-2 h-56 mt-8 items-center"
                        >
                            {editingTweetId === tweet._id ? (
                                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex justify-center items-center rounded-lg">
                                <form
                                  onSubmit={(e) => updateTweet(e, tweet._id)}
                                  className="bg-[#2e2e2f] text-black p-4 rounded-lg shadow-lg w-full max-w-sm space-y-4"
                                >
                                  <div className="flex justify-between items-center text-white">
                                    <h2 className="text-lg font-semibold">Edit Tweet</h2>
                                    <X
                                      className="hover:text-red-600 cursor-pointer"
                                      onClick={closeForm}
                                    />
                                  </div>
                                  <textarea
                                    value={updatedContent}
                                    onChange={(e) => setUpdatedContent(e.target.value)}
                                    className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none text-white bg-[#585858]"
                                    autoFocus
                                  />
                                  <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                  >
                                    Update Tweet
                                  </button>
                                </form>
                              </div>
                              
                            ) : (
                                <div className="rounded-lg mb-2 overflow-y-auto no-scrollbar">
                                    <PenBox size={18} className="absolute right-8 text-blue-700" onClick={() => showForm(tweet._id, tweet.content)}/>
                                    <Trash2 size={18} className="mr-2 absolute right-0 text-red-700" onClick={() => deleteTweet(tweet._id)} />
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
