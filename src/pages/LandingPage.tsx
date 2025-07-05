import { ArrowRight, Bookmark, Play, TrendingUp, User, Users2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div>
      <motion.section 
        className="container mx-auto max-w-5xl text-center pt-20 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Elevate your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Creative vision</span>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join thousands of creators who trust Vidtube for professional video hosting, community building, and content monetization.
        </motion.p>
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className="bg-blue-700 py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg text-white rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </motion.section>

      <motion.section 
        className="container mx-auto max-w-5xl text-center pt-20 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Everything you need to know
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Professional tools and features designed to help creators build, grow, and monetize their content.
        </motion.p>

        <div className="flex flex-col space-y-4">
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500/20 border-blue-600 text-blue-600 p-3 sm:p-4 rounded-xl mb-6">
              <Play className="w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Professional Video Hosting</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-start">Upload, manage, and share high-quality videos with enterprise-grade infrastructure and global CDN delivery.</p>
          </motion.div>

          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500/20 border-blue-600 text-blue-600 p-3 sm:p-4 rounded-xl mb-6">
              <Users2 className="w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Creator Community</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-start">Connect with a vibrant community of content creators and build meaningful relationships with your audience.</p>
          </motion.div>

          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500/20 border-blue-600 text-blue-600 p-3 sm:p-4 rounded-xl mb-6">
              <Bookmark className="w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Subscriptions</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-start">Never miss content from your favorite creators with intelligent notifications and personalized recommendations.</p>
          </motion.div>

          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-blue-500/20 border-blue-600 text-blue-600 p-3 sm:p-4 rounded-xl mb-6">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Analytics & Insights</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-start">Track your content performance with detailed analytics and gain insights to grow your audience effectively.</p>
          </motion.div>
        </div>

      </motion.section>

      <motion.section 
        className="container mx-auto max-w-5xl text-center pt-20 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          What users are saying...
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          See what creators and businesses are saying about their experience with Vidtube.
        </motion.p>

        <div className="flex flex-col space-y-4">
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">"Upload, manage, and share high-quality videos with enterprise-grade infrastructure and global CDN delivery."</p>
            <div className="flex gap-2 items-center justify-center">
                <User className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="flex flex-col items-start">
                <h3 className="text-base sm:text-lg font-semibold text-white">Professional Video Hosting</h3>
                <p className="text-gray-400 text-xs sm:text-sm">role</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 3 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">"Upload, manage, and share high-quality videos with enterprise-grade infrastructure and global CDN delivery."</p>
            <div className="flex gap-2 items-center justify-center">
                <User className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="flex flex-col items-start">
                <h3 className="text-base sm:text-lg font-semibold text-white">Professional Video Hosting</h3>
                <p className="text-gray-400 text-xs sm:text-sm">role</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 3.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">"Upload, manage, and share high-quality videos with enterprise-grade infrastructure and global CDN delivery."</p>
            <div className="flex gap-2 items-center justify-center">
                <User className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="flex flex-col items-start">
                <h3 className="text-base sm:text-lg font-semibold text-white">Professional Video Hosting</h3>
                <p className="text-gray-400 text-xs sm:text-sm">role</p>
              </div>
            </div>
          </motion.div>

        </div>

      </motion.section>

      <motion.section 
        className="container mx-auto max-w-5xl text-center pt-20 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.4 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
        >
          Get answers to common questions about our platform and features.
        </motion.p>

        <div className="flex flex-col space-y-4">
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">How do I get started with Vidtube?</h3>
            <p className="text-gray-300 leading-relaxed text-start text-sm sm:text-base">Simply create your account and you'll have access to our full suite of creator tools. Upload your first video in minutes with our intuitive interface.</p>
          </motion.div>
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">What video formats are supported?</h3>
            <p className="text-gray-300 leading-relaxed text-start text-sm sm:text-base">We support all major video formats including MP4, MOV, AVI, and more. Our platform automatically optimizes your content for the best viewing experience.</p>
          </motion.div>
          
          <motion.div 
            className="border border-white/10 rounded-xl bg-white/5 p-6 sm:p-8 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Is there a limit on video uploads?</h3>
            <p className="text-gray-300 leading-relaxed text-start text-sm sm:text-base">There is no limit on video uploading or posting tweets</p>
          </motion.div>
        
        </div>

      </motion.section>

      <motion.section 
        className="container mx-auto max-w-5xl text-center pt-20 pb-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 4.6 }}
      >
        <motion.div 
          className="border border-white/10 rounded-xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 p-6 sm:p-8 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 4.8 }}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5 }}
          >
            Ready to start your journey
          </motion.h1>
          <motion.p 
            className="text-gray-300 font-thin text-lg sm:text-xl max-w-3xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.2 }}
          >
            Join our community of creators and take your content to the next level with professional tools and support.
          </motion.p>
          <motion.button 
            className="bg-blue-700 py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg text-white rounded-lg flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  )
}