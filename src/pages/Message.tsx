import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import FindUsers from "./FindUsers";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { MessageCircleMore, SendHorizonal } from "lucide-react";

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

    const socket = useMemo(() => io(`${import.meta.env.VITE_BACKEND_URL_WS}`, { withCredentials: true }), []);
    
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
        <div className="container mx-auto max-w-6xl flex flex-col p-4 text-white">

            <div className="flex-1 grid lg:grid-cols-[350px_1fr] gap-6">
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <h1 className="text-xl font-semibold text-gray-100">Friends</h1>
                    </div>

                    <div className="mb-2 mt-2 px-2">
                        <FindUsers />
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {friends.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
                                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium mb-1 text-gray-300">No friends yet</p>
                                <p className="text-xs text-center text-gray-500">Add friends to start chatting</p>
                            </div>
                        ) : (
                            <div className="p-2">
                                <ul className="space-y-1">
                                    {friends.map((friend, index) => {
                                        const user = friend.user?.[0];
                                        const avatar = user?.avatar || 'https://via.placeholder.com/40';
                                        const username = user?.username || 'Unknown';
                                        const isActive = friendId === user._id;
                                        
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    //@ts-ignore
                                                    setFriendId(user._id)
                                                    setRoomId([user._id, theUser?._id].sort().join("-"))
                                                }}
                                                className={`p-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                                                    isActive 
                                                        ? 'bg-blue-900/50 border-2 border-blue-500' 
                                                        : 'hover:bg-gray-700 border-2 border-transparent'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <img
                                                            src={avatar}
                                                            alt={username}
                                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-600 shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-medium truncate ${isActive ? 'text-blue-300' : 'text-gray-100'}`}>
                                                            {username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-100">Chat</h2>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-y-auto max-h-[480px] p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-800">
                            {error !== "" && roomId === "" && (
                                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mx-4">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-300 text-sm font-medium">{error}</p>
                                    </div>
                                </div>
                            )}
                            
                            {messages.length === 0 && !error && roomId && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium mb-2 text-gray-300">Start a conversation</p>
                                    <p className="text-sm text-center text-gray-500">Send a message to begin chatting</p>
                                </div>
                            )}
                            
                            {!error && !roomId && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                                        <MessageCircleMore className="w-8 h-8" />
                                    </div>
                                    <p className="text-lg font-medium mb-2 text-gray-300">select a friend to chat</p>
                                </div>
                            )}
                            
                            {messages.map((message, index) => (
                                message.user === theUser?._id ? (
                                    <div key={index} className="flex justify-end">
                                        <div className="max-w-xs lg:max-w-md">
                                            <div className="bg-blue-500 text-white py-3 px-4 rounded-2xl rounded-br-md shadow-sm">
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className="flex justify-start">
                                        <div className="max-w-xs lg:max-w-md">
                                            <div className="bg-gray-700 text-gray-100 py-3 px-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-600">
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                            <form className="flex gap-3" onSubmit={sendMessage}>
                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        type="text"
                                        disabled={roomId === ""}
                                        placeholder="Type your message..."
                                        className="w-full p-4 pr-16 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                                    />
                                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-xs text-gray-400 bg-gray-600 py-1 px-2 rounded-md font-mono shadow-md">
                                            /
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                                    disabled={!msg.trim()}
                                >
                                    <SendHorizonal className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message