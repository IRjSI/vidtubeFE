import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const AllTweets = () => {
    const [tweets, setTweets] = useState([]);
    const [myTweets, setMyTweets] = useState([]);
    const [whose, setWhose] = useState('all');
    //@ts-ignore
    const { token } = useContext(AuthContext);

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
                .catch((error) => console.error('Error fetching videos:', error));
        }
        
    }, [token, whose]);

  return (
    <div>
        <main className=" text-white p-4 rounded-xl shadow-md bg-[#0f0f11]/60">
        <div className="flex gap-4">

            <button onClick={() => setWhose("all")} className="bg-white p-4 rounded-md text-black">
                All Tweets
            </button>

            <button onClick={() => setWhose("user")} className="bg-white p-4 rounded-md text-black">
                My Tweets
            </button>

        </div>
        {tweets.length === 0 && myTweets.length === 0 ? (
          <div className="text-gray-400">No Tweets found.</div>
        ) : (
            whose === "all" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto no-scrollbar max-h-full">
                    {tweets.map((tweet, ind) => {
                    return (
                        <div
                        key={ind}
                        className="flex flex-col relative cursor-pointer rounded-lg hover:bg-white/5 transition p-2"
                        >
                            <div className="relative w-full rounded-lg mb-2">
                                <div className="absolute bottom-2 right-2 bg-black/80 font-semibold text-white text-xs px-2 py-1 rounded">
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
                        className="flex flex-col relative cursor-pointer rounded-lg hover:bg-white/5 transition p-2"
                        >
                            <div className="w-full rounded-lg mb-2">
                                <div className="">
                                    {tweet.content}
                                </div>
                            </div>
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
