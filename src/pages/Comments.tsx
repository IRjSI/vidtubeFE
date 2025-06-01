import { AuthContext } from "@/context/authContext";
import axios from "axios"
import { ArrowDown, ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react"

function Comments({ videoId }: any  ) {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    //@ts-ignore
    const { token } = useContext(AuthContext);      

    const [content, setContent] = useState('');
    const [comment, setComment] = useState();
    // const [subState, setSubState] = useState('Subscribe');


    const textareaRef = useRef(null);

    const handleInput = () => {
        const el: any = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    const handleComment = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments/add/${videoId}`, {
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (response.data.success) {                
                setComment(response.data.data.content);
                setContent('');
            } else {
                console.error("Failed to like video:", response.data.message);
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const getComments = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/all-comments/${videoId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            if (response.data.success) {
                console.log(response.data.data);
                setComments(response.data.data);
            }
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getComments()
    }, [])

  return (
    <div>
        <div className="rounded-xl px-4 py-2">
            <div className="mb-4">
                <div>
                    <p className='text-xl font-bold'>{comments.length} Comments</p>
                </div>
                <form onSubmit={handleComment} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end mt-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        ref={textareaRef}
                        onInput={handleInput}
                        maxLength={800}
                        rows={1}
                        placeholder="Write your thoughts..."
                        className="w-full border-b-2 border-[#333] bg-[#232326] text-white rounded-xl p-3 placeholder-gray-400 focus:outline-none resize-none overflow-hidden transition-colors"
                    />
                    <button
                        type="submit"
                        className="mt-2 sm:mt-0 bg-white/10 text-white border border-white hover:bg-white/20 px-6 py-2 rounded-xl font-semibold transition-colors"
                    >
                        Comment
                    </button>
                </form>
            </div>

            {comments.map((comment) => (
                <div className="mb-4 flex gap-4">
                    <img src={comment.owner.avatar} className="rounded-full w-10 h-10" />
                    
                    <div>
                        <div className="text-md font-semibold">
                            <p>{comment.owner.username}</p>
                        </div>
                        <p>{comment.content}</p>
                        <div className="flex gap-4 mt-2">
                            <ThumbsUp size={18} />
                            <ThumbsDown size={18} />
                        </div>
                        <div className="text-blue-400 font-semibold flex items-center">
                            <ChevronDown /> replies
                        </div>
                    </div>
                </div>
            ))}
        </div>        
    </div>
  )
}

export default Comments
