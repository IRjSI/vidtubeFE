import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ChannelInspect from './pages/ChannelInspect';
import Upload from './pages/Upload';
import Tweet from './pages/Tweet';
import AllTweets from './pages/AllTweets';
import SubscribeChannel from './pages/SubscribeChannel';
import Watch from './pages/Watch';
import LikedVideos from './pages/LikedVideos';

function App() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen font-sans">
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/subscribe" element={<SubscribeChannel />} />
          <Route path="/tweet" element={<Tweet />} />
          <Route path="/show-tweets" element={<AllTweets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/insights" element={<ChannelInspect />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
