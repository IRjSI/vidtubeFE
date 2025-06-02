import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { PenBox, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "@/utils/formatDuration";

const MyVideos = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
    const [form, setForm] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        thumbnail: null as File | null,
    });

    //@ts-ignore
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const videoClick = (id: string) => {
        navigate('/watch', { state: { id: id } });
    };

    const deleteVideo = async (id: string) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/videos/delete-video/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            console.log(response.data.message);
            setVideos(prev => prev.filter(video => video._id !== id));
        }
    };

    const openEditForm = (video: any) => {
        setEditingVideoId(video._id);
        setEditFormData({
            title: video.title || "",
            description: video.description || "",
            thumbnail: null
        });
    };

    const handleEditInputChange = (e: any) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleThumbnailChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setEditFormData({ ...editFormData, thumbnail: e.target.files[0] });
        }
    };

    const submitEdit = async () => {
        if (!editingVideoId) return;

        const formData = new FormData();
        formData.append("title", editFormData.title);
        formData.append("description", editFormData.description);
        if (editFormData.thumbnail) {
            formData.append("thumbnail", editFormData.thumbnail);
        }

        const response = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/videos/update-video/${editingVideoId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (response.data.success) {
            console.log(response.data.message);
            setEditingVideoId(null);
            const updated = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-my-videos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVideos(updated.data.data);
        }
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/get-my-videos`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setVideos(response.data.data))
            .catch(err => console.log(err));
    }, [token]);

    return (
        <div className="overflow-y-auto no-scrollbar max-h-full p-4">
            <div className="text-center mb-4">Total Videos: {videos.length}</div>
            {videos.map((video: any, ind: number) => {
                const id = video._id;
                const thumbnail = video.thumbnail || 'https://via.placeholder.com/300x180';
                const duration = formatDuration(parseInt(video.duration || 0));

                return (
                    <div
                        key={ind}
                        className="grid grid-cols-[2fr_9fr_1fr] gap-4 relative cursor-pointer p-6 rounded-xl border border-gray-600/30 hover:bg-white/5 transition mb-2 bg-gradient-to-r from-gray-800/50 to-gray-700/30"
                        onClick={() => videoClick(id)}
                    >
                        <div className="relative rounded-lg mb-2">
                            <img
                                src={thumbnail}
                                className="w-64 h-40 rounded-lg object-cover"
                                alt="thumbnail"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 font-semibold text-white text-xs px-2 py-1 rounded">
                                {duration}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mt-1 line-clamp-2 mb-1">{video.title}</div>
                            <div className="text-[#d8d8d8] text-sm font-light">{video.views} views</div>

                            {(editingVideoId === id && form) && (
                                <div
                                    className="mt-4 bg-white/10 p-4 rounded-lg flex flex-col gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <input
                                        type="text"
                                        name="title"
                                        value={editFormData.title}
                                        onChange={handleEditInputChange}
                                        placeholder="New title"
                                        className="p-2 rounded bg-white/20 text-white"
                                    />
                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditInputChange}
                                        placeholder="New description"
                                        className="p-2 rounded bg-white/20 text-white"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="text-white"
                                    />
                                    <button
                                        onClick={submitEdit}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                                    >
                                        Submit Changes
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                            <PenBox className="text-blue-700" size={18} onClick={() => {
                                openEditForm(video)
                                setForm(prev => !prev)
                            }} />
                            <Trash2 className="text-red-700" size={18} onClick={() => deleteVideo(id)} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyVideos;
