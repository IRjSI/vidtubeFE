import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

const Message = () => {
    const [msg, setMsg] = useState("");
    const [op, setOp] = useState("");

    const inputRef = useRef(null)

    const handleKeyPress = useCallback((e: any) => {
        if (e.key === "/") {
            inputRef.current
        }
    }, [])

    const socket = useMemo(() => io('http://localhost:4000'), []);

    socket.on("newMessage", ({ message: msg }) => {
        setOp(msg)
    })
    
    const sendMessage = async (e: any) => {
        e.preventDefault()
        try {
            socket.emit("message", { room: "a-b", message: msg })
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        socket.emit("joinRoom", { room: "a-b" });
        document.addEventListener('keydown', handleKeyPress);
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    
    return (
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold mb-4">Chat</h2>
            <div className="border border-gray-300 h-72 overflow-y-auto p-3 mb-3 rounded">
                {/* Messages will appear here */}
                {op}
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
    )
}

export default Message