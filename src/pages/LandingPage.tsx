import React from "react"
import FeatureCard from "@/components/FeatureCard"
import Button from "@/components/Button"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>

      <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 0 50px, 50px -50px, -50px 0px',
            animation: 'backgroundShift 20s linear infinite',
          }} />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} />

        <div className="bg-purple-500 blur-3xl rounded-full h-24 w-1/3 opacity-25 absolute right-0 top-96" />
        <div className="bg-blue-500 blur-3xl rounded-full h-24 w-1/3 opacity-25 absolute left-0 top-96" />

        <h1 className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500'>Welcome to Vidtube</h1>
        
        <div className="flex mt-8 gap-8">
            <FeatureCard title="Feature 1" para="Share with the world what you are cooking" />
            <FeatureCard title="Feature 2" para="Know what the world is cooking" />
            <FeatureCard title="Feature 3" para="lorem ipsunm asda sdasdas adasdasd asd asdaseewrwterty 54tyrtyhrt 24" />
            <FeatureCard title="Feature 4" para="lorem ipsunm asda sdasdas adasdasd asd asdaseewrwterty 54tyrtyhrt 24" />
        </div>

        <Link to={'/login'} >
          <Button text="Get Started" className="mt-8" />
        </Link>
    </div>
  )
}

export default LandingPage
