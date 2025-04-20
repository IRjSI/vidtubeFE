import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import GridBackground from "@/utils/GridBackground";
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 mt-8 min-h-screen overflow-x-hidden">

      <GridBackground />

      {/* Decorative Background Blobs */}
      <motion.div
        className="bg-purple-500 blur-[150px] rounded-full absolute"
        style={{
          height: '300px',
          width: '300px',
          top: '20%',
          right: '5%',
          opacity: 0.45,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blue-500 blur-[150px] rounded-full absolute"
        style={{
          height: '300px',
          width: '300px',
          bottom: '15%',
          left: '5%',
          opacity: 0.45,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Hero Section */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 text-center mt-8 leading-snug">
        Create, Share, and Connect — Start Your Journey Now!
      </h2>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-7xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <FeatureCard 
          title="Content Sharing" 
          para="Upload and share high-quality videos with ease — let the world see your creativity in motion." 
        />
        <FeatureCard 
          title="Micro Posts" 
          para="Stay updated with bite-sized thoughts through tweet-style posts from creators you follow." 
        />
        <FeatureCard 
          title="Creator Subscriptions" 
          para="Subscribe to your favorite creators and never miss out on their latest uploads or updates." 
        />
        <FeatureCard 
          title="Personalized Feed" 
          para="A tailored content experience showing trending videos and posts aligned with your interests." 
        />
      </motion.div>

      {/* Testimonials Section */}
      <motion.section 
        className="mt-16 w-full max-w-7xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-white">What Users are Saying</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {["Jane Doe", "John Smith", "Jane Doe", "John Smith"].map((user, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-lg border border-gray-700 p-6 rounded-xl text-white">
              <p className="italic">"{user === 'Jane Doe' 
                ? 'Vidtube has completely changed the way I share my creativity!' 
                : 'I love how easy it is to discover new creators and engage with their content.'}"</p>
              <p className="mt-4 text-sm font-light">- {user}, {user === 'Jane Doe' ? 'Content Creator' : 'Viewer'}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="mt-16 w-full max-w-3xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-white">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          <details className="bg-gray-800 p-4 rounded-lg backdrop-blur-md">
            <summary className="text-white font-semibold cursor-pointer">How do I upload a video?</summary>
            <p className="text-gray-300 mt-2">Simply click on the upload button at the top of your dashboard to get started!</p>
          </details>
          <details className="bg-gray-800 p-4 rounded-lg backdrop-blur-md">
            <summary className="text-white font-semibold cursor-pointer">Is Vidtube free?</summary>
            <p className="text-gray-300 mt-2">Yes! Vidtube is free to use with the option for premium features down the line.</p>
          </details>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="mt-16 flex flex-col justify-center items-center">
        <h2 className="text-2xl sm:text-3xl text-gray-100">Join the community of creators</h2>
        <Link to="/signup">
          <Button text="Sign Up Now" className="mt-6" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 w-full px-4 z-10">
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          <Link to="/about" className="cursor-pointer">About Us</Link>
          <Link to="/contact" className="cursor-pointer">Contact</Link>
          <Link to="/privacy-policy" className="cursor-pointer">Privacy Policy</Link>
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">&copy; 2025 Vidtube. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
