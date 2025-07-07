import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import FindUsers from "./FindUsers";
import { AuthContext } from "@/context/authContext";
import axios from "axios";

const Message = () => {
    //@ts-ignore
    const { token } = useContext(AuthContext)

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [roomId, setRoomId] = useState("");
    const [friendId, setFriendId] = useState("");
    const [friends, setFriends] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [theUser, setTheUser] = useState<{ _id: string}>();

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleKeyPress = useCallback((e: any) => {
        if (e.key === "/") {
            e.preventDefault()
            inputRef.current?.focus()
        }
    }, [])

    const socket = useMemo(() => io(`https://vidtube-fe.vercel.app`), []);
    console.log(import.meta.env.VITE_FRONTEND_URL)
    
    const sendMessage = async (e: any) => {
        e.preventDefault()
        try {
            if (roomId !== "") {
                setError("")
                socket.emit("message", { room: roomId, message: msg, userId: theUser?._id, friendId })
                // await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/add-message/${friendId}`,{
                //     content: msg
                // }, {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // })
                setMsg("")
            } else {
                setError("select friend")
            }
        } catch (error) {
            
        } finally {
        }
    }

    useEffect(() => {
        const handleNewMessage = ({ message, user }: any) => {
            setMessages((prev) => [...prev, { content: message, user }]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket]);

    
    useEffect(() => {
        if (roomId) {
            socket.emit("joinRoom", { room: roomId });
        }
        document.addEventListener('keydown', handleKeyPress);
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress, roomId]);

    useEffect(() => {
        if (!token) return;

        axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-messages/${roomId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            setMessages(response.data.data);
        })
        .catch((error) => {
            console.error('Error fetching messages:', error);
        });

        axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user`, {
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            setTheUser(response.data.data);
        })
        .catch((error) => {
            console.error('Error fetching friends:', error);
        });

        axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-friends`, {
            headers: {
            Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            setFriends(response.data.data);
        })
        .catch((error) => {
            console.error('Error fetching friends:', error);
        });

    }, [token, friendId])
    
    return (
        <div className="container mx-auto max-w-5xl">
            <div className="mt-4">
                <FindUsers />
            </div>

            <div className="grid grid-cols-[1fr_3fr] gap-2">
                <div>
                    <h1 className="text-xl font-semibold mb-4 mt-4">Friends</h1>

                    {friends.length === 0 ? (
                        <div className="text-gray-500 text-sm">No friends 😔</div>
                    ) : (
                        <div className='h-full'>
                            <ul className="overflow-y-auto max-h-full no-scrollbar space-y-2">
                                {friends.map((friend, index) => {
                                    const user = friend.user?.[0];
                                    const avatar = user?.avatar || 'https://via.placeholder.com/32';
                                    const username = user?.username || 'Unknown';
                                    
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                //@ts-ignore
                                                setFriendId(user._id)
                                                setRoomId([user._id, theUser?._id].sort().join("-"))
                                            }}
                                            className="p-2 rounded-lg hover:bg-white/10 transition flex items-center gap-3 cursor-pointer"
                                        >
                                            <img
                                                src={avatar}
                                                alt={username}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-sm font-medium">{username}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Chat</h2>
                    <div className="border border-gray-300 h-72 overflow-y-auto p-3 mb-3 rounded">
                        {/* Messages will appear here */}
                        {error !== "" && roomId === "" && (
                            <p className="text-red-500 text-center">{error}</p>
                        )}
                        <p>{roomId}</p>
                        <div className="space-y-1">
                            {messages.map((message, index) => (
                                message.user === theUser?._id ? (
                                    <div key={index}>
                                        <p className="bg-white/50 text-black py-2 px-4 rounded-xl">{message.content}</p>
                                    </div>
                                ) : (
                                    <div key={index}>
                                        <p className="bg-black/50 text-white py-2 px-4 rounded-xl">{message.content}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <form className="flex gap-2" onSubmit={sendMessage}>
                        <input
                            ref={inputRef}
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-2 rounded border border-gray-300"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-700 text-white border-none"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Message