import React from "react"
import FeatureCard from "@/components/FeatureCard"
import Button from "@/components/Button"
import { Link } from "react-router-dom"
import GridBackground from "@/utils/GridBackground"

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>

      <GridBackground />

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
