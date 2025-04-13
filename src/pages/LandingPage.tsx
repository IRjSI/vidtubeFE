import React from "react"
import FeatureCard from "@/components/FeatureCard"
import Button from "@/components/Button"
import { Link } from "react-router-dom"
import GridBackground from "@/utils/GridBackground"
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-8 min-h-screen'>

      <GridBackground />

      <motion.div
        className="bg-purple-500 blur-[150px] rounded-full absolute"
        style={{
          height: '300px',
          width: '300px',
          top: '20%',
          right: '5%',
          opacity: 0.25,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      <motion.div
        className="bg-blue-500 blur-[150px] rounded-full absolute"
        style={{
          height: '300px',
          width: '300px',
          bottom: '15%',
          left: '5%',
          opacity: 0.25,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
      />

      <h2 className="text-4xl text-gray-300 text-center mt-4">
        Create, Share, and Connect — Start Your Journey Now!
      </h2>
      
        
      <motion.div
        className="flex mt-8 gap-8"
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

      <motion.section 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}  
      >
        <h2 className="text-3xl font-bold">What Users are Saying</h2>
        <div className="flex justify-center gap-8 mt-4">
          <div className="bg-black border border-[#9e9e9e] p-6 rounded-lg text-white">
            <p>"Vidtube has completely changed the way I share my creativity!"</p>
            <p className="mt-4 text-sm">- Jane Doe, Content Creator</p>
          </div>
          <div className="bg-black border border-[#9e9e9e] p-6 rounded-lg text-white">
            <p>"I love how easy it is to discover new creators and engage with their content."</p>
            <p className="mt-4 text-sm">- John Smith, Viewer</p>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} 
      >
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="text-white font-semibold">How do I upload a video?</summary>
            <p className="text-gray-300 mt-2">Simply click on the upload button at the top of your dashboard to get started!</p>
          </details>
          <details className="bg-gray-800 p-4 rounded-lg">
            <summary className="text-white font-semibold">Is Vidtube free?</summary>
            <p className="text-gray-300 mt-2">Yes! Vidtube is free to use with the option for premium features down the line.</p>
          </details>
        </div>
      </motion.section>

      <section className="mt-8 text-center flex flex-col justify-center items-center">
        <h2 className="text-xl text-gray-300">Join the community of creators</h2>
        <Link to="/signup">
          <Button text="Sign Up Now" className="mt-4" />
        </Link>
      </section>

      <footer className="mt-12 p-6">
        <div className="flex justify-center gap-8 text-gray-300">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <p className="text-center text-gray-400 mt-4">&copy; 2025 Vidtube. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default LandingPage
