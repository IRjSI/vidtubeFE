import { useLocation } from 'react-router-dom'

const LikedVideos = () => {
    const location = useLocation();
    const likes = location.state?.likes; // array of liked videos
    console.log(likes);
    
    
  return (
    <div>
      {/* @ts-ignore */}
      {likes.map((video, ind) => (
        <div key={ind}>
            {video.video}
        </div>
      ))}
    </div>
  )
}

export default LikedVideos
