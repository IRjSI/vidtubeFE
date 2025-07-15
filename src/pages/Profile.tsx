import { AuthContext, AuthContextType } from "@/context/authContext"
import axios from "axios"
import { AtSign, Camera, Edit, Lock, Mail, Unlock, User, X } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Profile = () => {
  const { token } = useContext(AuthContext) as AuthContextType

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isName, setIsName] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<{username: string, fullname: string, email: string, password: string, avatar: string, coverImage: string}>()
  const [formData, setFormData] = useState({
    username: "us",
    fullname: "fn",
    email: "@",
    password: "himani",
    avatar: "",
    coverImage: ""
  })

  const updateAvatar = async (e: any) => {
    setLoading(true)
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/update-avatar`, {
        avatar: e.target.files[0]
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateCoverImage = async (e: any) => {
    setLoading(true)
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/update-cover-image`, {
        coverImage: e.target.files[0]
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      isPassword && await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/change-password`, {
        oldPassword: data?.password,
        newPassword: formData.password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      isName && await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/update-details`, {
        fullname: formData.fullname,
        email: formData.email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setIsName(false)
      setIsPassword(false)
    }
  }

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setData(res.data.data)
        setFormData({
          username: res.data.data.username,
          fullname: res.data.data.fullname,
          email: res.data.data.email,
          password: res.data.data.password,
          avatar: res.data.data.avatar,
          coverImage: res.data.data.coverImage
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, loading])

  return (
    <div className="min-h-screen">
        <main className="relative">
          {/* banner */}
          <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={data?.coverImage ? data.coverImage : ""}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-6 right-6">
              <label className="flex gap-2 px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-md">
                <Camera />
                <input type="file" onChange={updateCoverImage} placeholder="" className="hidden" />
                <span>Edit Cover</span>
              </label>
            </div>
          </div>

          {/* profile */}
          <div className="relative mx-auto max-w-6xl px-4 sm:px6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* avatar and description */}
              <div className="flex flex-col items-center lg:items-start lg:col-span-1">
                <div className="relative mb-6">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white p-1">
                    <img
                      src={data?.avatar ? data.avatar : ""}
                      className="w-full h-full object-cover rounded-full"
                      alt=""
                    />
                  </div>
                  <label className="absolute bottom-2 right-2 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                    <Camera size={20} />
                    <input type="file" onChange={updateAvatar} placeholder="" className="hidden" />
                  </label>
                </div>

                <div className="w-full max-w-sm">
                  <div className="bg-white/80 rounded-2xl p-6 shadow-xl border border-blue-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">About</h3>
                      <button
                        className={`${isEditing ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-600"} transition-colors`}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <X size={16} /> : <Edit size={16} />}
                      </button>
                    </div>

                    {isEditing ? (
                      <textarea
                        value={"lorem24 lorem24 lorem24 lorem24lorem24lorem24 lorem24"}
                        className="w-full h-48 p-3 border border-blue-200 bg-blue-50/50 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                        autoFocus
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p
                        className="w-full h-48 p-3 text-sm text-black"
                      >
                        lorem24 lorem24 lorem24 lorem24lorem24lorem24 lorem24
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* profile info */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                      <p className="text-gray-600">Update your account information and preferences</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 mt-4">

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fullname</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                          type="text"
                          value={data?.fullname ? formData.fullname : ""}
                          onChange={(e) => {
                            setFormData({ ...formData, fullname: e.target.value})
                            setIsName(true)
                          }}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                          placeholder="Enter your fullname"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="relative">
                            <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 " size={20} />
                            <input
                              type="text"
                              value={data?.username ? formData.username : ""}
                              className="cursor-not-allowed pl-12 pr-4 py-4 border w-full border-gray-200/50 bg-gray-200/50 rounded-xl text-gray-900"
                              disabled
                              placeholder="Choose a username"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>can't change username</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                          type="email"
                          value={data?.email ? formData.email : ""}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value})
                            setIsName(true)
                          }}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                      <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        {showPassword ? (<Lock onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />) : (<Unlock onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />)}
                        <input
                          type={showPassword ? "text" : "password"}
                          value={data?.password ? formData.password : ""}
                          onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value})
                            setIsPassword(true)
                          }}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 bg-gray-50/50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className={`group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r ${!loading ? "from-blue-600 via-blue-700 to-indigo-700" : "from-blue-500 via-blue-600 to-indigo-600"} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden`}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-800/30 to-transparent rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-900/30 to-transparent rounded-full blur-3xl -z-10"></div>
        </main>
    </div>
  )
}

export default Profile